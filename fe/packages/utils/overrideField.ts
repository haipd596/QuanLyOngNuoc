import { OPTIONS_ACCEPT_DOCX, OPTIONS_ACCEPT_OTHER_TYPES, OPTIONS_ACCEPT_PDF } from '@packages/components/Config/ConfigOptionAcceptUpload/constants';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '@packages/constants/date';
import { CONFIG_BASIC_FIELD_TYPE, FIELD_NAME } from '@packages/constants/fields';
import { THANH_PHAN_HSQD_KEY } from '@packages/constants/jsonConfig';
import _ from 'lodash';
import vi from '../locales/vi/translation.json';
import { KEY_OVERRIDE, LIST_KEY_TEXTVIEW_NOT_BOLD, LIST_KEY_TEXTVIEW_REDUCE_TITLE } from './constantKeyOverride';

/** Khớp `TextInputField` — chỉ rule này được ép từ hệ thống; pattern khác theo panel */
const INPUT_ANTI_HTML_PATTERN = '^(?!.*<[^>]+>)[\\s\\S]*$';
const INPUT_ANTI_HTML_MESSAGE = 'Không cho phép nhập thẻ HTML!';

function rulesHaveInputAntiHtml(rules: unknown[]): boolean {
  if (!Array.isArray(rules)) return false;
  return rules.some((rule: any) => typeof rule?.pattern === 'string' && rule.pattern === INPUT_ANTI_HTML_PATTERN);
}

export const overrideSdt = (field: any) => {
  const serverPayloadKey = field?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'];
  const isFieldNeedChange = serverPayloadKey === KEY_OVERRIDE.SO_DIEN_THOAI_NGUOINHAN
  || serverPayloadKey === KEY_OVERRIDE.SO_DIEN_THOAI_NGUOIGUI;

  if (isFieldNeedChange && !field.configChanged['componentPropsAllowConfig.placeholder.props.defaultValue']) {
    field.configChanged['componentPropsAllowConfig.placeholder.props.defaultValue'] = '';
    field.fieldName = FIELD_NAME.PHONE_NUMBER;
  }

  return field;
};

export const overrideQuaTrinhXuLy = (field: any) => {
  const serverPayloadKey = field?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'];
  const targetServerPayloadKey = serverPayloadKey === KEY_OVERRIDE.QUA_TRINH_XU_LY;

  if (targetServerPayloadKey) {
    // eslint-disable-next-line max-len
    field.configChanged['componentPropsAllowConfig.action.calculateFnc'] = null;
    field.configChanged['componentPropsAllowConfig.columns.props.defaultValue'] = [
      {
        title: 'Tên công việc',
        pathToColumnData: 'TaskName',
        serverPayloadKey: 'TaskName',
        isShowColumn: true,
      },
      // {
      //   title: 'Nội dung xử lý',
      //   pathToColumnData: 'NoiDungXuLy',
      //   serverPayloadKey: 'NoiDungXuLy',
      //   isShowColumn: true,
      // },
      {
        title: 'Ngày kết thúc',
        pathToColumnData: 'NgayKetThuc',
        serverPayloadKey: 'NgayKetThuc',
        isShowColumn: true,
      },
      // {
      //   title: 'Người xử lý',
      //   pathToColumnData: 'AssignedTo',
      //   serverPayloadKey: 'AssignedTo',
      //   isShowColumn: true,
      // },
      {
        title: 'Trạng thái',
        pathToColumnData: 'Status',
        serverPayloadKey: 'Status',
        isShowColumn: true,
        transformDataColumn: {
          type: 'code',
          props: {
            defaultValue: "function transformData(text, record, index) {\n  if (text === '1') return '<span style=\"color: blue\">Đã hoàn thành</span>';\n\n  return '<span style=\"color: blue\">Đang xử lý</span>'\n}",
          },
        },
      },
    ];
    field.configChanged['componentPropsAllowConfig.isHiddenAction.props.defaultValue'] = true;
  }

  return field;
};

export const overrideDanhMucNhaNuoc = (field: any) => {
  const serverPayloadKey = field?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'];
  const targetServerPayloadKey = serverPayloadKey === KEY_OVERRIDE.DANH_MUC_NHA_NUOC;

  if (targetServerPayloadKey) {
    field.configChanged['formItemPropsAllowConfig.rules.props.defaultValue'] = [
      {
        required: false,
        message: 'Xin vui lòng xác nhận',
      },
    ];
  }

  return field;
};

