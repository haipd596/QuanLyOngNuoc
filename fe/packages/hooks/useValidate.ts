

export const useValidate = () => {
  const EMAIL_PATTERN = '[^@]{2,64}@[^.]{2,253}\\.[0-9a-z-.]{2,63}';
  // const PHONE_PATTERN = '^\\+?[0-9]{7,15}$';
  const PHONE_PATTERN = '^(0\\d{9,10}|\\+\\d{11,12})$';

  const RULE_WEBSITE:any = [
    {
      pattern: /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
      message: 'Website không hợp lệ (vd: http://example.com hoặc https://example.com)',
    }
  ]

  const RULE_DATE:any = [
    {
      pattern: new RegExp('^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19[0-9]{2}|20[0-9]{2})$'),
      message: 'Ngày không đúng định dạng (DD/MM/YYYY)',
    }
  ]


  // CCCD: đúng 12 chữ số
  const RULE_CCCD:any = [
    {
      pattern: /^[0-9]{12}$/,
      message: 'Số CCCD phải gồm đúng 12 chữ số!',
    },
  ]

  // Hộ chiếu Việt Nam: 1-2 chữ cái + 7 chữ số (vd: B1234567, AB1234567)
  const RULE_PASSPORT:any = [
    {
      pattern: /^[A-Z]{1,2}[0-9]{7}$/,
      message: 'Số hộ chiếu không hợp lệ (vd: B1234567 hoặc AB1234567)!',
    },
  ]

  // CCCD hoặc Hộ chiếu (VN + Quốc tế)
  // - CCCD: đúng 12 chữ số
  // - Hộ chiếu VN: 1-2 chữ cái + 7 số (vd: B1234567, PC1234567)
  // - Hộ chiếu Quốc tế bắt đầu bằng chữ (ICAO): 5-9 ký tự (vd: A12345678)
  // - Hộ chiếu toàn số (vd: UK - 9 số): 5-9 chữ số (không trùng với CCCD 12 số)
  const RULE_CCCD_OR_PASSPORT:any = [
    {
      pattern: /^([0-9]{12}|[A-Z][A-Z0-9]{4,8}|[0-9]{5,9})$/,
      message: 'Không hợp lệ! CCCD gồm 12 chữ số, hộ chiếu gồm 5-9 ký tự (chữ cái + số hoặc toàn số).',
    },
  ]

  const RULE_TAX_CODE:any = [
    {
      pattern: new RegExp('^[0-9]{10}(-[0-9]{3})?$|^[0-9]{12}$'),
      message: 'Mã số thuế không đúng định dạng',
    },
  ]

  const RULE_REQUIRED:any = [
    { required: true, message: 'Chưa nhập đủ thông tin' },
  ]

  const RULE_256:any = [
    {
      pattern: '^.{1,256}$',
      message: 'Không được vượt quá 256 ký tự!',
    },
  ]

  const RULE_6:any = [
    {
      pattern: '^.{1,6}$',
      message: 'Không được vượt quá 6 ký tự!',
    },
  ]

  const RULE_NO_HTML:any = [
    {
      whitespace: true,
      message: 'Trường văn bản không được để trống',
    },
    {
      pattern:  /^(?!.*<[^>]+>)[\s\S]*$/,
      message: 'Không cho phép nhập thẻ HTML!',
    }
  ]

  const RULE_EMAIL:any = [
    {
      pattern: EMAIL_PATTERN,
      message: 'Định dạng email không hợp lệ!',
    },
  ];

  const RULES_256_NO_HTML:any = [
    ...RULE_NO_HTML,
    ...RULE_256
  ]

  const RULE_FAX:any = [
    {
      pattern: new RegExp(PHONE_PATTERN),
      message: 'Số Fax không hợp lệ!',
    }
  ]

  const RULE_PHONE:any = [
    {
      pattern: new RegExp(PHONE_PATTERN),
      message: 'Số điện thoại không hợp lệ!',
    }
  ]

  return {
    RULE_REQUIRED,
    RULE_256,
    RULE_NO_HTML,
    RULES_256_NO_HTML,
    RULE_EMAIL,
    RULE_FAX,
    RULE_PHONE,
    RULE_TAX_CODE,
    RULE_DATE,
    RULE_WEBSITE,
    RULE_6,
    RULE_CCCD,
    RULE_PASSPORT,
    RULE_CCCD_OR_PASSPORT
  }
}
export default useValidate;