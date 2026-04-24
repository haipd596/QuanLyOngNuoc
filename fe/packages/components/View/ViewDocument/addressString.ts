import { IProvince } from '@packages/components/FAddress/types';
import { AnyObject } from 'antd/es/_util/type';

export const addressString = (values: AnyObject, address: IProvince[]): string => {
  const objectAddress = [];
  if (values.province) {
    const province = address.find(({ value }) => value === values.province);
    if (province) objectAddress.push(province.label);

    if (values.district && province) {
      const district = province.districts.find(({ value }) => value === values.district);
      if (district) objectAddress.push(district.label);

      if (values.ward) {
        const ward = district?.wards.find(({ value }) => value === values.ward);
        if (ward) objectAddress.push(ward.label);
      }
    }
  }

  if (values.road) objectAddress.push(values.road);
  const result = [objectAddress].reverse().join(', ');

  return result;
};
