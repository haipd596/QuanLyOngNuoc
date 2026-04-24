import { Field } from '../fieldModel';

export const createTitleThongTinChung = () => {
  return new Field({

    fieldName: 'TEXT_VIEW',
    version: 7,
    key: 'TEXT_VIEW_185',
    isShowField: true,
    componentPropsAllowConfig: {
      content: {
        type: 'string',
        props: {
          defaultValue: 'Thông tin người nộp',
        },
        path: 'componentPropsAllowConfig.content',
      },
      isAdditionalContent: {
        type: 'boolean',
        props: {
          defaultValue: false,
        },
        path: 'componentPropsAllowConfig.isAdditionalContent',
      },
      additionalContent: {
        type: 'string',
        props: {
          defaultValue: 'Text2',
        },
        path: 'componentPropsAllowConfig.additionalContent',
      },
      textType: {
        type: 'select',
        props: {
          defaultValue: 'text',
          options: [
            {
              label: 'text',
              value: 'text',
            },
            {
              label: 'link',
              value: 'link',
            },
          ],
        },
        path: 'componentPropsAllowConfig.textType',
      },
      typeTransform: {
        type: 'select',
        props: {
          defaultValue: 'uppercase',
          options: [
            {
              label: 'uppercase',
              value: 'uppercase',
            },
            {
              label: 'capitalize',
              value: 'capitalize',
            },
            {
              label: 'lowercase',
              value: 'lowercase',
            },
            {
              label: 'none',
              value: 'none',
            },
          ],
        },
        path: 'componentPropsAllowConfig.typeTransform',
      },
      fontSize: {
        type: 'number',
        props: {
          defaultValue: 16,
          min: 0,
        },
        path: 'componentPropsAllowConfig.fontSize',
      },
      textColor: {
        type: 'colorpicker',
        props: {
          defaultValue: '',
        },
        path: 'componentPropsAllowConfig.textColor',
      },
      textColorAdditional: {
        type: 'colorpicker',
        props: {
          defaultValue: 'red',
        },
        path: 'componentPropsAllowConfig.textColorAdditional',
      },
      borderColor: {
        type: 'colorpicker',
        props: {
          defaultValue: '#D9D9D9',
        },
        path: 'componentPropsAllowConfig.borderColor',
      },
      borderStyle: {
        type: 'select',
        props: {
          defaultValue: 'solid',
          options: [
            {
              label: 'solid',
              value: 'solid',
            },
            {
              label: 'dotted',
              value: 'dotted',
            },
          ],
        },
        path: 'componentPropsAllowConfig.borderStyle',
      },
      borderWidth: {
        type: 'number',
        props: {
          defaultValue: 1,
        },
        path: 'componentPropsAllowConfig.borderWidth',
      },
      showBorder: {
        type: 'select',
        props: {
          options: [
            {
              label: 'showBorderTop',
              value: 'border_top',
            },
            {
              label: 'showBorderLeft',
              value: 'border_left',
            },
            {
              label: 'showBorderRight',
              value: 'border_right',
            },
            {
              label: 'showBorderBottom',
              value: 'border_bottom',
            },
            {
              label: 'showBorderNone',
              value: 'border_none',
            },
          ],
        },
        path: 'componentPropsAllowConfig.showBorder',
      },
      isPaddingBottom: {
        type: 'number',
        props: {
          defaultValue: null,
        },
        path: 'componentPropsAllowConfig.isPaddingBottom',
      },
      underline: {
        type: 'boolean',
        props: {
          defaultValue: false,
        },
        path: 'componentPropsAllowConfig.underline',
      },
      italic: {
        type: 'boolean',
        props: {
          defaultValue: false,
        },
        path: 'componentPropsAllowConfig.italic',
      },
      fontWeight: {
        type: 'select',
        props: {
          defaultValue: 'bold',
          options: [
            {
              label: 'normal',
              value: 'normal',
            },
            {
              label: 'bold',
              value: 'bold',
            },
            {
              label: 'bolder',
              value: 'bolder',
            },
            {
              label: 'lighter',
              value: 'lighter',
            },
            {
              label: 'inherit',
              value: 'inherit',
            },
            {
              label: 'initial',
              value: 'initial',
            },
            {
              label: 'revert',
              value: 'revert',
            },
            {
              label: 'revert-layer',
              value: 'revert-layer',
            },
            {
              label: 'unset',
              value: 'unset',
            },
          ],
        },
        path: 'componentPropsAllowConfig.fontWeight',
      },
      maxWidth: {
        type: 'number',
        props: {
          min: 0,
        },
        path: 'componentPropsAllowConfig.maxWidth',
      },
      level: {
        type: 'number',
        props: {
          defaultValue: 0,
          min: 0,
          max: 5,
        },
        path: 'componentPropsAllowConfig.level',
      },
      justifyContent: {
        type: 'select',
        props: {
          defaultValue: 'normal',
          options: [
            {
              label: 'normal',
              value: 'normal',
            },
            {
              label: 'center',
              value: 'center',
            },
            {
              label: 'end',
              value: 'end',
            },
            {
              label: 'right',
              value: 'right',
            },
            {
              label: 'left',
              value: 'left',
            },
            {
              label: 'flex-end',
              value: 'flex-end',
            },
            {
              label: 'flex-start',
              value: 'flex-start',
            },
          ],
        },
        path: 'componentPropsAllowConfig.justifyContent',
      },
      hideIf: {
        type: 'hide_if',
        props: {
          defaultValue: false,
        },
        path: 'componentPropsAllowConfig.hideIf',
      },
      isShowInDetailModeView: {
        type: 'boolean',
        props: {
          defaultValue: true,
        },
        path: 'componentPropsAllowConfig.isShowInDetailModeView',
      },
      isShowInModeView: {
        type: 'boolean',
        props: {
          defaultValue: true,
        },
        path: 'componentPropsAllowConfig.isShowInModeView',
      },
      disabled: {
        type: 'boolean',
        props: {
          defaultValue: false,
        },
        path: 'componentPropsAllowConfig.disabled',
      },
    },
    formItemPropsAllowConfig: {
      wrapperColumnNumber: {
        type: 'configSelectColumn',
        props: {
          defaultValue: 24,
        },
        path: 'formItemPropsAllowConfig.wrapperColumnNumber',
      },
    },
    styleWrapperAllowConfig: {
      paddingBlock: {
        type: 'number',
        props: {
          defaultValue: 1,
        },
        path: 'styleWrapperAllowConfig.paddingBlock',
      },
      backgroundColor: {
        type: 'colorpicker',
        props: {
          defaultValue: 'white',
        },
        path: 'styleWrapperAllowConfig.backgroundColor',
      },
      padding: {
        type: 'number',
        props: {
          defaultValue: null,
        },
        path: 'styleWrapperAllowConfig.padding',
      },
      paddingInline: {
        type: 'number',
        props: {
          defaultValue: 10,
        },
        path: 'styleWrapperAllowConfig.paddingInline',
      },
      borderRadius: {
        type: 'number',
        props: {},
        path: 'styleWrapperAllowConfig.borderRadius',
      },
      marginTop: {
        type: 'number',
        props: {
          defaultValue: null,
        },
        path: 'styleWrapperAllowConfig.marginTop',
      },
      marginRight: {
        type: 'number',
        props: {
          defaultValue: null,
        },
        path: 'styleWrapperAllowConfig.marginRight',
      },
      marginBottom: {
        type: 'number',
        props: {
          defaultValue: 10,
        },
        path: 'styleWrapperAllowConfig.marginBottom',
      },
      marginLeft: {
        type: 'number',
        props: {
          defaultValue: null,
        },
        path: 'styleWrapperAllowConfig.marginLeft',
      },
    },
    styleComponentAllowConfig: {
      className: {
        type: 'string',
        props: {
          defaultValue: '',
        },
        path: 'styleComponentAllowConfig.className',
      },
      id: {
        type: 'string',
        props: {
          defaultValue: '',
        },
        path: 'styleComponentAllowConfig.id',
      },
    },
    styleLabelAllowConfig: {
      color: {
        type: 'colorpicker',
        props: {
          defaultValue: 'black',
        },
        path: 'styleLabelAllowConfig.color',
      },
      backgroundColor: {
        type: 'colorpicker',
        props: {
          defaultValue: '#ffffff00',
        },
        path: 'styleLabelAllowConfig.backgroundColor',
      },
      border: {
        type: 'select',
        props: {
          defaultValue: 'none',
          options: [
            {
              label: 'All',
              value: 'border',
            },
            {
              label: 'Left',
              value: 'borderLeft',
            },
            {
              label: 'Right',
              value: 'borderRight',
            },
            {
              label: 'Top',
              value: 'borderTop',
            },
            {
              label: 'Bottom',
              value: 'borderBottom',
            },
          ],
        },
        path: 'styleLabelAllowConfig.border',
      },
      borderColor: {
        type: 'colorpicker',
        props: {
          defaultValue: 'black',
        },
        path: 'styleLabelAllowConfig.borderColor',
      },
      borderWidth: {
        type: 'number',
        props: {
          defaultValue: 1,
        },
        path: 'styleLabelAllowConfig.borderWidth',
      },
      fontSize: {
        type: 'number',
        props: {
          defaultValue: null,
        },
        path: 'styleLabelAllowConfig.fontSize',
      },
      fontWeight: {
        type: 'number',
        props: {
          defaultValue: null,
        },
        path: 'styleLabelAllowConfig.fontWeight',
      },
    },
    fieldsInColumnIndex: [],
    extraDataSourceField: [],
    configChanged: {
      'componentPropsAllowConfig.content.props.defaultValue': 'Thông tin người nộp',
      'componentPropsAllowConfig.isPaddingBottom.props.defaultValue': null,
      'styleWrapperAllowConfig.paddingInline.props.defaultValue': 10,
      'styleWrapperAllowConfig.marginBottom.props.defaultValue': 10,
    },
    isNotCompactJsonOutput: false,
    columnIndex: 0,

  });
};
