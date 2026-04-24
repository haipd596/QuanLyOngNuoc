import { generatePath } from "@packages/utils/browseJsonTree/generatePath";
import { FormItemProps, InputProps, SelectProps } from "antd";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import _isBoolean from "lodash/isBoolean";
import _isEmpty from "lodash/isEmpty";
import _isNumber from "lodash/isNumber";
import _isObject from "lodash/isObject";
import _isString from "lodash/isString";
import _set from "lodash/set";

import { ConfigCheckboxProps } from "@packages/components/Config";
import { ConfigColorProps } from "@packages/components/Config/ConfigColorPicker";
import { IPropsValue } from "@packages/components/View/ViewInfo/type";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@packages/constants/date";
import {
  CONFIG_ADVANCE_FIELD_TYPE,
  CONFIG_BASIC_FIELD_TYPE,
  FIELD_NAME,
  FIELD_WRAP_IN_FORM,
  HAS_LABEL,
  HAS_PLACEHOLDER,
} from "@packages/constants/fields";
import { getDefaultColumnWrapper } from "@packages/utils/common";
import { isNeedWrapFormItem } from "@packages/utils/fields";
import { UniqId } from "@packages/utils/uniqId";
import { AnyObject } from "antd/es/_util/type";
import dayjs from "dayjs";
import { THEME_CONFIG } from "~/configs/theme.config";
// eslint-disable-next-line import/no-cycle
import { JsonSchema } from "../schemaModel";
import {
  ConfigBasic,
  IConfigBasic,
  TConfigChange,
  TPropConfig,
  TStyleConfig,
} from "./fieldConfig";

export interface IField<T = any, S = any> {
  fieldName: string;
  version: number;
  key: string;
  title?: string;
  initialValue?: IConfigBasic;
  useCalculable?: boolean;
  calculateFnc?: string;
  isShowField?: boolean;
  isNotCompactJsonOutput?: boolean;
  isInCheckBoxToggle?: boolean;
  configChanged?: TConfigChange;

  /**
   * use in info view
   */
  listKeyValueInViewInfo?: IPropsValue[];

  /**
   * use for tabs, columnField, form step
   */
  fieldsInColumnIndex?: {
    columnIndex: number | string;
    fieldKeyCol: string;
  }[];

  extraDataSourceField?: {
    columnIndex: number | string;
    fieldKeyCol: string;
  }[];

  /**
   * Use in table
   */
  subForm?: JsonSchema;

  /**
   * Props for custom/antd component, what you want to config
   */
  componentPropsAllowConfig?: TPropConfig<T> | undefined;
  /**
   * Props for custom/antd component, what you want to see only, not want to CONFIG
   */
  componentPropsReadOnly?: T | undefined;

  /**
   * Props for FormItem component, what you want to config
   * @see https://ant.design/components/form#:~:text=Form.-,Item,-Form%20field%20component
   */
  formItemPropsAllowConfig?: TPropConfig<S> | undefined;
  /**
   * Props for FormItem component, what you want to see only, not want to CONFIG
   * @see https://ant.design/components/form#:~:text=Form.-,Item,-Form%20field%20component
   */
  formItemPropsReadOnly?: S | undefined;

  styleWrapperAllowConfig?: TPropConfig<any> | undefined;

  styleComponentAllowConfig?: TPropConfig<any> | undefined;

  styleLabelAllowConfig?: TPropConfig<any> | undefined;

  parentKey?: string;

  uniqId?: string;
}

export interface IFormItemProps extends FormItemProps {
  wrapperColumnNumber?: number;
  label?: string;
  placeholder?: string;
  help?: string;
  rules?: [];
  isInCheckBoxToggle?: boolean;
}

export class Field<T = any, S = IFormItemProps> implements IField<T, S> {
  fieldName: keyof typeof FIELD_NAME = "NOT_SUPPORT";

  version: number = 0;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  key: string;

  title?: string;

  columnIndex?: any;

  uniqId?: string;

  isShowField?: boolean = true;

  static ids: string[] = [];

  componentPropsAllowConfig?: TPropConfig<T> | undefined;

  componentPropsReadOnly?: T | undefined;

  formItemPropsAllowConfig?: TPropConfig<S> | undefined;

  formItemPropsReadOnly?: S | undefined;

  styleWrapperAllowConfig?: TStyleConfig | undefined;

