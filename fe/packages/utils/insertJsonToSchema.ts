import { FIELD_NAME } from "@packages/constants/fields";
import { createAsyncTableField } from "@packages/schema/fields/AsynTableField";
import { createAsyncCheckboxGroupField } from "@packages/schema/fields/AsyncCheckboxGroup";
import { createAsyncCheckboxWithInputField } from "@packages/schema/fields/AsyncCheckboxWithInputField";
import { createAsyncRadioField } from "@packages/schema/fields/AsyncRadioGroup";
import { createAsyncSelectField } from "@packages/schema/fields/AsyncSelectField";
import { createButtonField } from "@packages/schema/fields/ButtonField";
import { createButtonSyncDataToKhaiField } from "@packages/schema/fields/ButtonSyncDataToKhaiField";
import { createCMNDNumberField } from "@packages/schema/fields/CMNDNumberField";
import { createCapchaField } from "@packages/schema/fields/CapchaField";
import { createCheckboxToggleField } from "@packages/schema/fields/CheckBoxToggleField";
import { createCheckboxField } from "@packages/schema/fields/CheckboxField";
import { createCheckboxGroupField } from "@packages/schema/fields/CheckboxGroup";
import { createCheckboxWithInput } from "@packages/schema/fields/CheckboxWithInput";
import { createColumnField } from "@packages/schema/fields/ColumnField";
import { createCoordinateSelectField } from "@packages/schema/fields/CoordinateSelectField";
import { createDatePickerField } from "@packages/schema/fields/DatePickerField";
import { createDateTimePickerField } from "@packages/schema/fields/DateTimePickerField";
import { createViewDigitalSignatureField } from "@packages/schema/fields/DigitalSignatureField";
import { createViewDocumentField } from "@packages/schema/fields/DocumentField";
import { createEmailField } from "@packages/schema/fields/EmailField";
import { createEnvironmentalComponentField } from "@packages/schema/fields/EnvironmentalComponentField";
import { createFAddressField } from "@packages/schema/fields/FAddressField";
import { createFormStepField } from "@packages/schema/fields/FormStepField";
import { createGroupFields } from "@packages/schema/fields/GroupFields";
import { createGroupSelectField } from "@packages/schema/fields/GroupSelectField";
import { createHtmlField } from "@packages/schema/fields/HtmlField";
import { createInputFunctionField } from "@packages/schema/fields/InputFunctionField";
import { createInputNumberField } from "@packages/schema/fields/InputNumberField";
import { createInputNumberRangeField } from "@packages/schema/fields/InputNumberRangeField";
import { createInputSearchField } from "@packages/schema/fields/InputSearchField";
import { createInputUnitField } from "@packages/schema/fields/InputUnitField";
import { createInputWithUploadField } from "@packages/schema/fields/InputWithUploadField";
import { createMSTNumberField } from "@packages/schema/fields/MSTNumberField";
import { createModalGetInfo } from "@packages/schema/fields/ModalGetInfoField";
import { createMucDichKhaiThacSDField } from "@packages/schema/fields/MucDichKhaiThacSDField";
import { createNotSupportField } from "@packages/schema/fields/NotSupportField";
import { createPasswordField } from "@packages/schema/fields/PasswordField";
import { createPhoneNumberField } from "@packages/schema/fields/PhoneNumberField";
import { createRadioGroupField } from "@packages/schema/fields/RadioGroupField";
import { createRangepickerField } from "@packages/schema/fields/RangepickerField";
import { createSelectField } from "@packages/schema/fields/SelectField";
import { createSelectFileField } from "@packages/schema/fields/SelectFile";
import { createSelectShowConditionFormField } from "@packages/schema/fields/SelectShowConditionFormField";
import { createTABLE_DANH_MUC_1Field } from "@packages/schema/fields/TABLE_DANH_MUC_1Field";
import { createTREE_SELECTField } from "@packages/schema/fields/TREE_SELECTField";
import { createFormTabField } from "@packages/schema/fields/TabField";
import { createTableDatDai13BField } from "@packages/schema/fields/TableDatDai13BField";
import { createTableDatDai13CField } from "@packages/schema/fields/TableDatDai13CField";
import { createTableDatDai13DField } from "@packages/schema/fields/TableDatDai13DField";
import { createSchemaTable } from "@packages/schema/fields/TableField";
import { createTableGroupField } from "@packages/schema/fields/TableGroupField";
import { createTableHanNgachField } from "@packages/schema/fields/TableHanNgachField";
import { createTableKhoangSanField } from "@packages/schema/fields/TableKhoangSanField";
import { createTableTabKhoangSanField } from "@packages/schema/fields/TableTabKhoangSanField";
import { createTableTabKhoangSan_2Field } from "@packages/schema/fields/TableTabKhoangSan_2Field";
import { createTableVeterinary1Field } from "@packages/schema/fields/TableVeterinary1Field";
import { createInputAreaField } from "@packages/schema/fields/TextAreaField";
import { createTextField } from "@packages/schema/fields/TextField";
import { createInputField } from "@packages/schema/fields/TextInputField";
import { createFieldTableSingle } from "@packages/schema/fields/TextTableSingleField";
import { createUploadField } from "@packages/schema/fields/UploadField";
import { createViewAmendingContent } from "@packages/schema/fields/ViewAmendingContent";
import { createViewAmendingContentAdvance } from "@packages/schema/fields/ViewAmendingContentAdvance";
import { createViewButtonTraCuuGiayPhepField } from "@packages/schema/fields/ViewButtonTraCuuGiayPhepField";
import { createViewDoDacProductField } from "@packages/schema/fields/ViewDoDacProductField";
import { createViewDuAnField } from "@packages/schema/fields/ViewDuAnField";
import { createViewInfo } from "@packages/schema/fields/ViewInfo";
import { createViewInfoHiddenField } from "@packages/schema/fields/ViewInfoHiddenField";
import { createViewInputBoSungHsField } from "@packages/schema/fields/ViewInputBoSungHsField";

