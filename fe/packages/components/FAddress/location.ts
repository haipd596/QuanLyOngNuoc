import _ from 'lodash';
import slugify from 'slugify';

export const convertToSlugtify = (str: string) => slugify(str, {
  replacement: '_', lower: true, locale: 'vi', trim: true,
});

/**
 * @description
 * Hàm này sẽ xử lí địa chỉ từ dữ liệu trả về của người dùng hiện tại.
 * Xử lí đúng định dạng như tỉnh/quận/thị xã đã được định nghĩa trước đó.
 */
export const locationFormatSlugtify = (data: string[]) => {
  const modifiedArray = _.values(data).map((address) => {
    if (address.endsWith('District')) {
      return address.replace(' District', '');
    } if (address.endsWith('Province')) {
      return address.replace(' Province', '');
    } if (address.endsWith('City')) {
      return address.replace(' City', '');
    } if (address.endsWith('Ward')) {
      return address.replace(' Ward', '');
    } if (address.startsWith('Phường')) {
      return address.replace('Phường ', '');
    }
    return address;
  });

  const convertSlugify = modifiedArray.map((item) => convertToSlugtify(item));

  return convertSlugify;
};
