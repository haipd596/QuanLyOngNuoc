import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
type RuleCheck = (value: string) => string | null;

export const DANGEROUS_PATTERN =
  /(<\s*\/?\s*(script|iframe|object|embed|svg)\b[^>]*>)|(javascript\s*:)|(on[a-z]+\s*=)|(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|EXEC|UNION)\b)|(--|\/\*)/i;

dayjs.extend(customParseFormat);
export const runSequentialRules = (value: string, rules: RuleCheck[]) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return Promise.reject(new Error(error));
  }
  return Promise.resolve();
};

export const rulesCheck = {
  required: (): RuleCheck => v =>
    !v ? `Vui lòng nhập đầy đủ!` : null,

 noSpace: (): RuleCheck => v =>
    v && v.trimStart() !== v ? 'Không được để khoảng trắng ở đầu!' : null,

  max: (label: string, count: number): RuleCheck => v =>
    v && v.length > count ? `${label} không được vượt quá ${count} ký tự!` : null,

  maxWords: (count: number, msg?: string): RuleCheck => v => {
    if (!v) return null;
    if (v.length > count) {
      return msg || `Nội dung không được vượt quá ${count} ký tự!`;
    }
    return null;
  },

  noNumber: (msg: string): RuleCheck => v =>
    /\d/.test(v) ? msg : null,

  noSpecial: (msg: string): RuleCheck => v =>
    !/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s]*$/.test(v)
      ? msg
      : null,

 isPhone: (msg: string): RuleCheck => v => {
  if (!v) return null;

  const phoneRegex = /^[1-9]\d{4,14}$/;
  return phoneRegex.test(v) ? null : msg;
},
    // ngày tháng
  isValidDate: (msg: string): RuleCheck => v => {
    if (!v) return null; 
    return dayjs(v).isValid() ? null : msg;
  },

//  validate số âm
  noNegative: (msg: string): RuleCheck => v =>
    v && Number(v) < 0 ? msg : null,
//  chỉ đc nhập số bao gồm số thập phân 
isNumeric: (msg: string): RuleCheck => v => {
    if (!v) return null;
    return !/^\d*\.?\d*$/.test(v.toString()) ? msg : null;
  },
  
  // Validate định dạng CCCD (12 số)
  isCCCD: (msg: string): RuleCheck => v => {
    if (!v) return null;
    return /^\d{8,12}$/.test(v) ? null : msg;
  },
  isCCCDorPP: (msg: string): RuleCheck => (v) => {
  if (!v) return null;
  return /^.{8,12}$/.test(v) ? null : msg;
},
  isTaxCode: (msg: string): RuleCheck => v => {
    if (!v) return null;
    const taxCodeRegex = /^(\d{10}|\d{10}-\d{3})$/;
    return taxCodeRegex.test(v) ? null : msg;
  },
  isTaxOrBusinessCode: (): RuleCheck => v => {
  if (!v) return null;
  const regex = /^[0-9-]{1,14}$/;
  return regex.test(v) ? null : 'Tối đa 14 ký tự gồm số và dấu gạch ngang';
  },
  isEmail: (msg: string): RuleCheck => v => {
  if (!v) return null;

  // Regex đủ dùng cho 99% case thực tế
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(v) ? null : msg;
  
},
// Không cho phép có khoảng trắng ở giữa, đầu hoặc cuối
isMaToChuc: (msg: string): RuleCheck => v => {
  if (!v) return null;
  // Regex \s kiểm tra bất kỳ ký tự khoảng trắng nào
  return /\s/.test(v) ? msg : null;
},

isAtLeast18Years: (msg: string): RuleCheck => v => {
  if (!v) return null;

  const date = dayjs(v);
  if (!date.isValid()) return msg;

  const minDate = dayjs().subtract(18, "year");

  return date.isAfter(minDate, "day") ? msg : null;
},
  
//  chặn 3 lần cách liên tiếp
  noTripleSpace: (msg: string): RuleCheck => v =>
    v && /\s{3,}/.test(v) ? msg : null,
 

  noFutureDate: (msg: string): RuleCheck => v => {
    if (!v) return null;
    return dayjs(v).isAfter(dayjs(), 'day') ? msg : null;
  },
  isDateFormat: (msg: string, formats: string[]): RuleCheck => v => {
    if (!v) return null;
    // Sử dụng tham số thứ 3 là 'true' để bật chế độ strict parsing
    return dayjs(v, formats, true).isValid() ? null : msg;
  },
  noDangerous: (msg: string): RuleCheck => v => {
    if (!v) return null;
    return DANGEROUS_PATTERN.test(v) ? msg : null;
  },
};

