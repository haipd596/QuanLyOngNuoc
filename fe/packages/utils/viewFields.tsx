import FAddress from "@packages/components/FAddress";
import NotSupport from "@packages/components/NotSupport";
import { Form, Input, InputNumber } from "antd";
import React, { lazy } from "react";
import { stringToFunc } from "./common";

import { TItemBuilderBar } from "@packages/@types";
import {
  CMNDNumberIcon,
  EmailIcon,
  EnvironmentalComponentIcon,
  GroupSelectIcon,
  IconCoordinate,
  InputFunctionIcon,
  InputSearchIcon,
  InputUnitIcon,
  InputWithUploadIcon,
  MucDichKhaiThacSDIcon,
  PhoneNumberIcon,
  RangepickerIcon,
  TABLE_DANH_MUC_1Icon,
  TREE_SELECTIcon,
  TableDatDai13BIcon,
  TableDatDai13CIcon,
  TableDatDai13DIcon,
  TableGroupIcon,
  TableHanNgachIcon,
  TableKhoangSanIcon,
  TableTabKhoangSanIcon,
  TableTabKhoangSan_2Icon,
  ViewButtonTraCuuGiayPhepIcon,
  ViewDuAnIcon,
  ViewInputBoSungHsIcon,
  asyncSelectIcon,
  buttonIcon,
  captchaIcon,
  checkboxIcon,
  checkbox_async,
  checkbox_input,
  checkbox_single,
  checkbox_toggle,
  columnFieldIcon,
  dateIcon,
  digitalSignatureIcon,
  do_dac_product,
  fAddressIcon,
  form as formIcon,
  groupFieldIcon,
  htmlViewIcon,
  inputIcon,
  inputNumberIcon,
  inputNumberRange,
  inputPasswordIcon,
  modalGetInfoIcon,
  notificationIcon,
  radio_async,
  radio_group,
  selectFileIcon,
  selectIcon,
  select_to_show_condition,
  separatorIcon,
  spacerIcon,
  tabIcon,
  tableIcon,
  tableVeterinaryIcon,
  templateIcon,
  templateIconDuThao,
  text_viewIcon,
  textareaIcon,
  timeIcon,
  uploadIcon,
  viewDocumentIcon,
  viewInfoIcon,
} from "@packages/assets/icons";
// import TableTabKhoangSanViewer from '@packages/components/View/TableTabKhoangSan/Viewer';
import { ViewCapchaField } from "@packages/components/View/ViewCapchaField";
import ViewDuAnBuider from "@packages/components/View/ViewDuAn/Builder";
import ViewDuAnViewer from "@packages/components/View/ViewDuAn/Viewer";
import BuilderInvestorCheckboxV2 from "@packages/components/View/ViewInvestorCheckboxV2/Builder";
import { FIELD_NAME } from "@packages/constants/fields";
import { TEMPLATE_NAME } from "@packages/constants/template";
import vi from "../locales/vi/translation.json";
import { omitRedundantFieldProps } from "./omitProps";
import { isDetailsMode, isViewMode, isViewOrDetailMode } from "./viewMode";

const BuilderCheckBoxToggle = lazy(
  () => import("@packages/components/View/CheckboxToggle/Builder"),
);
const ViewCheckboxToggle = lazy(
  () => import("@packages/components/View/CheckboxToggle/Viewer"),
);
const ViewDateTimePicker = lazy(
  () => import("@packages/components/View/ViewDateTimePicker"),
);
const ViewSelectFileFields = lazy(
  () => import("@packages/components/View/ViewSelectFileFields"),
);
const ViewFormStepViewer = lazy(
  () => import("@packages/components/View/FormStep/Viewer"),
);
const ViewFormStepBuilder = lazy(
  () => import("@packages/components/View/FormStep/Builder"),
);
const ViewFormTabBuilder = lazy(
  () => import("@packages/components/View/ViewTab/Builder"),
);
const ViewFormTab = lazy(
  () => import("@packages/components/View/ViewTab/Viewer"),
);
const ViewFormTableBuilder = lazy(
  () => import("@packages/components/View/ViewTable/FormTableBuilder"),
);
const ViewFormTable = lazy(
  () => import("@packages/components/View/ViewTable/FormTableView"),
);
const ViewAsyncCheckboxGroup = lazy(
  () => import("@packages/components/View/ViewAsyncCheckBoxGroup"),
);
const ViewAsyncRadioGroup = lazy(
  () => import("@packages/components/View/ViewAsyncRadioGroup"),
);
const ViewCheckbox = lazy(
  () => import("@packages/components/View/ViewCheckbox"),
);
const ViewAsyncSelect = lazy(
  () => import("@packages/components/View/ViewAsyncSelect"),
);
const ViewDatePicker = lazy(
  () => import("@packages/components/View/ViewDatePicker"),
);
const ViewUpload = lazy(() => import("@packages/components/View/ViewUpload"));
const ViewFormBuilderFieldTableSingle = lazy(
  () =>
    import("@packages/components/View/ViewFieldTableSingle/BuilderFieldTableSingle"),
);
const ViewerFieldTableSingle = lazy(
  () =>
    import("@packages/components/View/ViewFieldTableSingle/ViewerFieldTableSingle"),
);
const ViewText = lazy(() => import("@packages/components/View/ViewText"));
const ViewHtml = lazy(() => import("@packages/components/View/ViewHtml"));

const ViewCheckboxGroup = lazy(
  () => import("@packages/components/View/ViewCheckboxGroup"),
);
const ViewButton = lazy(() => import("@packages/components/View/ViewButton"));
const ViewRadioGroup = lazy(
  () => import("@packages/components/View/ViewRadioGroup"),
);
const ViewPasswordField = lazy(
  () => import("@packages/components/View/ViewPasswordField"),
);
const ColumnFieldsBuilder = lazy(
  () => import("@packages/components/View/ColumnFields/Builder"),
);
const ColumnFieldsViewer = lazy(
  () => import("@packages/components/View/ColumnFields/Viewer"),
);
const ViewSelect = lazy(() => import("@packages/components/View/ViewSelect"));
const ViewerInfo = lazy(
  () => import("@packages/components/View/ViewInfo/Viewer"),
);
const BuilderInfo = lazy(
  () => import("@packages/components/View/ViewInfo/Builder"),
);
const ViewerInvestor = lazy(
  () => import("@packages/components/View/ViewInvestor/Viewer"),
);
const BuilderInvestor = lazy(
  () => import("@packages/components/View/ViewInvestor/Builder"),
);
const ViewerInvestorShorten = lazy(
  () => import("@packages/components/View/ViewInvestorShorten/Viewer"),
);
const BuilderInvestorShorten = lazy(
  () => import("@packages/components/View/ViewInvestorShorten/Builder"),
);
const ViewerInvestorProject = lazy(
  () => import("@packages/components/View/ViewInvestorProject/Viewer"),
);
const BuilderInvestorProject = lazy(
  () => import("@packages/components/View/ViewInvestorProject/Builder"),
);

const ViewerInvestorBaseV2 = lazy(
  () => import("@packages/components/View/ViewInvestorBaseV2/Viewer"),
);
const BuilderInvestorBaseV2 = lazy(
  () => import("@packages/components/View/ViewInvestorBaseV2/Builder"),
);

