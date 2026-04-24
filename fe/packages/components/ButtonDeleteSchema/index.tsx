import { JsonSchema } from '@packages/schema/schemaModel';
import { Button, Modal } from 'antd';
import { ButtonProps } from 'antd/lib';
import React from 'react';
import { useDeleteSchemaMutation, useGetFormsQuery } from '~/redux/services/schemaApi';
import { useLanguage } from '../LanguageContext';

type TProps = {
  schemaActive: JsonSchema,
} & ButtonProps;

function ButtonDeleteSchema(props : TProps) {
  const { schemaActive } = props;
  const [deleteSchema] = useDeleteSchemaMutation();
  const { data: listSchemas, isError } = useGetFormsQuery();

  const { translate } = useLanguage();
  const handleDelete = () => {
    Modal.confirm({
      title: translate('popup_title_confirm_delete_1'),
      content: translate('popup_title_confirm_delete_2'),
      okText: translate('delete'),
      okType: 'danger',
      cancelText: translate('cancel'),
      onOk() {
        console.log("schemaActive::", schemaActive)
        if (listSchemas && !isError) {
          console.log("schemaActive::", schemaActive)
          deleteSchema(schemaActive.schemaKey);
        }
      },
    });
  };

  return (
    <div>
      <Button danger type="link" {...props} onClick={handleDelete}>{translate('delete')}</Button>
    </div>
  );
}

export default ButtonDeleteSchema;
