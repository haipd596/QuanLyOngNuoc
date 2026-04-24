import { Schema } from '@packages/schema/schemaModel';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib';
import React from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { useCreateSchemaMutation } from '~/redux/services/schemaApi';
import { selectSchemas, setSchema } from '~/redux/slices';
import { useLanguage } from '../LanguageContext';

type TButtonCreateSchemaProps = {
  onClick?: () => void;
  fieldTitle?: string;
  text?: string,
  type?: ButtonProps['type'] | null
} & Omit<ButtonProps, 'type'>;

const ButtonCreateSchema = ({
  onClick, type = 'link', text = 'create_form', fieldTitle, ...rest
}: TButtonCreateSchemaProps) => {
  const [handleCreateSchema] = useCreateSchemaMutation();
  const dispatch = useAppDispatch();
  const schemas = useAppSelector(selectSchemas);
  const { translate } = useLanguage();

  const handleCreateNewOne = async () => {
    // Default schema properties
    const emptySchema = Schema.output(new Schema({
      title: fieldTitle ?? `Untitled Form ${schemas.length + 1}`,
      type: 'object',
      fields: [],
      layout: 'vertical',
    }));

    const { data, error } = await handleCreateSchema(emptySchema);

    if (!error) {
      dispatch(setSchema(Schema.reconcile(data)));
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <Button {...rest} type={type as ButtonProps['type']} onClick={handleCreateNewOne}>{translate(text as any)}</Button>
  );
};

export default ButtonCreateSchema;
