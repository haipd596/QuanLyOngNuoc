import { FormInstance } from 'antd';
import React from 'react';

import { MODE_VIEW } from '@packages/constants/modeView';
import { IField } from '@packages/main/Forms';
import { FormViewerEmbedWithBuilder } from '@packages/main/Forms/FormViewer';
import '../../styles.scss';

type IProps = {
  formRef?: React.LegacyRef<FormInstance<any>> | any;
  subForm: IField['subForm']
};

export const BuilderFieldContent: React.FC<IProps> = ({ formRef, subForm }) => {
  if (!subForm) return null;

  return (
    <div className="wrapper-view-field-table">
      <FormViewerEmbedWithBuilder
        modeView={MODE_VIEW.VIEW}
        schema={subForm}
        ref={formRef}
      />
    </div>
  );
};
