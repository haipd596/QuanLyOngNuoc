import { FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import _isEmpty from 'lodash/isEmpty';
import React from 'react';

import { MODE_VIEW } from '@packages/constants/modeView';
import { FormViewerStandalone } from '@packages/main/Forms/FormViewer';
import { JsonSchema } from '@packages/schema/schemaModel';
import { TYPE_ACTION } from '../../../type.table';
import '../../styles.scss';

type IProps = {
  action: string;
  dataUpdate?: AnyObject;
  formRef?: React.LegacyRef<FormInstance<any>> | any;
  fieldKeyId: string;
  subSchemaForm: JsonSchema | undefined;
  onFormWatchChange?: (watchedValues: any) => void;
};

export const ViewFieldContent: React.FC<IProps> = ({
  formRef, action, dataUpdate, subSchemaForm, onFormWatchChange,
}) => {
  if (_isEmpty(subSchemaForm)) return <div>Schema Not Support</div>;

  return (
    <div className="wrapper-view-field-table">
      <FormViewerStandalone
        modeView={MODE_VIEW.VIEW}
        formData={action === TYPE_ACTION.EDIT ? dataUpdate : {}}
        schema={subSchemaForm}
        ref={formRef}
        onFormWatchChange={onFormWatchChange}
      />
    </div>
  );
};
