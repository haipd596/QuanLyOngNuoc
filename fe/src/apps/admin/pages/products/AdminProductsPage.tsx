import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Popconfirm, Row, Select, Space, Table, Upload, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import BaseModal from "@/shared/components/modals";
import useNotification from "@/shared/hooks/useNotification";
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProducts,
  updateProduct,
  uploadProductImage,
} from "@/apps/admin/services/admin.api";
import { ADMIN_PAGE_SIZE, formatMoney, toSlug } from "../dashboard/utils";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "../dashboard/styled";

const AdminProductsPage = () => {
  const { Search } = Input;
  const { showSuccessNotify, showErrorNotify } = useNotification();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [form] = Form.useForm();

  const numberRequiredRule = (fieldLabel: string) => [
    { required: true, message: `Vui lòng nhập ${fieldLabel}` },
    {
      validator: (_: unknown, value: unknown) => {
        if (value === undefined || value === null || value === "") {
          return Promise.resolve();
        }
        const numeric = Number(value);
        if (Number.isNaN(numeric)) {
          return Promise.reject(new Error(`${fieldLabel} phải là số hợp lệ`));
        }
        if (numeric < 0) {
          return Promise.reject(new Error(`${fieldLabel} không được nhỏ hơn 0`));
        }
        return Promise.resolve();
      },
    },
  ];

  const normalizeImagePath = (value: string) => {
    if (!value) return value;
    if (value.startsWith("/uploads/")) return value;
    try {
      const parsed = new URL(value);
      return parsed.pathname || value;
    } catch {
      return value;
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res: any = await getProducts({
        Page: page,
        PageSize: ADMIN_PAGE_SIZE,
        Keyword: keyword.trim() || undefined,
      });
      setProducts(res.data || []);
      setTotal(res.metaData?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, [page]);

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      const res: any = await getCategories({ Page: 1, PageSize: 1000 });
      const options = (res?.data || []).map((item: any) => ({ label: item.name, value: item.id }));
      setCategoryOptions(options);
    };

    void fetchCategoryOptions();
  }, []);

  const openCreate = () => {
    setEditingProduct(null);
    setImageUrls([]);
    form.resetFields();
    setOpenModal(true);
  };

  const openEdit = (record: any) => {
    setEditingProduct(record);
    setImageUrls((record.images || []).map((item: any) => item.imageUrl).filter(Boolean));
    form.setFieldsValue({
      ...record,
      hotYN: !!record.hotYN,
      categoryId: record.categoryId || record.category?.id,
      importPrice: record.importPrice != null ? Number(record.importPrice) : undefined,
      salePrice: record.salePrice != null ? Number(record.salePrice) : undefined,
      stockQuantity: record.stockQuantity != null ? Number(record.stockQuantity) : undefined,
      minStockLevel: record.minStockLevel != null ? Number(record.minStockLevel) : undefined,
    });
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = [
    { title: "SKU", dataIndex: "sku" },
    { title: "Tên", dataIndex: "name" },
    { title: "Danh mục", render: (_, r) => r.category?.name || "-" },
    { title: "Bán chạy", render: (_, r) => (r.hotYN ? "Có" : "Không") },
    { title: "Giá bán", render: (_, r) => formatMoney(Number(r.salePrice)) },
    { title: "Tồn kho", dataIndex: "stockQuantity" },
    { title: "Mức tối thiểu", dataIndex: "minStockLevel" },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(r)} />
          <Popconfirm
            title="Xóa sản phẩm này?"
            onConfirm={async () => {
              const productId = r.id || r.productId;
              if (!productId) {
                message.error("Không tìm thấy ID sản phẩm để xóa");
                return;
              }
              try {
                await deleteProduct(productId);
                showSuccessNotify("Đã xóa sản phẩm");
                void fetchProducts();
              } catch {
                showErrorNotify("Xóa sản phẩm thất bại");
              }
            }}
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Panel>
        <PanelHeader>
          <PanelTitle>Danh sách sản phẩm</PanelTitle>
          <Space>
            <StatusDot>
              <span />Dữ liệu thật
            </StatusDot>
            <Button className="admin-action-primary-btn" type="primary" onClick={openCreate}>
              Tạo sản phẩm
            </Button>
          </Space>
        </PanelHeader>

        <div style={{ marginBottom: 12 }}>
          <Space>
            <Search
              allowClear
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm theo SKU, tên sản phẩm"
              onSearch={() => {
                setPage(1);
                void fetchProducts();
              }}
            />
            <Button
              onClick={() => {
                setKeyword("");
                setPage(1);
                void fetchProducts();
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
            dataSource={products}
            pagination={{ current: page, pageSize: ADMIN_PAGE_SIZE, total, onChange: setPage }}
          />
        </TableWrap>
      </Panel>

      <BaseModal
        title={editingProduct ? "Sửa sản phẩm" : "Tạo sản phẩm"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        destroyOnClose
        width={920}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            const payload = {
              ...values,
              slug: values.slug || toSlug(values.name),
              importPrice: Number(values.importPrice),
              salePrice: Number(values.salePrice),
              stockQuantity: Number(values.stockQuantity),
              minStockLevel: Number(values.minStockLevel),
              hotYN: !!values.hotYN,
              imageUrls: imageUrls.map(normalizeImagePath),
            };

            try {
              if (editingProduct) {
                const productId = editingProduct.id || editingProduct.productId;
                if (!productId) {
                  message.error("Không tìm thấy ID sản phẩm để cập nhật");
                  return;
                }
                await updateProduct(productId, payload);
                showSuccessNotify("Cập nhật sản phẩm thành công");
              } else {
                await createProduct(payload);
                showSuccessNotify("Tạo sản phẩm thành công");
              }
              setOpenModal(false);
              form.resetFields();
              setEditingProduct(null);
              setImageUrls([]);
              void fetchProducts();
            } catch {
              showErrorNotify(editingProduct ? "Cập nhật sản phẩm thất bại" : "Tạo sản phẩm thất bại");
            }
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
                <Input placeholder="Nhập mã SKU" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="slug" label="Slug">
                <Input placeholder="Nhập slug (để trống sẽ tự sinh)" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}>
                <Select placeholder="Chọn danh mục" options={categoryOptions} showSearch optionFilterProp="label" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="hotYN" label="Sản phẩm bán chạy" initialValue={false}>
                <Select options={[{ label: "Không", value: false }, { label: "Có", value: true }]} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="unit" label="Đơn vị" rules={[{ required: true }]}>
                <Input placeholder="Ví dụ: Cây, Cuộn..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="importPrice" label="Giá nhập" rules={numberRequiredRule("giá nhập")}>
                <InputNumber placeholder="Nhập giá nhập" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="salePrice" label="Giá bán" rules={numberRequiredRule("giá bán")}>
                <InputNumber placeholder="Nhập giá bán" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="stockQuantity" label="Tồn kho" rules={numberRequiredRule("tồn kho")}>
                <InputNumber placeholder="Nhập số lượng tồn kho" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="minStockLevel" label="Mức tồn tối thiểu" rules={numberRequiredRule("mức tồn tối thiểu")}>
                <InputNumber placeholder="Nhập mức tồn tối thiểu" style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="description" label="Mô tả">
                <Input.TextArea rows={3} placeholder="Nhập mô tả sản phẩm" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item label="Hình ảnh sản phẩm">
                <Upload.Dragger
                  accept="image/*"
                  multiple
                  showUploadList={false}
                  customRequest={async ({ file, onSuccess, onError }) => {
                    try {
                      const uploadFile = file as File;
                      const res: any = await uploadProductImage(uploadFile);
                      const uploadedPath = res?.data?.path || res?.data?.url;
                      if (!uploadedPath) {
                        throw new Error("Không nhận được đường dẫn ảnh");
                      }
                      setImageUrls((prev) => [...prev, uploadedPath]);
                      onSuccess?.(res);
                    } catch (error) {
                      message.error("Upload ảnh thất bại");
                      onError?.(error as Error);
                    }
                  }}
                >
                  <p>Kéo thả ảnh vào đây hoặc bấm để chọn ảnh</p>
                  <p style={{ marginBottom: 0, color: "#98a2b3" }}>Hỗ trợ ảnh tối đa 5MB/file</p>
                </Upload.Dragger>
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {imageUrls.map((url) => (
                    <div key={url} style={{ position: "relative" }}>
                      <img
                        src={url}
                        alt="product"
                        style={{ width: 88, height: 88, objectFit: "cover", borderRadius: 8, border: "1px solid #eaecf0" }}
                      />
                      <Button
                        size="small"
                        danger
                        style={{ position: "absolute", top: 4, right: 4 }}
                        onClick={() => setImageUrls((prev) => prev.filter((item) => item !== url))}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    </>
  );
};

export default AdminProductsPage;
