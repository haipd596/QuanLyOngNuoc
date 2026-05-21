import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Popconfirm, Row, Space, Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import BaseModal from "@/shared/components/modals";
import { createCategory, deleteCategory, getCategories, updateCategory } from "@/apps/admin/services/admin.api";
import { ADMIN_PAGE_SIZE, toSlug } from "../dashboard/utils";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "../dashboard/styled";

const AdminCategoriesPage = () => {
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res: any = await getCategories({
        Page: page,
        PageSize: ADMIN_PAGE_SIZE,
        Keyword: keyword.trim() || undefined,
      });
      setCategories(res.data || []);
      setTotal(res.metaData?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCategories();
  }, [page]);

  const openCreate = () => {
    setEditingCategory(null);
    form.resetFields();
    setOpenModal(true);
  };

  const openEdit = (record: any) => {
    setEditingCategory(record);
    form.setFieldsValue(record);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = [
    { title: "Tên danh mục", dataIndex: "name" },
    { title: "Slug", dataIndex: "slug" },
    { title: "Mô tả", dataIndex: "description", ellipsis: true },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(r)} />
          <Popconfirm
            title="Xóa danh mục này?"
            onConfirm={async () => {
              try {
                await deleteCategory(r.id);
                notification.success({ message: "Thành công", description: "Đã xóa danh mục" });
                void fetchCategories();
              } catch {
                notification.error({ message: "Thất bại", description: "Xóa danh mục thất bại" });
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
          <PanelTitle>Danh mục sản phẩm</PanelTitle>
          <Space>
            <StatusDot>
              <span />Dữ liệu thật
            </StatusDot>
            <Button className="admin-action-primary-btn" type="primary" onClick={openCreate}>
              Tạo danh mục
            </Button>
          </Space>
        </PanelHeader>

        <div style={{ marginBottom: 12 }}>
          <Space>
            <Search
              allowClear
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm theo tên/slug danh mục"
              onSearch={() => {
                setPage(1);
                void fetchCategories();
              }}
            />
            <Button
              onClick={() => {
                setKeyword("");
                setPage(1);
                void fetchCategories();
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
            dataSource={categories}
            pagination={{ current: page, pageSize: ADMIN_PAGE_SIZE, total, onChange: setPage }}
          />
        </TableWrap>
      </Panel>

      <BaseModal
        title={editingCategory ? "Sửa danh mục" : "Tạo danh mục"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        destroyOnClose
        width={760}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            try {
              const payload = { ...values, slug: values.slug || toSlug(values.name) };
              if (editingCategory) {
                await updateCategory(editingCategory.id, payload);
                notification.success({ message: "Thành công", description: "Cập nhật danh mục thành công" });
              } else {
                await createCategory(payload);
                notification.success({ message: "Thành công", description: "Tạo danh mục thành công" });
              }
              setOpenModal(false);
              form.resetFields();
              setEditingCategory(null);
              void fetchCategories();
            } catch {
              notification.error({
                message: "Thất bại",
                description: editingCategory ? "Cập nhật danh mục thất bại" : "Tạo danh mục thất bại",
              });
            }
          }}
        >
          <Row gutter={16}>
            <Col xs={24}>
              <Form.Item name="name" label="Tên danh mục" rules={[{ required: true }]}>
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="slug" label="Slug">
                <Input placeholder="Nhập slug (để trống sẽ tự sinh)" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="description" label="Mô tả">
                <Input.TextArea rows={3} placeholder="Nhập mô tả danh mục" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    </>
  );
};

export default AdminCategoriesPage;
