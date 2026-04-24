import { apiGetByTthcId, apiGetSystemParameter, apiGetTokenGiayTo } from '@packages/dvc-service';
import { useFetchBaseLogin } from '@packages/hooks';
import { AnyObject } from 'antd/es/_util/type';
import _get from 'lodash/get';
import { useEffect, useState } from 'react';

export const useGetSystemParameterAndUserInfo = () => {
  const [systemParameter, setSystemParameter] = useState<AnyObject>({});
  const [tokenKey, setTokenKey] = useState<string>('');
  const [procedureCode, setProcedureCode] = useState<AnyObject>({});
  const { typeUser } = useFetchBaseLogin();
  const [userInfo, setUserInfo] = useState<AnyObject>({
    HoTenNguoiYeuCau: '',
    SoDinhDanhNguoiYeuCau: '',
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          systemData, procedureCodeData, tokenData,
        ] = await Promise.all([apiGetSystemParameter(), apiGetByTthcId(), apiGetTokenGiayTo()]);

        if (systemData) setSystemParameter(systemData);
        if (procedureCodeData) setProcedureCode(procedureCodeData);
        if (tokenData) {
          const token = _get(tokenData, 'accessToken');
          if (token) setTokenKey(token);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    if (typeUser.isPerson) {
      setUserInfo({
        HoTenNguoiYeuCau: typeUser?.HoVaTen,
        SoDinhDanhNguoiYeuCau: typeUser?.customMaDinhDanh,
      });
    }

    if (typeUser.isOrganization) {
      setUserInfo({
        HoTenNguoiYeuCau: typeUser?.TenDoanhNghiep,
        SoDinhDanhNguoiYeuCau: typeUser?.customMaDinhDanh,
      });
    }
  }, [typeUser]);

  return {
    systemParameter, userInfo, procedureCode, tokenKey,
  };
};
