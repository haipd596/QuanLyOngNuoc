import ConfigFieldSideBar from '@packages/components/ConfigFieldSideBar';
import { TUploadColumns } from '@packages/components/View/ViewTable/type.table';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { MODE_VIEW } from '@packages/constants/modeView';
import { FormViewerStandalone } from '@packages/main/Forms';
import { ConfigBasic } from '@packages/schema/fields/fieldConfig';
import { Field } from '@packages/schema/fields/fieldModel';
import {
  Button, Col, Modal, Row,
  Switch,
} from 'antd';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { defaultAccept } from '../ConfigOptionAcceptUpload/constants';

export type TConfigUploadColumnsProps = {
  fieldSchema: Field,
  onSave: (value: any) => any
};

const ConfigUploadColumns = (props: TConfigUploadColumnsProps) => {
  const { onSave, fieldSchema } = props;
  const defaultValue = _get(fieldSchema, 'componentPropsAllowConfig.uploadColumns.props.defaultValue', {}) as TUploadColumns;
  const {
    isShowSelectFile, isShowUpload, configUpload,
    configSelectFile, isMulti, isShowUploadSignature,
  } = defaultValue;

  const [isOpenConfigUpload, setIsOpenConfigUpload] = useState(false);
  const [activeConfig, setActiveConfig] = useState<any>();

  const handleChangeConfig = (configUpdated: any) => {
    setActiveConfig(configUpdated);
  };

  const handleChangeEnableUpload = (value: boolean) => {
    onSave({
      ...defaultValue,
      isShowUpload: value,
    });
  };

  const handleChangeIsMulti = (value: boolean) => {
    onSave({
      ...defaultValue,
      isMulti: value,
    });
  };

  const handleChangeEnableSelect = (value: boolean) => {
    onSave({
      ...defaultValue,
      isShowSelectFile: value,
    });
  };

  const handleChangeEnableSign = (value: boolean) => {
    onSave({
      ...defaultValue,
      isShowUploadSignature: value,
    });
  };

  const handleSave = () => {
    if (activeConfig.fieldName === FIELD_NAME.UPLOAD) {
      onSave({
        ...defaultValue,
        configUpload: activeConfig,
      });
    }

    if (activeConfig.fieldName === FIELD_NAME.VIEW_SELECT_FILE) {
      onSave({
        ...defaultValue,
        configSelectFile: activeConfig,
      });
    }
    setIsOpenConfigUpload(false);
  };

  const handleOpenModal = (config: any) => {
    setActiveConfig(config);
    setIsOpenConfigUpload(true);
  };

  const transformData = (_configUpload: any) => {
    const __cloned = _cloneDeep(_configUpload);
    const accept = _get(__cloned, 'componentPropsAllowConfig.accept.props.defaultValue');
    if (_isEmpty(accept)) {
      __cloned.componentPropsAllowConfig.accept = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CONFIG_SELECT_ACCEPT_UPLOAD,
        props: {
          defaultValue: defaultAccept,
        },
        path: 'componentPropsAllowConfig.accept',
      });
    }

    return __cloned;
  };

  return (
    <>
      <p>
        <Switch value={isShowUpload} onChange={handleChangeEnableUpload} />
        {isShowUpload && (
          <Button
            onClick={() => handleOpenModal(transformData(configUpload))}
            type="link"
          >
            Edit upload config
          </Button>
        )}
      </p>
      <p>
        <Switch value={isShowSelectFile} onChange={handleChangeEnableSelect} />
        {isShowSelectFile && (
          <Button
            onClick={() => handleOpenModal(configSelectFile)}
            type="link"
          >
            Edit select file
          </Button>
        )}
      </p>
      <p>
        <Switch value={isShowUploadSignature} onChange={handleChangeEnableSign} />
        {isShowUploadSignature && (
          <Button
            onClick={() => handleOpenModal(configSelectFile)}
            type="link"
          >
            Edit upload file signature
          </Button>
        )}
      </p>
      <p>
        The result from file buttons will be:
        {' '}
        <Switch value={isMulti} checkedChildren="both of them" unCheckedChildren="one of them" onChange={handleChangeIsMulti} />
      </p>
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
              />
            </Col>
          </Row>
        )}
      </Modal>
    </>
  );
};

export default ConfigUploadColumns;
