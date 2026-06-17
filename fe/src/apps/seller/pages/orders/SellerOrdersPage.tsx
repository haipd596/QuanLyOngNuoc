import {
  CheckCircleOutlined,
  DownloadOutlined,
  EyeOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Steps,
  Table,
  Tag,
  Tooltip,
  Typography,
  notification,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { ORDER_STATUS_LABEL_MAP, ORDER_STATUS_OPTIONS } from "@/apps/admin/constants/status";
import {
  Panel,
  PanelHeader,
  PanelTitle,
  StatusDot,
  TableWrap,
} from "@/apps/admin/pages/dashboard/styled";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import {
  getSellerOrders,
  updateSellerOrderPaymentStatus,
  updateSellerOrderStatus,
} from "@/apps/seller/services/seller.api";

const PAGE_SIZE = 10;

const PAYMENT_STATUS_OPTIONS = [
  { label: "Chưa thanh toán", value: "UNPAID" },
  { label: "Đã thanh toán", value: "PAID" },
  { label: "Hoàn tiền", value: "REFUNDED" },
];

const PAYMENT_METHOD_OPTIONS = [
  { label: "COD", value: "COD" },
  { label: "BANK_TRANSFER", value: "BANK_TRANSFER" },
];

const PAYMENT_STATUS_LABEL_MAP: Record<string, string> = {
  UNPAID: "Chưa thanh toán",
  PAID: "Đã thanh toán",
  REFUNDED: "Đã hoàn tiền",
};

const PAYMENT_METHOD_LABEL_MAP: Record<string, string> = {
  COD: "Thanh toán khi nhận hàng (COD)",
  BANK_TRANSFER: "Chuyển khoản ngân hàng",
};

const ORDER_STEPS = [
  { status: "PENDING", title: "Chờ xử lý" },
  { status: "CONFIRMED", title: "Đã xác nhận" },
  { status: "PACKING", title: "Đang đóng gói" },
  { status: "SHIPPED", title: "Đang giao" },
  { status: "COMPLETED", title: "Hoàn tất" },
];

const ORDER_STEP_INDEX_MAP: Record<string, number> = {
  PENDING: 0,
  CONFIRMED: 1,
  PACKING: 2,
  SHIPPED: 3,
  COMPLETED: 4,
};

const tagStyle: React.CSSProperties = {
  marginInlineEnd: 0,
  width: 120,
  textAlign: "center",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "4px 8px",
};

const cellCenterStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: 48,
  textAlign: "center",
};