const ViewerInvestorBase = lazy(
  () => import("@packages/components/View/ViewInvestorBase/Viewer"),
);
const BuilderInvestorBase = lazy(
  () => import("@packages/components/View/ViewInvestorBase/Builder"),
);
const ViewerInvestorCheckbox = lazy(
  () => import("@packages/components/View/ViewInvestorCheckbox/Viewer"),
);
const ViewerInvestorCheckboxV2 = lazy(
  () => import("@packages/components/View/ViewInvestorCheckboxV2/Viewer"),
);
const BuilderInvestorCheckbox = lazy(
  () => import("@packages/components/View/ViewInvestorCheckbox/Builder"),
);
const ViewerInvestorTable = lazy(
  () => import("@packages/components/View/ViewInvestorTable/Viewer"),
);
const BuilderInvestorTable = lazy(
  () => import("@packages/components/View/ViewInvestorTable/Builder"),
);
const ViewerProject = lazy(
  () => import("@packages/components/View/ViewProject/Viewer"),
);
const BuilderProject = lazy(
  () => import("@packages/components/View/ViewProject/Builder"),
);
const ViewerProjectAdvance = lazy(
  () => import("@packages/components/View/ViewProjectAdvance/Viewer"),
);
const BuilderProjectAdvance = lazy(
  () => import("@packages/components/View/ViewProjectAdvance/Builder"),
);
const ViewerAmendingContent = lazy(
  () => import("@packages/components/View/ViewAmendingContent/Viewer"),
);
const BuilderAmendingContent = lazy(
  () => import("@packages/components/View/ViewAmendingContent/Builder"),
);
const ViewerAmendingContentAdvance = lazy(
  () => import("@packages/components/View/ViewAmendingContentAdvance/Viewer"),
);
const BuilderAmendingContentAdvance = lazy(
  () => import("@packages/components/View/ViewAmendingContentAdvance/Builder"),
);
const ViewerInvestmentCapital = lazy(
  () => import("@packages/components/View/ViewInvestmentCapital/Viewer"),
);
const BuilderInvestmentCapital = lazy(
  () => import("@packages/components/View/ViewInvestmentCapital/Builder"),
);
const ViewerContentProject = lazy(
  () => import("@packages/components/View/ViewContentProject/Viewer"),
);
const BuilderContentProject = lazy(
  () => import("@packages/components/View/ViewContentProject/Builder"),
);

const BuilderCheckboxWithInput = lazy(
  () => import("@packages/components/View/ViewCheckboxWithInput/Builder"),
);
const ViewerCheckboxWithInput = lazy(
  () => import("@packages/components/View/ViewCheckboxWithInput/Viewer"),
);
const GroupFieldViewer = lazy(
  () => import("@packages/components/View/GroupFields/Viewer"),
);
const GroupFieldBuilder = lazy(
  () => import("@packages/components/View/GroupFields/Builder"),
);
const AsyncTableViewer = lazy(
  () => import("@packages/components/View/AsyncTable/Viewer"),
);
const AsyncTableBuilder = lazy(
  () => import("@packages/components/View/AsyncTable/Builder"),
);
const BuilderDocument = lazy(
  () => import("@packages/components/View/ViewDocument/Builder"),
);
const ViewerDocument = lazy(
  () => import("@packages/components/View/ViewDocument/Viewer"),
);
const ModalGetInfoViewer = lazy(
  () => import("@packages/components/View/ModalGetInfo/Viewer"),
);
const ViewerDigitalSignature = lazy(
  () => import("@packages/components/View/ViewDigitalSignature/Viewer"),
);
const ViewerGroupSelect = lazy(
  () => import("@packages/components/View/GroupSelect/Viewer"),
);
const ViewerInputBoSungHs = lazy(
  () => import("@packages/components/View/ViewInputBoSungHs/Viewer"),
);

const InputUnitViewer = lazy(
  () => import("@packages/components/View/InputUnit/Viewer"),
);
const InputUnitBuilder = lazy(
  () => import("@packages/components/View/InputUnit/Builder"),
);
const ViewAsyncCheckboxWithInput = lazy(
  () => import("@packages/components/View/AsyncCheckboxWithInput/Viewer"),
);
const ViewInputSearch = lazy(
  () => import("@packages/components/View/InputSearch/Viewer"),
);
const BuildInputSearch = lazy(
  () => import("@packages/components/View/InputSearch/Builder"),
);
const ViewEnvironmental = lazy(
  () => import("@packages/components/View/ViewEnvironmental/Viewer"),
);
const BuilderSelectConditionShowForms = lazy(
  () => import("@packages/components/View/SelectConditionShowForms/Builder"),
);
const ViewSelectConditionShowForms = lazy(
  () => import("@packages/components/View/SelectConditionShowForms/Viewer"),
);
// const BuilderGroupSelect = lazy(() => import('@packages/components/View/GroupSelect/Builder'));

// generated by code import
const TREE_SELECTViewer = lazy(
  () => import("@packages/components/View/TREE_SELECT/Viewer"),
);
const TREE_SELECTBuilder = lazy(
  () => import("@packages/components/View/TREE_SELECT/Builder"),
);
const TABLE_DANH_MUC_1Viewer = lazy(
  () => import("@packages/components/View/TABLE_DANH_MUC_1/Viewer"),
);
const TABLE_DANH_MUC_1Builder = lazy(
  () => import("@packages/components/View/TABLE_DANH_MUC_1/Builder"),
);
const ViewButtonTraCuuGiayPhepViewer = lazy(
  () => import("@packages/components/View/ViewButtonTraCuuGiayPhep/Viewer"),
);
const ViewButtonTraCuuGiayPhepBuilder = lazy(
  () => import("@packages/components/View/ViewButtonTraCuuGiayPhep/Builder"),
);
const TableVeterinary1Viewer = lazy(
  () => import("@packages/components/View/TableVeterinary1/Viewer"),
);
const TableVeterinary1Builder = lazy(
  () => import("@packages/components/View/TableVeterinary1/Builder"),
);
const InputNumberRangeViewer = lazy(
  () => import("@packages/components/View/InputNumberRange/Viewer"),
);
const InputNumberRangeBuilder = lazy(
  () => import("@packages/components/View/InputNumberRange/Builder"),
);

const ViewInfoHiddenViewer = lazy(
  () => import("@packages/components/View/ViewInfoHidden/Viewer"),
);
const ButtonSyncDataToKhaiViewer = lazy(
  () => import("@packages/components/View/ButtonSyncDataToKhai/Viewer"),
);
const ButtonSyncDataToKhaiBuilder = lazy(
  () => import("@packages/components/View/ButtonSyncDataToKhai/Builder"),
);
const MucDichKhaiThacSDViewer = lazy(
  () => import("@packages/components/View/MucDichKhaiThacSD/Viewer"),
);
const MucDichKhaiThacSDBuilder = lazy(
  () => import("@packages/components/View/MucDichKhaiThacSD/Builder"),
);
const TableTabKhoangSan2Viewer = lazy(
  () => import("@packages/components/View/TableTabKhoangSan_2/Viewer"),
);
const TableTabKhoangSan2Builder = lazy(
  () => import("@packages/components/View/TableTabKhoangSan_2/Builder"),
);
const TableTabKhoangSanViewer = lazy(
  () => import("@packages/components/View/TableTabKhoangSan/Viewer"),
);
const TableTabKhoangSanBuilder = lazy(
  () => import("@packages/components/View/TableTabKhoangSan/Builder"),
);
const CMNDNumberViewer = lazy(
  () => import("@packages/components/View/CMNDNumber/Viewer"),
);
const CMNDNumberBuilder = lazy(
  () => import("@packages/components/View/CMNDNumber/Builder"),
);
const MSTNumberViewer = lazy(
  () => import("@packages/components/View/MSTNumber/Viewer"),
);
const MSTNumberBuilder = lazy(
  () => import("@packages/components/View/MSTNumber/Builder"),
);