export const overrideAnhDiaHinh = (field: any) => {
  const serverPayloadKey = field?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'];
  const targetServerPayloadKey = serverPayloadKey === KEY_OVERRIDE.ANH_DIA_HINH;

  if (targetServerPayloadKey) {
    field.configChanged['componentPropsAllowConfig.accept.props.defaultValue'] = _.map([
      ...OPTIONS_ACCEPT_OTHER_TYPES,
      ...OPTIONS_ACCEPT_PDF,
      ...OPTIONS_ACCEPT_DOCX,
    ], 'value');
  }

  return field;
};

export const overrideTypeUserInfo = (field: any) => {
  const serverPayloadKey = field?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'];
  const targetServerPayloadKeyName = serverPayloadKey === KEY_OVERRIDE.TEN_TCCN;
  const targetServerPayloadKeySoCMND = serverPayloadKey === KEY_OVERRIDE.SO_CMTND;
  const targetServerPayloadKeyDiaChi = serverPayloadKey === KEY_OVERRIDE.DIA_CHI;
  const targetServerPayloadKeyDiaChiFull = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_DiaChi;
  const targetServerPayloadKeyFax = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_Fax;
  const targetServerPayloadKeyEmail = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_EmailNguoiNop;
  const targetServerPayloadKeySoDT = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_SoDienThoai;
  const targetServerPayloadKeyNgayCap = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_NgayCap;
  const targetServerPayloadKeyNoiCap = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_NoiCap;
  const targetServerPayloadKeySoCMND_BoSung = serverPayloadKey
  === KEY_OVERRIDE.CaNhan_ToChuc_CMNDNguoiNopHoSo;

  if (targetServerPayloadKeyName) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.Title;
  }

  if (targetServerPayloadKeySoCMND) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.customMaDinhDanh;
  }

  if (targetServerPayloadKeyDiaChi) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.addressDoDac;
  }

  if (targetServerPayloadKeyDiaChiFull) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.addressDoDac;
  }

  if (targetServerPayloadKeyFax) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.Fax;
  }

  if (targetServerPayloadKeyEmail) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.ThuDienTu;
  }

  if (targetServerPayloadKeySoDT) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.SoDienThoai;
  }

  if (targetServerPayloadKeyNgayCap) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.NgayCapCMTND;
  }

  if (targetServerPayloadKeyNoiCap) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.NoiCapCMTND;
  }

  if (targetServerPayloadKeySoCMND_BoSung) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.customMaDinhDanh;
  }

  return field;
};

export const overrideTnnDanhNghiepInfo = (field: any) => {
  const serverPayloadKey = field?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'];

  const targetServerPayloadKeyName = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_Ten;

  const targetServerPayloadKeyNguoiDaiDien = (
    serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_NguoiDaiDien
  ) || (
    serverPayloadKey === KEY_OVERRIDE.DaiDien
  );

  const targetServerPayloadKeyDiaChi = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_DiaChi;

  const targetServerPayloadKeySoDT = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_SoDienThoai;

  const targetServerPayloadKeyNoiCap = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_NoiCap;

  const targetServerPayloadKeyFax = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_Fax;

  const targetServerPayloadKeyNgayCap = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_NgayCap;

  const targetServerPayloadKeyEmail = serverPayloadKey === KEY_OVERRIDE.CaNhan_ToChuc_EmailNguoiNop;

  const targetServerPayloadKeySoCMND = serverPayloadKey === KEY_OVERRIDE.SO_CMTND;

  const targetServerPayloadKeySoCMND_BoSung = serverPayloadKey
  === KEY_OVERRIDE.CaNhan_ToChuc_MaSoThue;

  const targetServerPayloadKeyMaSoThue = serverPayloadKey
  === KEY_OVERRIDE.MA_SO_THUE;

  const targetServerPayloadKeyMaSoDNHidden = serverPayloadKey
  === KEY_OVERRIDE.CaNhan_ToChuc_MaSoDoanhNghiep;

  const targetServerPayloadKeyMaSoDN = serverPayloadKey
  === KEY_OVERRIDE.MA_SO_DOANH_NGHIEP;

  if (targetServerPayloadKeyName) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.Title;
  }

  if (targetServerPayloadKeySoDT) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.SoDienThoai;
  }

  if (targetServerPayloadKeyDiaChi) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.addressDoDac;
  }

  if (targetServerPayloadKeyNoiCap) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.NoiCap;
  }

  if (targetServerPayloadKeyFax) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.Fax;
  }

  if (targetServerPayloadKeyNgayCap) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.NgayCap;
  }

  if (targetServerPayloadKeyNguoiDaiDien) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.NguoiDaiDien;
  }

  if (targetServerPayloadKeyEmail) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.ThuDienTu;
  }

  if (targetServerPayloadKeySoCMND) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.customMaDinhDanh;
  }

  if (targetServerPayloadKeySoCMND_BoSung) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.customMaDinhDanh;
  }

  if (targetServerPayloadKeyMaSoDNHidden) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.MaSoDoanhNghiep;
  }

  if (targetServerPayloadKeyMaSoThue) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.customMaDinhDanh;
  }

  if (targetServerPayloadKeyMaSoDN) {
    // @ts-expect-error: should work
    field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = currentUser.customMaDinhDanh;
  }

  return field;
};

