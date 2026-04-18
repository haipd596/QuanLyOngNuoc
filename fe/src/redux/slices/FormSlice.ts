import { TJsonProperties, TModeView, TSubFormInManager } from '@packages/@types';
import { TModalDigitalPaperBuilderProps } from '@packages/components/DigitalPaper/Builder/ModalDigitalPaperBuilder';
import { getSystemParameterByMa } from '@packages/components/SystemParameters/utils';
import { TFormStepProps } from '@packages/components/View/FormStep/type';
import { FIELD_NAME } from '@packages/constants/fields';
import { MODE_VIEW } from '@packages/constants/modeView';
import { Field, IField } from '@packages/schema/fields/fieldModel';
import {
  IConfigViewInfo, JsonSchema, JsonSchemaOutput, Schema,
} from '@packages/schema/schemaModel';
import { updateAutoRunValue } from '@packages/utils/autoRun';
import { createChildrenInTable } from '@packages/utils/table/createChildrendInTable';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { AnyObject } from 'antd/es/_util/type';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _map from 'lodash/map';
import _set from 'lodash/set';
import { THEME_NAMES } from '~/constants/themeColor';
import { DEMO_VIEWER } from '~/pages/ViewPage/demo';
import { schemaApi } from '../services/schemaApi';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

// Define a type for the slice state
interface FormState {
  activeSchema: JsonSchema,
  modeView: TModeView,
  activeConfigFieldKey: string | null,
  isDuThao: boolean,
  trangThaiHoSoId: number | null,
  activeFormKey: string | null,
  schemas: JsonSchema[],
  isOpenModalSelectSchema: boolean,
  searchValue: string,
  formManagers: {
    [x: string]: TSubFormInManager[]
  },
  systemParameters: AnyObject
  isOpenModalDigitalBuilder: boolean
  modalDigitalBuilderProps: TModalDigitalPaperBuilderProps,
  thuTucHanhChinh: any,
  formDataInit: any,
  activeGiayToId?: string,
  sltThuTucHanhChinh: any,
  isOpenModalSltTthc: boolean,
}

// Specifies the structure for a new column field
export interface INewColumnField {
  columnIndex: number | string;
  fieldKeyCol: string;
  singleField: Field<any, any>;
  viewContainerKey?: string | undefined;
  newFieldKeyCol?: string;
}

export interface INewColumnFieldActive {
  columnIndex: string | number,
  viewContainerKey: string,
  parentField: any,
  clonedFields: any
  fieldActiveKey: string,
}

export interface AddChildTable {
  subSchema: JsonSchema,
  parentFieldKey: string
}

// Define the initial state using that type
const initialState: FormState = {
  activeSchema: {
    title: 'form',
    type: 'object',
    fields: [],
    schemaKey: undefined,
    currentTheme: THEME_NAMES.GREEN,
  },
  thuTucHanhChinh: {},
  modeView: MODE_VIEW.EDIT,
  activeConfigFieldKey: null,
  isDuThao: false,
  trangThaiHoSoId: null,
  activeFormKey: null,
  schemas: [],
  isOpenModalSelectSchema: true,
  isOpenModalDigitalBuilder: false,
  modalDigitalBuilderProps: {
    subForm: DEMO_VIEWER,
    onSave: () => {},
    allSubForm: {},
  },
  searchValue: '',
  formManagers: {
    lv1: [],
    lv2: [],
  },
  systemParameters: {},
  formDataInit: {},
  sltThuTucHanhChinh: {},
  isOpenModalSltTthc: false,
};

interface AddFieldPayload {
  fields: Field<any, any>;
  position: number;
}

export interface AddFieldAtPosition {
  columnIndex: number | string;
  singleField: IField;
  viewContainerKey: string;
  fieldKeyActive: string;
  atPosition: string;
}