const EmailViewer = lazy(
  () => import("@packages/components/View/Email/Viewer"),
);
const EmailBuilder = lazy(
  () => import("@packages/components/View/Email/Builder"),
);
const PhoneNumberViewer = lazy(
  () => import("@packages/components/View/PhoneNumber/Viewer"),
);
const PhoneNumberBuilder = lazy(
  () => import("@packages/components/View/PhoneNumber/Builder"),
);
const TableKhoangSanViewer = lazy(
  () => import("@packages/components/View/TableKhoangSan/Viewer"),
);
const TableKhoangSanBuilder = lazy(
  () => import("@packages/components/View/TableKhoangSan/Builder"),
);
const RangepickerViewer = lazy(
  () => import("@packages/components/View/Rangepicker/Viewer"),
);
const RangepickerBuilder = lazy(
  () => import("@packages/components/View/Rangepicker/Builder"),
);

const InputWithUploadViewer = lazy(
  () => import("@packages/components/View/InputWithUpload/Viewer"),
);
const InputWithUploadBuilder = lazy(
  () => import("@packages/components/View/InputWithUpload/Builder"),
);
const TableDatDai13DViewer = lazy(
  () => import("@packages/components/View/TableDatDai13D/Viewer"),
);
const TableDatDai13DBuilder = lazy(
  () => import("@packages/components/View/TableDatDai13D/Builder"),
);
const TableDatDai13CViewer = lazy(
  () => import("@packages/components/View/TableDatDai13C/Viewer"),
);
const TableDatDai13CBuilder = lazy(
  () => import("@packages/components/View/TableDatDai13C/Builder"),
);
const TableDatDai13BViewer = lazy(
  () => import("@packages/components/View/TableDatDai13B/Viewer"),
);
const TableDatDai13BBuilder = lazy(
  () => import("@packages/components/View/TableDatDai13B/Builder"),
);

const TableHanNgachViewer = lazy(
  () => import("@packages/components/View/TableHanNgach/Viewer"),
);
const TableHanNgachBuilder = lazy(
  () => import("@packages/components/View/TableHanNgach/Builder"),
);
const TableGroupViewer = lazy(
  () => import("@packages/components/View/TableGroup/Viewer"),
);
const TableGroupBuilder = lazy(
  () => import("@packages/components/View/TableGroup/Builder"),
);
const ViewDoDacProductViewer = lazy(
  () => import("@packages/components/View/ViewDoDacProduct/Viewer"),
);
const ViewDoDacProductBuilder = lazy(
  () => import("@packages/components/View/ViewDoDacProduct/Builder"),
);
const InputFunctionViewer = lazy(
  () => import("@packages/components/View/InputFunction/Viewer"),
);
const InputFunctionBuilder = lazy(
  () => import("@packages/components/View/InputFunction/Builder"),
);
const CoordinateSelectViewer = lazy(
  () => import("@packages/components/View/CoordinateSelect/Viewer"),
);

const TableProfitViewer = lazy(
  () => import("@packages/components/View/TableProfit/Viewer/Index"),
);
const TableProfitBuilder = lazy(
  () => import("@packages/components/View/TableProfit/Builder"),
);
const TableCapitalContributionViewer = lazy(
  () =>
    import("@packages/components/View/TableCapitalContribution/Viewer/Index"),
);
const TableCapitalContributionProfitBuilder = lazy(
  () => import("@packages/components/View/TableCapitalContribution/Builder"),
);
const TableCapitalLendingViewer = lazy(
  () => import("@packages/components/View/TableCapitalLending/Viewer/Index"),
);
const TableCapitalLendingBuilder = lazy(
  () => import("@packages/components/View/TableCapitalLending/Builder"),
);
const TableFinancialViewer = lazy(
  () => import("@packages/components/View/TableFinancial/Viewer/Index"),
);
const TableFinancialBuilder = lazy(
  () => import("@packages/components/View/TableFinancial/Builder"),
);

// [X] Object which contains fields categories
export const CATEGORIES = {
  FAVORITE: "FAVORITE_CAT", // Non-collapsed by default
  INPUT_CAT: "INPUT_CAT",
  SELECTION: "SELECTION_CAT",
  CONTAINERS: "CONTAINERS_CAT",
  ACTION: "ACTION_CAT",
  ASYNC: "ASYNC_CAT",
  PRESENTATION: "PRESENTATION_CAT",
  OTHER: "OTHER_CAT",
  TEMPLATE: "TEMPLATE",
  DICH_VU_CONG: "DICH_VU_CONG",
  DAT_DAI: "DAT_DAI",
  // THU_Y: 'THU_Y',
};
export const CATEGORIES_VI = {
  CONTAINERS: vi.group_1_title,
  INPUT: vi.group_2_title,
  SELECTION: vi.group_3_title,
  ASYNC: vi.group_4_title,
  PRESENTATION: vi.group_5_title,
  ACTION: vi.group_6_title,
  TEMPLATE: vi.group_7_title,
};