  styleComponentAllowConfig?: TStyleConfig | undefined;

  stylePropsReadOnly?: any | undefined;

  styleLabelAllowConfig?: TStyleConfig | undefined;

  listKeyValueInViewInfo?: IPropsValue[] | undefined;

  fieldsInColumnIndex?: IField["fieldsInColumnIndex"] = [];

  extraDataSourceField?: IField["extraDataSourceField"] = [];

  subForm?: JsonSchema;

  configChanged: TConfigChange = {};

  isNotCompactJsonOutput: boolean = false;

  parentKey?: string;

  constructor(props: IField<T, S> & AnyObject) {
    Object.assign(this, props);
    this.key = new UniqId(this.fieldName, props.key).key;

    if (
      props.isInCheckBoxToggle &&
      !props.componentPropsAllowConfig?.labelCheckBox
    ) {
      props.componentPropsAllowConfig = {
        ...props.componentPropsAllowConfig,
        labelCheckBox: new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: `Label checkbox for ${this.key}`,
          },
        }),
      } as any;
    }
    this.extendsComponentPropsAllowConfig(
      props.componentPropsAllowConfig || ({} as any),
    );
    this.extendsFormItemPropsAllowConfig(
      props.formItemPropsAllowConfig || ({} as any),
    );
    this.extendsStyleWrapperAllowConfig(
      props.styleWrapperAllowConfig || ({} as any),
    );
    this.extendsStyleComponentAllowConfig(
      props.styleComponentAllowConfig || ({} as any),
    );
    this.extendsStyleLabelAllowConfig(
      props.styleLabelAllowConfig || ({} as any),
    );

    if (
      (this.fieldName === FIELD_NAME.VIEW_INFO ||
        this.fieldName === FIELD_NAME.CHECKBOX_TOGGLE ||
        this.fieldName === FIELD_NAME.VIEW_INVESTOR ||
        this.fieldName === FIELD_NAME.VIEW_INVESTOR_SHORTEN ||
        this.fieldName === FIELD_NAME.VIEW_INVESTOR_PROJECT ||
        this.fieldName === FIELD_NAME.VIEW_INVESTOR_BASE ||
        this.fieldName === FIELD_NAME.VIEW_INVESTOR_BASE_V2 ||
        this.fieldName === FIELD_NAME.VIEW_INVESTOR_TABLE ||
        this.fieldName === FIELD_NAME.CONTENT_PROJECT ||
        this.fieldName === FIELD_NAME.VIEW_INVESTOR_CHECKBOX ||
        this.fieldName === FIELD_NAME.VIEW_INVESTOR_CHECKBOX_V2 ||
        this.fieldName === FIELD_NAME.VIEW_AMENDING_CONTENT ||
        this.fieldName === FIELD_NAME.VIEW_AMENDING_CONTENT_ADVANCE ||
        this.fieldName === FIELD_NAME.VIEW_INVESTMENT_CAPITAL) &&
      !props.listKeyValueInViewInfo
    ) {
      this.listKeyValueInViewInfo = [];
    }
  }

  setIsNotCompactJsonOutput(value: boolean) {
    this.isNotCompactJsonOutput = value;
    return this;
  }

  /**
   * Insert more properties default for each form item
   */
  extendsFormItemPropsAllowConfig(formItemPropsAllowConfig: TPropConfig<S>) {
    if (FIELD_WRAP_IN_FORM.includes(this.fieldName)) {
      if (
        this.fieldName !== FIELD_NAME.VIEW_INFO &&
        this.fieldName !== FIELD_NAME.GROUP_FIELDS
      ) {
        const requiredRule = {
          required: false,
          message: "Chưa nhập dữ liệu",
        };

        const defaultValue = _get(
          formItemPropsAllowConfig,
          "rules.props.defaultValue",
          [],
        ) as any;
        const isExisted = defaultValue?.some(
          (item: any) => item.required !== undefined,
        );

        if (defaultValue.length > 0) {
          if (!isExisted) {
            defaultValue.unshift(requiredRule);
            formItemPropsAllowConfig.rules!.props.defaultValue = defaultValue;
            formItemPropsAllowConfig.rules!.props.isAddable = true;
          }
        } else {
          formItemPropsAllowConfig!.rules = new ConfigBasic({
            type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
            props: {
              defaultValue: [requiredRule],
              isAddable: true,
            },
          });
        }
      }

      if (!formItemPropsAllowConfig.serverPayloadKey) {
        formItemPropsAllowConfig.serverPayloadKey = new ConfigBasic({
          type: CONFIG_BASIC_FIELD_TYPE.CONFIG_CHANGE_SERVER_PAYLOAD_KEY,
          props: {
            defaultValue: this.key,
          },
        });
      }
    }

    if (
      HAS_LABEL.includes(this.fieldName) &&
      !formItemPropsAllowConfig?.label
    ) {
      formItemPropsAllowConfig!.label = new ConfigBasic<InputProps>({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: this.key,
        },
      });
    }

    if (!formItemPropsAllowConfig.initFieldData) {
      const initFieldData = this.buildInitialFieldData();
      formItemPropsAllowConfig.initFieldData = initFieldData;
    }

    if (!formItemPropsAllowConfig?.wrapperColumnNumber) {
      formItemPropsAllowConfig!.wrapperColumnNumber =
        new ConfigBasic<SelectProps>({
          type: CONFIG_BASIC_FIELD_TYPE.CONFIG_SELECT_COLUMN,
          props: {
            defaultValue: getDefaultColumnWrapper(this.fieldName),
          },
        });
    }

    this.formItemPropsAllowConfig = generatePath(
      formItemPropsAllowConfig,
      "formItemPropsAllowConfig",
    );
  }

  /**
   * Insert more properties default for each component
   * @param componentPropsAllowConfig
   */
  extendsComponentPropsAllowConfig(componentPropsAllowConfig: TPropConfig<T>) {
    if (
      HAS_PLACEHOLDER.includes(this.fieldName) &&
      !componentPropsAllowConfig?.placeholder
    ) {
      // Add placeholder for input
      componentPropsAllowConfig!.placeholder = new ConfigBasic<InputProps>({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          // defaultValue: this.key,
          defaultValue: "",
        },
      });
    }
    // Add hideIf
    if (!componentPropsAllowConfig.hideIf) {
      componentPropsAllowConfig.hideIf = new ConfigBasic<SelectProps>({
        type: CONFIG_BASIC_FIELD_TYPE.HIDE_IF,
        props: {
          defaultValue: false,
        },
        useCalculable: true,
      });
    }

    if (
      typeof componentPropsAllowConfig?.isShowInDetailModeView === "undefined"
    ) {
      componentPropsAllowConfig!.isShowInDetailModeView = new ConfigBasic<any>({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: this.fieldName !== FIELD_NAME.CAPTCHA,
        },
      });
    }

    if (typeof componentPropsAllowConfig?.isShowInModeView === "undefined") {
      componentPropsAllowConfig!.isShowInModeView = new ConfigBasic<any>({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
        },
      });
    }

    if (!componentPropsAllowConfig?.disabled) {
      componentPropsAllowConfig!.disabled = new ConfigBasic<SelectProps>({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      });
    }

    this.componentPropsAllowConfig = generatePath(
      componentPropsAllowConfig,
      "componentPropsAllowConfig",
    );
  }

  extendsStyleComponentAllowConfig(styleComponentAllowConfig: TStyleConfig) {
    if (!styleComponentAllowConfig?.className) {
      styleComponentAllowConfig!.className = new ConfigBasic<InputProps>({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: "",
        },
      });
    }

    if (!styleComponentAllowConfig?.id) {
      styleComponentAllowConfig!.id = new ConfigBasic<InputProps>({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: "",
        },
      });
    }
    // Styles for specific fields
    // Button
    if (this.fieldName === FIELD_NAME.BUTTON) {
      if (!styleComponentAllowConfig?.buttonColor) {
        styleComponentAllowConfig!.buttonColor = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
          props: {
            defaultValue: undefined,
          },
        });
      }
      if (!styleComponentAllowConfig?.textAlign) {
        styleComponentAllowConfig!.buttonColor = new ConfigBasic<SelectProps>({
          type: CONFIG_BASIC_FIELD_TYPE.SELECT,
          props: {
            defaultValue: "left",
            options: [
              {
                label: "Left",
                value: "left",
              },
              {
                label: "Center",
                value: "center",
              },
              {
                label: "Right",
                value: "right",
              },
            ],
          },
        });
      }
      if (!styleComponentAllowConfig?.buttonTextColor) {
        styleComponentAllowConfig!.buttonTextColor =
          new ConfigBasic<InputProps>({
            type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
            props: {
              defaultValue: undefined,
            },
          });
      }
      // Fontsize
      if (!styleComponentAllowConfig?.fontSize) {
        styleComponentAllowConfig!.fontSize = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: undefined,
          },
        });
      }
      // Padding
      if (!styleComponentAllowConfig?.padding) {
        styleComponentAllowConfig!.padding = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: undefined,
          },
        });
      }
    }

    // Form Step
    if (this.fieldName === FIELD_NAME.FORM_STEP) {
      if (!styleComponentAllowConfig?.stepButtonColor) {
        styleComponentAllowConfig!.stepButtonColor =
          new ConfigBasic<InputProps>({
            type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
            props: {
              defaultValue: "#1C3C97",
            },
          });
      }

      if (!styleComponentAllowConfig?.stepButtonTextColor) {
        styleComponentAllowConfig!.stepButtonTextColor =
          new ConfigBasic<InputProps>({
            type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
            props: {
              defaultValue: "white",
            },
          });
      }

      // Padding
      if (!styleComponentAllowConfig?.padding) {
        styleComponentAllowConfig!.padding = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: undefined,
            max: 40,
          },
        });
      }
      // Underline Tab Color
      if (!styleComponentAllowConfig?.underlineTabColor) {
        styleComponentAllowConfig!.underlineTabColor =
          new ConfigBasic<InputProps>({
            type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
            props: {
              defaultValue: "#1677ff",
            },
          });
      }

      // Stroke Color
      if (!styleComponentAllowConfig?.progressBar) {
        styleComponentAllowConfig!.progressBar = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
          props: {
            defaultValue:
              THEME_CONFIG[FIELD_NAME.FORM_STEP].style?.stepProgressBarColor,
          },
        });
      }

      if (!styleComponentAllowConfig?.colorAfter) {
        styleComponentAllowConfig!.colorAfter = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
          props: {
            defaultValue: THEME_CONFIG[FIELD_NAME.FORM_STEP].style?.colorAfter,
          },
        });
      }

      // Trail Color
      if (!styleComponentAllowConfig?.trailColor) {
        styleComponentAllowConfig!.trailColor = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
          props: {
            defaultValue: undefined,
          },
        });
      }

      // Height
      if (!styleComponentAllowConfig?.height) {
        styleComponentAllowConfig!.height = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: THEME_CONFIG[FIELD_NAME.FORM_STEP].style?.height,
          },
        });
      }

      // Hide Label
      if (!styleComponentAllowConfig?.hideLabel) {
        styleComponentAllowConfig!.hideLabel =
          new ConfigBasic<ConfigCheckboxProps>({
            type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
            props: {
              defaultValue: false,
            },
          });
      }

      // Hide Icon
      if (!styleComponentAllowConfig?.hideIcon) {
        styleComponentAllowConfig!.hideIcon =
          new ConfigBasic<ConfigCheckboxProps>({
            type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
            props: {
              defaultValue: false,
            },
          });
      }
    }

    // Table
    if (
      this.fieldName === FIELD_NAME.TABLE ||
      this.fieldName === FIELD_NAME.TABLE_PROFIT ||
      this.fieldName === FIELD_NAME.TABLE_CAPITAL_CONTRIBUTION ||
      this.fieldName === FIELD_NAME.TABLE_CAPITAL_LENDING ||
      this.fieldName === FIELD_NAME.TABLE_FINANCIAL
    ) {
      // Text Color
      if (!styleComponentAllowConfig?.textColor) {
        styleComponentAllowConfig!.textColor = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
          props: {
            defaultValue: undefined,
          },
        });
      }

      // Text Size
      if (!styleComponentAllowConfig?.fontSize) {
        styleComponentAllowConfig!.fontSize = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: undefined,
          },
        });
      }
    }

    // Input Unit
    if (this.fieldName === FIELD_NAME.INPUT_UNIT) {
      if (styleComponentAllowConfig?.id) {
        styleComponentAllowConfig!.id = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.STRING,
          props: {
            defaultValue: "custom_input_unit",
            disabled: true,
          },
        });
      }
    }
    this.styleComponentAllowConfig = generatePath(
      styleComponentAllowConfig,
      "styleComponentAllowConfig",
    );
  }

  extendsStyleWrapperAllowConfig(styleWrapperAllowConfig: TStyleConfig) {
    // Custom rules for specific fields
    const wrapperExcludeBgColor = false;

    if (
      this.fieldName === FIELD_NAME.BUTTON ||
      this.fieldName === FIELD_NAME.UPLOAD ||
      this.fieldName === FIELD_NAME.VIEW_SELECT_FILE
    ) {
      return;
    }

    if (!styleWrapperAllowConfig?.backgroundColor && !wrapperExcludeBgColor) {
      styleWrapperAllowConfig!.backgroundColor = new ConfigBasic<InputProps>({
        type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
        props: {
          defaultValue: "#ffffff",
        },
      });
    }

    // No colour field needed since the only text for wrapper is LABEL
    // if (!styleWrapperAllowConfig?.color && !wrapperExcludeBgColor) {
    //   styleWrapperAllowConfig!.color = new ConfigBasic<InputProps>({
    //     type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
    //     props: {
    //       defaultValue: '#ffffff',
    //     },
    //   });
    // }

    if (!styleWrapperAllowConfig?.padding) {
      styleWrapperAllowConfig!.padding = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: null,
        },
      });
    }

    if (!styleWrapperAllowConfig?.paddingBlock) {
      styleWrapperAllowConfig!.paddingBlock = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: null,
        },
      });
    }

    if (!styleWrapperAllowConfig?.paddingInline) {
      styleWrapperAllowConfig!.paddingInline = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: null,
        },
      });
    }

    if (!styleWrapperAllowConfig?.borderRadius) {
      styleWrapperAllowConfig!.borderRadius = new ConfigBasic<InputProps>({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: undefined,
        },
      });
    }

    if (!styleWrapperAllowConfig?.marginTop) {
      styleWrapperAllowConfig!.marginTop = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: null,
        },
      });
    }

    if (!styleWrapperAllowConfig?.marginRight) {
      styleWrapperAllowConfig!.marginRight = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: null,
        },
      });
    }

    if (!styleWrapperAllowConfig?.marginBottom) {
      styleWrapperAllowConfig!.marginBottom = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: null,
        },
      });
    }

    if (!styleWrapperAllowConfig?.marginLeft) {
      styleWrapperAllowConfig!.marginLeft = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: null,
        },
      });
    }

    if (this.fieldName === FIELD_NAME.CHECKBOX_GROUP) {
      // Border
      if (!styleWrapperAllowConfig?.borderWidth) {
        styleWrapperAllowConfig!.borderWidth = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
          props: {
            defaultValue: 1,
          },
        });
      }

      if (!styleWrapperAllowConfig?.borderStyle) {
        styleWrapperAllowConfig!.borderStyle = new ConfigBasic<SelectProps>({
          type: CONFIG_BASIC_FIELD_TYPE.SELECT,
          props: {
            defaultValue: "none",
            options: [
              {
                label: "Solid",
                value: "solid",
              },
              {
                label: "None",
                value: "none",
              },
              {
                label: "Dashed",
                value: "dashed",
              },
            ],
          },
        });
      }

      // Border color
      if (!styleWrapperAllowConfig?.borderColor) {
        styleWrapperAllowConfig!.borderColor = new ConfigBasic<InputProps>({
          type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
          props: {
            defaultValue: "#000000",
          },
        });
      }
    }

    this.styleWrapperAllowConfig = generatePath(
      styleWrapperAllowConfig,
      "styleWrapperAllowConfig",
    );
  }

  extendsStyleLabelAllowConfig(styleLabelAllowConfig: TStyleConfig) {
    // Custom rules for specific fields
    if (this.fieldName === FIELD_NAME.BUTTON) {
      return;
    }

    // Global rules
    if (!styleLabelAllowConfig?.color) {
      styleLabelAllowConfig!.color = new ConfigBasic<InputProps>({
        type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
        props: {
          defaultValue: "black",
        },
      });
    }

    if (!styleLabelAllowConfig?.backgroundColor) {
      styleLabelAllowConfig!.backgroundColor = new ConfigBasic<InputProps>({
        type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
        props: {
          defaultValue: "#ffffff00", // Transparent
        },
      });
    }

    if (!styleLabelAllowConfig?.border) {
      styleLabelAllowConfig!.border = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.SELECT,
        props: {
          defaultValue: "none",
          options: [
            { label: "All", value: "border" },
            { label: "Left", value: "borderLeft" },
            { label: "Right", value: "borderRight" },
            { label: "Top", value: "borderTop" },
            { label: "Bottom", value: "borderBottom" },
          ],
        },
      });
    }

    if (!styleLabelAllowConfig?.borderColor) {
      styleLabelAllowConfig!.borderColor = new ConfigBasic<
        Partial<ConfigColorProps>
      >({
        type: CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER,
        props: {
          defaultValue: "black",
        },
      });
    }

    if (!styleLabelAllowConfig?.borderWidth) {
      styleLabelAllowConfig!.borderWidth = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: 1,
        },
      });
    }

    if (!styleLabelAllowConfig?.fontSize) {
      styleLabelAllowConfig!.fontSize = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: null,
        },
      });
    }

    if (!styleLabelAllowConfig?.fontWeight) {
      styleLabelAllowConfig!.fontWeight = new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: null,
        },
      });
    }

    this.styleLabelAllowConfig = generatePath(
      styleLabelAllowConfig,
      "styleLabelAllowConfig",
    );
  }

  buildInitialFieldData() {
    const SUPPORT_INITIAL_VALUE = {
      [FIELD_NAME.INPUT]: {
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        value: "",
      },
      [FIELD_NAME.PHONE_NUMBER]: {
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        value: "",
      },
      [FIELD_NAME.EMAIL]: {
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        value: "",
      },
      [FIELD_NAME.CMND_NUMBER]: {
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        value: "",
      },
      [FIELD_NAME.MST_NUMBER]: {
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        value: "",
      },
      [FIELD_NAME.TEXTAREA]: {
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        value: "",
      },
      [FIELD_NAME.INPUT_NUMBER]: {
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        value: 0,
      },
      [FIELD_NAME.INPUT_PASSWORD]: {
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        value: "",
      },
      [FIELD_NAME.SELECT]: {
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        value: "",
      },
      [FIELD_NAME.DATE_PICKER]: {
        type: CONFIG_BASIC_FIELD_TYPE.DATEPICKER,
        value: dayjs().format(DATE_FORMAT.YYYY_MM_DD),
      },
      [FIELD_NAME.DATETIME_PICKER]: {
        type: CONFIG_BASIC_FIELD_TYPE.DATETIMEPICKER,
        value: dayjs().format(DATE_TIME_FORMAT.YYYY_MM_DD_HH_mm_ss),
      },
      // [FIELD_NAME.RANGEPICKER]: {
      //   type: CONFIG_BASIC_FIELD_TYPE.RANGEPICKER,
      //   value: '',
      // },
    };

    if (SUPPORT_INITIAL_VALUE[this.fieldName]) {
      return new ConfigBasic({
        type: SUPPORT_INITIAL_VALUE[this.fieldName]?.type,
        props: {
          defaultValue: SUPPORT_INITIAL_VALUE[this.fieldName].value,
        },
      });
    }

    return undefined;
  }

  extendsConfig(key: string, config: { type: string; defaultValue: any }) {
    const { type, defaultValue } = config;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.componentPropsAllowConfig = generatePath(
      {
        ...this.componentPropsAllowConfig,
        [key]: new ConfigBasic({
          type,
          props: {
            defaultValue,
          },
        }) as any,
      },
      "componentPropsAllowConfig",
    );
  }

  static isFormField(fieldName: string) {
    return isNeedWrapFormItem(fieldName);
  }

  get getInitialFieldData() {
    return this.formItemPropsAllowConfig?.initFieldData?.props.defaultValue;
  }

  setValueByPath(path: string, value: any) {
    Object.assign(this, _set(this, path, value));
    return this;
  }

  toPlainObject(): IField {
    return { ...this };
  }

  setInitFieldData = (value: any) => {
    if (this.formItemPropsAllowConfig?.initFieldData) {
      this.formItemPropsAllowConfig.initFieldData.props.defaultValue = value;
    }
    return this;
  };

  setInitIniFieldDataType = (type: string) => {
    if (this.formItemPropsAllowConfig?.initFieldData) {
      this.formItemPropsAllowConfig.initFieldData.type = type;
    }
    return this;
  };

  static validateType(fieldName: keyof typeof FIELD_NAME) {
    const isValid = Boolean(FIELD_NAME[fieldName]);

    if (!isValid)
      throw new Error(`Not support component fieldName: ${fieldName}`);
  }

  static validateConfig(config: any, fieldKey: string) {
    if (_isObject(config)) {
      Object.keys(config).forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const configObject: any = config[key];

        if (configObject) {
          if (
            !Object.values(CONFIG_ADVANCE_FIELD_TYPE).includes(
              configObject.type,
            ) &&
            !Object.values(CONFIG_BASIC_FIELD_TYPE).includes(configObject.type)
          ) {
            throw new Error(
              `[${fieldKey}][${key}]: Type is not support, must be ${Object.values(CONFIG_ADVANCE_FIELD_TYPE)} or ${Object.values(CONFIG_BASIC_FIELD_TYPE)}`,
            );
          }

          if (configObject.type === CONFIG_ADVANCE_FIELD_TYPE.OBJECT) {
            if (_isEmpty(configObject.children))
              throw new Error("children can not be empty");

            Field.validateConfig(configObject.children, fieldKey);
          }

          const defaultValue = _get(configObject, "props.defaultValue", null);

          if (defaultValue === null || defaultValue === undefined) return;

          const buildError = (type: string) =>
            `[${fieldKey}][${key}]: defaultValue must be ${type}`;
          if (configObject.type === CONFIG_BASIC_FIELD_TYPE.ARRAY) {
            if (!_isArray(defaultValue))
              throw new Error(buildError(CONFIG_BASIC_FIELD_TYPE.ARRAY));
          }

          if (
            configObject.type === CONFIG_BASIC_FIELD_TYPE.STRING ||
            configObject.type === CONFIG_BASIC_FIELD_TYPE.CODE ||
            configObject.type === CONFIG_BASIC_FIELD_TYPE.DATEPICKER ||
            configObject.type === CONFIG_BASIC_FIELD_TYPE.DATETIMEPICKER ||
            configObject.type === CONFIG_BASIC_FIELD_TYPE.COLOR_PICKER ||
            configObject.type === CONFIG_BASIC_FIELD_TYPE.REGEX
          ) {
            if (!_isString(defaultValue)) {
              throw new Error(buildError(CONFIG_BASIC_FIELD_TYPE.STRING));
            }
          }

          if (
            configObject.type === CONFIG_BASIC_FIELD_TYPE.BOOLEAN ||
            configObject.type === CONFIG_BASIC_FIELD_TYPE.HIDE_IF ||
            configObject.type === CONFIG_BASIC_FIELD_TYPE.CALCULABLE ||
            configObject.type === CONFIG_BASIC_FIELD_TYPE.CHECKBOX
          ) {
            if (!_isBoolean(defaultValue)) {
              throw new Error(buildError(CONFIG_BASIC_FIELD_TYPE.BOOLEAN));
            }
          }

          if (configObject.type === CONFIG_BASIC_FIELD_TYPE.NUMBER) {
            if (!_isNumber(defaultValue)) {
              throw new Error(buildError(CONFIG_BASIC_FIELD_TYPE.NUMBER));
            }
          }

          if (configObject.type === CONFIG_BASIC_FIELD_TYPE.SELECT) {
            if (!_isNumber(defaultValue) && !_isString(defaultValue))
              throw new Error(buildError("string or number"));
            const options = _get(configObject, "props.options", null);

            if (!_isArray(options))
              throw new Error(`[${fieldKey}][${key}]: options must be array`);
          }
        }
      });
    }
  }

  static isValid(field: IField | Field) {
    const {
      componentPropsAllowConfig,
      formItemPropsAllowConfig,

      styleWrapperAllowConfig,
      styleComponentAllowConfig,
      styleLabelAllowConfig,

      key,
      fieldName,
    } = field;

    Field.validateConfig(componentPropsAllowConfig, key);
    Field.validateConfig(formItemPropsAllowConfig, key);
    Field.validateType(fieldName as keyof typeof FIELD_NAME);

    // [x] Add remaining validations for styling
    Field.validateConfig(styleWrapperAllowConfig, key);
    Field.validateConfig(styleComponentAllowConfig, key);
    Field.validateConfig(styleLabelAllowConfig, key);
  }
}
