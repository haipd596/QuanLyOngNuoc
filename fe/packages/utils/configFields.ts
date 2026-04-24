import {
  ConfigArray,
  ConfigCheckbox,
  ConfigCodeBlock,
  ConfigInput,
} from '@packages/components/Config';
import ConfigAddDataFromSource from '@packages/components/Config/ConfigAddDataFromSource';
import ConfigAddressColumn from '@packages/components/Config/ConfigAddressColumn';
import ConfigAsyncAction from '@packages/components/Config/ConfigAsyncAction';
import ConfigChangeServerPayloadKey from '@packages/components/Config/ConfigChangeServerPayloadKey';
import ConfigColor from '@packages/components/Config/ConfigColorPicker';
import ConfigDatePicker from '@packages/components/Config/ConfigDatePicker';
import ConfigDateTimePicker from '@packages/components/Config/ConfigDateTimePicker';
import ConfigForReferencesColumn from '@packages/components/Config/ConfigForReferencesColumn';
import ConfigHideIfBlock from '@packages/components/Config/ConfigHideIf';
import ConfigHtmlViewerEditor from '@packages/components/Config/ConfigHtmlViewerEditor';
import ConfigNumberColumns from '@packages/components/Config/ConfigNumberColumns';
import ConfigOptionAcceptUpload from '@packages/components/Config/ConfigOptionAcceptUpload';
import ConfigOptionSelect from '@packages/components/Config/ConfigOptionSelect';
import ConfigRadio from '@packages/components/Config/ConfigRadio';
import ConfigSelectGroupColumn from '@packages/components/Config/ConfigSelectGroupColumn';
import ConfigSelectWrapperColumn from '@packages/components/Config/ConfigSelectWrapperColumn';
import ConfigUploadColumns from '@packages/components/Config/ConfigUploadColumns';
import { CONFIG_ADVANCE_FIELD_TYPE, CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { ConfigBasic } from '@packages/schema/fields/fieldConfig';
import {
  Checkbox, InputNumber, Select,
} from 'antd';
import { defineComponent } from './common';
import { insertJsonToSchema } from './insertJsonToSchema';

export const isConfigBasicType = (type: string) => (
  Object.values(CONFIG_BASIC_FIELD_TYPE).includes(type)
);

export const isConfigAdvanceType = (type: string) => (
  Object.values(CONFIG_ADVANCE_FIELD_TYPE).includes(type)
);

export const CONFIG_FIELDS = {
  // [ ] Style these configuration
  [CONFIG_BASIC_FIELD_TYPE.STRING]: ConfigInput,
  [CONFIG_BASIC_FIELD_TYPE.NUMBER]: InputNumber,
  [CONFIG_BASIC_FIELD_TYPE.SELECT]: (props: any) => {
    return defineComponent(Select, {
      ...props,
      // filterSort: (optionA: any, optionB: any) => (optionA?.label ?? '').
      // toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase()),
      showSearch: true,
      optionFilterProp: 'label',
    });
  },
  [CONFIG_BASIC_FIELD_TYPE.BOOLEAN]: ConfigCheckbox,
  [CONFIG_BASIC_FIELD_TYPE.ARRAY]: ConfigArray,
  [CONFIG_BASIC_FIELD_TYPE.REGEX]: ConfigInput,
  [CONFIG_BASIC_FIELD_TYPE.CODE]: ConfigCodeBlock,
  [CONFIG_BASIC_FIELD_TYPE.CALCULABLE]: ConfigCodeBlock,
  [CONFIG_BASIC_FIELD_TYPE.HIDE_IF]: ConfigHideIfBlock,
  [CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER]: ConfigColor,
  [CONFIG_BASIC_FIELD_TYPE.RADIO]: ConfigRadio,
  [CONFIG_BASIC_FIELD_TYPE.DATEPICKER]: ConfigDatePicker,
  [CONFIG_BASIC_FIELD_TYPE.DATETIMEPICKER]: ConfigDateTimePicker,
  [CONFIG_BASIC_FIELD_TYPE.ASYNC_ACTION]: ConfigAsyncAction,
  [CONFIG_BASIC_FIELD_TYPE.CHECKBOX]: Checkbox,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_SELECT_COLUMN]: ConfigSelectWrapperColumn,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_UPLOAD_COLUMNS]: ConfigUploadColumns,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_SELECT_GROUP_COLUMN]: ConfigSelectGroupColumn,
  // [CONFIG_BASIC_FIELD_TYPE.SELECT]: Select,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_HTML_VIEWER]: ConfigHtmlViewerEditor,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_NUMBER_COLUMNS]: ConfigNumberColumns,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_ADDRESS_COLUMNS]: ConfigAddressColumn,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_CHANGE_SERVER_PAYLOAD_KEY]: ConfigChangeServerPayloadKey,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_ADD_DATA_FORM_SOURCE]: ConfigAddDataFromSource,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_OPTION_FOR_SELECT]: ConfigOptionSelect,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_OPTION_FOR_REFERENCE_COLUMN]: ConfigForReferencesColumn,
  [CONFIG_BASIC_FIELD_TYPE.CONFIG_SELECT_ACCEPT_UPLOAD]: ConfigOptionAcceptUpload,
};

export const getFieldConfigInSelectColumnDataType = (fieldName: string) => {
  const fieldConfig = insertJsonToSchema(fieldName);

  const configs = {
    [FIELD_NAME.F_ADDRESS]: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.CONFIG_ADDRESS_COLUMNS,
      props: {
        defaultValue: {
          fieldName: FIELD_NAME.F_ADDRESS,
          componentPropsAllowConfig: fieldConfig.componentPropsAllowConfig,
          key: fieldConfig.key,
        },
      },
    }),
    // [FIELD_NAME.REFERENCES_FIELD]: new ConfigBasic({
    //   type: CONFIG_BASIC_FIELD_TYPE.CONFIG_OPTION_FOR_REFERENCE_COLUMN,
    //   props: {
    //     defaultValue: FIELD_NAME.REFERENCES_FIELD,
    //     referencesArray: fieldName,
    //     uniqId: generateUniqIdConfigArray(),
    //   },
    // }),
  };

  return configs[fieldName];
};