import { createTableCapitalContribution } from "@packages/schema/fields/TableCapitalContribution";
import { createTableCapitalLending } from "@packages/schema/fields/TableCapitalLending";
import { createTableFinancial } from "@packages/schema/fields/TableFinancial";
import { createTableProfit } from "@packages/schema/fields/TableProfit";
import { createViewContentProject } from "@packages/schema/fields/ViewContentProject";
import { createViewInvestmentCapital } from "@packages/schema/fields/ViewInvestmentCapital";
import { createViewInvestor } from "@packages/schema/fields/ViewInvestor";
import { createViewInvestorBase } from "@packages/schema/fields/ViewInvestorBase";
import { createViewInvestorCheckbox } from "@packages/schema/fields/ViewInvestorCheckbox";
import { createViewInvestorCheckboxV2 } from "@packages/schema/fields/ViewInvestorCheckboxV2";
import { createViewInvestorProject } from "@packages/schema/fields/ViewInvestorProject";
import { createViewInvestorShorten } from "@packages/schema/fields/ViewInvestorShorten";
import { createViewInvestorTable } from "@packages/schema/fields/ViewInvestorTable";
import { createViewProject } from "@packages/schema/fields/ViewProject";
import { createViewProjectAdvance } from "@packages/schema/fields/ViewProjectAdvance";
import { Field } from "@packages/schema/fields/fieldModel";
import { AnyObject } from "antd/es/_util/type";