// [x] Assign icon to each field
export const FIELD_NAME_TO_ICON = {
  [FIELD_NAME.F_ADDRESS]: fAddressIcon,
  [FIELD_NAME.INPUT]: inputIcon,
  [FIELD_NAME.PHONE_NUMBER]: PhoneNumberIcon,
  [FIELD_NAME.CMND_NUMBER]: CMNDNumberIcon,
  [FIELD_NAME.MST_NUMBER]: inputNumberIcon,
  [FIELD_NAME.EMAIL]: EmailIcon,
  [FIELD_NAME.INPUT_PASSWORD]: inputPasswordIcon,
  [FIELD_NAME.TEXT_VIEW]: text_viewIcon,
  [FIELD_NAME.TEXT_VIEW]: text_viewIcon,
  [FIELD_NAME.UPLOAD]: uploadIcon,
  [FIELD_NAME.BUTTON]: buttonIcon,
  [FIELD_NAME.SELECT]: selectIcon,
  [FIELD_NAME.INPUT_NUMBER]: inputNumberIcon,
  [FIELD_NAME.COLUMN_FIELD]: columnFieldIcon,
  [FIELD_NAME.TABLE]: tableIcon,
  [FIELD_NAME.TABLE_PROFIT]: tableIcon,
  [FIELD_NAME.TABLE_CAPITAL_CONTRIBUTION]: tableIcon,
  [FIELD_NAME.TABLE_CAPITAL_LENDING]: tableIcon,
  [FIELD_NAME.TABLE_FINANCIAL]: tableIcon,
  [FIELD_NAME.FIELD_TABLE_SINGLE]: tableIcon,
  [FIELD_NAME.ASYNC_TABLE]: tableIcon,
  [FIELD_NAME.TABLE_GROUP]: TableGroupIcon,
  [FIELD_NAME.RADIO_GROUP]: radio_group,
  [FIELD_NAME.ASYNC_RADIO_GROUP]: radio_async,
  [FIELD_NAME.ASYNC_SELECT]: asyncSelectIcon,
  [FIELD_NAME.MODAL_GET_INFO]: modalGetInfoIcon,
  [FIELD_NAME.CHECK_BOX]: checkbox_single,
  [FIELD_NAME.CHECKBOX_GROUP]: checkboxIcon,
  [FIELD_NAME.ASYNC_CHECKBOX_GROUP]: checkbox_async,
  [FIELD_NAME.CHECKBOX_TOGGLE]: checkbox_toggle,
  [FIELD_NAME.SELECT_CONDITION_SHOW_FORM]: select_to_show_condition,
  [FIELD_NAME.FORM_STEP]: formIcon,
  [FIELD_NAME.CAPTCHA]: captchaIcon,
  [FIELD_NAME.TAB]: tabIcon,
  [FIELD_NAME.TEXTAREA]: textareaIcon,
  [FIELD_NAME.VIEW_INFO]: viewInfoIcon,
  [FIELD_NAME.VIEW_INVESTOR]: viewInfoIcon,
  [FIELD_NAME.VIEW_INVESTOR_SHORTEN]: viewInfoIcon,
  [FIELD_NAME.VIEW_INVESTOR_PROJECT]: viewInfoIcon,
  [FIELD_NAME.VIEW_INVESTOR_BASE]: viewInfoIcon,
  [FIELD_NAME.VIEW_INVESTOR_BASE_V2]: viewInfoIcon,
  [FIELD_NAME.CONTENT_PROJECT]: viewInfoIcon,
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX]: viewInfoIcon,
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX_V2]: viewInfoIcon,
  [FIELD_NAME.VIEW_INVESTOR_TABLE]: viewInfoIcon,
  [FIELD_NAME.VIEW_PROJECT]: viewInfoIcon,
  [FIELD_NAME.VIEW_PROJECT_ADVANCE]: viewDocumentIcon,
  [FIELD_NAME.VIEW_AMENDING_CONTENT]: viewInfoIcon,
  [FIELD_NAME.VIEW_AMENDING_CONTENT_ADVANCE]: viewInfoIcon,
  [FIELD_NAME.VIEW_DOCUMENT]: viewDocumentIcon,
  [FIELD_NAME.DIGITAL_SIGNATURE]: digitalSignatureIcon,
  [FIELD_NAME.CHECKBOX_WITH_INPUT]: checkbox_input,
  [FIELD_NAME.VIEW_SELECT_FILE]: selectFileIcon,
  [FIELD_NAME.GROUP_FIELDS]: groupFieldIcon,
  [FIELD_NAME.GROUP_SELECT]: GroupSelectIcon,
  [FIELD_NAME.VIEW_DU_AN]: ViewDuAnIcon,
  [FIELD_NAME.VIEW_INVESTMENT_CAPITAL]: viewInfoIcon,
  [FIELD_NAME.VIEW_INPUT_BO_SUNG_HS]: ViewInputBoSungHsIcon,
  [FIELD_NAME.ASYNC_CHECKBOX_WITH_INPUT]: checkbox_input,
  [FIELD_NAME.INPUT_SEARCH]: InputSearchIcon,
  [FIELD_NAME.INPUT_FUNCTION]: InputFunctionIcon,
  [FIELD_NAME.COORDINATE_SELECT]: IconCoordinate,
  [FIELD_NAME.VIEW_DO_DAC_PRODUCT]: do_dac_product,
  [FIELD_NAME.TABLE_HAN_NGACH]: TableHanNgachIcon,
  [FIELD_NAME.TABLE_DAT_DAI13B]: TableDatDai13BIcon,
  [FIELD_NAME.TABLE_DAT_DAI13C]: TableDatDai13CIcon,
  [FIELD_NAME.TABLE_DAT_DAI13D]: TableDatDai13DIcon,
  [FIELD_NAME.TABLE_VETERINARY1]: tableVeterinaryIcon,
  [FIELD_NAME.TABLE_KHOANG_SAN]: TableKhoangSanIcon,
  [FIELD_NAME.INPUT_WITH_UPLOAD]: InputWithUploadIcon,
  [FIELD_NAME.RANGEPICKER]: RangepickerIcon,
  [TEMPLATE_NAME.SCHEMA_BASE]: templateIcon,
  [TEMPLATE_NAME.SCHEMA_BASE_DUTHAO]: templateIconDuThao,
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN]: TableTabKhoangSanIcon,
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN_2]: TableTabKhoangSan_2Icon,
  // [TEMPLATE_NAME.PHONE_NUMBER]: templateIconPhoneNumber,
  // [TEMPLATE_NAME.EMAIL]: templateIconEmail,

  // Bunch of fake components
  [FIELD_NAME.HTML_VIEW]: htmlViewIcon,
  [FIELD_NAME.IMAGE_VIEW]: inputIcon,
  [FIELD_NAME.SPACER]: spacerIcon,
  [FIELD_NAME.DIVIDER]: separatorIcon,
  [FIELD_NAME.INPUT_UNIT]: InputUnitIcon,
  [FIELD_NAME.ENVIRONMENTAL_COMPONENT]: EnvironmentalComponentIcon,

  [FIELD_NAME.DATE_PICKER]: dateIcon,
  [FIELD_NAME.DATETIME_PICKER]: timeIcon,
  [FIELD_NAME.DATETIME_PICKER]: timeIcon,
  [FIELD_NAME.NOTIFICATION]: notificationIcon,
  [FIELD_NAME.INPUT_NUMBER_RANGE]: inputNumberRange,
  [FIELD_NAME.MUC_DICH_KHAI_THAC_SD]: MucDichKhaiThacSDIcon,
  [FIELD_NAME.VIEW_BUTTON_TRA_CUU_GIAY_PHEP]: ViewButtonTraCuuGiayPhepIcon,
  [FIELD_NAME.TABLE_DANH_MUC_1]: TABLE_DANH_MUC_1Icon,
  [FIELD_NAME.TREE_SELECT]: TREE_SELECTIcon,
};

