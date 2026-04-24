import ConfigFieldSideBar from '@packages/components/ConfigFieldSideBar';
import { MODE_VIEW } from '@packages/constants/modeView';
import { FormViewerStandalone, IField } from '@packages/main/Forms';
import {
  Button, Col, Modal, Row,
} from 'antd';
import React, { useState } from 'react';

type TConfigAddressColumnProps = {
  defaultValue: IField,
  onChange: (values: any) => void
};

const ConfigAddressColumn = (props: TConfigAddressColumnProps) => {
  const { onChange, defaultValue: fieldConfig } = props;

  const [isOpenConfigUpload, setIsOpenConfigUpload] = useState(false);
  const [activeConfig, setActiveConfig] = useState<any>();

  const handleOpenModal = () => {
    setActiveConfig(fieldConfig);
    setIsOpenConfigUpload(true);
  };

  const handleChangeConfig = (configUpdated: any) => {
    setActiveConfig(configUpdated);
  };

  const handleFieldKeyChange = (value: string) => {
    setActiveConfig((prev: any) => ({
      ...prev,
      key: value,
    }));
  };

  const handleSave = () => {
    setIsOpenConfigUpload(false);
    onChange(activeConfig);
  };

  return (
    <div className="wrapper">
      <Button onClick={handleOpenModal}>Edit address fields</Button>
      <Modal
        open={isOpenConfigUpload}
        onCancel={() => setIsOpenConfigUpload(false)}
        
        style={{ top: 20 }}
        width="100%"
        onOk={handleSave}
      >
        {activeConfig && (
          <Row gutter={8}>
            <Col span={12}>
              <FormViewerStandalone modeView={MODE_VIEW.VIEW} schema={{ fields: [activeConfig] }} />
            </Col>
            <Col span={12}>
              <ConfigFieldSideBar
                activeConfigFieldKey={activeConfig.key}
                fields={[
                  activeConfig,
                ]}
                onChange={handleChangeConfig}
                modeView={MODE_VIEW.EDIT}
                onFieldKeyChange={handleFieldKeyChange}
              />
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default ConfigAddressColumn;
