export const apiGetTokenGiayTo = async () => {
  const url = 'http://10.1.15.138:8080/XrdAdapter/RestService/forward/bndp/public/v1/login';
  const params = {
    dstcode: 'VN%3AGOV%3A000.00.00.G22%3Avpcpdvcprovider',
    providerurl: 'https%3A%2F%2Fapigiaytocanhan.dichvucong.gov.vn',
  };

  const bodyData = {
    username: '000.00.00.G13',
    password: '000.00.00.G13@123456',
  };

  try {
    const response = await fetch(
      `${url}?${params.dstcode}&${params.providerurl}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Charset: 'utf-8',
        },
        body: JSON.stringify(bodyData),
      },
    );

    return await response.json();
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
