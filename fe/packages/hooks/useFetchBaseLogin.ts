import { apiGetUserInfoV2 } from '@packages/dvc-service/apiGetUserInfoV2';
import { getUserInfomationFromLocalStorage } from '@packages/utils/viewInfoQuery';
import { AnyObject } from 'antd/es/_util/type';
import _get from 'lodash/get';
import { useEffect, useState } from 'react';

export enum TypeUserEnum {
  IS_PERSONAL = 'IS_PERSONAL',
  IS_ORGANIZATION = 'IS_ORGANIZATION',
}

export const useFetchBaseLogin = () => {
  const [fetchData, setFetchData] = useState<AnyObject>();
  const [typeUser, setTypeUser] = useState<AnyObject>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      // Lấy thông tin người dùng nếu tồn tại ở localStorage
      const userInfo = getUserInfomationFromLocalStorage();
      const personal = userInfo || await apiGetUserInfoV2();
      console.log("USER INFO::", personal)
      // const personal = await refreshUserInfo();

      // Get type login information
      const typeObject = _get(personal, 'LoaiTaiKhoan');
      const TTCaNhan = _get(personal, 'CaNhan', {});
      const TTDoanhNghiep = _get(personal, 'DoanhNghiep', {});
      const NguoiDaiDien = _get(TTDoanhNghiep, 'NguoiDaiDien.HoVaTen', '');
      const diaChi = _get(TTCaNhan, 'ThuongTru') || _get(TTDoanhNghiep, 'DiaChi');
      const NgayCap = _get(TTCaNhan, 'NgayCapCMTND') || _get(TTDoanhNghiep, 'NgayCap');
      const NoiCap = _get(TTCaNhan, 'NoiCapCMTND') || _get(TTDoanhNghiep, 'NoiCap');
      const DiaChi = (() => {
        const xa = _get(diaChi, 'PhuongXa', '');
        // const huyen = _get(diaChi, 'QuanHuyen', '');
        const thanhPho = _get(diaChi, 'ThanhPho', '');
        const detailAddress = _get(diaChi, 'ChiTiet');

        // const final = [xa, huyen, thanhPho];
        const final = [detailAddress, xa, thanhPho];

        return final.reduce((acc, cur, index) => {
          if (cur) {
            acc += `${cur} ${index < (final.length - 1) ? ',' : ''}`;
          }

          return acc;
        }, '');
      })();

      switch (typeObject) {
        case 0:
          setTypeUser({
            ...TTCaNhan,
            customMaDinhDanh: TTCaNhan.SoCMND,
            isPerson: true,
            Title: TTCaNhan.HoVaTen,
            addressDoDac: DiaChi,
            NguoiDaiDien,
            NgayCap,
            NoiCap,
          });
          break;

        case 1:
          setTypeUser({
            ...TTDoanhNghiep,
            customMaDinhDanh: TTDoanhNghiep.MaSoThue,
            isOrganization: true,
            Title: TTDoanhNghiep.TenDoanhNghiep,
            addressDoDac: DiaChi,
            NguoiDaiDien,
            NgayCap,
            NoiCap,
          });
          break;

        default:
          break;
      }
      setLoading(false);
      setFetchData(personal);
    };

    fetchAllData().catch((error) => {
      // message.error('Lấy thông tin người dùng lỗi!');
      console.error('Error fetching user data:', error);
      setLoading(false);
    });
  }, []);

  return { fetchData, typeUser, loading };
};
