/* eslint-disable no-case-declarations */
import { TViewAsyncSelectProps } from '@packages/components/View/ViewAsyncSelect';
import { ViewCheckboxGroupProps } from '@packages/components/View/ViewCheckboxGroup';
import { ViewRadioGroupProps } from '@packages/components/View/ViewRadioGroup';
import { TColumnTableDefaultValue } from '@packages/components/View/ViewTable/type.table';
import { ViewUploadProps } from '@packages/components/View/ViewUpload';
import { ViewDateProps } from '@packages/components/ViewDate';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { asyncCommonConfig } from '@packages/constants/jsonConfig';
import { createAsyncSelectField } from '@packages/schema/fields/AsyncSelectField';
import { createCheckboxGroupField } from '@packages/schema/fields/CheckboxGroup';
import { createDatePickerField } from '@packages/schema/fields/DatePickerField';
import { createDateTimePickerField } from '@packages/schema/fields/DateTimePickerField';
import { createFAddressField } from '@packages/schema/fields/FAddressField';
import { createInputNumberField } from '@packages/schema/fields/InputNumberField';
import { createInputUnitField } from '@packages/schema/fields/InputUnitField';
import { createRadioGroupField } from '@packages/schema/fields/RadioGroupField';
import { createSelectField } from '@packages/schema/fields/SelectField';
import { FORM_TABLE_SUPPORT } from '@packages/schema/fields/TableField/configSchemaTable';
import { createInputAreaField } from '@packages/schema/fields/TextAreaField';
import { createInputField } from '@packages/schema/fields/TextInputField';
import { createUploadField } from '@packages/schema/fields/UploadField';
import { ConfigBasic } from '@packages/schema/fields/fieldConfig';
import { Field } from '@packages/schema/fields/fieldModel';
import { InputNumberProps, InputProps, SelectProps } from 'antd';
import vi from '../locales/vi/translation.json';
import { insertJsonToSchema } from './insertJsonToSchema';
import { isValidVietNamEnterpriseTaxCode } from './vietnamTaxCode';

export const transformFieldMatchWithDefinedColumn = (fieldName: string, col: any) => {
  const fieldJson = insertJsonToSchema(fieldName);

  // faddress dont need use key from col
  if (!FORM_TABLE_SUPPORT.includes(fieldName)) {
    fieldJson.key = col.key as string as string;
  }

  fieldJson.uniqId = col.uniqId as string as string;
  fieldJson.formItemPropsReadOnly = {
    label: col.title,
    name: col.dataIndex,
    // rules: [{
    //   required: col.required,
    //   message: col.message,
    //   whitespace: true,
    // }] as any,
  };

  fieldJson.formItemPropsAllowConfig.serverPayloadKey = new ConfigBasic({
    type: CONFIG_BASIC_FIELD_TYPE.STRING,
    props: {
      defaultValue: col.dataIndex,
    },
  });

  if (fieldName === FIELD_NAME.REFERENCES_FIELD) {
    fieldJson.formItemPropsAllowConfig.initFieldData = new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: col.columnReferenceType?.props.defaultValue,
      },
    });

    fieldJson.formItemPropsAllowConfig.hidden = new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: true,
      },
    });
  }

  if (fieldName === FIELD_NAME.INPUT_WITH_UPLOAD) {
    fieldJson.formItemPropsReadOnly = {
      label: col.title,
      name: col.dataIndex,
      // rules: [{
      //   required: col.required,
      //   message: col.message,
      // }] as any,
    };
  }

  if (fieldName === FIELD_NAME.INPUT_NUMBER) {
    fieldJson.formItemPropsReadOnly = {
      label: col.title,
      name: col.dataIndex,
      // rules: [{
      //   required: col.required,
      //   message: col.message,
      // }] as any,
    };
  }

  return fieldJson;
};

/**
 * TODO: Tạo mới các schema config field dựa trên dữ liệu từ columns table
 * Không thể chỉnh sửa các props <Form.Item> do đang lấy mặc định từ columns
 */

