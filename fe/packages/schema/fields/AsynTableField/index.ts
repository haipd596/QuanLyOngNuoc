import { TAsyncTableProps } from '@packages/components/View/AsyncTable/type';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { asyncCommonConfig } from '@packages/constants/jsonConfig';
import { getBaseDvcApi } from '@packages/dvc-service/getBaseUrl';
import { AnyObject } from 'antd/es/_util/type';
import { transformDataOption } from '../AsyncCheckboxGroup';
import { ConfigBasic } from '../fieldConfig';
import { Field } from '../fieldModel';
import { createSelectFileField } from '../SelectFile';
import { transformDataColumn } from '../TableField';
import { createUploadField } from '../UploadField';

const { headers, pathToSource } = asyncCommonConfig;

export const createAsyncTableField = (extraFieldConfig: AnyObject = {}) => (
  new Field<Partial<TAsyncTableProps>>({
    fieldName: FIELD_NAME.ASYNC_TABLE,
    key: '',
    version: 0,
    componentPropsAllowConfig: {
      action: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.ASYNC_ACTION,
        props: {
          defaultValue: `${getBaseDvcApi()}/api/v1/common/query?title=dm_ThuTuc2GiayTo&top=10&filter="ThuTucId=1"&foreignKey=GiayToId&primaryKey=Id&tableName=dm_GiayTo`,
        },
      }),
      pathToSource,
      transformDataOption,
      columns: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
        props: {
          defaultValue: [
            {
              title: 'Giấy tờ',
              pathToColumnData: 'name',
              serverPayloadKey: 'name',
              transformDataColumn,
              isShowColumn: true,
            },
          ],
        },
      }),
      uploadColumns: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CONFIG_UPLOAD_COLUMNS,
        props: {
          defaultValue: {
            isShowUpload: true,
            isShowSelectFile: true,
            configUpload: createUploadField(),
            configSelectFile: createSelectFileField(),
            isMulti: false,
          },
        },
      }),
      pathToUrlDownload: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.STRING,
        props: {
          defaultValue: '',
        },
      }),
      isHiddenAction: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      isShowOrderNumber: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: true,
        },
      }),
      isShowCheckbox: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.BOOLEAN,
        props: {
          defaultValue: false,
        },
      }),
      headers,
    },
    additionsComponentConfig: {
      pageSize: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.NUMBER,
        props: {
          defaultValue: 5,
        },
      }),
      uploadColumns: new ConfigBasic({
        type: CONFIG_BASIC_FIELD_TYPE.CONFIG_UPLOAD_COLUMNS,
        props: {
          defaultValue: {
            isShowUpload: true,
            isShowSelectFile: true,
            configUpload: createUploadField(),
            configSelectFile: createSelectFileField(),
            isMulti: false,
          },
        },
      }),
    },
    ...extraFieldConfig,
  })
);