export const IS_FIELD_AVAILABLE = {
  [FIELD_NAME.F_ADDRESS]: true,
  [FIELD_NAME.INPUT]: true,
  [FIELD_NAME.INPUT_PASSWORD]: true,
  [FIELD_NAME.TEXT_VIEW]: true,
  [FIELD_NAME.UPLOAD]: true,
  [FIELD_NAME.BUTTON]: true,
  [FIELD_NAME.SELECT]: true,
  [FIELD_NAME.INPUT_NUMBER]: true,
  [FIELD_NAME.COLUMN_FIELD]: true,
  [FIELD_NAME.TABLE]: true,
  [FIELD_NAME.TABLE_PROFIT]: true,
  [FIELD_NAME.TABLE_CAPITAL_CONTRIBUTION]: true,
  [FIELD_NAME.TABLE_CAPITAL_LENDING]: true,
  [FIELD_NAME.TABLE_FINANCIAL]: true,
  [FIELD_NAME.ASYNC_TABLE]: true,
  [FIELD_NAME.FIELD_TABLE_SINGLE]: true,
  [FIELD_NAME.RADIO_GROUP]: true,
  [FIELD_NAME.DATE_PICKER]: true,
  [FIELD_NAME.DATETIME_PICKER]: true,
  [FIELD_NAME.ASYNC_SELECT]: true,
  [FIELD_NAME.ASYNC_RADIO_GROUP]: true,
  [FIELD_NAME.CHECK_BOX]: true,
  [FIELD_NAME.CHECKBOX_GROUP]: true,
  [FIELD_NAME.ASYNC_CHECKBOX_GROUP]: true,
  [FIELD_NAME.FORM_STEP]: false,
  [FIELD_NAME.VIEW_INPUT_BO_SUNG_HS]: true,
  [FIELD_NAME.CAPTCHA]: false,
  [FIELD_NAME.TAB]: true,
  [FIELD_NAME.TEXTAREA]: true,
  [FIELD_NAME.CAPTCHA]: true,
  [FIELD_NAME.VIEW_INFO]: true,
  [FIELD_NAME.VIEW_INVESTOR]: true,
  [FIELD_NAME.VIEW_INVESTOR_SHORTEN]: true,
  [FIELD_NAME.VIEW_INVESTOR_PROJECT]: true,
  [FIELD_NAME.VIEW_INVESTOR_BASE]: true,
  [FIELD_NAME.VIEW_INVESTOR_BASE_V2]: true,
  [FIELD_NAME.CONTENT_PROJECT]: true,
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX]: true,
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX_V2]: true,
  [FIELD_NAME.VIEW_INVESTOR_TABLE]: true,
  [FIELD_NAME.VIEW_PROJECT]: true,
  [FIELD_NAME.VIEW_PROJECT_ADVANCE]: true,
  [FIELD_NAME.VIEW_AMENDING_CONTENT]: true,
  [FIELD_NAME.VIEW_AMENDING_CONTENT_ADVANCE]: true,
  [FIELD_NAME.VIEW_DOCUMENT]: false,
  [FIELD_NAME.DIGITAL_SIGNATURE]: true,
  [FIELD_NAME.CHECKBOX_WITH_INPUT]: true,
  [FIELD_NAME.VIEW_SELECT_FILE]: true,
  [FIELD_NAME.CHECKBOX_TOGGLE]: true,
  [FIELD_NAME.HTML_VIEW]: true,
  [FIELD_NAME.GROUP_FIELDS]: true,
  [FIELD_NAME.MODAL_GET_INFO]: false,
  [FIELD_NAME.GROUP_SELECT]: true,
  [FIELD_NAME.VIEW_DU_AN]: true,
  [FIELD_NAME.VIEW_INVESTMENT_CAPITAL]: true,
  [FIELD_NAME.INPUT_UNIT]: true,
  [FIELD_NAME.INPUT_SEARCH]: false,
  [FIELD_NAME.ASYNC_CHECKBOX_WITH_INPUT]: true,
  [FIELD_NAME.ENVIRONMENTAL_COMPONENT]: true,
  [FIELD_NAME.SELECT_CONDITION_SHOW_FORM]: true,

  // generated by code available fields
  [FIELD_NAME.TREE_SELECT]: true,
  [FIELD_NAME.TABLE_DANH_MUC_1]: true,
  [FIELD_NAME.VIEW_BUTTON_TRA_CUU_GIAY_PHEP]: true,
  [FIELD_NAME.INPUT_NUMBER_RANGE]: true,
  [FIELD_NAME.VIEW_INFO_HIDDEN]: true,
  [FIELD_NAME.BUTTON_SYNC_DATA_TO_KHAI]: true,
  [FIELD_NAME.MUC_DICH_KHAI_THAC_SD]: true,
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN_2]: true,
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN]: true,
  [FIELD_NAME.CMND_NUMBER]: true,
  [FIELD_NAME.MST_NUMBER]: true,
  [FIELD_NAME.EMAIL]: true,
  [FIELD_NAME.PHONE_NUMBER]: true,
  [FIELD_NAME.TABLE_KHOANG_SAN]: true,
  [FIELD_NAME.RANGEPICKER]: true,
  [FIELD_NAME.INPUT_WITH_UPLOAD]: true,
  [FIELD_NAME.TABLE_DAT_DAI13D]: true,
  [FIELD_NAME.TABLE_DAT_DAI13C]: true,
  [FIELD_NAME.TABLE_DAT_DAI13B]: true,
  [FIELD_NAME.TABLE_VETERINARY1]: false,
  [FIELD_NAME.TABLE_HAN_NGACH]: true,
  [FIELD_NAME.TABLE_GROUP]: true,
  [FIELD_NAME.VIEW_DO_DAC_PRODUCT]: true,
  [FIELD_NAME.INPUT_FUNCTION]: true,
  [FIELD_NAME.COORDINATE_SELECT]: true,

  // Template
  [TEMPLATE_NAME.SCHEMA_BASE]: true,
  [TEMPLATE_NAME.SCHEMA_BASE_DUTHAO]: true,
  // [TEMPLATE_NAME.PHONE_NUMBER]: true,
  // [TEMPLATE_NAME.EMAIL]: true,
};

