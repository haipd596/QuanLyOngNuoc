import { apiGetHoSoByHsId } from '@packages/dvc-service/apiGetHoSoByHsId';
import { apiGetSystemParameterAll } from '@packages/dvc-service/apiGetSystemParameterAll';
import { fetchDvcBase } from '@packages/dvc-service/fetchDvcBase';
import { Input } from 'antd';
import _find from 'lodash/find';
import _get from 'lodash/get';
import { useEffect, useState } from 'react';

const Content = () => {
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await Promise.all([
          apiGetSystemParameterAll(),
          apiGetHoSoByHsId(),
        ]);
        const [systemParameter, hoSo] = data;
        const maHoSo = _get(hoSo, 'Ma', '');
        const appKey = _find(systemParameter, { Ma: 'AppKey' })?.GiaTri;
        const AppID = _find(systemParameter, { Ma: 'AppID' })?.GiaTri;
        const SystemApiBaseUrl = _find(systemParameter, { Ma: 'SystemApiBaseUrl' })?.GiaTri;

        if (maHoSo) {
          const url = `${SystemApiBaseUrl}api/nhs/getnoidungbshs?maHS=${maHoSo}`;

          const hsBoSung = await fetchDvcBase({
            url,
            requestInit: {
              headers: {
                'X-ApiKey': `${AppID}:${appKey}`,
              },
            },
          });

          setValue(_get(hsBoSung, 'Data', ''));
        }
      } catch (error) {
        console.error('get noi dung nop ho so', error);
      }
    })();
  }, []);

  return (
    <Input.TextArea disabled value={value} />
  );
};

export default Content;
