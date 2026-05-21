import { DownloadOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Select, Space, Table, Tag, Typography, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { ORDER_STATUS_LABEL_MAP, ORDER_STATUS_OPTIONS } from "@/apps/admin/constants/status";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "@/apps/admin/pages/dashboard/styled";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { getSellerOrders, updateSellerOrderStatus } from "@/apps/seller/services/seller.api";

const PAGE_SIZE = 10;

const PAYMENT_STATUS_OPTIONS = [
  { label: "Chưa thanh toán", value: "UNPAID" },
  { label: "Đã thanh toán", value: "PAID" },
  { label: "Hoàn tiền", value: "REFUNDED" },
];

const PAYMENT_METHOD_OPTIONS = [
  { label: "COD", value: "COD" },
  { label: "MOMO", value: "MOMO" },
  { label: "BANK_TRANSFER", value: "BANK_TRANSFER" },
];

const PAYMENT_STATUS_LABEL_MAP: Record<string, string> = {
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
  REFUNDED: "Đã hoàn tiền",
};

const STATUS_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CONFIRMED", "CANCELED"],
  CONFIRMED: ["PACKING", "CANCELED"],
  PACKING: ["SHIPPED", "CANCELED"],
  SHIPPED: ["COMPLETED"],
  COMPLETED: [],
  CANCELED: [],
};

