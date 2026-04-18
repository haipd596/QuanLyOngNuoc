export const isVietnam = (idQuocTich?: number | null) => {
  return !idQuocTich; 
};

export const parsePhoneE164 = (phone?: string) => {
  if (!phone) {
    return {
      phone: undefined,
      phonePrefix: undefined,
    };
  }

  const p = phone.trim();

  if (p.startsWith("+")) {
    const match = p.match(/^\+(\d{1,3})(.*)$/);

    if (match) {
      const [, code, rest] = match;

      return {
        phonePrefix: `+${code}`,
        phone: rest,
      };
    }
  }

  // fallback nếu data cũ chưa có +
  return {
    phonePrefix: undefined,
    phone: p,
  };
};

export const formatPhoneForApi = (
  phone?: string,
  phonePrefix?: string,
  idQuocTich?: number | null
) => {
  if (!phone) return phone;

  const isVN = isVietnam(idQuocTich);

  let p = phone.trim();

  // Nếu đã có +
  if (p.startsWith("+")) return p;

  // Nếu VN → bỏ số 0 đầu
  if (isVN && p.startsWith("0")) {
    p = p.slice(1);
  }

  return `${phonePrefix || "+84"}${p}`;
};