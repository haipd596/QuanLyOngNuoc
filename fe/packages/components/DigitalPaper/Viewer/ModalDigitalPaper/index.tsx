/* eslint-disable no-eval */
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { TModeView } from '@packages/@types';
import { SPECIFIC_HIDDEN_KEYS_ADDRESS, SPECIFIC_HIDDEN_KEYS_NORMAL } from '@packages/components/View/ButtonSyncDataToKhai/Viewer/transform.helper';
import { cleanObjectDeep, recursiveGetData } from '@packages/components/View/ViewSelect/recursiveGetData';
import { COLUMN_REFERENCES, FE_KEY, TABLE_NAME_KHOANG_SAN_REF } from '@packages/constants/commons';
import { FIELD_NAME, SPECIAL_SERVER_PAYLOAD_KEY } from '@packages/constants/fields';
import { FormViewerStandalone, JsonSchema } from '@packages/main/Forms';
import { createButtonSyncDataToKhaiField } from '@packages/schema/fields/ButtonSyncDataToKhaiField';
import { createViewInfoHiddenField } from '@packages/schema/fields/ViewInfoHiddenField';
import { flattenFieldsInSchema, generateFeKey } from '@packages/utils';
import { convertDayjsToString, stringToFunc } from '@packages/utils/common';
import { KEY_OVERRIDE } from '@packages/utils/constantKeyOverride';
import { formManagers } from '@packages/utils/formManager';
import { observableTableRefChange } from '@packages/utils/observable';
import { parseFormError } from '@packages/utils/parseFormError';
import { randomString } from '@packages/utils/radomString';
import { isDetailsMode } from '@packages/utils/viewMode';
import {
  Button, Flex, message, Modal,
  ModalProps,
} from 'antd';
import { FormInstance } from 'antd/lib';
import _ from 'lodash';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import {
  useEffect, useMemo, useRef,
  useState,
} from 'react';
import ThemeProvider from '~/components/ThemeProvider';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { selectActiveFields, setActiveGiayToId, setIsDuThao } from '~/redux/slices';
import './style.scss';

type TDigitalPaperViewerProps = {
  subForm: JsonSchema,
  modeView: TModeView,
  onSubmit?: (values: any) => void,
  onValuesChange?: (values: any) => void,
  value?: any,
  isOpen: boolean,
  isDuThao?: boolean,
  existedFiles?: any,
  ThuTuc2GiayToId?: any,
  giayToId?: string,
  setIsOpen: (value: boolean) => void,
  isShowButtonTraCuu?: boolean
} & ModalProps;