const toCsvCell = (value: unknown) => {
  const raw = value == null ? "" : String(value);
  const escaped = raw.replace(/"/g, '""');
  return `"${escaped}"`;
};

const downloadCsv = (fileName: string, rows: string[][]) => {
  const csv = rows.map((row) => row.map(toCsvCell).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const SellerOrdersPage = () => {
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string | undefined>(undefined);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string | undefined>(undefined);
  const [detailOrder, setDetailOrder] = useState<any | null>(null);
  const [exporting, setExporting] = useState(false);

  const buildParams = (paging: { Page: number; PageSize: number }) => {
    const params: Record<string, unknown> = { ...paging };
    if (keyword.trim()) params.Keyword = keyword.trim();
    if (statusFilter) params["Query.OrderStatus"] = statusFilter;
    if (paymentStatusFilter) params["Query.PaymentStatus"] = paymentStatusFilter;
    if (paymentMethodFilter) params["Query.PaymentMethod"] = paymentMethodFilter;
    return params;
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res: any = await getSellerOrders(buildParams({ Page: page, PageSize: PAGE_SIZE }));
      setOrders(res.data || []);
      setTotal(res.metaData?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchOrders();
  }, [page]);

  const exportOrders = async () => {
    setExporting(true);
    try {
      const res: any = await getSellerOrders(buildParams({ Page: 1, PageSize: 1000 }));
      const data = res?.data || [];
      const rows: string[][] = [
        ["Mã đơn", "Khách hàng", "SĐT", "Địa chỉ", "Thanh toán", "PTTT", "Trạng thái", "Tổng tiền", "Ngày tạo"],
        ...data.map((row: any) => [
          row.orderCode,
          row.customer?.fullName || row.guestName || "Khách lẻ",
          row.customer?.phone || row.guestPhone || "",
          row.customer?.address || row.guestAddress || "",
          PAYMENT_STATUS_LABEL_MAP[row.paymentStatus] || row.paymentStatus || "",
          row.paymentMethod || "",
          ORDER_STATUS_LABEL_MAP[row.orderStatus] || row.orderStatus || "",
          Number(row.finalAmount || 0),
          row.createdAt ? new Date(row.createdAt).toLocaleString("vi-VN") : "",
        ]),
      ];
      downloadCsv("seller-orders.csv", rows);
      notification.success({ message: "Thành công", description: `Đã xuất ${data.length} đơn hàng` });
    } catch {
      notification.error({ message: "Thất bại", description: "Xuất CSV thất bại" });
    } finally {
      setExporting(false);
    }
  };

  const columns: ColumnsType<any> = [
    { title: "Mã đơn", dataIndex: "orderCode" },
    { title: "Khách hàng", render: (_, r) => r.customer?.fullName || r.guestName || "Khách lẻ" },
    {
      title: "Thanh toán",
      render: (_, r) => (
        <Tag color={r.paymentStatus === "PAID" ? "green" : "orange"}>
          {r.paymentStatus || "UNPAID"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      render: (_, r) => (
        <Tag color={r.orderStatus === "CANCELED" ? "red" : "blue"}>
          {ORDER_STATUS_LABEL_MAP[r.orderStatus] || r.orderStatus}
        </Tag>
      ),
    },
    { title: "Tổng tiền", align: "right", render: (_, r) => formatMoney(Number(r.finalAmount)) },
    {
      title: "Cập nhật",
      render: (_, r) => {
        const nextOptions = STATUS_TRANSITIONS[r.orderStatus] || [];
        const options = [r.orderStatus, ...nextOptions]
          .filter((v, idx, arr) => arr.indexOf(v) === idx)
          .map((status) => ({
            value: status,
            label: ORDER_STATUS_LABEL_MAP[status] || status,
          }));

        return (
          <Select
            style={{ width: 190 }}
            value={r.orderStatus}
            options={options}
            disabled={nextOptions.length === 0}
            onChange={async (value) => { try { await updateSellerOrderStatus(r.id, value); notification.success({ message: "Thành công", description: "Đã cập nhật trạng thái đơn" }); void fetchOrders(); } catch { notification.error({ message: "Thất bại", description: "Cập nhật trạng thái đơn thất bại" }); } }}
          />
        );
      },
    },
    {
      title: "Chi tiết",
      render: (_, r) => (
        <Button icon={<EyeOutlined />} onClick={() => setDetailOrder(r)}>
          Xem
        </Button>
      ),
    },
  ];

  const orderItems = useMemo(() => detailOrder?.items || [], [detailOrder?.items]);
  const infoCardStyle: React.CSSProperties = {
    border: "1px solid #eaecf0",
    borderRadius: 10,
    background: "#fff",
    padding: "12px 14px",
    height: "100%",
  };

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Danh sách đơn bán</PanelTitle>
        <Space>
          <Button icon={<DownloadOutlined />} loading={exporting} onClick={exportOrders}>
            Xuất CSV
          </Button>
          <StatusDot>
            <span />
            Dữ liệu thật
          </StatusDot>
        </Space>
      </PanelHeader>

      <div style={{ marginBottom: 16, padding: "0 2px" }}>
        <Space wrap size={12} style={{ width: "100%", justifyContent: "space-between" }}>
          <Space wrap size={12}>
            <Search
              allowClear
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm theo mã đơn, tên khách"
              onSearch={() => {
                setPage(1);
                void fetchOrders();
              }}
            />
            <Select
              allowClear
              placeholder="Trạng thái đơn"
              value={statusFilter}
              options={ORDER_STATUS_OPTIONS}
              onChange={(value) => setStatusFilter(value)}
            />
            <Select
              allowClear
              placeholder="Trạng thái TT"
              value={paymentStatusFilter}
              options={PAYMENT_STATUS_OPTIONS}
              onChange={(value) => setPaymentStatusFilter(value)}
            />
            <Select
              allowClear
              placeholder="Phương thức TT"
              value={paymentMethodFilter}
              options={PAYMENT_METHOD_OPTIONS}
              onChange={(value) => setPaymentMethodFilter(value)}
            />
          </Space>
          <Button
            onClick={() => {
              setKeyword("");
              setStatusFilter(undefined);
              setPaymentStatusFilter(undefined);
              setPaymentMethodFilter(undefined);
              setPage(1);
              void fetchOrders();
            }}
          >
            Xóa lọc
          </Button>
        </Space>
      </div>

      <TableWrap>
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={orders}
          pagination={{
            current: page,
            pageSize: PAGE_SIZE,
            total,
            onChange: setPage,
          }}
        />
      </TableWrap>

      <Modal
        open={!!detailOrder}
        onCancel={() => setDetailOrder(null)}
        title={`Chi tiết đơn ${detailOrder?.orderCode || ""}`}
        width={980}
        footer={null}
        styles={{
          header: { padding: "16px 20px 12px 20px", marginBottom: 0 },
          body: { padding: "16px 20px 20px 20px" },
        }}
      >
        <Row gutter={[14, 14]} style={{ marginBottom: 18 }}>
          <Col xs={24} md={12}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Khách hàng</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>{detailOrder?.customer?.fullName || detailOrder?.guestName || "Khách lẻ"}</div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Số điện thoại</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>{detailOrder?.customer?.phone || detailOrder?.guestPhone || "-"}</div>
            </div>
          </Col>
          <Col xs={24}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Địa chỉ</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>{detailOrder?.customer?.address || detailOrder?.guestAddress || "-"}</div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Phương thức thanh toán</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>{detailOrder?.paymentMethod || "-"}</div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Trạng thái thanh toán</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {PAYMENT_STATUS_LABEL_MAP[detailOrder?.paymentStatus] || detailOrder?.paymentStatus || "-"}
              </div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Trạng thái đơn</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>{ORDER_STATUS_LABEL_MAP[detailOrder?.orderStatus] || detailOrder?.orderStatus || "-"}</div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Ngày tạo</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {detailOrder?.createdAt ? new Date(detailOrder.createdAt).toLocaleString("vi-VN") : "-"}
              </div>
            </div>
          </Col>
          <Col xs={24} md={16}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Ghi chú</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>{detailOrder?.note || "-"}</div>
            </div>
          </Col>
        </Row>

        <div
          style={{
            border: "1px solid #eaecf0",
            borderRadius: 10,
            padding: "12px 12px 8px 12px",
            background: "#fff",
          }}
        >
          <Typography.Title level={5} style={{ margin: "0 0 10px 0" }}>Sản phẩm trong đơn</Typography.Title>
          <Table
            size="small"
            rowKey="id"
            dataSource={orderItems}
            pagination={false}
            columns={[
              { title: "SKU", render: (_, r: any) => r.product?.sku || "-" },
              { title: "Tên", render: (_, r: any) => r.product?.name || "-" },
              { title: "SL", dataIndex: "quantity", width: 90 },
              { title: "Đơn giá", align: "right", render: (_, r: any) => formatMoney(Number(r.unitPrice || 0)) },
              { title: "Thành tiền", align: "right", render: (_, r: any) => formatMoney(Number(r.subtotal || 0)) },
            ]}
          />
        </div>
      </Modal>
    </Panel>
  );
};

export default SellerOrdersPage;