export const GENERATE_JSON_FUNCTIONS = {
  [FIELD_NAME.F_ADDRESS]: createFAddressField,
  [FIELD_NAME.INPUT]: createInputField,
  [FIELD_NAME.TEXTAREA]: createInputAreaField,
  [FIELD_NAME.BUTTON]: createButtonField,
  [FIELD_NAME.CAPTCHA]: createCapchaField,
  [FIELD_NAME.INPUT_PASSWORD]: createPasswordField,
  [FIELD_NAME.NOT_SUPPORT]: createNotSupportField,
  [FIELD_NAME.SELECT]: createSelectField,
  [FIELD_NAME.INPUT_NUMBER]: createInputNumberField,
  [FIELD_NAME.COLUMN_FIELD]: createColumnField,
  [FIELD_NAME.RADIO_GROUP]: createRadioGroupField,
  [FIELD_NAME.TABLE]: createSchemaTable,
  [FIELD_NAME.TABLE_PROFIT]: createTableProfit,
  [FIELD_NAME.TABLE_CAPITAL_CONTRIBUTION]: createTableCapitalContribution,
  [FIELD_NAME.TABLE_CAPITAL_LENDING]: createTableCapitalLending,
  [FIELD_NAME.TABLE_FINANCIAL]: createTableFinancial,
  [FIELD_NAME.FIELD_TABLE_SINGLE]: createFieldTableSingle,
  [FIELD_NAME.TEXT_VIEW]: createTextField,
  [FIELD_NAME.HTML_VIEW]: createHtmlField,
  [FIELD_NAME.UPLOAD]: createUploadField,
  [FIELD_NAME.DATE_PICKER]: createDatePickerField,
  [FIELD_NAME.DATETIME_PICKER]: createDateTimePickerField,
  [FIELD_NAME.ASYNC_SELECT]: createAsyncSelectField,
  [FIELD_NAME.CHECK_BOX]: createCheckboxField,
  [FIELD_NAME.ASYNC_RADIO_GROUP]: createAsyncRadioField,
  [FIELD_NAME.CHECKBOX_GROUP]: createCheckboxGroupField,
  [FIELD_NAME.ASYNC_CHECKBOX_GROUP]: createAsyncCheckboxGroupField,
  [FIELD_NAME.FORM_STEP]: createFormStepField,
  [FIELD_NAME.TAB]: createFormTabField,
  [FIELD_NAME.VIEW_INFO]: createViewInfo,
  [FIELD_NAME.VIEW_INVESTOR]: createViewInvestor,
  [FIELD_NAME.VIEW_INVESTOR_SHORTEN]: createViewInvestorShorten,
  [FIELD_NAME.VIEW_INVESTOR_PROJECT]: createViewInvestorProject,
  [FIELD_NAME.VIEW_INVESTOR_BASE]: createViewInvestorBase,
  [FIELD_NAME.VIEW_INVESTOR_BASE_V2]: createViewInvestorBase,
  [FIELD_NAME.CONTENT_PROJECT]: createViewContentProject,
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX]: createViewInvestorCheckbox,
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX_V2]: createViewInvestorCheckboxV2,
  [FIELD_NAME.VIEW_INVESTOR_TABLE]: createViewInvestorTable,
  [FIELD_NAME.VIEW_PROJECT]: createViewProject,
  [FIELD_NAME.VIEW_PROJECT_ADVANCE]: createViewProjectAdvance,
  [FIELD_NAME.VIEW_AMENDING_CONTENT]: createViewAmendingContent,
  [FIELD_NAME.VIEW_AMENDING_CONTENT_ADVANCE]: createViewAmendingContentAdvance,
  [FIELD_NAME.VIEW_SELECT_FILE]: createSelectFileField,
  [FIELD_NAME.CHECKBOX_WITH_INPUT]: createCheckboxWithInput,
  [FIELD_NAME.CHECKBOX_TOGGLE]: createCheckboxToggleField,
  [FIELD_NAME.GROUP_FIELDS]: createGroupFields,
  [FIELD_NAME.ASYNC_TABLE]: createAsyncTableField,
  [FIELD_NAME.VIEW_DOCUMENT]: createViewDocumentField,
  [FIELD_NAME.DIGITAL_SIGNATURE]: createViewDigitalSignatureField,
  [FIELD_NAME.TREE_SELECT]: createTREE_SELECTField,
  [FIELD_NAME.TABLE_DANH_MUC_1]: createTABLE_DANH_MUC_1Field,
  [FIELD_NAME.VIEW_BUTTON_TRA_CUU_GIAY_PHEP]:
    createViewButtonTraCuuGiayPhepField,
  [FIELD_NAME.TABLE_VETERINARY1]: createTableVeterinary1Field,
  [FIELD_NAME.INPUT_NUMBER_RANGE]: createInputNumberRangeField,
  [FIELD_NAME.VIEW_INFO_HIDDEN]: createViewInfoHiddenField,
  [FIELD_NAME.BUTTON_SYNC_DATA_TO_KHAI]: createButtonSyncDataToKhaiField,
  [FIELD_NAME.MUC_DICH_KHAI_THAC_SD]: createMucDichKhaiThacSDField,
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN_2]: createTableTabKhoangSan_2Field,
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN]: createTableTabKhoangSanField,
  [FIELD_NAME.CMND_NUMBER]: createCMNDNumberField,
  [FIELD_NAME.MST_NUMBER]: createMSTNumberField,
  [FIELD_NAME.EMAIL]: createEmailField,
  [FIELD_NAME.PHONE_NUMBER]: createPhoneNumberField,
  [FIELD_NAME.TABLE_KHOANG_SAN]: createTableKhoangSanField,
  [FIELD_NAME.RANGEPICKER]: createRangepickerField,
  [FIELD_NAME.INPUT_WITH_UPLOAD]: createInputWithUploadField,
  [FIELD_NAME.TABLE_DAT_DAI13D]: createTableDatDai13DField,
  [FIELD_NAME.TABLE_DAT_DAI13C]: createTableDatDai13CField,
  [FIELD_NAME.TABLE_DAT_DAI13B]: createTableDatDai13BField,
  [FIELD_NAME.TABLE_HAN_NGACH]: createTableHanNgachField,
  [FIELD_NAME.TABLE_GROUP]: createTableGroupField,
  [FIELD_NAME.VIEW_DO_DAC_PRODUCT]: createViewDoDacProductField,
  [FIELD_NAME.INPUT_FUNCTION]: createInputFunctionField,
  [FIELD_NAME.COORDINATE_SELECT]: createCoordinateSelectField,
  [FIELD_NAME.ENVIRONMENTAL_COMPONENT]: createEnvironmentalComponentField,
  [FIELD_NAME.INPUT_SEARCH]: createInputSearchField,
  [FIELD_NAME.ASYNC_CHECKBOX_WITH_INPUT]: createAsyncCheckboxWithInputField,
  [FIELD_NAME.INPUT_UNIT]: createInputUnitField,
  [FIELD_NAME.VIEW_INPUT_BO_SUNG_HS]: createViewInputBoSungHsField,
  [FIELD_NAME.VIEW_DU_AN]: createViewDuAnField,
  [FIELD_NAME.GROUP_SELECT]: createGroupSelectField,
  [FIELD_NAME.VIEW_INVESTMENT_CAPITAL]: createViewInvestmentCapital,
  [FIELD_NAME.MODAL_GET_INFO]: createModalGetInfo,
  [FIELD_NAME.REFERENCES_FIELD]: createInputField,
  [FIELD_NAME.SELECT_CONDITION_SHOW_FORM]: createSelectShowConditionFormField,
};

export const insertJsonToSchema = (
  componentName: string,
  extraFieldConfig: AnyObject = {},
): any => {
  const transformFunc = GENERATE_JSON_FUNCTIONS[componentName] as any;

  if (transformFunc) {
    try {
      const field = transformFunc(extraFieldConfig);
      Field.isValid(field);
      return field;
    } catch (error: any) {
      return (GENERATE_JSON_FUNCTIONS[FIELD_NAME.NOT_SUPPORT] as any)(
        error.message,
      );
    }
  }

  return GENERATE_JSON_FUNCTIONS[FIELD_NAME.NOT_SUPPORT]();
};