export const fromSlice = createSlice({
  name: 'formState',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActiveFieldKey: (state, action: PayloadAction<string | null>) => {
      state.activeConfigFieldKey = action.payload;
    },
    setIsDuThao: (state, action: PayloadAction<any>) => {
      state.isDuThao = action.payload;
    },
    setTrangThaiHoSoId: (state, action: PayloadAction<any>) => {
      state.trangThaiHoSoId = action.payload;
    },
    toggleOpenModalDigitalBuilder: (state) => {
      state.isOpenModalDigitalBuilder = !state.isOpenModalDigitalBuilder;
    },
    setModalDigitalBuilderProps: (state, action: PayloadAction<any>) => {
      state.modalDigitalBuilderProps = action.payload;
    },
    setModalSltTthc: (state, action: PayloadAction<any>) => {
      state.isOpenModalSltTthc = action.payload;
    },
    setSchema: (state, action: PayloadAction<any>) => {
      state.activeSchema = action.payload;
    },
    setSystemParameter: (state, action: PayloadAction<any>) => {
      state.systemParameters = action.payload;
    },
    replaceFields: (state, action: PayloadAction<any>) => {
      state.activeSchema.fields = action.payload;
    },
    updateViewInfoKey: (state, action: PayloadAction<IConfigViewInfo>) => {
      const { fieldKey, listKeyValueInViewInfo } = action.payload;
      const indexField = state.activeSchema.fields.findIndex(({ key }) => key === fieldKey);
      if (indexField !== -1) {
        const newListKeys = _cloneDeep(state.activeSchema);
        newListKeys.fields[indexField].listKeyValueInViewInfo = listKeyValueInViewInfo;
        state.activeSchema = newListKeys;
      } else {
        console.error(`Field with key ${fieldKey} not found`);
      }
    },
    updateViewKey: (state, action: PayloadAction<IConfigViewInfo>) => {
      const { fieldKey, fieldsInColumnIndex } = action.payload;
      const indexField = state.activeSchema.fields.findIndex(({ key }) => key === fieldKey);
      if (indexField !== -1) {
        const newListKeys = _cloneDeep(state.activeSchema);
        newListKeys.fields[indexField].fieldsInColumnIndex = fieldsInColumnIndex;
        state.activeSchema = newListKeys;
      } else {
        console.error(`Field with key ${fieldKey} not found`);
      }
    },
    updateField: (
      state,
      action: PayloadAction<{ key: string, newData: Field<any, any> }>,
    ) => {
      const formActiveIndex = state.activeSchema.fields.findIndex(
        ({ key, uniqId }) => {
          if (uniqId) {
            return uniqId === action.payload.newData.uniqId;
          }
          return key === action.payload.key;
        },
      );
      if (formActiveIndex > -1) {
        state.activeSchema.fields[formActiveIndex] = action.payload.newData as any;
        state.activeSchema.fields[formActiveIndex].version += 1;
      }
    },
    removeField: (state, action: PayloadAction<{ key: string }>) => {
      const indexField = state
        .activeSchema.fields.findIndex(({ key }) => key === action.payload.key);
      if (indexField !== -1) {
        const fieldsInColumnIndex = _get(state, `activeSchema.fields[${indexField}].fieldsInColumnIndex`, []);

        // TODO: delete field in subForm
        if (fieldsInColumnIndex?.length) {
          state.activeSchema.fields = state
            .activeSchema
            .fields.filter(({ key, uniqId }) => (
              !fieldsInColumnIndex.find(({
                fieldKeyCol,
              }) => uniqId === fieldKeyCol || key === fieldKeyCol)
            ));
        }

        // delete fields reference to fields outside
        state.activeSchema.fields = state
          .activeSchema
          .fields.filter(({ key }) => (
            key !== action.payload.key
          ));
      }
    },
    updateMultiFieldByPath: (
      state,
      action: PayloadAction<TJsonProperties[]>,
    ) => {
      if (action.payload.length === 0) return;

      state.activeSchema.fields = updateAutoRunValue(
        state.activeSchema.fields as any,
        action.payload,
      ) as any;
    },
    bulkAddField: (state, action: PayloadAction<any>) => {
      const { componentKey, clonedFields } = action.payload;
      const fieldIndex = state.activeSchema.fields.findIndex((field) => field.key === componentKey);

      state.activeSchema.fields.splice(fieldIndex + 1, 0, ...clonedFields as any);
    },
    addNewField: (state, action: PayloadAction<IField<any, any>>) => {
      if (action.payload.fieldName === FIELD_NAME.TABLE) {
        const childrenFields = createChildrenInTable(action.payload);
        state.activeSchema.fields = state.activeSchema.fields.concat(childrenFields);
      }

      state.activeSchema.fields.push(action.payload as any);
    },
    addFieldColumn: (state, action: PayloadAction<INewColumnField>) => {
      const {
        columnIndex, fieldKeyCol, singleField, viewContainerKey,
      } = action.payload;
      singleField.isShowField = false;

      if (singleField.fieldName === FIELD_NAME.TABLE) {
        const childrenFields = createChildrenInTable(singleField);
        state.activeSchema.fields = state.activeSchema.fields.concat(childrenFields);
      }

      const columnFieldFoundIndex = state
        .activeSchema
        .fields.findIndex(({ key }) => key === viewContainerKey);
      if (columnFieldFoundIndex > -1) {
        const prevListKeys: TFormStepProps['fieldsInColumnIndex'] = _get(
          state.activeSchema.fields,
          `${columnFieldFoundIndex}.fieldsInColumnIndex`,
          [],
        );
        const newListKeys = prevListKeys.concat(({ columnIndex, fieldKeyCol }));

        state.activeSchema.fields[columnFieldFoundIndex].fieldsInColumnIndex = newListKeys;

        state.activeSchema.fields.push(singleField as any);
      }
    },
    replaceSubForm: (state, action: PayloadAction<AddChildTable>) => {
      const { parentFieldKey, subSchema } = action.payload;
      const parentFieldIndex = state
        .activeSchema
        .fields.findIndex(({ key }) => key === parentFieldKey);

      if (parentFieldIndex > -1) {
        const clonedSchema = _set(state.activeSchema, `fields[${parentFieldIndex}].subForm`, subSchema);
        state.activeSchema = _cloneDeep(clonedSchema);
      }
    },
    updateFieldInSubForm: (
      state,
      action: PayloadAction<{ parentFormKey: string, newData: Field }>,
    ) => {
      const { activeSchema } = state;
      const parentFieldIndex = state.activeSchema.fields.findIndex(
        ({ key }) => key === action.payload.parentFormKey,
      );
      if (parentFieldIndex > -1) {
        const fieldsInSubForm = _get(state, `activeSchema.fields[${parentFieldIndex}].subForm.fields`, []) as IField[];
        const fieldIndexUpdating = fieldsInSubForm
          .findIndex(({ key }) => action.payload.newData.key === key);
        if (fieldIndexUpdating > -1) {
          _set(activeSchema, `fields[${parentFieldIndex}].subForm.fields[${fieldIndexUpdating}]`, action.payload.newData);
          state.activeSchema = _cloneDeep(activeSchema);
        }
      }
    },
    duplicateFieldInAContainer: (state, action: PayloadAction<INewColumnFieldActive>) => {
      const {
        columnIndex, viewContainerKey, clonedFields, parentField, fieldActiveKey,
      } = action.payload;
      const containerIndex = state
        .activeSchema
        .fields.findIndex(({ key }) => key === viewContainerKey);
      if (containerIndex > -1) {
        const prevListKeys: TFormStepProps['fieldsInColumnIndex'] = _get(
          state.activeSchema.fields,
          `${containerIndex}.fieldsInColumnIndex`,
          [],
        );

        const fieldToCloneIndex = state
          .activeSchema
          .fields.findIndex(({ key }) => key === fieldActiveKey);

        state.activeSchema.fields.splice(
          fieldToCloneIndex + 1,
          0,
          ..._map(clonedFields, (item) => ({ ...item, isShowField: false })),
        );

        const newListKeys = { columnIndex, fieldKeyCol: parentField.key };
        const updatedListKeys = prevListKeys.concat(newListKeys);
        state.activeSchema.fields[containerIndex].fieldsInColumnIndex = updatedListKeys;
      }
    },
    addFieldAtPosition(state, action: PayloadAction<AddFieldPayload>) {
      const { fields, position } = action.payload;
      if (fields.fieldName === FIELD_NAME.TABLE) {
        const childrenFields = createChildrenInTable(fields);
        state.activeSchema.fields = state.activeSchema.fields.concat(childrenFields);
      }
      state.activeSchema.fields.splice(position, 0, fields as any);
    },
    addFieldByPositionFormStep(state, action: PayloadAction<AddFieldAtPosition>) {
      const {
        columnIndex, singleField, viewContainerKey, fieldKeyActive, atPosition,
      } = action.payload;
      singleField.isShowField = false;

      const columnFieldFoundIndex = state
        .activeSchema
        .fields.findIndex(({ key }) => key === viewContainerKey);

      if (columnFieldFoundIndex > -1) {
        const prevListKeys: TFormStepProps['fieldsInColumnIndex'] = _get(
          state.activeSchema.fields,
          `${columnFieldFoundIndex}.fieldsInColumnIndex`,
          [],
        );

        // Tìm index của field cần duplicate để chèn bản sao ngay sau nó
        const fieldIndex = state
          .activeSchema
          .fields.findIndex((field) => field.key === fieldKeyActive);

        if (fieldIndex > -1) {
          let newField = new Field(singleField);

          if (state.activeSchema.fields[fieldIndex]) {
            newField = new Field({ ...singleField, isInCheckBoxToggle: true });
          }

          const newListKeys = prevListKeys.concat(({ columnIndex, fieldKeyCol: newField.key }));
          state.activeSchema.fields[columnFieldFoundIndex].fieldsInColumnIndex = newListKeys;

          // Thêm field mới tại vị trí chỉ định (trước hoặc sau field gốc)
          const insertPosition = atPosition === 'before' ? fieldIndex : fieldIndex + 1;
          state.activeSchema.fields.splice(insertPosition, 0, newField as any);
        }
      }
    },
    duplicateField(state, action: PayloadAction<{ key: string }>) {
      const { key } = action.payload;
      const fieldIndex = state.activeSchema.fields.findIndex((field) => field.key === key);
      const fieldToDuplicate = state.activeSchema.fields[fieldIndex];
      if (fieldToDuplicate) {
        const randomNumber = Math.floor(Math.random() * 10000);
        const newKey = `${fieldToDuplicate.key}_copy_${randomNumber}`;
        let newField = ({
          ...fieldToDuplicate,
          key: newKey,
        } as IField);
        newField = _set(newField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', newKey);
        state.activeSchema.fields.splice(fieldIndex + 1, 0, newField as any);
      }
    },
    setModeView: (state, action: PayloadAction<string>) => {
      state.modeView = action.payload;
    },
    sortFields: (state, action: PayloadAction<IField<any, any>[]>) => {
      state.activeSchema.fields = action.payload as any;
    },
    setIsOpenModalSelectSchema: (state, action: PayloadAction<boolean>) => {
      state.isOpenModalSelectSchema = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentTheme: (state, action: PayloadAction<any>) => {
      state.activeSchema.currentTheme = action.payload as any;
    },
    addItemFormManagers: (
      state,
      action: PayloadAction<{ lv: string, formInstance: TSubFormInManager }>,
    ) => {
      const { lv, formInstance } = action.payload;

      if (!state.formManagers[lv]) {
        state.formManagers[lv] = [action.payload.formInstance];
        return;
      }

      const index = state.formManagers[lv]
        ?.findIndex(({ key }) => action.payload.formInstance.key === key);

      if (index > -1) {
        state.formManagers[lv][index] = formInstance;
        return;
      }

      state.formManagers[lv].push(formInstance);
    },
    removeItemFormManagers: (
      state,
      action: PayloadAction<{ lv: string, key: string }>,
    ) => {
      const { lv } = action.payload;
      state.formManagers[lv] = state.formManagers[lv]
        .filter(({ key }) => action.payload.key !== key);
    },
    setThuTucHanhChinh: (
      state,
      action: PayloadAction,
    ) => {
      state.thuTucHanhChinh = action.payload;
    },
    setSltThuTucHanhChinh: (
      state,
      action: PayloadAction,
    ) => {
      state.sltThuTucHanhChinh = action.payload;
    },
    setActiveGiayToId: (
      state,
      action: PayloadAction,
    ) => {
      state.activeGiayToId = action.payload as any;
    },
    setFormDataInit: (
      state,
      action: PayloadAction,
    ) => {
      state.formDataInit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      schemaApi.endpoints.getSchemaDetail.matchFulfilled,
      (state, action: PayloadAction<JsonSchemaOutput>) => {
        state.activeSchema = Schema.reconcile(action.payload) as any;
      },
    );
    builder.addMatcher(
      schemaApi.endpoints.getForms.matchFulfilled,
      (state, action: PayloadAction<JsonSchema[]>) => {
        state.schemas = action.payload.map(({ fields, ...rest }) => new Schema({
          ...rest,
          fields: (fields as IField[]).map((field) => new Field(field)),
        }).toPlainObject() as any);
      },
    );
    builder.addMatcher(schemaApi.endpoints.deleteSchema.matchFulfilled, (state) => {
      state.activeSchema = initialState.activeSchema as any;
      state.isOpenModalSelectSchema = true;
    });
  },
});

export const {
  addNewField,
  removeField,
  addFieldAtPosition,
  addFieldByPositionFormStep,
  duplicateFieldInAContainer,
  duplicateField,
  setActiveFieldKey,
  setIsDuThao,
  setTrangThaiHoSoId,
  updateField,
  updateFieldInSubForm,
  setModeView,
  updateViewInfoKey,
  updateViewKey,
  sortFields,
  updateMultiFieldByPath,
  addFieldColumn,
  setSchema,
  replaceSubForm,
  replaceFields,
  setIsOpenModalSelectSchema,
  setSearchValue,
  setCurrentTheme,
  bulkAddField,
  addItemFormManagers,
  removeItemFormManagers,
  setSystemParameter,
  toggleOpenModalDigitalBuilder,
  setModalDigitalBuilderProps,
  setThuTucHanhChinh,
  setFormDataInit,
  setActiveGiayToId,
  setModalSltTthc,
  setSltThuTucHanhChinh
} = fromSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectIsDuThao = (state: RootState) => state.form.isDuThao;
export const selectTrangThaiHoSoId = (state: RootState) => state.form.trangThaiHoSoId;
export const selectActiveFields = (state: RootState) => state.form.activeSchema.fields;
export const selectActiveSchema = (state: RootState) => state.form.activeSchema;
export const selectModeView = (state: RootState) => state.form.modeView;
export const selectActiveConfigFieldKey = (state: RootState) => state.form.activeConfigFieldKey;
export const selectActiveFormKey = (state: RootState) => state.form.activeFormKey;
export const selectActiveGiayToId = (state: RootState) => state.form.activeGiayToId;

export const selectSchemas = (state: RootState) => state.form.schemas;

export const selectSystemParameter = (state: RootState) => state.form.systemParameters;

export const selectIsOpenModalDigitalBuilder = (state: RootState) => (
  state.form.isOpenModalDigitalBuilder
);

export const selectModalDigitalBuilderProps = (state: RootState) => (
  state.form.modalDigitalBuilderProps
);

export const selectFileUrlServer = (state: RootState) => getSystemParameterByMa(state.form.systemParameters, 'FileServerUrl');

export const selectSearchValue = (state: RootState) => state.form.searchValue;

export const selectTthc = (state: RootState) => state.form.thuTucHanhChinh;
export const selectSltTthc = (state: RootState) => state.form.sltThuTucHanhChinh;
export const selectIsOpenModalTthc = (state: RootState) => state.form.isOpenModalSltTthc;

export const selectIsOpenModalSelectSchema = (state: RootState) => (
  state.form.isOpenModalSelectSchema
);

export const selectFormDataInit = (state: RootState) => (
  state.form.formDataInit
);

export const formReducer = fromSlice.reducer;