// Used to define categories on sidebar
export const FIELD_NAME_AND_CATEGORIES = {
  [CATEGORIES.TEMPLATE]: [
    TEMPLATE_NAME.SCHEMA_BASE,
    TEMPLATE_NAME.SCHEMA_BASE_DUTHAO,

    FIELD_NAME.PHONE_NUMBER,
    FIELD_NAME.EMAIL,
    FIELD_NAME.CMND_NUMBER,
    FIELD_NAME.MST_NUMBER,
  ],
  [CATEGORIES.FAVORITE]: [
    FIELD_NAME.INPUT,
    FIELD_NAME.PHONE_NUMBER,
    FIELD_NAME.EMAIL,
    FIELD_NAME.CMND_NUMBER,
    FIELD_NAME.MST_NUMBER,
    FIELD_NAME.SELECT,
    FIELD_NAME.COLUMN_FIELD,
    FIELD_NAME.CHECKBOX_TOGGLE,
    FIELD_NAME.TEXT_VIEW,
    FIELD_NAME.INPUT_NUMBER,
  ],
  [CATEGORIES.CONTAINERS]: [
    FIELD_NAME.COLUMN_FIELD,
    FIELD_NAME.TABLE,
    FIELD_NAME.TABLE_PROFIT,
    FIELD_NAME.TABLE_CAPITAL_CONTRIBUTION,
    FIELD_NAME.TABLE_CAPITAL_LENDING,
    FIELD_NAME.TABLE_FINANCIAL,
    FIELD_NAME.FORM_STEP,
    FIELD_NAME.ASYNC_TABLE,
    FIELD_NAME.FIELD_TABLE_SINGLE,
    FIELD_NAME.TAB,
    FIELD_NAME.VIEW_DOCUMENT,
    FIELD_NAME.GROUP_FIELDS,
    FIELD_NAME.COORDINATE_SELECT,
  ],
  [CATEGORIES.INPUT_CAT]: [
    FIELD_NAME.INPUT,
    FIELD_NAME.INPUT_PASSWORD,
    FIELD_NAME.INPUT_NUMBER,
    FIELD_NAME.EMAIL,
    FIELD_NAME.PHONE_NUMBER,
    FIELD_NAME.CMND_NUMBER,
    FIELD_NAME.MST_NUMBER,
    FIELD_NAME.SELECT,
    FIELD_NAME.UPLOAD,
    FIELD_NAME.VIEW_SELECT_FILE,
    FIELD_NAME.TEXTAREA,
    FIELD_NAME.CHECKBOX_WITH_INPUT,
    FIELD_NAME.MODAL_GET_INFO,
  ],
  [CATEGORIES.SELECTION]: [
    FIELD_NAME.SELECT,
    FIELD_NAME.F_ADDRESS,
    FIELD_NAME.DATE_PICKER,
    FIELD_NAME.RADIO_GROUP,
    FIELD_NAME.CHECKBOX_GROUP,
    FIELD_NAME.DATETIME_PICKER,
    FIELD_NAME.CHECK_BOX,
    FIELD_NAME.CHECKBOX_TOGGLE,
    FIELD_NAME.SELECT_CONDITION_SHOW_FORM,
  ],
  [CATEGORIES.DICH_VU_CONG]: [
    FIELD_NAME.INPUT_WITH_UPLOAD,
    FIELD_NAME.GROUP_SELECT,
    FIELD_NAME.F_ADDRESS,
    FIELD_NAME.DIGITAL_SIGNATURE,
    FIELD_NAME.INPUT_UNIT,
    FIELD_NAME.ASYNC_CHECKBOX_WITH_INPUT,
    FIELD_NAME.INPUT_SEARCH,
    FIELD_NAME.ENVIRONMENTAL_COMPONENT,
    FIELD_NAME.INPUT_FUNCTION,
    FIELD_NAME.COORDINATE_SELECT,
    FIELD_NAME.GROUP_SELECT,
    FIELD_NAME.VIEW_INFO,
    FIELD_NAME.VIEW_DU_AN,
    FIELD_NAME.VIEW_INPUT_BO_SUNG_HS,
    FIELD_NAME.VIEW_DO_DAC_PRODUCT,
    FIELD_NAME.TABLE_GROUP,
    FIELD_NAME.MUC_DICH_KHAI_THAC_SD,
    FIELD_NAME.VIEW_INVESTOR,
    FIELD_NAME.VIEW_INVESTOR_SHORTEN,
    FIELD_NAME.VIEW_INVESTOR_PROJECT,
    FIELD_NAME.VIEW_INVESTOR_BASE,
    FIELD_NAME.VIEW_INVESTOR_BASE_V2,
    FIELD_NAME.CONTENT_PROJECT,
    FIELD_NAME.VIEW_INVESTOR_CHECKBOX,
    FIELD_NAME.VIEW_INVESTOR_CHECKBOX_V2,
    FIELD_NAME.VIEW_INVESTOR_TABLE,
    FIELD_NAME.VIEW_PROJECT,
    FIELD_NAME.VIEW_PROJECT_ADVANCE,
    FIELD_NAME.VIEW_AMENDING_CONTENT,
    FIELD_NAME.VIEW_AMENDING_CONTENT_ADVANCE,
    FIELD_NAME.VIEW_INVESTMENT_CAPITAL,
  ],
  [CATEGORIES.DAT_DAI]: [
    FIELD_NAME.TABLE_DAT_DAI13B,
    FIELD_NAME.TABLE_DAT_DAI13C,
    FIELD_NAME.TABLE_DAT_DAI13D,
  ],
  // [CATEGORIES.THU_Y]: [
  //   FIELD_NAME.TABLE_VETERINARY1,
  // ],
  [CATEGORIES.ASYNC]: [
    FIELD_NAME.ASYNC_SELECT,
    FIELD_NAME.ASYNC_RADIO_GROUP,
    FIELD_NAME.ASYNC_CHECKBOX_GROUP,
  ],
  [CATEGORIES.PRESENTATION]: [
    FIELD_NAME.TEXT_VIEW,
    FIELD_NAME.HTML_VIEW,
    FIELD_NAME.IMAGE_VIEW,
    FIELD_NAME.SPACER,
    FIELD_NAME.DIVIDER,
    FIELD_NAME.NOTIFICATION,
  ],
  // [CATEGORIES.CONTAINERS]: [
  //   FIELD_NAME.COLUMN_FIELD,
  //   FIELD_NAME.TABLE,
  //   FIELD_NAME.FIELD_TABLE_SINGLE,
  // ],
  [CATEGORIES.ACTION]: [FIELD_NAME.BUTTON, FIELD_NAME.CAPTCHA],
  [CATEGORIES.OTHER]: [
    // generated by code category fields
    FIELD_NAME.TREE_SELECT,
    FIELD_NAME.TABLE_DANH_MUC_1,
    FIELD_NAME.VIEW_BUTTON_TRA_CUU_GIAY_PHEP,
    FIELD_NAME.TABLE_VETERINARY1,
    FIELD_NAME.INPUT_NUMBER_RANGE,
    // FIELD_NAME.VIEW_INFO_HIDDEN,
    // FIELD_NAME.BUTTON_SYNC_DATA_TO_KHAI,
    FIELD_NAME.TABLE_TAB_KHOANG_SAN_2,
    FIELD_NAME.TABLE_TAB_KHOANG_SAN,
    FIELD_NAME.TABLE_KHOANG_SAN,
    FIELD_NAME.RANGEPICKER,
    FIELD_NAME.TABLE_DAT_DAI13D,
    FIELD_NAME.TABLE_DAT_DAI13C,
    FIELD_NAME.TABLE_DAT_DAI13B,
    FIELD_NAME.TABLE_HAN_NGACH,
    FIELD_NAME.TABLE_GROUP,
    // FIELD_NAME.INPUT_FUNCTION,
  ],
};

export const ICONS_FOR_BUILDER: TItemBuilderBar[] = Object.values(
  FIELD_NAME,
).map((fieldName) => ({
  title: fieldName,
  componentName: fieldName,
  icon: FIELD_NAME_TO_ICON[fieldName as keyof typeof FIELD_NAME],
}));

const getConfigFromProps = (props: any) => ({
  className: props.className,
  style: undefined,
  individualStyle: props.stylesPropsParseFromJsonTree,
});

