import { MODE_VIEW } from '@packages/constants/modeView';
import { Field, FormViewerStandalone } from '@packages/main/Forms';
import { Col, Modal, Row } from 'antd';
import React from 'react';
import ConfigFieldSideBar from '../ConfigFieldSideBar';

type TModalConfigFieldProps = {
  isOpen: boolean,
  setIsOpen: (value: boolean) => void,
  fieldConfig: Field,
  onChange: (value: any) => void,
  onSave?: (value: any) => void
};

const ModalConfigField = (props: TModalConfigFieldProps) => {
  const {
    isOpen,
    setIsOpen,
    fieldConfig,
    onChange,
    onSave,
  } = props;

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      
      style={{ top: 20 }}
      width="100%"
      onOk={onSave}
    >
      {fieldConfig && (
      <Row gutter={8}>
        <Col span={12}>
          <FormViewerStandalone modeView={MODE_VIEW.VIEW} schema={{ fields: [fieldConfig] }} />
        </Col>
        <Col span={12}>
          <ConfigFieldSideBar
            activeConfigFieldKey={fieldConfig.key}
            fields={[
              fieldConfig,
            ]}
            onChange={onChange}
            modeView={MODE_VIEW.EDIT}
          />
        </Col>
      </Row>
      )}
    </Modal>
  );
};

export default ModalConfigField;