export const overridePhieuYeuCau = (field: any) => {
  const serverPayloadKey = field?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'];
  const targetServerPayloadKeyName = serverPayloadKey === KEY_OVERRIDE.PHIEU_YEU_CAU;

  if (targetServerPayloadKeyName) {
    field.configChanged['formItemPropsAllowConfig.hidden.props.defaultValue'] = true;
  }

  return field;
};

export const overrideDataPicker = (field: any) => {
  if (field.fieldName === FIELD_NAME.DATE_PICKER || field.fieldName === FIELD_NAME.RANGEPICKER) {
    if (!field.configChanged['componentPropsAllowConfig.typeOfDate.props.defaultValue']) {
      field.configChanged['componentPropsAllowConfig.typeOfDate.props.defaultValue'] = DATE_FORMAT.DDMMYYYY;
    }
    // field.configChanged['formItemPropsAllowConfig.initFieldData.props.defaultValue'] = null;
  }

  if (field.fieldName === FIELD_NAME.DATETIME_PICKER) {
    if (!field.configChanged['componentPropsAllowConfig.typeOfDate.props.defaultValue']) {
      field.configChanged['componentPropsAllowConfig.typeOfDate.props.defaultValue'] = DATE_TIME_FORMAT.DDMMYYYY_HH_mm_ss;
    }
  }

  return field;
};

export const overrideXacNhanDongY = (field: any) => {
  const serverPayloadKey = field?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'];
  const isFieldNeedChange = serverPayloadKey === KEY_OVERRIDE.XAC_NHAN_DONG_Y;
  const isFieldPasswordNeedChange = serverPayloadKey === KEY_OVERRIDE.MA_XAC_THUC;

  if (isFieldNeedChange) {
    field.configChanged['formItemPropsAllowConfig.rules.props.defaultValue'] = [
      {
        required: true,
        message: 'Xin vui lòng xác nhận',
      },
    ];
    field.configChanged['componentPropsAllowConfig.defaultChecked.props.defaultValue'] = true;
  }

  if (isFieldPasswordNeedChange) {
    field.configChanged['formItemPropsAllowConfig.rules.props.defaultValue'] = [
      {
        required: true,
        message: 'Xin vui lòng nhập mã xác nhận',
      },
    ];
  }

  return field;
};

export const overideInputInTable = (field: any) => {
  const isInTable = field.uniqId && field.fieldName === FIELD_NAME.INPUT;
  const rulesInFormAllowConfig = _.get(field, 'formItemPropsAllowConfig.rules.props.defaultValue');

  if (isInTable && _.isEmpty(rulesInFormAllowConfig)) {
    const currentRules = _.get(field, 'formItemPropsReadOnly.rules', []);

    const isConfigWhiteSpace = currentRules.some((rule: any) => rule?.whitespace);

    const isConfigPattern = currentRules.some((rule: any) => rule?.pattern);

    if (!isConfigWhiteSpace) {
      currentRules.push({
        whitespace: true,
        message: vi.notice_mess,
      });
    }

    if (!isConfigPattern) {
      currentRules.push({
        pattern: INPUT_ANTI_HTML_PATTERN,
        message: INPUT_ANTI_HTML_MESSAGE,
      });
    }

    const rules = {
      type: CONFIG_BASIC_FIELD_TYPE.ARRAY,
      props: {
        defaultValue: currentRules,
        isAddable: false,
      },
    };

    if (!field?.formItemPropsAllowConfig) {
      field.formItemPropsAllowConfig = {};
    }

    field.formItemPropsAllowConfig.rules = rules;
    delete field.formItemPropsReadOnly.rules;
  }

  return field;
};

