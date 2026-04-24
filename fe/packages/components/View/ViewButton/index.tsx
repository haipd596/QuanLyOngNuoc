import { FIELD_NAME } from '@packages/constants/fields';
import { flattenFieldsInSchema } from '@packages/utils';
import { onValidateFileThanhPhanHoSoQuyDinh, onValidateThanhPhanHoSoKhac, stringToFunc } from '@packages/utils/common';
import { formManagers } from '@packages/utils/formManager';
import { omitRedundantFieldProps } from '@packages/utils/omitProps';
import { parseFormError } from '@packages/utils/parseFormError';
import { ButtonProps, Form, message } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import Button, { ButtonType } from 'antd/es/button';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import React, { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveFields, selectTrangThaiHoSoId } from '~/redux/slices';

export interface ViewButtonProps extends ButtonProps {
  buttonType: ButtonType,
  buttonContent: string,
  individualStyle?: {
    buttonColor: string,
    buttonTextColor: string,
  },
  callBackFunctionName?: string
  onClick?: (values: any) => void;
  onOpenModal?: () => void;
  icon?: string | React.ReactNode;
  fieldKey?: string;
}

function ViewButton(props: ViewButtonProps) {
  const {
    buttonContent, buttonType, individualStyle, htmlType,
    callBackFunctionName, onClick, onOpenModal, icon, fieldKey, ...rest
  } = props;

  const [flattenFields, setFlattenFields] = useState<any>([]);

  const allField = useAppSelector(selectActiveFields);

  const trangThaiHoSoId = useAppSelector(selectTrangThaiHoSoId);

  useEffect(() => {
    const flattened = flattenFieldsInSchema(allField);
    setFlattenFields(flattened);
  }, [allField]);

  const formRoot = Form.useFormInstance();

  const style = useMemo(() => {
    if (_isEmpty(individualStyle)) return {};

    const { buttonColor, buttonTextColor, ...restStyle } = individualStyle;

    return {
      backgroundColor: buttonColor,
      color: buttonTextColor,
      ...restStyle,
    };
  }, [individualStyle]);

  const submitRootForm = async () => {
    try {
      const results = await formRoot.validateFields();

      return results;
    } catch (error: any) {
      const errorMsg = parseFormError(error, flattenFields);
      if (errorMsg) message.error(errorMsg);
      throw new Error(error);
    }
  };

  const submitChildrenForm = async () => {
    if (!_isEmpty(formManagers.items)) {
      try {
        await Promise.all(Object.values(formManagers.items).map((func) => func.validateFields()));
      } catch (error: any) {
        const errorMsg = parseFormError(error, flattenFields);
        if (errorMsg) message.error(errorMsg);
        throw new Error(error);
      }
    }
  };

  const _htmlType = useMemo(() => {
    if (htmlType === 'submit') return undefined;

    return htmlType;
  }, [htmlType]);

  const handleClick = async () => {
    if (onOpenModal) onOpenModal();

    if (htmlType !== 'submit') {
      try {
        if (callBackFunctionName) {
          // eslint-disable-next-line no-eval
          eval(`${callBackFunctionName}()`);
        }
      } catch (error) {
        console.error(`${callBackFunctionName}`, error);
        message.error('Đã có lỗi xảy ra');
      }
      return;
    }
    try {
      const [, values] = await Promise.all([submitChildrenForm(), submitRootForm()]);
      // Kiểm tra nếu BatBuoc = 1 và File không tồn tại thì hiện thị lỗi
      if (onValidateFileThanhPhanHoSoQuyDinh(values)) {
        return;
      }

      // Validate cho table single
      if (onValidateThanhPhanHoSoKhac(allField, values)) {
        return;
      }

      if (callBackFunctionName) {
        let objValueSubmit: AnyObject = values;
        const getStringFunc = _get(values, FIELD_NAME.INPUT_FUNCTION);
        const { func } = stringToFunc(getStringFunc);
        if (func) {
          const getResultInFunc = func(values);
          if (getResultInFunc && ((typeof getResultInFunc !== 'string'))) {
            objValueSubmit = getResultInFunc;
          }
        }

        // eslint-disable-next-line no-eval
        eval(`${callBackFunctionName}(${JSON.stringify(objValueSubmit)})`);
      }
      if (onClick) {
        onClick(values);
      }
    } catch (error) {
      console.info(error);
    }
  };

  const _icon = useMemo(() => {
    if (typeof icon === 'string' && icon) {
      // eslint-disable-next-line react/no-danger
      return <span dangerouslySetInnerHTML={{ __html: icon }} />;
    }

    return icon;
  }, [icon]);

  const computedButtonContent = useMemo(() => {
    if (trangThaiHoSoId === 7 && fieldKey === 'BUTTON_212') {
      return 'Nộp hồ sơ bổ sung';
    }
    return buttonContent;
  }, [trangThaiHoSoId, fieldKey, buttonContent]);

  return (
    <Button
      block
      {...omitRedundantFieldProps(rest)}
      type={buttonType}
      style={style}
      onClick={handleClick}
      htmlType={_htmlType}
      icon={_icon}
    >
      {computedButtonContent}
    </Button>
  );
}

export default ViewButton;
