import CaptchaBox, { CaptchaBoxProps } from '@packages/components/CaptchaBox';
import { FormInstance } from 'antd/lib';
import React, { ChangeEvent, useEffect, useState } from 'react';

export interface ViewCapchaProps extends CaptchaBoxProps {
  bgColorTextCaptcha: string,
  textColor: string,
  colorRotate: string,
  captchaAlign: string,
  placeholder: string,
  onChange: (value: string) => void,
  form: FormInstance,
}

interface FormValue {
  value: string;
  error: boolean;
}

export interface FormValues {
  captcha: FormValue;
}

export const ViewCapchaField : React.FC<ViewCapchaProps> = ({
  bgColorTextCaptcha,
  textColor,
  colorRotate,
  captchaAlign,
  placeholder,
  onChange,
  form,
  ...rest
}) => {
  const [formValue, setFormValue] = useState<FormValues>({
    captcha: {
      value: '', error: false,
    },
  });

  const [captchaContent, setCaptchaContent] = useState<string[]>([]);

  const charactersArray = 'abcdefghjkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ023456789'.split('');

  const setCaptchaArray = () => {
    const captchaArray = [];
    const maxChar = 4;

    for (let i = 0; i < maxChar; i += 1) {
      captchaArray.push(charactersArray[Math.floor(Math.random() * charactersArray.length)]);
    }

    setCaptchaContent(captchaArray);

    // If currentValue is not empty, check it with new captcha
    const currentValue = formValue.captcha.value;
    if (currentValue.trim() !== '') {
      const newError = currentValue !== captchaArray.join('');
      setFormValue({
        captcha: {
          value: currentValue,
          error: newError,
        },
      });
      // Update form errors if needed
      form.setFields([
        {
          name: rest.id,
          errors: newError ? ['Mã Captcha không hợp lệ'] : [],
        },
      ]);
      onChange('');
    } else {
      // Reset error state if it haven't initial value
      setFormValue({
        captcha: {
          value: '',
          error: false,
        },
      });
    }
  };

  const handleInputChange = (value: string) => {
    if (value.trim() === '') {
      setFormValue({
        captcha: { value: '', error: true },
      });
      form.setFields([
        {
          name: rest.id,
          errors: [],
        },
      ]);
      setCaptchaArray(); // Reload captcha content
    } else {
      const newError = value !== captchaContent.join('');
      form.setFields([
        {
          name: rest.id,
          errors: newError ? ['Mã Captcha không hợp lệ'] : [],
        },
      ]);
      setFormValue({
        captcha: { value, error: newError },
      });
      if (!newError) {
        onChange(value); // Update parent component with new value
      }
    }
  };

  const handleReloadCaptcha = () => {
    setCaptchaArray();
  };

  useEffect(() => {
    if (rest.value) {
      form.setFieldValue(rest.name, '');
    }
    setCaptchaArray();
  }, []);

  return (
    <div className="SignUpScreen">
      <CaptchaBox
        captchaPosition={captchaAlign}
        colorRotate={colorRotate}
        backgroundColor={bgColorTextCaptcha}
        colorText={textColor}
        placeholder={placeholder}
        captchaContent={captchaContent}
        handleReloadContent={handleReloadCaptcha}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          handleInputChange(event.target.value);
        }}
        correct={(formValue.captcha.value.length > 1 && !formValue.captcha.error)}
      />
    </div>
  );
};