const ModalDigitalPaper = (props: TDigitalPaperViewerProps) => {
  const {
    subForm,
    modeView,
    onSubmit,
    value,
    isOpen,
    setIsOpen,
    existedFiles,
    ThuTuc2GiayToId,
    loading,
    isDuThao,
    giayToId,
    isShowButtonTraCuu,
    ...rest
  } = props;
  const [formData, setFormData] = useState(_get(value, 'file.originalData', {}));
  const [flattenFields, setFlattenFields] = useState<any>([]);

  const allField = useAppSelector(selectActiveFields);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsDuThao(isDuThao));
  }, [dispatch, isDuThao]);

  useEffect(() => {
    const flattened = flattenFieldsInSchema(allField);
    setFlattenFields(flattened);
  }, [allField]);

  const formRef:any = useRef<FormInstance>(null);

  useEffect(() => {
    if (isOpen) {
      if (giayToId) dispatch(setActiveGiayToId(giayToId as any));
    } else {
      dispatch(setActiveGiayToId(undefined));
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (giayToId) {
        formManagers.remove(giayToId);
      }
    };
  }, [giayToId]);

  const handleCancel = () => {
    setIsOpen(false);

    if (formRef.current) {
      if (_isEmpty(formData)) { // if not yet submit
        const allKeys = Object.keys(formRef.current.getFieldsValue());
        const keyToReset = allKeys.filter((key) => !SPECIAL_SERVER_PAYLOAD_KEY.includes(key));
        formRef.current?.resetFields(keyToReset);
      } else { // init data if has
        formRef.current?.setFieldsValue(formData);
      }
    }
  };

  const schema = useMemo(() => {
    // const params = new URL(window.location.href).searchParams;
    // const hsid = params.get('hsid');
    if (isDuThao) {
      return {
        ...subForm,
        fields: [
          createButtonSyncDataToKhaiField(),
          createViewInfoHiddenField(),
        ].concat(subForm.fields),
      };
    }

    return {
      ...subForm,
      fields: [
        createViewInfoHiddenField(),
        // createViewButtonTraCuuGiayPhepField(),
        // createButtonSyncDataToKhaiField(),
      ].concat(subForm.fields),
      // fields: subForm.fields,
    };
  }, [subForm, isDuThao]);

  const transformDataByInputFunction = (data: any) => {
    const clonedData = _cloneDeep(data);

    const dataAfterConverted = convertDayjsToString(clonedData);
    const getStringFunc = _get(clonedData, FIELD_NAME.INPUT_FUNCTION);
    const { func } = stringToFunc(getStringFunc);
    if (func) {
      const getResultInFunc = func(dataAfterConverted);
      if (getResultInFunc && ((typeof getResultInFunc !== 'string'))) {
        return getResultInFunc;
      }
    }
    return dataAfterConverted;
  };

  const submitRootForm = async () => {
    try {
      const data = await formRef.current?.validateFields();

      return data;
    } catch (error: any) {
      console.error('handleSubmit', error);

      if (error?.errorFields && Array.isArray(error.errorFields) && error.errorFields.length > 0) {
        const firstError = error.errorFields[0];
        const nameError = firstError?.name?.[0] || 'Unknown Field';
        const errors = firstError?.errors?.join(', ') || 'Unknown Error';

        // const flattenFields = flattenFieldsInSchema(allField);

        const formItemConfig = flattenFields.find((field: any) => {
          const configKey = field?.formItemPropsAllowConfig?.serverPayloadKey?.props?.defaultValue;
          const configKeySpecial = field?.componentPropsAllowConfig?.serverPayloadKey?.props?.defaultValue;

          return configKey || configKeySpecial === nameError;
        });

        if (formItemConfig.fieldName === FIELD_NAME.TABLE) {
          const targetError = error?.errorFields[0].name.map((obj: any) => obj);
          const targetField = formItemConfig.key;
          if (targetError[0] === targetField) {
            message.error('Bảng chưa nhập dữ liệu');
          }
        }
        
        const labelExisted = formItemConfig?.formItemPropsAllowConfig?.label?.props?.defaultValue || 'Vui lòng nhập đầy đủ thông tin!';
        const labelNoExist = formItemConfig
          ?.componentPropsAllowConfig?.labelError?.props?.defaultValue;
        const showError = labelNoExist ? `${labelNoExist}: ${errors}` : labelExisted;
        message.error(showError);
      }
      throw new Error(error);
    }
  };

  const submitChildrenForm = async () => {
    const allKeys = schema.fields.map(({ key }) => key);

    const allKeysFlattens: string[] = [];
    allKeys.forEach((key) => {
      const fieldSchemaInToggle = flattenFieldsInSchema(allField, key);
      allKeysFlattens.push(..._map(fieldSchemaInToggle, 'key'));
    });

    const _formChildren = Object.keys(formManagers.items).reduce((acc, cur) => {
      if (allKeysFlattens.includes(cur) || allKeys.includes(cur)) {
        acc[cur] = formManagers.items[cur];
      }

      return acc;
    }, {} as any);

    if (!_isEmpty(_formChildren)) {
      try {
        await Promise.all(
          Object.values(_formChildren).map((func: any) => func.validateFields()),
        );
      } catch (error: any) {
        const errorMsg = parseFormError(error, flattenFields);
        if (errorMsg) message.error(errorMsg);
        throw new Error(error);
      }
    }
  };

  const handleExport = async () => {
    try {
      const [, data] = await Promise.all([submitChildrenForm(), submitRootForm()]);
      const _data = transformDataByInputFunction(data);
      if (_data.ThongTinChung_BoSung && !Array.isArray(_data.ThongTinChung_BoSung)) {
        _data.ThongTinChung_BoSung = [_data.ThongTinChung_BoSung];
      }

      const cleanedDataExport = Object.keys(_data).reduce((acc, cur) => {
        const valueData = recursiveGetData(_data, cur);
        if (valueData != null) {
          acc[cur] = cleanObjectDeep(
            valueData,
            SPECIFIC_HIDDEN_KEYS_ADDRESS,
            SPECIFIC_HIDDEN_KEYS_NORMAL,
          );
        }
        return acc;
      }, {} as any);
      eval(`callExportData(${JSON.stringify({
        ...cleanedDataExport, existedFiles, ThuTuc2GiayToId, formId: giayToId,
      })})`);
      setFormData(data);
      return formData;
    } catch (error: any) {
      console.error('handleExport', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      const [, data] = await Promise.all([submitChildrenForm(), submitRootForm()]);

      // const _data = transformDataByInputFunction(data);
      const _data = transformDataByInputFunction(data);

      if (_data.ThongTinChung_BoSung && !Array.isArray(_data.ThongTinChung_BoSung)) {
        _data.ThongTinChung_BoSung = [_data.ThongTinChung_BoSung];
      }

      const cleanedDataSubmit = Object.keys(_data).reduce((acc, cur) => {
        const valueData = recursiveGetData(_data, cur);
        if (valueData != null) {
          acc[cur] = cleanObjectDeep(
            valueData,
            SPECIFIC_HIDDEN_KEYS_ADDRESS,
            SPECIFIC_HIDDEN_KEYS_NORMAL,
          );
        }
        return acc;
      }, {} as any);

      const fileNodeObject = await eval(`callbackLuuToKhai(${JSON.stringify({ ...cleanedDataSubmit, existedFiles, ThuTuc2GiayToId })})`);

      const values = {
        formData: _data,
        originalData: data,
        fileNodeObject: [_get(fileNodeObject, 'Data.0', {})],
        previewFile: _get(fileNodeObject, 'previewFile', ''),
      };

      setIsOpen(false);
      if (onSubmit) {
        onSubmit(values);
        setFormData(data);
      }
    } catch (error) {
      console.info('🚀 ~ handleSubmit ~ error:', error);
    }
  };

  useEffect(() => {
    if (formRef.current && isOpen && !isDuThao) {
      try {
        const parent = formRef.current.nativeElement?.childNodes?.[0]?.firstChild;
        /**
         * Regex determine what is form title
         *
         * "1. Vị trí công trình thăm dò" => false
         * "Nội dung xin cấp phép" => true
         */

        const formTitleEl = parent.querySelector('.view-mode-only > div');
        if (formTitleEl) {
          const title = formTitleEl.querySelector('.custom-text');
          const isFormTitle = /^[0-9]\./.test(title.querySelector('span')?.innerText);

          if (isFormTitle) {
            formTitleEl.style.fontSize = '24px';
            formTitleEl.style.fontWeight = 'bold';
            formTitleEl.style.color = '#2E3B32';
            formTitleEl.style.backgroundColor = '#E8F5E9';
            formTitleEl.style.padding = '12px';
            formTitleEl.style.borderLeft = '4px solid #81C784';
            formTitleEl.style.borderRadius = '4px';
            formTitleEl.style.textTransform = 'uppercase';
            formTitleEl.style.textAlign = 'center';
          }
        }
      } catch (error) {
        console.error('modified title was error', error);
      }
    }
  }, [isOpen]);

  const handleAutoFill = () => {
    /**
     * INPUT ONLY FOR PARENT FORM
     */
    const allInputs = _.filter(schema.fields, (field) => {
      return field.fieldName === FIELD_NAME.INPUT || field.fieldName === FIELD_NAME.TEXTAREA;
    });
    allInputs.forEach((cur) => {
      const serverPayloadInputKey = _.get(cur, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue');

      if (![
        ...Object.values(KEY_OVERRIDE),
        ...SPECIAL_SERVER_PAYLOAD_KEY].includes(
        serverPayloadInputKey,
      )) {
        if (serverPayloadInputKey.toLowerCase().includes('email')) {
          formRef.current?.setFieldValue(
            serverPayloadInputKey,
            `${serverPayloadInputKey}@autofill.com`,
          );
        } else {
          formRef.current?.setFieldValue(
            serverPayloadInputKey,
            `${serverPayloadInputKey} [Auto filled]`,
          );
        }
      }
    });

    /**
     * INPUT ONLY FOR GROUP FIELD FORM
     */
    Object.keys(formManagers.items).forEach((key) => {
      if (key.includes(FIELD_NAME.GROUP_FIELDS)) {
        Object.keys(formManagers.getItem(key)?.getFieldsValue()).forEach((keyInput) => {
          if (![...Object.values(KEY_OVERRIDE), ...SPECIAL_SERVER_PAYLOAD_KEY].includes(keyInput)) {
            const inputField = _.get(_.find(flattenFields, (item) => _.get(item, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue') === keyInput), 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue');
            if (keyInput.includes('#cb#')) {
              formManagers.getItem(key)?.setFieldValue(keyInput, true);
            } else if (inputField) {
              if (keyInput.toLowerCase().includes('email')) {
                formManagers.getItem(key)?.setFieldValue(keyInput, `${keyInput}@autofill.com`);
                return;
              }

              const defaultValue = {
                TinhId: 5,
                TinhIdHidden: '{"label":"Thành phố Hà Nội","value":5}',
                HuyenId: 69,
                HuyenIdHidden: '{"label":"Quận Hoàn Kiếm","value":69}',
                XaId: 796,
                XaIdHidden: '{"label":"Phường Đồng Xuân","value":796}',
                thongTinChiTiet: 'thongTinChiTiet',
              };

              Object.keys(defaultValue).forEach((_key) => {
                formManagers.getItem(key)?.setFieldValue(
                  _key,
                  (defaultValue as any)[_key],
                );
              });
              formManagers.getItem(key)?.setFieldValue(keyInput, `${keyInput} [Auto filled]`);
            }
          }
        });
      }
    });

    /**
     * INPUT ONLY FOR TABLE FORM
     */
    Object.keys(formManagers.items).forEach((key) => {
      // if (key.includes(FIELD_NAME.TAB)) {
      Object.keys(formManagers.getItem(key)?.getFieldsValue()).forEach((keyInput) => {
        const field = _.find(flattenFields, (item) => _.get(item, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue') === keyInput);

        if (
          _.get(field, 'fieldName') === FIELD_NAME.TABLE
          && !TABLE_NAME_KHOANG_SAN_REF.includes(_.get(field, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'))
        ) {
          const columns = _.get(field, 'componentPropsAllowConfig.columns.props.defaultValue', []).reduce((acc: any, cur: any) => {
            if (_.get(cur, 'dataIndex') === COLUMN_REFERENCES) {
              acc[COLUMN_REFERENCES] = _.get(cur, 'columnReferenceType.props.defaultValue', '');
            } else {
              acc[_.get(cur, 'dataIndex')] = `${_.get(cur, 'dataIndex')} [Auto filled]`;
              acc.key = randomString(10);
            }
            acc[FE_KEY] = generateFeKey(keyInput, 0);
            return acc;
          }, {});

          observableTableRefChange.notifyByKey(keyInput, [columns]);
        }
      });
      // }
    });
  };

  return (
    <Modal
      open={isOpen}
      width="90vw"
      onCancel={handleCancel}
      style={{ top: 60 }}
      forceRender
      rootClassName="viewer-subform"
      footer={!isDetailsMode(modeView) && (
        <ThemeProvider currentTheme={subForm.currentTheme}>
          <Flex justify="center" gap={8}>
            <Button onClick={handleCancel} icon={<LeftOutlined />}>Quay lại</Button>
            <Button onClick={handleExport} type="primary">{isDuThao ? 'Xuất dự thảo' : 'Xuất tờ khai'}</Button>
            <Button onClick={handleSubmit} type="primary" iconPosition="end" icon={<RightOutlined />}>Tiếp tục</Button>
          </Flex>
        </ThemeProvider>
      )}
      zIndex={2000}
      maskClosable={false}
      {...rest}
    >
      <div className="title_modal_digitalpaper">{value.name}</div>
      <>
        <Button onClick={handleAutoFill} style={{ display: 'none' }} id="autofill">
          Auto fill
        </Button>
        <FormViewerStandalone
          id={giayToId}
          formData={formData}
          modeView={modeView}
          schema={schema}
          ref={(ref: any) => {
            if (!formRef.current && giayToId) {
              formManagers.add({ [giayToId]: ref }, isDuThao);
              formRef.current = ref;
            }
          }}
        />
      </>
    </Modal>
  );
};

export default ModalDigitalPaper;
