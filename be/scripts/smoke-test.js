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

async function login(email, password) {
  const { response, body } = await call('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  assert(response.status === 201, `Đăng nhập thất bại: ${response.status}`);
  assert(body?.code === 0, 'Code đăng nhập không đúng chuẩn');
  assert(body?.success === true, 'Thiếu success=true ở response đăng nhập');
  assert(body?.data?.accessToken, 'Thiếu accessToken');
  assert(body?.message, 'Thiếu message');
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
  assert(products.response.status === 200, 'Lấy danh sách sản phẩm thất bại');
  assert(Array.isArray(products.body?.data), 'Dữ liệu danh sách sản phẩm phải là mảng');
  assert(products.body?.metaData?.page !== undefined, 'Thiếu metaData ở danh sách sản phẩm');

  const inventory = await call('/inventory/movements?Page=1&PageSize=5&Keyword=IMPORT', {
    headers: userHeaders,
  });
  assert(inventory.response.status === 200, 'Lấy lịch sử kho thất bại');
  assert(Array.isArray(inventory.body?.data), 'Dữ liệu lịch sử kho phải là mảng');
  assert(inventory.body?.metaData?.page !== undefined, 'Thiếu metaData ở lịch sử kho');

  const salesOrders = await call('/sales-orders?Page=1&PageSize=5&Keyword=SO-', {
    headers: userHeaders,
  });
  assert(salesOrders.response.status === 200, 'Lấy danh sách đơn bán thất bại');
  assert(Array.isArray(salesOrders.body?.data), 'Dữ liệu đơn bán phải là mảng');
  assert(salesOrders.body?.metaData?.page !== undefined, 'Thiếu metaData ở danh sách đơn bán');

  const dashboard = await call('/reports/dashboard', {
    headers: adminHeaders,
  });
  assert(dashboard.response.status === 200, 'Lấy dashboard admin thất bại');
  assert(dashboard.body?.data, 'Thiếu data ở dashboard');

  const audit = await call('/reports/inventory-audit?Page=1&PageSize=5&Keyword=CADIVI', {
    headers: adminHeaders,
  });
  assert(audit.response.status === 200, 'Lấy kiểm kê kho thất bại');
  assert(audit.body?.data?.lowStock?.metaData?.page !== undefined, 'Thiếu metaData ở kiểm kê kho');

  console.log('Smoke test thành công: các API chính hoạt động đúng chuẩn.');
}

main().catch((error) => {
  console.error('Smoke test thất bại:', error.message);
  process.exit(1);
});
