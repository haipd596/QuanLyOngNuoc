import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Row, Select, Space, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import {
  getInventoryAudit,
  getInventoryMovements,
  getInventorySummary,
  getProducts,
  moveInventoryStock,
} from "@/apps/admin/services/admin.api";
import {
  CATEGORY_PRODUCT_COUNTS_QUERY_KEY,
  PRODUCT_DETAIL_QUERY_KEY,
  PRODUCT_LIST_QUERY_KEY,
} from "@/apps/home/pages/Products/services/query";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import BaseModal from "@/shared/components/modals";
import useNotification from "@/shared/hooks/useNotification";
import { lcStorage } from "@/shared/utils";
import { ADMIN_PAGE_SIZE, formatMoney } from "../dashboard/utils";
import {
  MetricCard,
  MetricGrid,
  MetricLabel,
  MetricValue,
  Panel,
  PanelHeader,
  PanelTitle,
  StatusDot,
  TableWrap,
} from "../dashboard/styled";

const movementOptions = [
  { label: "Nhập kho", value: "IMPORT" },
  { label: "Xuất kho", value: "EXPORT" },
  { label: "Điều chỉnh tồn", value: "ADJUST" },
];

const AdminInventoryPage = () => {
  const queryClient = useQueryClient();
  const { Search } = Input;
  const { showSuccessNotify, showErrorNotify } = useNotification();
  const [activeTab, setActiveTab] = useState("summary");
  const [summaryItems, setSummaryItems] = useState<any[]>([]);
  const [movementItems, setMovementItems] = useState<any[]>([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [movementLoading, setMovementLoading] = useState(false);
  const [summaryTotal, setSummaryTotal] = useState(0);
  const [movementTotal, setMovementTotal] = useState(0);
  const [summaryPage, setSummaryPage] = useState(1);
  const [movementPage, setMovementPage] = useState(1);
  const [summaryKeyword, setSummaryKeyword] = useState("");
  const [movementKeyword, setMovementKeyword] = useState("");
  const [movementType, setMovementType] = useState<string | undefined>(undefined);
  const [inventoryAudit, setInventoryAudit] = useState<any>(null);
  const [productOptions, setProductOptions] = useState<{ label: string; value: string }[]>([]);
  const [openMoveModal, setOpenMoveModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [moveForm] = Form.useForm();

  const currentUser = lcStorage.get<{ id?: string }>(LOCAL_STORAGE_KEYS.user);

  const invalidateProductQueries = async (productId?: string) => {
    await Promise.all([
      queryClient.invalidateQueries(PRODUCT_LIST_QUERY_KEY),
      queryClient.invalidateQueries(CATEGORY_PRODUCT_COUNTS_QUERY_KEY),
      queryClient.invalidateQueries("gio-hang"),
      productId
        ? queryClient.invalidateQueries([PRODUCT_DETAIL_QUERY_KEY, productId])
        : queryClient.invalidateQueries(PRODUCT_DETAIL_QUERY_KEY),
    ]);
  };

  const loadSummary = async (page = summaryPage, keyword = summaryKeyword) => {
    setSummaryLoading(true);
    try {
      const res: any = await getInventorySummary({
        Page: page,
        PageSize: ADMIN_PAGE_SIZE,
        Keyword: keyword.trim() || undefined,
      });
      setSummaryItems(res?.data || []);
      setSummaryTotal(res?.metaData?.total || 0);
    } finally {
      setSummaryLoading(false);
    }
  };

  const loadMovements = async (
    page = movementPage,
    keyword = movementKeyword,
    type = movementType,
  ) => {
    setMovementLoading(true);
    try {
      const res: any = await getInventoryMovements({
        Page: page,
        PageSize: ADMIN_PAGE_SIZE,
        Keyword: keyword.trim() || undefined,
        ...(type ? { "Query.Type": type } : {}),
      });
      setMovementItems(res?.data || []);
      setMovementTotal(res?.metaData?.total || 0);
    } finally {
      setMovementLoading(false);
    }
  };

  const loadAudit = async () => {
    const res: any = await getInventoryAudit();
    setInventoryAudit(res?.data || null);
  };

  const loadProductOptions = async () => {
    const res: any = await getProducts({ Page: 1, PageSize: 1000 });
    setProductOptions(
      (res?.data || []).map((item: any) => ({
        label: `${item.sku} - ${item.name}`,
        value: item.id,
      })),
    );
  };

  useEffect(() => {
    void loadSummary();
  }, [summaryPage]);

  useEffect(() => {
    void loadMovements();
  }, [movementPage, movementType]);

  useEffect(() => {
    void Promise.all([loadAudit(), loadProductOptions()]);
  }, []);

  const totalStockUnits = useMemo(
    () => summaryItems.reduce((total, item) => total + Number(item.stockQuantity || 0), 0),
    [summaryItems],
  );

  const lowStockCount =
    inventoryAudit?.lowStock?.metaData?.total || inventoryAudit?.lowStock?.data?.length || 0;

  const openMove = (product?: any) => {
    moveForm.resetFields();
    moveForm.setFieldsValue({
      productId: product?.id,
      type: "IMPORT",
      quantity: 1,
    });
    setOpenMoveModal(true);
  };

  const summaryColumns: ColumnsType<any> = [
    { title: "SKU", dataIndex: "sku" },
    { title: "Tên sản phẩm", dataIndex: "name" },
    { title: "Tồn kho", dataIndex: "stockQuantity" },
    { title: "Mức tối thiểu", dataIndex: "minStockLevel" },
    { title: "Giá bán", render: (_, row) => formatMoney(Number(row.salePrice || 0)) },
    {
      title: "Trạng thái",
      render: (_, row) =>
        Number(row.stockQuantity || 0) <= Number(row.minStockLevel || 0) ? "Tồn thấp" : "Ổn định",
    },
    {
      title: "Thao tác",
      render: (_, row) => (
        <Button size="small" type="primary" onClick={() => openMove(row)}>
          Điều chỉnh kho
        </Button>
      ),
    },
  ];

  const movementColumns: ColumnsType<any> = [
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      render: (value) => new Date(value).toLocaleString("vi-VN"),
    },
    {
      title: "Loại",
      dataIndex: "type",
      render: (value) => movementOptions.find((item) => item.value === value)?.label || value,
    },
    { title: "SKU", render: (_, row) => row.product?.sku || "-" },
    { title: "Sản phẩm", render: (_, row) => row.product?.name || "-" },
    { title: "Số lượng", dataIndex: "quantity" },
    { title: "Ghi chú", dataIndex: "note", render: (value) => value || "-" },
  ];

  return (
    <>
      <MetricGrid>
        <MetricCard><div><MetricLabel>Sản phẩm đang theo dõi</MetricLabel><MetricValue>{summaryTotal}</MetricValue></div></MetricCard>
        <MetricCard><div><MetricLabel>Tổng tồn trang hiện tại</MetricLabel><MetricValue>{totalStockUnits}</MetricValue></div></MetricCard>
        <MetricCard><div><MetricLabel>Mặt hàng tồn thấp</MetricLabel><MetricValue>{lowStockCount}</MetricValue></div></MetricCard>
        <MetricCard><div><MetricLabel>Lịch sử xuất nhập</MetricLabel><MetricValue>{movementTotal}</MetricValue></div></MetricCard>
      </MetricGrid>

      <Panel>
        <PanelHeader>
          <PanelTitle>Quản lý kho</PanelTitle>
          <Space>
            <StatusDot>
              <span />Dữ liệu thật
            </StatusDot>
            <Button className="admin-action-primary-btn" type="primary" icon={<PlusOutlined />} onClick={() => openMove()}>
              Tạo phiếu kho
            </Button>
          </Space>
        </PanelHeader>

        <div style={{ padding: 18 }}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: "summary",
                label: "Tồn kho",
                children: (
                  <>
                    <div style={{ marginBottom: 12 }}>
                      <Space wrap>
                        <Search
                          allowClear
                          value={summaryKeyword}
                          onChange={(e) => setSummaryKeyword(e.target.value)}
                          placeholder="Tìm theo SKU, tên sản phẩm"
                          onSearch={() => {
                            setSummaryPage(1);
                            void loadSummary(1, summaryKeyword);
                          }}
                        />
                        <Button
                          onClick={() => {
                            setSummaryKeyword("");
                            setSummaryPage(1);
                            void loadSummary(1, "");
                          }}
                        >
                          Xóa lọc
                        </Button>
                      </Space>
                    </div>
                    <TableWrap>
                      <Table
                        rowKey="id"
                        loading={summaryLoading}
                        columns={summaryColumns}
                        dataSource={summaryItems}
                        pagination={{
                          current: summaryPage,
                          pageSize: ADMIN_PAGE_SIZE,
                          total: summaryTotal,
                          onChange: setSummaryPage,
                        }}
                      />
                    </TableWrap>
                  </>
                ),
              },
              {
                key: "movements",
                label: "Lịch sử xuất nhập",
                children: (
                  <>
                    <div style={{ marginBottom: 12 }}>
                      <Space wrap>
                        <Search
                          allowClear
                          value={movementKeyword}
                          onChange={(e) => setMovementKeyword(e.target.value)}
                          placeholder="Tìm theo loại, SKU, tên, ghi chú"
                          onSearch={() => {
                            setMovementPage(1);
                            void loadMovements(1, movementKeyword, movementType);
                          }}
                        />
                        <Select
                          allowClear
                          value={movementType}
                          placeholder="Lọc loại"
                          style={{ width: 180 }}
                          options={movementOptions}
                          onChange={(value) => {
                            setMovementType(value);
                            setMovementPage(1);
                          }}
                        />
                        <Button
                          onClick={() => {
                            setMovementKeyword("");
                            setMovementType(undefined);
                            setMovementPage(1);
                            void loadMovements(1, "", undefined);
                          }}
                        >
                          Xóa lọc
                        </Button>
                      </Space>
                    </div>
                    <TableWrap>
                      <Table
                        rowKey="id"
                        loading={movementLoading}
                        columns={movementColumns}
                        dataSource={movementItems}
                        pagination={{
                          current: movementPage,
                          pageSize: ADMIN_PAGE_SIZE,
                          total: movementTotal,
                          onChange: setMovementPage,
                        }}
                      />
                    </TableWrap>
                  </>
                ),
              },
            ]}
          />
        </div>
      </Panel>

      <BaseModal
        title="Tạo phiếu kho"
        open={openMoveModal}
        onCancel={() => setOpenMoveModal(false)}
        onOk={() => moveForm.submit()}
        loading={submitting}
        hideModal={() => setOpenMoveModal(false)}
        destroyOnClose
        width={720}
      >
        <Form
          form={moveForm}
          layout="vertical"
          onFinish={async (values) => {
            setSubmitting(true);
            try {
              await moveInventoryStock({
                ...values,
                quantity: Number(values.quantity),
                createdById: currentUser?.id,
              });
              setSummaryPage(1);
              setMovementPage(1);
              await Promise.all([
                loadSummary(1, summaryKeyword),
                loadMovements(1, movementKeyword, movementType),
                loadAudit(),
                invalidateProductQueries(values.productId),
              ]);
              setOpenMoveModal(false);
              moveForm.resetFields();
              showSuccessNotify("Cập nhật kho thành công");
            } catch (error: any) {
              showErrorNotify(error?.data?.message || error?.message || "Cập nhật kho thất bại");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item
                name="productId"
                label="Sản phẩm"
                rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
              >
                <Select
                  showSearch
                  optionFilterProp="label"
                  placeholder="Chọn sản phẩm"
                  options={productOptions}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="type"
                label="Loại phiếu"
                rules={[{ required: true, message: "Vui lòng chọn loại phiếu" }]}
              >
                <Select options={movementOptions} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="quantity"
                label="Số lượng"
                rules={[
                  { required: true, message: "Vui lòng nhập số lượng" },
                  {
                    validator: (_: unknown, value: unknown) => {
                      if (value === undefined || value === null || value === "") {
                        return Promise.resolve();
                      }
                      const numeric = Number(value);
                      if (Number.isNaN(numeric) || numeric < 1) {
                        return Promise.reject(new Error("Số lượng phải lớn hơn hoặc bằng 1"));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={1} placeholder="Nhập số lượng" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="note" label="Ghi chú">
                <Input.TextArea rows={4} placeholder="Ví dụ: nhập thêm hàng, xuất nội bộ, điều chỉnh sau kiểm kho..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    </>
  );
};

export default AdminInventoryPage;
