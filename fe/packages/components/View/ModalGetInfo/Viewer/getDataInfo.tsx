/**
 * @param id: id of Organization
 * @returns information of organization by id
 */
const getDataInfo = async (
  isPerson: 1 | 0,
  id: string,
  name?: string,
  dob?: string,
) => {
  let urlRequest = '';
  if (isPerson) {
    // Get info of person
    // Ex: 111111111111
    urlRequest = ` ${
      import.meta.env.VITE_API_DVC_URL
    }/_vti_bin/DVCM/CommonServices.svc/GetInfoCitizenFromCSDLQG/?ma=LGSP_GetToken&cccd=${id}&fullName=${name}&dob=${dob}`;
  } else {
    // Get info of organization
    // Ex: 0109000304
    urlRequest = ` ${
      import.meta.env.VITE_API_DVC_URL
    }/_vti_bin/DVCM/CommonServices.svc/GetInfoBusinessFromCSDLQG/?msdn=${id}&ma=LGSP_GetToken`;
  }

  try {
    const req = await fetch(urlRequest, {
      method: 'GET',
      headers: {
        Accept: 'application/json; odata=nometadata',
      },
    });

    const data = await req.json();

    return data;
  } catch (err) {
    console.error('Error fetching user data:', err);
  }
};

// function transformData(data: IInfoOrganization | IInfoPerson) {}

export default getDataInfo;