export const configFormChildren = (fieldName: string, col: TColumnTableDefaultValue) => {
  const label: string = col.title;

  switch (fieldName) {
    // INPUT
    case FIELD_NAME.INPUT:
      const configInput = createInputField();
      delete configInput.formItemPropsAllowConfig;
      configInput.key = col.key as string as string;
      configInput.uniqId = col.uniqId as string as string;
      configInput.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
          whitespace: true,
        }] as any,
      };

      return new Field<InputProps>({
        ...configInput,
        formItemPropsAllowConfig: {
          serverPayloadKey: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: col.dataIndex,
            },
          }),
          hidden: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
            props: {
              defaultValue: false,
            },
          }),
        },
      });

    case FIELD_NAME.TEXTAREA:
      const configInputTextArea = createInputAreaField();
      delete configInputTextArea.formItemPropsAllowConfig;
      configInputTextArea.key = col.key as string as string;
      configInputTextArea.uniqId = col.uniqId as string as string;
      configInputTextArea.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
          whitespace: true,
        }] as any,
      };
      return new Field<InputProps>({
        ...configInputTextArea,
        formItemPropsAllowConfig: {
          serverPayloadKey: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: col.dataIndex,
            },
          }),
        },
      });

    case FIELD_NAME.PHONE_NUMBER:
      const configInputPhoneNumber = createInputAreaField();
      delete configInputPhoneNumber.formItemPropsAllowConfig;
      configInputPhoneNumber.key = col.key as string as string;
      configInputPhoneNumber.uniqId = col.uniqId as string as string;
      configInputPhoneNumber.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
          whitespace: true,
        }] as any,
      };
      return new Field<InputProps>({
        ...configInputPhoneNumber,
        formItemPropsAllowConfig: {
          serverPayloadKey: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: col.dataIndex,
            },
          }),
        },
      });

    case FIELD_NAME.EMAIL:
      const configInputEmail = createInputAreaField();
      delete configInputEmail.formItemPropsAllowConfig;
      configInputEmail.key = col.key as string as string;
      configInputEmail.uniqId = col.uniqId as string as string;
      configInputEmail.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
          whitespace: true,
        }] as any,
      };
      return new Field<InputProps>({
        ...configInputEmail,
        formItemPropsAllowConfig: {
          serverPayloadKey: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: col.dataIndex,
            },
          }),
        },
      });

    case FIELD_NAME.CMND_NUMBER:
      const configInputCmnd = createInputAreaField();
      delete configInputCmnd.formItemPropsAllowConfig;
      configInputCmnd.key = col.key as string as string;
      configInputCmnd.uniqId = col.uniqId as string as string;
      configInputCmnd.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
          whitespace: true,
        }] as any,
      };
      return new Field<InputProps>({
        ...configInputCmnd,
        formItemPropsAllowConfig: {
          serverPayloadKey: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: col.dataIndex,
            },
          }),
        },
      });
    case FIELD_NAME.MST_NUMBER:
      const configInputMst = createInputAreaField();
      delete configInputMst.formItemPropsAllowConfig;
      configInputMst.key = col.key as string as string;
      configInputMst.uniqId = col.uniqId as string as string;
      configInputMst.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [
          {
            required: col.required,
            message: col.message,
            whitespace: true,
          },
          {
            validator: (_: unknown, value: string) => {
              const v = (value ?? '').trim();
              if (!v) return Promise.resolve();
              if (!isValidVietNamEnterpriseTaxCode(v)) {
                return Promise.reject(new Error(vi.MST_NUMBER_VALIDATE));
              }
              return Promise.resolve();
            },
          },
        ] as any,
      };
      return new Field<InputProps>({
        ...configInputMst,
        formItemPropsAllowConfig: {
          serverPayloadKey: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: col.dataIndex,
            },
          }),
        },
      });

    // SELECT
    case FIELD_NAME.SELECT:
      const configSelect = createSelectField();
      delete configSelect.formItemPropsAllowConfig;
      // configSelect.key = col.uniqId as string;
      configSelect.key = col.key as string as string;
      configSelect.uniqId = col.uniqId as string as string;
      configSelect.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };
      configSelect.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };
      return new Field<SelectProps>(configSelect as any);

    // ASYNC_SELECT
    case FIELD_NAME.ASYNC_SELECT:
      const configAsyncSelect = createAsyncSelectField();
      delete configAsyncSelect.formItemPropsAllowConfig;
      configAsyncSelect.key = col.key as string as string;
      configAsyncSelect.uniqId = col.uniqId as string as string;
      configAsyncSelect.componentPropsAllowConfig = {
        ...asyncCommonConfig,
        searchQueryKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: 'q',
          },
        }),
        debounceTime: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: 500,
            min: 300,
            max: 800,
          },
        }),
        showSearch: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
          props: {
            defaultValue: true,
          },
        }),
      };
      configAsyncSelect.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };

      configAsyncSelect.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };
      return new Field<Partial<TViewAsyncSelectProps>>(configAsyncSelect);
    // INPUT_NUMBER
    case FIELD_NAME.INPUT_NUMBER:
      const configNumber = createInputNumberField();
      delete configNumber.formItemPropsAllowConfig;
      // configNumber.key = col.uniqId as string;
      configNumber.key = col.key as string as string;
      configNumber.uniqId = col.uniqId as string as string;
      configNumber.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };

      configNumber.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };
      return new Field<InputNumberProps>(configNumber);

    case FIELD_NAME.INPUT_UNIT:
      const configInputUnit = createInputUnitField();
      delete configInputUnit.formItemPropsAllowConfig;
      // configNumber.key = col.uniqId as string;
      configInputUnit.key = col.key as string as string;
      configInputUnit.uniqId = col.uniqId as string as string;
      configInputUnit.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };

      configInputUnit.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };
      return new Field<any>(configInputUnit);

    // DATE_PICKER
    case FIELD_NAME.DATE_PICKER:
      const configDate = createDatePickerField();
      delete configDate.formItemPropsAllowConfig;
      // configDate.key = col.uniqId as string;
      configDate.key = col.key as string as string;
      configDate.uniqId = col.uniqId as string as string;
      configDate.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };

      configDate.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };
      return new Field<Partial<ViewDateProps>>(configDate);

    // DATETIME_PICKER
    case FIELD_NAME.DATETIME_PICKER:
      const configDateTime = createDateTimePickerField();
      delete configDateTime.formItemPropsAllowConfig;
      // configDateTime.key = col.uniqId as string;
      configDateTime.key = col.key as string as string;
      configDateTime.uniqId = col.uniqId as string as string;
      configDateTime.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };

      configDateTime.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };

      return new Field<Partial<ViewDateProps>>(configDateTime);

    // RADIO_GROUP
    case FIELD_NAME.RADIO_GROUP:
      const configRadio = createRadioGroupField();

      delete configRadio.formItemPropsAllowConfig;
      configRadio.key = col.key as string as string;
      configRadio.uniqId = col.uniqId as string as string;
      configRadio.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };

      configRadio.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };

      return new Field<Partial<ViewRadioGroupProps>>(configRadio);

    // CHECKBOX_GROUP
    case FIELD_NAME.CHECKBOX_GROUP:
      const configCheckbox = createCheckboxGroupField();

      delete configCheckbox.formItemPropsAllowConfig;
      // configCheckbox.key = col.uniqId as string;
      configCheckbox.key = col.key as string as string;
      configCheckbox.uniqId = col.uniqId as string as string;
      configCheckbox.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };

      configCheckbox.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };

      return new Field<Partial<ViewCheckboxGroupProps>>(configCheckbox);
    
    // UPLOAD
    case FIELD_NAME.UPLOAD:
      const configCreateUploadField = createUploadField();

      delete configCreateUploadField.formItemPropsAllowConfig;
      // configCreateUploadField.key = col.uniqId as string;
      configCreateUploadField.key = col.key as string as string;
      configCreateUploadField.uniqId = col.uniqId as string as string;
      configCreateUploadField.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };

      configCreateUploadField.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };

      return new Field<Partial<ViewUploadProps>>(configCreateUploadField);

    // INPUT WITH UPLOAD
    case FIELD_NAME.INPUT_WITH_UPLOAD:
      const configInputUploadField = createUploadField();

      delete configInputUploadField.formItemPropsAllowConfig;
      // configCreateUploadField.key = col.uniqId as string;
      configInputUploadField.key = col.key as string as string;
      configInputUploadField.uniqId = col.uniqId as string as string;
      configInputUploadField.formItemPropsReadOnly = {
        label,
        name: col.dataIndex,
        rules: [{
          required: col.required,
          message: col.message,
        }] as any,
      };

      configInputUploadField.formItemPropsAllowConfig = {
        serverPayloadKey: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: col.dataIndex,
          },
        }),
      };

      return new Field<Partial<ViewUploadProps>>(configInputUploadField);

    case FIELD_NAME.F_ADDRESS:
      const addressField = createFAddressField({ uniqId: col.uniqId });

      return addressField;

    case FIELD_NAME.REFERENCES_FIELD:
      const configInputReferences = createInputField({
        formItemPropsAllowConfig: {
          serverPayloadKey: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: col.dataIndex,
            },
          }),
          hidden: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
            props: {
              defaultValue: true,
            },
          }),
          initFieldData: new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.STRING,
            props: {
              defaultValue: col.columnReferenceType?.props.defaultValue,
            },
          }),
        },
        key: col.key,
        uniqId: col.uniqId,
        formItemPropsReadOnly: {
          label,
          name: col.dataIndex,
          rules: [],
        },
      });

      return new Field(configInputReferences);
    default:
      break;
  }
};
