/* eslint-disable no-console */
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api/v1';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function call(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const body = await response.json();
  return { response, body };
}

async function callRaw(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options);
  return { response };
}

async function login(email, password) {
  const { response, body } = await call('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  assert(response.status === 201, `Dang nhap that bai: ${response.status}`);
  assert(body?.code === 0, 'Code dang nhap khong dung chuan');
  assert(body?.success === true, 'Thieu success=true o response dang nhap');
  assert(body?.data?.accessToken, 'Thieu accessToken');
  assert(body?.message, 'Thieu message');
  return body.data.accessToken;
}

async function main() {
  const userToken = await login('user@ongnuocviet.vn', 'User@123');
  const adminToken = await login('admin@ongnuocviet.vn', 'Admin@123');

  const userHeaders = { Authorization: `Bearer ${userToken}` };
  const adminHeaders = { Authorization: `Bearer ${adminToken}` };

  const products = await call('/products?Page=1&PageSize=5&Keyword=PVC', {
    headers: userHeaders,
  });
  assert(products.response.status === 200, 'Lay danh sach san pham that bai');
  assert(Array.isArray(products.body?.data), 'Du lieu danh sach san pham phai la mang');
  assert(products.body?.metaData?.page !== undefined, 'Thieu metaData o danh sach san pham');

  const inventory = await call('/inventory/movements?Page=1&PageSize=5&Keyword=IMPORT', {
    headers: userHeaders,
  });
  assert(inventory.response.status === 200, 'Lay lich su kho that bai');
  assert(Array.isArray(inventory.body?.data), 'Du lieu lich su kho phai la mang');
  assert(inventory.body?.metaData?.page !== undefined, 'Thieu metaData o lich su kho');

  const salesOrders = await call('/sales-orders?Page=1&PageSize=5&Keyword=SO-', {
    headers: userHeaders,
  });
  assert(salesOrders.response.status === 200, 'Lay danh sach don ban that bai');
  assert(Array.isArray(salesOrders.body?.data), 'Du lieu don ban phai la mang');
  assert(salesOrders.body?.metaData?.page !== undefined, 'Thieu metaData o danh sach don ban');

  const dashboard = await call('/reports/dashboard', {
    headers: adminHeaders,
  });
  assert(dashboard.response.status === 200, 'Lay dashboard admin that bai');
  assert(dashboard.body?.data, 'Thieu data o dashboard');

  const audit = await call('/reports/inventory-audit?Page=1&PageSize=5&Keyword=CADIVI', {
    headers: adminHeaders,
  });
  assert(audit.response.status === 200, 'Lay kiem ke kho that bai');
  assert(audit.body?.data?.lowStock?.metaData?.page !== undefined, 'Thieu metaData o kiem ke kho');

  const oauthStart = await callRaw('/auth/google', {
    method: 'GET',
    redirect: 'manual',
  });
  assert(
    [302, 400].includes(oauthStart.response.status),
    `Auth Google khong dung trang thai mong doi: ${oauthStart.response.status}`,
  );

  const aiRecalculate = await call('/ai/recalculate', {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({ targetDays: 14 }),
  });
  assert(aiRecalculate.response.status === 201, 'Tinh lai AI kho that bai');
  assert(aiRecalculate.body?.data?.recalculatedCount !== undefined, 'Thieu recalculatedCount');

  const aiList = await call('/ai/restock-recommendations?Page=1&PageSize=5&Keyword=HIGH', {
    headers: userHeaders,
  });
  assert(aiList.response.status === 200, 'Lay danh sach AI kho that bai');
  assert(Array.isArray(aiList.body?.data), 'Du lieu AI kho phai la mang');
  assert(aiList.body?.metaData?.page !== undefined, 'Thieu metaData o AI kho');

  const hasMailConfig =
    Boolean(process.env.MAIL_HOST) &&
    Boolean(process.env.MAIL_USER) &&
    Boolean(process.env.MAIL_PASS) &&
    Boolean(process.env.MAIL_FROM);

  if (hasMailConfig) {
    const mailTest = await call('/mail/test-send', {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({
        to: 'admin@ongnuocviet.vn',
        subject: 'Smoke test mail',
        content: 'Smoke test from API',
      }),
    });
    assert(mailTest.response.status === 201, 'Gui mail test that bai');
    assert(mailTest.body?.data?.messageId, 'Thieu messageId o mail test');
  } else {
    console.log('Bo qua test /mail/test-send vi chua co du bien MAIL_*');
  }

  console.log('Smoke test thanh cong: cac API chinh hoat dong dung chuan.');
}

main().catch((error) => {
  console.error('Smoke test that bai:', error.message);
  process.exit(1);
});