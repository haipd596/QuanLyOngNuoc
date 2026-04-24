/* eslint-disable max-len */
import { getUserIdPageContext } from '@packages/utils/common';
import { message } from 'antd';
import _get from 'lodash/get';
// import { fetchDvcBase } from './fetchDvcBase';
import _ from 'lodash';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetInfoOrgFromCSDL = async (id: string) => {
  try {
    const userId = getUserIdPageContext();
    if (!userId) return;

    const urlRequest = `${getBaseDvcApi()}/_vti_bin/DVCM/CommonServices.svc/GetInfoBusinessFromCSDLQG/?msdn=${id}&ma=LGSP_GetToken`;

    // const data = await fetchDvcBase({ url: urlRequest });
    const res = await fetch(urlRequest, {
      method: 'GET',
      headers: {
        Accept: 'application/json; odata=nometadata',
      },
    });

    const data = await res.json();

    if (_.isEmpty(data)) {
      throw new Error('Dữ liệu không tồn tại!');
    }
    
    const info = _get(data, 'Data', {});

    // if (data?.value?.length > 0) return data.value[0];
    return info;
  } catch (error) {
    message.error('Lấy thông tin tổ chứ từ CSDL không thành công');
    throw new Error(`apiGetOrganization: ${error}`);
  }
};