export const validateRules = {
  name: (label: string) => ({
    validator: (_: any, value: string) => 
      runSequentialRules(value, [
        rulesCheck.required(),
        // rulesCheck.noNumber(`${label} không được chứa số!`),
        // rulesCheck.noSpecial(`${label} không được chứa ký tự đặc biệt!`),

        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),
        rulesCheck.max(label, 255),
      ]),
  }),

  nameVB: (label: string) => ({
    validator: (_: any, value: string) => 
      runSequentialRules(value, [
        // rulesCheck.required(label),
        // rulesCheck.noNumber(`${label} không được chứa số!`),
        // rulesCheck.noSpecial(`${label} không được chứa ký tự đặc biệt!`),

        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),
        rulesCheck.max(label, 255),
      ]),
  }),

  ma: (label: string) => ({
    validator: (_: any, value: string) =>
      runSequentialRules(value, [
        rulesCheck.required(),
        rulesCheck.isMaToChuc(`${label} không được chứa khoảng trắng!`),
        // rulesCheck.noNumber(`${label} không được chứa số!`),
        // rulesCheck.noSpecial(`${label} không được chứa ký tự đặc biệt!`),
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),

        rulesCheck.max(label, 50),
      ]),
  }),
  soDangKyKinhDoanh: () => ({
    validator: (_: any, value: string) =>
      runSequentialRules(value, [
        rulesCheck.required(),
        rulesCheck.isTaxOrBusinessCode(),
      ]),
  }),
  tenOther: (label: string) => ({
    validator: (_: any, value: string) =>
      runSequentialRules(value, [
        rulesCheck.required(),
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),

        rulesCheck.max(label, 100),
      ]),
  }),

 number: (label: string) => ({
    validator: (_: any, value: any) => {
      const stringValue = (value !== undefined && value !== null) ? String(value) : "";

      return runSequentialRules(stringValue, [
        rulesCheck.required(), 
        rulesCheck.noNegative(`${label} không được là số âm!`), 
        rulesCheck.isNumeric(`${label} phải là chữ số!`), 
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),

        rulesCheck.max(label, 30),
      ]);
    }
  }),
  numberNoRq: (label: string) => ({
    validator: (_: any, value: any) => {
      const stringValue = (value !== undefined && value !== null) ? String(value) : "";

      return runSequentialRules(stringValue, [
        rulesCheck.noNegative(`${label} không được là số âm!`), 
        rulesCheck.isNumeric(`${label} phải là chữ số!`), 

      ]);
    }
  }),
  // Rule chỉ kiểm tra định dạng ngày tháng
  date: (label: string) => ({
    validator: (_: any, value: any) =>
      runSequentialRules(value, [
        rulesCheck.required(),
        rulesCheck.noFutureDate( `${label} không được là ngày trong tương lai!`),
        rulesCheck.isValidDate(`${label} không đúng định dạng ngày tháng!`),
        rulesCheck.noFutureDate(`${label} không được là ngày trong tương lai!`),
      ]),
  }),
  dateNoRq: (label: string) => ({
    validator: (_: any, value: any) =>
      runSequentialRules(value, [
        rulesCheck.noFutureDate( `${label} không được là ngày trong tương lai!`),
        rulesCheck.isValidDate(`${label} không đúng định dạng ngày tháng!`),
        rulesCheck.noFutureDate(`${label} không được là ngày trong tương lai!`),
      ]),
  }),
  phone: (label: string) => ({
    validator: (_: any, value: any) => {
      const stringValue = (value !== undefined && value !== null) ? String(value) : "";
      return runSequentialRules(stringValue, [
        rulesCheck.required(),
        rulesCheck.isNumeric(`${label} chỉ được chứa chữ số!`),
        rulesCheck.isPhone(`${label} không đúng định dạng!`),
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),

      ]);
    }
  }),
   phoneNoRq: (label: string) => ({
    validator: (_: any, value: any) => {
      const stringValue = (value !== undefined && value !== null) ? String(value) : "";
      return runSequentialRules(stringValue, [
        // rulesCheck.required(label),
        rulesCheck.isNumeric(`${label} chỉ được chứa chữ số!`),
        rulesCheck.isPhone(`${label} không đúng định dạng!`),
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),

      ]);
    }
  }),
  ngayCapDuTuoi: (label: string) => ({
  validator: (_: any, value: any) =>
    runSequentialRules(value, [
      // rulesCheck.required(label),
      rulesCheck.noFutureDate(`${label} không được là ngày trong tương lai!`),
      rulesCheck.isAtLeast18Years(`${label} phải đủ 18 tuổi trở lên!`),
    ]),
}),

