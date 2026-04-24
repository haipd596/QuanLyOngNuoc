import axios from 'axios';
import _ from 'lodash';

import { TFetchBase } from '@packages/hooks/useFetchBase';
import _get from 'lodash/get';
import { createQueryString } from './formatDataOption';

export const fetchViewInfo = (params: TFetchBase & { pathToSource: string }) => {
  try {
    let queryString: string = '';
    const {
      queryParams, action, pathToSource,
    } = params;

    if (!action) throw new Error('Action required');

    if (_.isArray(queryParams)) queryString = createQueryString(queryParams);

    const url = `${action}?${queryString}`;

    return axios.get(url).then((response) => {
      const { data } = response;
      if (data) {
        const _dataSource = _.get(data, pathToSource, []);
        if (_.isArray(_dataSource) || _.isUndefined(_dataSource)) return null;
        return _dataSource;
      }
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserInfomationFromLocalStorage = () => {
  const userString = localStorage.getItem('currentUserInfo');
  if (userString) {
    try {
      const user = JSON.parse(userString);

      return _get(user, 'Data', null);
    } catch (error) {
      console.error('Error parsing user information from localStorage:', error);
      return null;
    }
  }
  return null;
};

// export const refreshUserInfo = async () => {
//   try {
//     const updatedUser = await apiGetUserInfoV2();
//     localStorage.setItem('currentUserInfo', JSON.stringify({ Data: updatedUser }));
//     return updatedUser;
//   } catch (error) {
//     console.error('Error refreshing user info:', error);
//     return null;
//   }
// };
