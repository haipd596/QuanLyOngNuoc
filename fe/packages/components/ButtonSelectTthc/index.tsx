import { Button } from 'antd';
import { ButtonProps } from 'antd/lib';
import React from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { setModalSltTthc } from '~/redux/slices';
import { useLanguage } from '../LanguageContext';

type TButtonSelectTthcProps = {
  onClick?: () => void;
  fieldTitle?: string;
  text?: string,
  type?: ButtonProps['type'] | null
} & Omit<ButtonProps, 'type'>;

const ButtonSelectTthc = ({
  onClick, type = 'link', text = 'select-tthc', fieldTitle, ...rest
}: TButtonSelectTthcProps) => {
  const dispatch = useAppDispatch();
  const { translate } = useLanguage();

  const handleOpenModal = async () => {
    // Default schema properties
    dispatch(setModalSltTthc(true))

    if (onClick) {
      onClick();
    }
  };

  return (
    <Button {...rest} type={type as ButtonProps['type']} onClick={handleOpenModal}>{translate(text as any)}</Button>
  );
};

export default ButtonSelectTthc;