const toCsvCell = (value: unknown) => {
  const raw = value == null ? "" : String(value);
  const escaped = raw.replace(/"/g, '""');
  return `"${escaped}"`;
};

const downloadCsv = (fileName: string, rows: string[][]) => {
  const csv = rows.map((row) => row.map(toCsvCell).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

const resolveImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return "";
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;

  const apiBase = import.meta.env.VITE_API_URL as string | undefined;
  if (!apiBase) return imageUrl;

  try {
    const origin = new URL(apiBase).origin;
    return `${origin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  } catch {
    return imageUrl;
  }
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
      const res: any = await getSellerOrders(
        buildParams({
          Page: page,
          PageSize: PAGE_SIZE,
        })
      );

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
      const res: any = await getSellerOrders(
        buildParams({
          Page: 1,
          PageSize: 1000,
        })
      );

      const data = res?.data || [];

      const rows: string[][] = [
        [
          "Mã đơn",
          "Khách hàng",
          "SĐT",
          "Địa chỉ",
          "Thanh toán",
          "PTTT",
          "Trạng thái",
          "Tổng tiền",
          "Ngày tạo",
        ],
        ...data.map((row: any) => [
          row.orderCode,
          row.customer?.fullName || row.guestName || "Khách lẻ",
          row.customer?.phone || row.guestPhone || "",
          row.customer?.address || row.guestAddress || "",
          PAYMENT_STATUS_LABEL_MAP[row.paymentStatus] || row.paymentStatus || "",
          PAYMENT_METHOD_LABEL_MAP[row.paymentMethod] || row.paymentMethod || "",
          ORDER_STATUS_LABEL_MAP[row.orderStatus] || row.orderStatus || "",
          Number(row.finalAmount || 0),
          row.createdAt ? new Date(row.createdAt).toLocaleString("vi-VN") : "",
        ]),
      ];

      downloadCsv("seller-orders.csv", rows);

      notification.success({
        message: "Thành công",
        description: `Đã xuất ${data.length} đơn hàng`,
      });
    } catch {
      notification.error({
        message: "Thất bại",
        description: "Xuất CSV thất bại",
      });
    } finally {
      setExporting(false);
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "Mã đơn",
      dataIndex: "orderCode",
      width: 220,
    },
    {
      title: "Khách hàng",
      width: 160,
      render: (_, r) => r.customer?.fullName || r.guestName || "Khách lẻ",
    },
    {
      title: "Thanh toán",
      width: 150,
      align: "center",
      render: (_, r) => (
        <Tag color={r.paymentStatus === "PAID" ? "green" : "orange"} style={tagStyle}>
          {PAYMENT_STATUS_LABEL_MAP[r.paymentStatus] ||
            r.paymentStatus ||
            PAYMENT_STATUS_LABEL_MAP.UNPAID}
        </Tag>
      ),
    },
    {
      title: "Ảnh bill",
      width: 120,
      align: "center",
      render: (_, r) => {
        const billUrl = resolveImageUrl(r.billImageUrl);

        if (!billUrl) return <span>-</span>;

        return (
          <Button
            type="link"
            icon={<FileImageOutlined />}
            onClick={() => window.open(billUrl, "_blank")}
          >
            Xem bill
          </Button>
        );
      },
    },
    {
      title: "Trạng thái",
      width: 150,
      align: "center",
      render: (_, r) => (
        <div style={cellCenterStyle}>
          <Tag color={r.orderStatus === "CANCELED" ? "red" : "blue"} style={tagStyle}>
            {ORDER_STATUS_LABEL_MAP[r.orderStatus] || r.orderStatus}
          </Tag>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      width: 130,
      align: "right",
      render: (_, r) => formatMoney(Number(r.finalAmount)),
    },
    {
      title: "Cập nhật",
      width: 560,
      render: (_, r) => {
        const current = ORDER_STEP_INDEX_MAP[r.orderStatus] ?? 0;

        if (r.orderStatus === "CANCELED") {
          return (
            <div style={cellCenterStyle}>
              <Tag color="red" style={tagStyle}>
                Đã hủy
              </Tag>
            </div>
          );
        }

        return (
          <Steps
            size="small"
            current={current}
            items={ORDER_STEPS.map((step, index) => ({
              title: step.title,
              disabled: index <= current || index > current + 1,
              onClick: async () => {
                if (index !== current + 1) return;

                try {
                  await updateSellerOrderStatus(r.id, step.status);

                  notification.success({
                    message: "Thành công",
                    description: "Đã cập nhật trạng thái đơn",
                  });

                  void fetchOrders();
                } catch {
                  notification.error({
                    message: "Thất bại",
                    description: "Cập nhật trạng thái đơn thất bại",
                  });
                }
              },
            }))}
          />
        );
      },
    },
    {
      title: "Chi tiết",
      width: 110,
      align: "center",
      fixed: "right",
      render: (_, r) => {
        if (r.orderStatus === "CANCELED") return null;

        return (
          <Space size={8}>
            {r.paymentStatus === "UNPAID" && (
              <Tooltip title="Xác nhận thanh toán">
                <Button
                  type="text"
                  icon={<CheckCircleOutlined />}
                  style={{
                    color: "#52c41a",
                    border: "none",
                    boxShadow: "none",
                  }}
                  onClick={async () => {
                    try {
                      await updateSellerOrderPaymentStatus(r.id, "PAID");

                      notification.success({
                        message: "Thành công",
                        description: "Đã xác nhận thanh toán",
                      });

                      void fetchOrders();
                    } catch {
                      notification.error({
                        message: "Thất bại",
                        description: "Không thể xác nhận thanh toán",
                      });
                    }
                  }}
                />
              </Tooltip>
            )}

            <Tooltip title="Xem chi tiết">
              <Button
                type="text"
                icon={<EyeOutlined />}
                style={{
                  color: "#1677ff",
                  border: "none",
                  boxShadow: "none",
                }}
                onClick={() => setDetailOrder(r)}
              />
            </Tooltip>
          </Space>
        );
      },
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
    <Panel style={{ border: "none", boxShadow: "none" }}>
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
          scroll={{ x: 1600 }}
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
          header: {
            padding: "16px 20px 12px 20px",
            marginBottom: 0,
          },
          body: {
            padding: "16px 20px 20px 20px",
          },
        }}
      >
        <Row gutter={[14, 14]} style={{ marginBottom: 18 }}>
          <Col xs={24} md={12}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Khách hàng</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {detailOrder?.customer?.fullName || detailOrder?.guestName || "Khách lẻ"}
              </div>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Số điện thoại</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {detailOrder?.customer?.phone || detailOrder?.guestPhone || "-"}
              </div>
            </div>
          </Col>

          <Col xs={24}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Địa chỉ</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {detailOrder?.customer?.address || detailOrder?.guestAddress || "-"}
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Phương thức thanh toán</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {PAYMENT_METHOD_LABEL_MAP[detailOrder?.paymentMethod] ||
                  detailOrder?.paymentMethod ||
                  "-"}
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Trạng thái thanh toán</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {PAYMENT_STATUS_LABEL_MAP[detailOrder?.paymentStatus] ||
                  detailOrder?.paymentStatus ||
                  "-"}
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Trạng thái đơn</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {ORDER_STATUS_LABEL_MAP[detailOrder?.orderStatus] ||
                  detailOrder?.orderStatus ||
                  "-"}
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Ngày tạo</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {detailOrder?.createdAt
                  ? new Date(detailOrder.createdAt).toLocaleString("vi-VN")
                  : "-"}
              </div>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <div style={infoCardStyle}>
              <Typography.Text type="secondary">Ghi chú</Typography.Text>
              <div style={{ fontWeight: 600, marginTop: 2 }}>
                {detailOrder?.note || "-"}
              </div>
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
          <Typography.Title level={5} style={{ margin: "0 0 10px 0" }}>
            Sản phẩm trong đơn
          </Typography.Title>

          <Table
            size="small"
            rowKey="id"
            dataSource={orderItems}
            pagination={false}
            columns={[
              {
                title: "SKU",
                render: (_, r: any) => r.product?.sku || "-",
              },
              {
                title: "Tên",
                render: (_, r: any) => r.product?.name || "-",
              },
              {
                title: "SL",
                dataIndex: "quantity",
                width: 90,
              },
              {
                title: "Đơn giá",
                align: "right",
                render: (_, r: any) => formatMoney(Number(r.unitPrice || 0)),
              },
              {
                title: "Thành tiền",
                align: "right",
                render: (_, r: any) => formatMoney(Number(r.subtotal || 0)),
              },
            ]}
          />
        </div>
      </Modal>
    </Panel>
  );
};

export default SellerOrdersPage;
