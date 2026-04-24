import { defaultAccept } from '@packages/components/Config/ConfigOptionAcceptUpload/constants';
import { DIGITALPAPER_TOOLTIP } from '@packages/components/DigitalPaper/constant';
import { FORM_CONFIG } from '@packages/constants/commons';
import { CONFIG_BASIC_FIELD_TYPE } from '@packages/constants/fields';
import { MODE_VIEW } from '@packages/constants/modeView';
import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { ConfigBasic } from '@packages/schema/fields/fieldConfig';
import { Form, Tooltip } from 'antd';
import { useForm } from 'antd/es/form/Form';
import _cloneDeep from 'lodash/cloneDeep';
import _flatten from 'lodash/flatten';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _set from 'lodash/set';
import { useEffect, useMemo, useState } from 'react';
import { TUploadColumns } from '../ViewTable/type.table';
import Signature from './Signature';
import './styles.scss';

type TFileButtonGroupProps = {
  onChange: (value: any) => void,
  uploadColumns: TUploadColumns,
  value: any,
  extraActions?: any[],
  required?: boolean,
  indexEachLine?: number;
  targetFieldKey?: string;
};

const FileButtonGroup = (props: TFileButtonGroupProps) => {
  const {
    uploadColumns,
    onChange,
    value,
    extraActions,
    required,
    indexEachLine,
    targetFieldKey,
  } = props;
  const {
    configSelectFile,
    configUpload,
    isShowSelectFile,
    isShowUpload,
    isShowUploadSignature,
    configUploadSignature,
    isMulti,
  } = uploadColumns;
  const [file, setFile] = useState(_get(value, 0, {}));
  const [form] = useForm();

  const _configUpload = useMemo(() => {
    const __configUpload = _cloneDeep(configUpload);
    const accept = _get(__configUpload, 'componentPropsAllowConfig.accept.props.defaultValue');

    if (_isEmpty(accept) && __configUpload.componentPropsAllowConfig) {
      __configUpload.componentPropsAllowConfig.accept = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CONFIG_SELECT_ACCEPT_UPLOAD,
        props: {
          defaultValue: defaultAccept,
        },
        path: 'componentPropsAllowConfig.accept',
      });
    }

    if (typeof required === 'boolean') {
      const test = _set(__configUpload, 'formItemPropsAllowConfig.rules.props.defaultValue.0.required', required);

      return { ...test };
    }

    return __configUpload;
  }, [configUpload, required]);

  const _configSelectFile = useMemo(() => {
    if (typeof required === 'boolean') {
      const test = _set(configSelectFile, 'formItemPropsAllowConfig.rules.props.defaultValue.0.required', required);

      return { ...test };
    }

    return configSelectFile;
  }, [configSelectFile, required]);

  const handleChange = (valuesChanged: any, allValuesChange: any) => {
    if (isMulti) {
      const multiFiles = _flatten(Object.keys(allValuesChange).map((key) => allValuesChange[key]));
      onChange(multiFiles);
      return;
    }

    const singleFile = _flatten(Object.keys(valuesChanged).map((key) => valuesChanged[key]));
    const lastFileChange = _get(singleFile, `${singleFile.length - 1}`, []);
    onChange([lastFileChange]);
    setFile(lastFileChange);
    const otherFields = Object.keys(allValuesChange).filter((test) => !valuesChanged[test]);
    form.resetFields(otherFields);

    // --- CẬP NHẬT WINDOW.SIGNFILES TOÀN CỤC ---
    const globalAny = window as any;
    if (!globalAny.signFiles) {
      globalAny.signFiles = [];
    }

    const entry = {
      index: indexEachLine,
      file: lastFileChange?.originFileObj || lastFileChange,
    };

    const existingIndex = globalAny.signFiles.findIndex((it: any) => it.index === indexEachLine);
    if (existingIndex >= 0) {
      globalAny.signFiles[existingIndex] = entry;
    } else {
      globalAny.signFiles.push(entry);
    }

    console.info('[FileButtonGroup] Updated signFiles:', globalAny.signFiles);
  };

  const handleDeleteFile = () => {
    onChange([]);
    setFile(undefined);
  };

  const handleSuccess = (signedFile: any) => {
    onChange([signedFile]);
    setFile(signedFile);
  };

  useEffect(() => {
    if (indexEachLine === undefined || indexEachLine === null) return;

    const globalAny = window as any;

    // Khởi tạo map lưu callback cho từng dòng nếu chưa có
    if (!globalAny._callbackSignUsbTokenMap) {
      globalAny._callbackSignUsbTokenMap = {};
    }

    // Khởi tạo hàm callbackSignUsbToken toàn cục 1 lần
    if (typeof globalAny.callbackSignUsbToken !== 'function') {
      globalAny.callbackSignUsbToken = (signedFile: any, signedIndex: any) => {
        const map = globalAny._callbackSignUsbTokenMap;
        if (map && typeof map[signedIndex] === 'function') {
          map[signedIndex](signedFile);
        } else {
          console.warn(`[callbackSignUsbToken] Không tìm thấy callback cho index ${signedIndex}`);
        }
      };
    }

    // --- Đăng ký callback riêng cho dòng hiện tại ---
    globalAny._callbackSignUsbTokenMap[indexEachLine] = (signedFile: any) => {
      console.info(`[callbackSignUsbToken] Nhận file ký cho dòng ${indexEachLine}:`, signedFile);

      let wrappedFile = signedFile;

      // Nếu callback trả về File gốc JS → wrap lại dạng metadata
      if (signedFile instanceof File) {
        wrappedFile = {
          FileName: signedFile.name,
          NodeId: undefined, // file mới ký, chưa lưu ECS
          Extension: '.' + signedFile.name.split('.').pop(),
          FileSizeInBytes: signedFile.size,
          originFileObj: signedFile,
        };
      }

      onChange([wrappedFile]);
      setFile(wrappedFile);

      console.info(`[FileButtonGroup] Đã cập nhật file ký dòng ${indexEachLine}:`, wrappedFile);
    };

    // --- Cleanup khi component unmount ---
    return () => {
      if (globalAny._callbackSignUsbTokenMap) {
        delete globalAny._callbackSignUsbTokenMap[indexEachLine];
      }
    };
  }, [onChange, indexEachLine, setFile]);

  useEffect(() => {
  if (!_isEmpty(value)) {
    setFile(_get(value, 0));
  }
}, [value]);

  return (
    <Form initialValues={value} onValuesChange={handleChange} layout="inline" form={form} {...FORM_CONFIG} className="file-button-group button-group">
      {!_isEmpty(file) ? (
        <Signature 
          onDelete={handleDeleteFile} 
          file={file} 
          originalFile={file?.originFileObj ?? null} 
          indexFile={indexEachLine} 
          onSigned={handleSuccess} 
          targetFieldKey={targetFieldKey}
        />
      ) : (
        <>
          {isShowUpload && (
            <Tooltip title={DIGITALPAPER_TOOLTIP.UPLOAD_FILE}>
              <div>
                <FieldItem
                  field={_configUpload as any}
                  modeView={MODE_VIEW.VIEW}
                  fieldIndex={0}
                  isNotGrid
                />
              </div>
            </Tooltip>
          )}
          {isShowSelectFile && (
            <Tooltip title={DIGITALPAPER_TOOLTIP.KHO_DU_LIEU}>
              <div>
                <FieldItem
                  field={_configSelectFile as any}
                  modeView={MODE_VIEW.VIEW}
                  fieldIndex={1}
                  isNotGrid
                />
              </div>
            </Tooltip>
          )}
        </>
      )}
      {isShowUploadSignature && (
        <FieldItem
          field={configUploadSignature}
          modeView={MODE_VIEW.VIEW}
          fieldIndex={2}
          isNotGrid
        />
      )}
      {extraActions && extraActions.map((action) => action)}
    </Form>
  );
};

export default FileButtonGroup;
