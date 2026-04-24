import { ReloadOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { FC, memo } from 'react';
import './styles.scss';

export interface CaptchaBoxProps {
  backgroundColor: string,
  colorText: string,
  colorRotate: string,
  captchaPosition: string,
  placeholder: string,
  captchaContent: string[];
  handleReloadContent: () => void;
  correct: boolean;
  [key: string]: any;
}

const CaptchaBox: FC<CaptchaBoxProps> = memo(({
  captchaContent,
  colorText,
  colorRotate,
  captchaPosition = 'right',
  backgroundColor,
  handleReloadContent,
  placeholder,
  correct,
  ...rest
}) => {
  const captchaTextArea = (
    <div className="box_captcha">
      <div className="box_captcha_text">
        {captchaContent.map((text, index) => (
          <span
            key={index}
            style={{
              color: colorText,
            }}
          >
            {text}
          </span>
        ))}
      </div>
      <div className="box_icon_captcha">
        <button className="reload-btn" style={{ color: colorRotate }} type="button" onClick={handleReloadContent} aria-label="Reload content">
          <ReloadOutlined style={{ fontSize: 10 }} />
        </button>
      </div>
    </div>
  );

  return (

    <div className="captcha_container">
      {
      captchaPosition === 'right' ? (
        <>
          <Input
            className={correct ? 'correct' : undefined}
            style={{
              background: backgroundColor, width: '100%', maxWidth: 200, textAlign: 'center',
            }}
            placeholder={placeholder}
            {...rest}
          />

          {captchaTextArea}
        </>
      ) : (
        <>
          {captchaTextArea}
          <Input
            className={correct ? 'correct' : undefined}
            style={{
              background: backgroundColor, width: '100%', maxWidth: 200, textAlign: 'center',
            }}
            placeholder={placeholder}
            {...rest}
          />

        </>
      )
     }

    </div>

  );
});

export default CaptchaBox;
