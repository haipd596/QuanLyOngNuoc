import _get from 'lodash/get';
import { fetchDvcBase } from './fetchDvcBase';
import { getBaseDvcApi } from './getBaseUrl';

export const apiGetFileDinhKemTaskByTaskID = async (taskID?: string) => {
  if (taskID) {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('FileDinhKemTask')/items?$select=*&$filter=TaskId eq '${taskID}'`;
    try {
      const data = await fetchDvcBase({
        url,
        requestInit: {
          method: 'GET',
        },
      });

      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

      return _get(parsedData, 'value', []);
    } catch (error) {
      throw new Error(`apiGetFormDataByHsId: ${error}`);
    }
  }

  return [];
};

export const apiGetFileDinhKemTaskByTaskIDSubTask = async (subTaskID?: string) => {
  if (subTaskID) {
    const url = `${getBaseDvcApi()}/_api/web/lists/getbytitle('SubTask')/items?$select=*&$filter=WFTaskIdId eq '${subTaskID}'`;
    try {
      const data = await fetchDvcBase({
        url,
        requestInit: {
          method: 'GET',
        },
      });

      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

      return _get(parsedData, 'value', []);
    } catch (error) {
      throw new Error(`apiGetFormDataByHsId: ${error}`);
    }
  }

  return [];
};
