import _find from 'lodash/find';

export const getSystemParameterByMa = (
  systemParameters: any,
  Ma: string,
) => _find(systemParameters, { Ma })?.GiaTri;

export const getXApiKey = (systemParameters: any) => {
  const AppKey = getSystemParameterByMa(systemParameters, 'AppKey');
  const AppId = getSystemParameterByMa(systemParameters, 'AppID');

  return `${AppId}:${AppKey}`;
};
