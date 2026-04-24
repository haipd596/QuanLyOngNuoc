import { defaultAccept } from '@packages/components/Config/ConfigOptionAcceptUpload/constants';
import { ViewUploadProps } from '@packages/components/View/ViewUpload';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME, MDM_HOST } from '@packages/constants/fields';
import { asyncUploadConfig } from '@packages/constants/jsonConfig';
import { SelectProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';

export const createUploadField = (
  extraFieldConfig: AnyObject = {},
) => new Field<Partial<ViewUploadProps>>({
  fieldName: FIELD_NAME.UPLOAD,
  key: '',
  version: 0,
  componentPropsAllowConfig: {
    ...asyncUploadConfig,
    name: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'file',
      },
    }),
    action: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: `${MDM_HOST}/api/core/mdm/nodes/upload?destinationPath=`,
      },
    }),
    responseKey: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.STRING,
      props: {
        defaultValue: 'Data',
      },
    }),
    accept: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.CONFIG_SELECT_ACCEPT_UPLOAD,
      props: {
        defaultValue: defaultAccept,
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
    maxSizeInMB: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: 500,
      },
    }),
    isShowUploadList: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
      props: {
        defaultValue: false,
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
  additionsComponentConfig: {
    maxSizeInMB: new ConfigBasic({
      type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
      props: {
        defaultValue: 500,
      },
    }),
  },
  ...extraFieldConfig,
});