export const VIEW_FIELDS: { [x: string]: React.FC<any> } = {
  [FIELD_NAME.F_ADDRESS]: (props: any) => {
    const form = Form.useFormInstance();

    return <FAddress {...props} form={form} />;
  },
  [FIELD_NAME.INPUT]: (props: any) => {
    const styles = getConfigFromProps(props);
    const {
      // value,
      modeView,
    } = props;
    // if (isDetailsMode(modeView)) return <div>{value}</div>;

    if (isDetailsMode(modeView)) {
      return <Input {...styles} {...omitRedundantFieldProps(props)} disabled />;
    }

    return <Input {...styles} {...omitRedundantFieldProps(props)} />;
  },

  [FIELD_NAME.TEXTAREA]: (props: any) => {
    const styles = getConfigFromProps(props);
    const {
      // value,
      modeView,
    } = props;
    // if (isDetailsMode(modeView)) return <div>{value}</div>;
    if (isDetailsMode(modeView)) {
      return (
        <Input.TextArea
          {...styles}
          {...omitRedundantFieldProps(props)}
          disabled
        />
      );
    }

    return <Input.TextArea {...styles} {...omitRedundantFieldProps(props)} />;
  },
  [FIELD_NAME.INPUT_PASSWORD]: (props: any) => {
    const styles = getConfigFromProps(props);

    return (
      <ViewPasswordField {...styles} {...omitRedundantFieldProps(props)} />
    );
  },
  [FIELD_NAME.NOT_SUPPORT]: NotSupport,
  [FIELD_NAME.DATETIME_PICKER]: ViewDateTimePicker,
  // [x] Support changing button color
  [FIELD_NAME.BUTTON]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewButton {...styles} {...props} />;
  },
  [FIELD_NAME.SELECT]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewSelect {...styles} {...props} />;
  },
  [FIELD_NAME.INPUT_NUMBER]: (props: any) => {
    const styles = getConfigFromProps(props);

    // Default formatter and parser for thousand separator
    const formatNumber = (value: any) => {
      if (!value && value !== 0) return "";
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const parseNumber = (value: any) => {
      if (!value) return "";
      return value.replace(/,/g, "");
    };

    const { func: formatterFunc } = stringToFunc(props.formatter);
    const { func: parserFunc } = stringToFunc(props.parser);

    return (
      <InputNumber
        {...styles}
        {...props}
        formatter={formatterFunc || formatNumber}
        parser={parserFunc || parseNumber}
      />
    );
  },
  [FIELD_NAME.COLUMN_FIELD]: (props) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <ColumnFieldsViewer {...props} />;
    }

    return <ColumnFieldsBuilder {...props} />;
  },
  [FIELD_NAME.RADIO_GROUP]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewRadioGroup {...styles} {...props} />;
  },
  [FIELD_NAME.TABLE]: (props: any) => {
    const { modeView } = props;
    const form = Form.useFormInstance();
    if (isViewOrDetailMode(modeView)) {
      return <ViewFormTable {...props} form={form} />;
    }
    return <ViewFormTableBuilder {...props} form={form} />;
  },
  [FIELD_NAME.TABLE_PROFIT]: (props: any) => {
    const { modeView } = props;
    const form = Form.useFormInstance();
    if (isViewOrDetailMode(modeView)) {
      return <TableProfitViewer {...props} form={form} />;
    }
    return <TableProfitBuilder {...props} form={form} />;
  },
  [FIELD_NAME.TABLE_CAPITAL_CONTRIBUTION]: (props: any) => {
    const { modeView } = props;
    const form = Form.useFormInstance();
    if (isViewOrDetailMode(modeView)) {
      return <TableCapitalContributionViewer {...props} form={form} />;
    }
    return <TableCapitalContributionProfitBuilder {...props} form={form} />;
  },
  [FIELD_NAME.TABLE_CAPITAL_LENDING]: (props: any) => {
    const { modeView } = props;
    const form = Form.useFormInstance();
    if (isViewOrDetailMode(modeView)) {
      return <TableCapitalLendingViewer {...props} form={form} />;
    }
    return <TableCapitalLendingBuilder {...props} form={form} />;
  },
  [FIELD_NAME.TABLE_FINANCIAL]: (props: any) => {
    const { modeView } = props;
    const form = Form.useFormInstance();
    if (isViewOrDetailMode(modeView)) {
      return <TableFinancialViewer {...props} form={form} />;
    }
    return <TableFinancialBuilder {...props} form={form} />;
  },
  [FIELD_NAME.FIELD_TABLE_SINGLE]: (props: any) => {
    const { modeView } = props;
    const form = Form.useFormInstance();
    if (isViewOrDetailMode(modeView)) {
      return <ViewerFieldTableSingle {...props} form={form} />;
    }
    return <ViewFormBuilderFieldTableSingle {...props} form={form} />;
  },
  [FIELD_NAME.TEXT_VIEW]: ViewText,
  [FIELD_NAME.HTML_VIEW]: ViewHtml,
  [FIELD_NAME.UPLOAD]: ViewUpload,
  [FIELD_NAME.DIGITAL_SIGNATURE]: ViewerDigitalSignature,
  [FIELD_NAME.CAPTCHA]: (props: any) => {
    const form = Form.useFormInstance();

    return <ViewCapchaField {...props} form={form} />;
  },
  [FIELD_NAME.DATE_PICKER]: (props: any) => {
    const styles = getConfigFromProps(props);
    const {
      // value,
      modeView,
    } = props;
    // if (isDetailsMode(modeView)) return <div>{value}</div>;
    if (isDetailsMode(modeView)) {
      return (
        <ViewDatePicker
          {...styles}
          {...omitRedundantFieldProps(props)}
          disabled
        />
      );
    }

    return <ViewDatePicker {...styles} {...props} />;
  },
  [FIELD_NAME.ASYNC_SELECT]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewAsyncSelect {...styles} {...props} />;
  },
  [FIELD_NAME.ASYNC_RADIO_GROUP]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewAsyncRadioGroup {...styles} {...props} />;
  },
  [FIELD_NAME.CHECK_BOX]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewCheckbox {...styles} {...props} />;
  },
  [FIELD_NAME.CHECKBOX_GROUP]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewCheckboxGroup {...styles} {...props} />;
  },
  [FIELD_NAME.ASYNC_CHECKBOX_GROUP]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewAsyncCheckboxGroup {...styles} {...props} />;
  },
  [FIELD_NAME.ASYNC_CHECKBOX_WITH_INPUT]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewAsyncCheckboxWithInput {...styles} {...props} />;
  },
  [FIELD_NAME.FORM_STEP]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewFormStepViewer {...props} />;
    }

    return <ViewFormStepBuilder {...props} />;
  },
  [FIELD_NAME.TAB]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewFormTab {...props} />;
    }
    return <ViewFormTabBuilder {...props} />;
  },
  [FIELD_NAME.VIEW_INFO]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInfo {...props} />;
    }
    return <BuilderInfo {...props} />;
  },
  [FIELD_NAME.VIEW_INVESTOR]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInvestor {...props} />;
    }
    return <BuilderInvestor {...props} />;
  },
  [FIELD_NAME.VIEW_INVESTOR_SHORTEN]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInvestorShorten {...props} />;
    }
    return <BuilderInvestorShorten {...props} />;
  },
  [FIELD_NAME.VIEW_INVESTOR_PROJECT]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInvestorProject {...props} />;
    }
    return <BuilderInvestorProject {...props} />;
  },
  [FIELD_NAME.VIEW_INVESTOR_BASE_V2]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInvestorBaseV2 {...props} />;
    }
    return <BuilderInvestorBaseV2 {...props} />;
  },
  [FIELD_NAME.VIEW_INVESTOR_BASE]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInvestorBase {...props} />;
    }
    return <BuilderInvestorBase {...props} />;
  },
  [FIELD_NAME.CONTENT_PROJECT]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerContentProject {...props} />;
    }
    return <BuilderContentProject {...props} />;
  },
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInvestorCheckbox {...props} />;
    }
    return <BuilderInvestorCheckbox {...props} />;
  },
  [FIELD_NAME.VIEW_INVESTOR_CHECKBOX_V2]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInvestorCheckboxV2 {...props} />;
    }
    return <BuilderInvestorCheckboxV2 {...props} />;
  },
  [FIELD_NAME.VIEW_INVESTOR_TABLE]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInvestorTable {...props} />;
    }
    return <BuilderInvestorTable {...props} />;
  },
  [FIELD_NAME.VIEW_PROJECT]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerProject {...props} />;
    }
    return <BuilderProject {...props} />;
  },
  [FIELD_NAME.VIEW_PROJECT_ADVANCE]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerProjectAdvance {...props} />;
    }
    return <BuilderProjectAdvance {...props} />;
  },
  [FIELD_NAME.VIEW_AMENDING_CONTENT]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerAmendingContent {...props} />;
    }
    return <BuilderAmendingContent {...props} />;
  },
  [FIELD_NAME.VIEW_AMENDING_CONTENT_ADVANCE]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerAmendingContentAdvance {...props} />;
    }
    return <BuilderAmendingContentAdvance {...props} />;
  },
  [FIELD_NAME.CHECKBOX_WITH_INPUT]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerCheckboxWithInput {...props} />;
    }
    return <BuilderCheckboxWithInput {...props} />;
  },
  [FIELD_NAME.VIEW_SELECT_FILE]: (props: any) => {
    const styles = getConfigFromProps(props);

    return <ViewSelectFileFields {...styles} {...props} />;
  },
  [FIELD_NAME.CHECKBOX_TOGGLE]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <ViewCheckboxToggle {...props} />;
    }

    return <BuilderCheckBoxToggle {...props} />;
  },
  [FIELD_NAME.GROUP_FIELDS]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <GroupFieldViewer {...props} />;
    }

    return <GroupFieldBuilder {...props} />;
  },
  [FIELD_NAME.ASYNC_TABLE]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <AsyncTableViewer {...props} />;
    }

    return <AsyncTableBuilder {...props} />;
  },
  [FIELD_NAME.VIEW_DU_AN]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <ViewDuAnViewer {...props} />;
    }

    return <ViewDuAnBuider {...props} />;
  },
  [FIELD_NAME.VIEW_DOCUMENT]: (props: any) => {
    const { modeView } = props;

    if (isViewMode(modeView)) {
      return <ViewerDocument {...props} />;
    }

    return <BuilderDocument {...props} />;
  },
  [FIELD_NAME.INPUT_UNIT]: (props: any) => {
    const {
      modeView,
      // value
    } = props;

    if (isDetailsMode(modeView)) {
      return <InputUnitViewer {...omitRedundantFieldProps(props)} />;
    }

    if (isViewMode(modeView)) {
      return <InputUnitViewer {...props} />;
    }

    return <InputUnitBuilder {...props} />;
  },
  [FIELD_NAME.ENVIRONMENTAL_COMPONENT]: (props: any) => {
    const { modeView } = props;
    if (isViewMode(modeView)) {
      return <ViewEnvironmental {...props} />;
    }

    return <ViewEnvironmental {...props} />;
  },
  [FIELD_NAME.INPUT_SEARCH]: (props: any) => {
    const { modeView } = props;
    if (isViewMode(modeView)) {
      return <ViewInputSearch {...props} />;
    }

    return <BuildInputSearch {...props} />;
  },
  [FIELD_NAME.SELECT_CONDITION_SHOW_FORM]: (props: any) => {
    const { modeView } = props;
    if (isViewMode(modeView)) {
      return <ViewSelectConditionShowForms {...props} />;
    }

    return <BuilderSelectConditionShowForms {...props} />;
  },
  [FIELD_NAME.GROUP_SELECT]: (props: any) => <ViewerGroupSelect {...props} />,
  [FIELD_NAME.VIEW_INVESTMENT_CAPITAL]: (props: any) => {
    const { modeView } = props;
    if (isViewOrDetailMode(modeView)) {
      return <ViewerInvestmentCapital {...props} />;
    }
    return <BuilderInvestmentCapital {...props} />;
  },
  [FIELD_NAME.MODAL_GET_INFO]: ModalGetInfoViewer,
  [FIELD_NAME.VIEW_INPUT_BO_SUNG_HS]: ViewerInputBoSungHs,

  // generated by code view component
  [FIELD_NAME.TREE_SELECT]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TREE_SELECTViewer {...props} />;
    }

    return <TREE_SELECTBuilder {...props} />;
  },
  [FIELD_NAME.TABLE_DANH_MUC_1]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TABLE_DANH_MUC_1Viewer {...props} />;
    }

    return <TABLE_DANH_MUC_1Builder {...props} />;
  },
  [FIELD_NAME.VIEW_BUTTON_TRA_CUU_GIAY_PHEP]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <ViewButtonTraCuuGiayPhepViewer {...props} />;
    }

    return <ViewButtonTraCuuGiayPhepBuilder {...props} />;
  },
  [FIELD_NAME.TABLE_VETERINARY1]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TableVeterinary1Viewer {...props} />;
    }

    return <TableVeterinary1Builder {...props} />;
  },
  [FIELD_NAME.INPUT_NUMBER_RANGE]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <InputNumberRangeViewer {...props} />;
    }

    return <InputNumberRangeBuilder {...props} />;
  },
  [FIELD_NAME.VIEW_INFO_HIDDEN]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <ViewInfoHiddenViewer {...props} />;
    }

    return <ViewInfoHiddenViewer {...props} />;
  },
  [FIELD_NAME.BUTTON_SYNC_DATA_TO_KHAI]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <ButtonSyncDataToKhaiViewer {...props} />;
    }

    return <ButtonSyncDataToKhaiBuilder {...props} />;
  },
  [FIELD_NAME.MUC_DICH_KHAI_THAC_SD]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <MucDichKhaiThacSDViewer {...props} />;
    }

    return <MucDichKhaiThacSDBuilder {...props} />;
  },
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN_2]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TableTabKhoangSan2Viewer {...props} />;
    }

    return <TableTabKhoangSan2Builder {...props} />;
  },
  [FIELD_NAME.TABLE_TAB_KHOANG_SAN]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TableTabKhoangSanViewer {...props} />;
    }

    return <TableTabKhoangSanBuilder {...props} />;
  },
  [FIELD_NAME.CMND_NUMBER]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <CMNDNumberViewer {...props} />;
    }

    return <CMNDNumberBuilder {...props} />;
  },
  [FIELD_NAME.MST_NUMBER]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <MSTNumberViewer {...props} />;
    }

    return <MSTNumberBuilder {...props} />;
  },
  [FIELD_NAME.EMAIL]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <EmailViewer {...props} />;
    }

    return <EmailBuilder {...props} />;
  },
  [FIELD_NAME.PHONE_NUMBER]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <PhoneNumberViewer {...props} />;
    }

    return <PhoneNumberBuilder {...props} />;
  },

  [FIELD_NAME.TABLE_KHOANG_SAN]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TableKhoangSanViewer {...props} />;
    }

    return <TableKhoangSanBuilder {...props} />;
  },
  [FIELD_NAME.RANGEPICKER]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <RangepickerViewer {...props} />;
    }

    return <RangepickerBuilder {...props} />;
  },
  [FIELD_NAME.INPUT_WITH_UPLOAD]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <InputWithUploadViewer {...props} />;
    }

    return <InputWithUploadBuilder {...props} />;
  },
  [FIELD_NAME.TABLE_DAT_DAI13D]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TableDatDai13DViewer {...props} />;
    }

    return <TableDatDai13DBuilder {...props} />;
  },
  [FIELD_NAME.TABLE_DAT_DAI13C]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TableDatDai13CViewer {...props} />;
    }

    return <TableDatDai13CBuilder {...props} />;
  },
  [FIELD_NAME.TABLE_DAT_DAI13B]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TableDatDai13BViewer {...props} />;
    }

    return <TableDatDai13BBuilder {...props} />;
  },
  [FIELD_NAME.TABLE_HAN_NGACH]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TableHanNgachViewer {...props} />;
    }

    return <TableHanNgachBuilder {...props} />;
  },
  [FIELD_NAME.TABLE_GROUP]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <TableGroupViewer {...props} />;
    }

    return <TableGroupBuilder {...props} />;
  },
  [FIELD_NAME.VIEW_DO_DAC_PRODUCT]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <ViewDoDacProductViewer {...props} />;
    }

    return <ViewDoDacProductBuilder {...props} />;
  },
  [FIELD_NAME.INPUT_FUNCTION]: (props: any) => {
    const { modeView } = props;

    if (isViewOrDetailMode(modeView)) {
      return <InputFunctionViewer {...props} />;
    }

    return <InputFunctionBuilder {...props} />;
  },
  [FIELD_NAME.COORDINATE_SELECT]: (props: any) => {
    return <CoordinateSelectViewer {...props} />;
  },
};
