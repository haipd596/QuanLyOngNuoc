
const DIGITS = ['không', 'nhất', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const SCALES = ['', 'nghìn', 'triệu', 'tỷ'];

export const formatNumber = (value: string | number | undefined) => {
  if (value === undefined || value === null || value === '') return '';

  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parseNumber = (value: string | undefined) => (value ? value.replace(/,/g, '') : '');

const readTriple = (num: number, full: boolean) => {
  const hundred = Math.floor(num / 100);
  const ten = Math.floor((num % 100) / 10);
  const unit = num % 10;
  const parts: string[] = [];

  if (hundred > 0 || full) {
    parts.push(`${DIGITS[hundred]} trăm`);
  }

  if (ten > 1) {
    parts.push(`${DIGITS[ten]} mươi`);
    if (unit === 1) parts.push('mốt');
    else if (unit === 4) parts.push('tư');
    else if (unit === 5) parts.push('lăm');
    else if (unit > 0) parts.push(DIGITS[unit]);
    return parts.join(' ');
  }

  if (ten === 1) {
    parts.push('mười');
    if (unit === 5) parts.push('lăm');
    else if (unit > 0) parts.push(DIGITS[unit]);
    return parts.join(' ');
  }

  if (ten === 0 && unit > 0) {
    if (hundred > 0 || full) parts.push('lẻ');
    parts.push(DIGITS[unit]);
  }

  return parts.join(' ').trim();
};

export const numberToVietnamese = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) return `${value}`;
  if (value === 0) return DIGITS[0];

  const groups: number[] = [];
  let remaining = Math.floor(value);

  while (remaining > 0) {
    groups.unshift(remaining % 1000);
    remaining = Math.floor(remaining / 1000);
  }

  const parts = groups
    .map((group, index) => {
      if (group === 0) return '';

      const scaleIndex = groups.length - index - 1;
      const hasPreviousGroup = index > 0;
      const text = readTriple(group, hasPreviousGroup && group < 100);
      const scale = SCALES[scaleIndex] || '';

      return [text, scale].filter(Boolean).join(' ');
    })
    .filter(Boolean);

  return parts.join(' ').replace(/\s+/g, ' ').trim();
};