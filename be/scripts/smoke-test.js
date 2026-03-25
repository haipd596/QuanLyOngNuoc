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
  assert(body?.code === 201, 'Thiếu code trong response đăng nhập');
  assert(body?.status === 'thành công', 'Status đăng nhập không đúng chuẩn tiếng Việt');
  assert(body?.data?.accessToken, 'Thiếu accessToken');
  assert(body?.message, 'Thiếu message');
  return body.data.accessToken;
}

async function main() {
  const userToken = await login('user@ongnuocviet.vn', 'User@123');
  const adminToken = await login('admin@ongnuocviet.vn', 'Admin@123');

  const userHeaders = { Authorization: `Bearer ${userToken}` };
  const adminHeaders = { Authorization: `Bearer ${adminToken}` };

  const products = await call('/products?page=1&limit=5&keyword=PVC', {
    headers: userHeaders,
  });
  assert(products.response.status === 200, 'Lấy danh sách sản phẩm thất bại');
  assert(products.body?.data?.pagination, 'Thiếu pagination ở danh sách sản phẩm');

  const inventory = await call('/inventory/movements?page=1&limit=5&keyword=IMPORT', {
    headers: userHeaders,
  });
  assert(inventory.response.status === 200, 'Lấy lịch sử kho thất bại');
  assert(inventory.body?.data?.pagination, 'Thiếu pagination ở lịch sử kho');

  const salesOrders = await call('/sales-orders?page=1&limit=5&keyword=SO-', {
    headers: userHeaders,
  });
  assert(salesOrders.response.status === 200, 'Lấy danh sách đơn bán thất bại');
  assert(salesOrders.body?.data?.pagination, 'Thiếu pagination ở danh sách đơn bán');

  const dashboard = await call('/reports/dashboard', {
    headers: adminHeaders,
  });
  assert(dashboard.response.status === 200, 'Lấy dashboard admin thất bại');
  assert(dashboard.body?.data, 'Thiếu data ở dashboard');

  const audit = await call('/reports/inventory-audit?page=1&limit=5&keyword=CADIVI', {
    headers: adminHeaders,
  });
  assert(audit.response.status === 200, 'Lấy kiểm kê kho thất bại');
  assert(audit.body?.data?.lowStock?.pagination, 'Thiếu pagination ở kiểm kê kho');

  console.log('Smoke test thành công: các API chính hoạt động đúng chuẩn.');
}

main().catch((error) => {
  console.error('Smoke test thất bại:', error.message);
  process.exit(1);
});

