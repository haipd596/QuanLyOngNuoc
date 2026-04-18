import { ApiConfig } from '~/configs';

export const getDetailSchema = async (formKey: string): Promise<any> => {
  const response = await fetch(`${ApiConfig.apiBaseUrl}/${formKey}`);
  const data = await response.json();
  console.log("DETAIL SCHEMA::", response)
  return data;
};
