import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, InputNumber, Popconfirm, Row, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import BaseModal from "@/shared/components/modals";
import { createProduct, deleteProduct, getProducts, updateProduct } from "@/apps/admin/services/admin.api";
import { ADMIN_PAGE_SIZE, formatMoney, toSlug } from "../dashboard/utils";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "../dashboard/styled";

const AdminProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res: any = await getProducts({ Page: page, PageSize: ADMIN_PAGE_SIZE });
      setProducts(res.data || []);
      setTotal(res.metaData?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, [page]);

  const openCreate = () => {
    setEditingProduct(null);
    form.resetFields();
    setOpenModal(true);
  };

  const openEdit = (record: any) => {
    setEditingProduct(record);
    form.setFieldsValue(record);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = [
    { title: "SKU", dataIndex: "sku" },
    { title: "Tên", dataIndex: "name" },
    { title: "Giá bán", render: (_, r) => formatMoney(Number(r.salePrice)) },
    { title: "Tồn kho", dataIndex: "stockQuantity" },
    { title: "Mức tối thiểu", dataIndex: "minStockLevel" },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(r)} />
          <Popconfirm title="Xóa sản phẩm này?" onConfirm={async () => { await deleteProduct(r.id); message.success("Đã xóa sản phẩm"); void fetchProducts(); }}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Panel>
        <PanelHeader><PanelTitle>Danh sách sản phẩm</PanelTitle><Space><StatusDot><span />Dữ liệu thật</StatusDot><Button className="admin-action-primary-btn" type="primary" onClick={openCreate}>Tạo sản phẩm</Button></Space></PanelHeader>
        <TableWrap><Table rowKey="id" loading={loading} columns={columns} dataSource={products} pagination={{ current: page, pageSize: ADMIN_PAGE_SIZE, total, onChange: setPage }} /></TableWrap>
      </Panel>

      <BaseModal title={editingProduct ? "Sửa sản phẩm" : "Tạo sản phẩm"} open={openModal} onCancel={() => setOpenModal(false)} onOk={() => form.submit()} destroyOnClose width={920}>
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            const payload = { ...values, slug: values.slug || toSlug(values.name) };
            if (editingProduct) {
              await updateProduct(editingProduct.id, payload);
              message.success("Cập nhật sản phẩm thành công");
            } else {
              await createProduct(payload);
              message.success("Tạo sản phẩm thành công");
            }
            setOpenModal(false);
            form.resetFields();
            setEditingProduct(null);
            void fetchProducts();
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}><Form.Item name="sku" label="SKU" rules={[{ required: true }]}><Input placeholder="Nhập mã SKU" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}><Input placeholder="Nhập tên sản phẩm" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="slug" label="Slug"><Input placeholder="Nhập slug (để trống sẽ tự sinh)" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="unit" label="Đơn vị" rules={[{ required: true }]}><Input placeholder="Ví dụ: Cây, Cuộn..." /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="importPrice" label="Giá nhập" rules={[{ required: true }]}><InputNumber placeholder="Nhập giá nhập" style={{ width: "100%" }} min={0} /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="salePrice" label="Giá bán" rules={[{ required: true }]}><InputNumber placeholder="Nhập giá bán" style={{ width: "100%" }} min={0} /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="stockQuantity" label="Tồn kho"><InputNumber placeholder="Nhập số lượng tồn kho" style={{ width: "100%" }} min={0} /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="minStockLevel" label="Mức tồn tối thiểu"><InputNumber placeholder="Nhập mức tồn tối thiểu" style={{ width: "100%" }} min={0} /></Form.Item></Col>
            <Col xs={24}><Form.Item name="description" label="Mô tả"><Input.TextArea rows={3} placeholder="Nhập mô tả sản phẩm" /></Form.Item></Col>
          </Row>
        </Form>
      </BaseModal>
    </>
  );
};

export default AdminProductsPage;
