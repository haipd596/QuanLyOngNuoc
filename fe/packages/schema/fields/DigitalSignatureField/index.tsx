import { ViewUploadPropsSignature } from '@packages/components/View/ViewDigitalSignature/type';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME, MDM_HOST } from '@packages/constants/fields';
import { asyncUploadConfig } from '@packages/constants/jsonConfig';
import { SelectProps } from 'antd';

import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createViewDigitalSignatureField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<ViewUploadPropsSignature>>({
  fieldName: FIELD_NAME.DIGITAL_SIGNATURE,
  key: '',
  version: 0,
  componentPropsAllowConfig: {
    ...asyncUploadConfig,
    action: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: `${MDM_HOST}/api/core/mdm/nodes/upload?destinationPath=`,
      },
    }),
    // fileUploadHandler: new ConfigBasic({
    //   type: CONFIG_BASIC_FIELD_TYPE.STRING,
    //   props: {
    //     defaultValue: 'http://tthc-test/Pages/FileUploadHandler.aspx',
    //   },
    // }),
    // linkMdm: new ConfigBasic({
    //   type: CONFIG_BASIC_FIELD_TYPE.STRING,
    //   props: {
    //     defaultValue: `${MDM_HOST}/api/core/mdm/nodes/viewbyid/`,
    //   },
    // }),
    responseKey: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Data',
      },
    }),
    multiple: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
      },
    }),
    listType: new ConfigBasic<SelectProps>({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        // 'text' | 'picture' | 'picture-card' | 'picture-circle'
        defaultValue: 'text',
        options: [
          {
            label: 'Text',
            value: 'text',
          },
          {
            label: 'Picture',
            value: 'picture',
          },
          {
            label: 'Picture card',
            value: 'picture-card',
          },
          {
            label: 'Picture-circle',
            value: 'picture-circle',
          },
        ],
      },
    }),
    type: new ConfigBasic<SelectProps>({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        // 'drag' | 'select'
        defaultValue: 'select',
        options: [
          {
            label: 'Drag',
            value: 'drag',
          },
          {
            label: 'Select',
            value: 'select',
          },
        ],
      },
    }),
    buttonContent: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: '',
      },
    }),
    buttonType: new ConfigBasic<SelectProps>({
      type: CONFIG_BASIC_FIELD_TYPE.SELECT,
      props: {
        defaultValue: 'text',
        options: [
          {
            label: 'Primary',
            value: 'primary',
          },
          {
            label: 'Dashed',
            value: 'dashed',
          },
          {
            label: 'Text',
            value: 'text',
          },
          {
            label: 'Link',
            value: 'link',
          },
        ],
        allowClear: true,
      },
    }),
  },
  ...extraFieldConfig,
});
