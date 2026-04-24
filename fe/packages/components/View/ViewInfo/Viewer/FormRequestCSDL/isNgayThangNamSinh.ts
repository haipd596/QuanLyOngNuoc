import dayjs from 'dayjs';
import _ from 'lodash';

export const formatNgayThangNamSinh = (ngayThangNamSinh: string) => {
  if (_.isString(ngayThangNamSinh)) {
    const regex = /([0-9]{2}){0,8}/g;

    const matched = ngayThangNamSinh.match(regex);

    const validNgayThangNamSinh = _.find(matched, (value) => value.length === 8);
    if (validNgayThangNamSinh) {
      const ngay = validNgayThangNamSinh.slice(0, 2);
      const thang = validNgayThangNamSinh.slice(2, 4);
      const nam = validNgayThangNamSinh.slice(-4);

      return dayjs(`${nam}-${thang}-${ngay}`);
    }
  }

  return null;
};