export const overrideViewInfoHidden = (field: any) => {
  const isViewInfoHiddenField = field.fieldName === FIELD_NAME.VIEW_INFO_HIDDEN;
  if (isViewInfoHiddenField) {
    return {
      ...field,
      configChanged: {
        ...field.configChanged,
        'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue': 'ThongTinChung_BoSung',
      },
    };
  }
  return field;
};

export const overrideTableSyncTuLieuAnh = (field: any) => {
  const serverPayloadKey = field?.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue'];
  const targetServerPayloadKeyName = serverPayloadKey === KEY_OVERRIDE.VT_TuLieuAnh;
  const valueNeedReplace = "https://dvctt.mae.gov.vn/_api/web/lists/getbytitle('dm_DuLieuAnhVienTham')/items?$select=*";
  if (targetServerPayloadKeyName) {
    field.configChanged['componentPropsAllowConfig.action.props.defaultValue'] = valueNeedReplace;
  }

  return field;
};

export const overrideTextOutSideToKhai = (field: any) => {
  const serverPayloadKey = field?.key;

  if (
    LIST_KEY_TEXTVIEW_NOT_BOLD.includes(serverPayloadKey)
    && field.fieldName === FIELD_NAME.TEXT_VIEW
  ) {
    field.configChanged['componentPropsAllowConfig.fontWeight.props.defaultValue'] = '470';
  }

  if (
    LIST_KEY_TEXTVIEW_REDUCE_TITLE.includes(serverPayloadKey)
    && field.fieldName === FIELD_NAME.TEXT_VIEW) {
    field.configChanged['componentPropsAllowConfig.content.useCalculable'] = true;
    field.configChanged['componentPropsAllowConfig.content.calculateFnc'] = "function Calculation(formData) {\n  const title = tthc.Ten;\n\n  console.log('title', title);\n\n  return title;\n}";
  }
  return field;
};

export const overrideCheckboxToggleServerPayloadKey = (field: any) => {
  const serverPayloadKey = field?.key;

  if (serverPayloadKey === KEY_OVERRIDE.BUU_CHINH_CONG_ICH) {
    field.configChanged['componentPropsAllowConfig.checkboxToggleServerPayloadKey.props.defaultValue'] = 'buuchinhcongich.#cb#';
  }

  if (serverPayloadKey === KEY_OVERRIDE.DANG_KY_NOP_TAI_NHA) {
    field.configChanged['componentPropsAllowConfig.checkboxToggleServerPayloadKey.props.defaultValue'] = 'dangkynoptainha.#cb#';
  }

  if (serverPayloadKey === KEY_OVERRIDE.DANG_KY_TRA_KET_QUA_TAI_NHA) {
    field.configChanged['componentPropsAllowConfig.checkboxToggleServerPayloadKey.props.defaultValue'] = 'dangkytraketquatainha.#cb#';
  }

  return field;
};

export const overridViewuploadInAsyncTable = (field: any) => {
  const serverPayloadKey = field?.key;

  if (serverPayloadKey === THANH_PHAN_HSQD_KEY) {
    const uploadColumns = field?.configChanged?.['componentPropsAllowConfig.uploadColumns.props.defaultValue'];
    const configUpload = uploadColumns?.configUpload;
    const componentProps = configUpload?.componentPropsAllowConfig;

    if (componentProps && !componentProps.maxSizeInMB) {
      componentProps.maxSizeInMB = {
        type: 'number',
        props: {
          defaultValue: 500,
        },
        path: 'componentPropsAllowConfig.maxSizeInMB',
      };
    }
  }

  return field;
};