ngayCap: (label: string) => ({
  validator: (_: any, value: any) =>
    runSequentialRules(value, [
      // rulesCheck.required(label),
      rulesCheck.noFutureDate(`${label} không được là ngày trong tương lai!`),
      // rulesCheck.isAtLeast18Years(`${label} phải đủ 18 tuổi trở lên!`),
    ]),
}),

ngayBanHanh: () => ({
  validator: (_: any, value: any) =>
    runSequentialRules(value, [
      rulesCheck.required(),
      // rulesCheck.noFutureDate(`${label} không được là ngày trong tương lai!`),
      // rulesCheck.isAtLeast18Years(`${label} phải đủ 18 tuổi trở lên!`),
    ]),
}),

    Fax: (label: string) => ({
    validator: (_: any, value: any) => {
      const stringValue = (value !== undefined && value !== null) ? String(value) : "";
      return runSequentialRules(stringValue, [
        // rulesCheck.required(label),
        rulesCheck.isNumeric(`${label} chỉ được chứa chữ số!`),
        rulesCheck.isPhone(`${label} không đúng định dạng`),
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),

      ]);
    }
  }),

  email: (label: string) => ({
  validator: (_: any, value: any) => {
    const stringValue =
      value !== undefined && value !== null ? String(value) : "";

    return runSequentialRules(stringValue, [
      rulesCheck.required(),
      // rulesCheck.required(label),
      // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),
      rulesCheck.max(label, 255),
      rulesCheck.isEmail(`${label} không đúng định dạng email!`),
    ]);
  },
}),

  moTa: () => ({
    validator: (_: any, value: string) =>
      runSequentialRules(value, [
        rulesCheck.required(),
        // rulesCheck.noNumber(`${label} không được chứa số!`),
        // rulesCheck.noSpecial(`${label} không được chứa ký tự đặc biệt!`),
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),
        // rulesCheck.noSpace()
        // rulesCheck.max(label, 50),
      ]),
  }),

  maSoThue: () => ({
  validator: (_: any, value: any) => {
    const stringValue =
      value !== undefined && value !== null ? String(value) : "";

    return runSequentialRules(stringValue, [
       rulesCheck.required(),
        rulesCheck.isTaxOrBusinessCode(),
    ]);
  },
}),

  cccd: (label: string) => ({
    validator: (_: any, value: any) => {
      const stringValue = (value !== undefined && value !== null) ? String(value) : "";
      
      return runSequentialRules(stringValue, [
        rulesCheck.required(),

        rulesCheck.isNumeric(`${label} chỉ được chứa chữ số!`),
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),
        rulesCheck.isCCCD(`${label} phải từ 8 đến 12 ký tự!`),
      ]);
    }
  }),
  cccdorpp: (label: string) => ({
    validator: (_: any, value: any) => {
      const stringValue = (value !== undefined && value !== null) ? String(value) : "";
      
      return runSequentialRules(stringValue, [
        rulesCheck.required(),

        // rulesCheck.isNumeric(`${label} chỉ được chứa chữ số!`),
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),
        rulesCheck.isCCCDorPP(`${label} từ 8 đến 12 ký tự!`),
      ]);
    }
  }),
   cccdNoRq: (label: string) => ({
    validator: (_: any, value: any) => {
      const stringValue = (value !== undefined && value !== null) ? String(value) : "";
      
      return runSequentialRules(stringValue, [
        // rulesCheck.required(label),

        rulesCheck.isNumeric(`${label} chỉ được chứa chữ số!`),
        // rulesCheck.noTripleSpace(`${label} không được nhập 3 khoảng trắng liên tiếp!`),
        rulesCheck.isCCCD(`${label} phải bao gồm đúng 12 chữ số!`),
      ]);
    }
  }),
  soBoHoSo: (label: string) => ({
    validator: (_: any, value: any) => {
      const stringValue = (value !== undefined && value !== null) ? String(value) : "";
      return runSequentialRules(stringValue, [
        rulesCheck.required(),
        rulesCheck.isNumeric(`${label} chỉ được chứa chữ số!`),
      ]);
    }
  }),
  dangerousInput: (message = "Dữ liệu nhập không hợp lệ") => ({
    validator: (_: any, value: string) =>
      runSequentialRules(value, [rulesCheck.noDangerous(message)]),
  }),
  maxWords: (count: number, message?: string) => ({
    validator: (_: any, value: string) =>
      runSequentialRules(value, [rulesCheck.maxWords(count, message || `Nội dung không được vượt quá ${count} từ!`)]),
  })
};
