import { listkeyCaNhan, listkeyToChuc } from '@packages/components/View/ViewInfo/Viewer/constant';
import { getBaseDvcApi } from '@packages/dvc-service/getBaseUrl';
import { AnyObject } from 'antd/es/_util/type';
import _isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';

const useFetchData = () => {
  let userId: any;
  try {
    // @ts-expect-error: _spPageContextInfo
    userId = _spPageContextInfo.userId;
  } catch (error) {
    console.error('Error accessing _spPageContextInfo:', error);
  }
  const [fetchData, setFetchData] = useState<AnyObject>();
  const [listKeyValueInViewInfo, setListKeyValueInViewInfo] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      const urlPersonal = `${getBaseDvcApi()}/_api/web/lists/getbytitle('DM_ThongTinNguoiDung')/items?$select=*,LoaiDoiTuong/Loai,NoiCapCMTND/Ten&$expand=LoaiDoiTuong,NoiCapCMTND&$filter=NguoiDungId eq '${userId}'`;
      const urlOrganization = ` ${getBaseDvcApi()}/_api/web/lists/getbytitle('DM_ThongTinToChuc')/items?$select=*,NguoiDaiDien/Title,LoaiDoiTuong/Loai&$expand=LoaiDoiTuong,NguoiDaiDien&$filter=NguoiDungId eq '${userId}'`;

      try {
        // Fetch personal data first
        const resPersonal = await fetch(urlPersonal, {
          method: 'GET',
          headers: {
            Accept: 'application/json; odata=nometadata',
          },
        });

        const dataPersonal = await resPersonal.json();
        let fetchDataPersonal = dataPersonal.value[0]
          ? dataPersonal.value[0]
          : null;
        setListKeyValueInViewInfo(listkeyCaNhan as any);

        // If personal data is not found, fetch organization data
        if (_isEmpty(fetchDataPersonal)) {
          const resOrganization = await fetch(urlOrganization, {
            method: 'GET',
            headers: {
              Accept: 'application/json; odata=nometadata',
            },
          });

          const dataOrganization = await resOrganization.json();
          fetchDataPersonal = dataOrganization.value[0]
            ? dataOrganization.value[0]
            : {};
          setListKeyValueInViewInfo(listkeyToChuc as any);
        }

        localStorage.setItem('LoaiDoiTuong', fetchDataPersonal?.LoaiDoiTuong?.Loai);
        setFetchData(fetchDataPersonal);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  return { fetchData, listKeyValueInViewInfo };
};

export default useFetchData;