export const overrideRegex = (field: any) => {
  // INPUT
  if (field.fieldName === FIELD_NAME.INPUT) {
    const rules = field.configChanged?.['formItemPropsAllowConfig.rules.props.defaultValue'];

    if (Array.isArray(rules)) {
      const extendedHiddenKeys = ['ThuTuXuLy', 'Table', 'Table2Line', 'Single', 'GroupTable'];
      const isMatchHiddenKeys = extendedHiddenKeys.includes(field.configChanged?.['formItemPropsAllowConfig.serverPayloadKey.props.defaultValue']);
      const newRules = rules.map((rule: any) => {
        if ('pattern' in rule) {
          if (isMatchHiddenKeys) {
            return {
              ...rule,
              pattern: INPUT_ANTI_HTML_PATTERN,
              message: INPUT_ANTI_HTML_MESSAGE,
            };
          }
          return rule;
        }
        return rule;
      });

      return {
        ...field,
        configChanged: {
          ...field.configChanged,
          'formItemPropsAllowConfig.rules.props.defaultValue': newRules,
        },
      };
    }
  }

  // INPUT IN TABLE — không ghi đè pattern từ panel; chỉ bảo đảm có rule anti-HTML
  if (field.uniqId && field.fieldName === FIELD_NAME.INPUT) {
    const rules = field.formItemPropsAllowConfig?.rules;

    if (rules?.props?.defaultValue) {
      const defaultValue = [...rules.props.defaultValue];
      if (!rulesHaveInputAntiHtml(defaultValue)) {
        defaultValue.push({
          pattern: INPUT_ANTI_HTML_PATTERN,
          message: INPUT_ANTI_HTML_MESSAGE,
        });
      }

      return {
        ...field,
        formItemPropsAllowConfig: {
          ...field.formItemPropsAllowConfig,
          rules: {
            ...rules,
            props: {
              ...rules.props,
              defaultValue,
            },
          },
        },
      };
    }
  }

  // PHONE_NUMBER — giữ nguyên pattern từ panel (cho phép Builder tùy chỉnh)
  // Nếu panel chưa set rules thì giữ nguyên default trong schema, không override
  if (field.fieldName === FIELD_NAME.PHONE_NUMBER) {
    return field;
  }

  // TEXTAREA — giữ nguyên pattern từ panel, chỉ đảm bảo có rule anti-HTML
  if (field.fieldName === FIELD_NAME.TEXTAREA) {
    const rules = field.configChanged?.['formItemPropsAllowConfig.rules.props.defaultValue'];

    if (Array.isArray(rules)) {
      if (!rulesHaveInputAntiHtml(rules)) {
        return {
          ...field,
          configChanged: {
            ...field.configChanged,
            'formItemPropsAllowConfig.rules.props.defaultValue': [
              ...rules,
              {
                pattern: INPUT_ANTI_HTML_PATTERN,
                message: INPUT_ANTI_HTML_MESSAGE,
              },
            ],
          },
        };
      }
    }
  }

  // TEXTAREA IN TABLE — giữ nguyên pattern từ panel, chỉ đảm bảo có rule anti-HTML
  if (field.uniqId && field.fieldName === FIELD_NAME.TEXTAREA) {
    const rules = field.formItemPropsAllowConfig?.rules;

    if (rules?.props?.defaultValue) {
      const defaultValue = [...rules.props.defaultValue];

      if (!rulesHaveInputAntiHtml(defaultValue)) {
        defaultValue.push({
          pattern: INPUT_ANTI_HTML_PATTERN,
          message: INPUT_ANTI_HTML_MESSAGE,
        });

        return {
          ...field,
          formItemPropsAllowConfig: {
            ...field.formItemPropsAllowConfig,
            rules: {
              ...rules,
              props: {
                ...rules.props,
                defaultValue,
              },
            },
          },
        };
      }
    }
  }
  return field;
};

export const overrideSchemaBase = (field: any) => {
  const overrides = [
    overrideXacNhanDongY,
    overrideSdt,
    overideInputInTable,
    overrideQuaTrinhXuLy,
    overrideDanhMucNhaNuoc,
    overrideTypeUserInfo,
    overridePhieuYeuCau,
    overrideDataPicker,
    overrideAnhDiaHinh,
    overrideTnnDanhNghiepInfo,
    overrideViewInfoHidden,
    overrideTableSyncTuLieuAnh,
    overrideTextOutSideToKhai,
    overrideCheckboxToggleServerPayloadKey,
    overridViewuploadInAsyncTable,
    overrideRegex,
  ];

  return overrides.reduce((currentField, overrideFn) => overrideFn(currentField), field);
};