import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Popconfirm, Row, Select, Space, Table, Tag, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import BaseModal from "@/shared/components/modals";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "@/apps/admin/pages/dashboard/styled";
import {
  createSellerContactMessage,
  deleteSellerContactMessage,
  getSellerContactMessages,
  updateSellerContactMessage,
} from "@/apps/seller/services/seller.api";

const PAGE_SIZE = 10;
const { Search } = Input;

const statusOptions = [
  { value: "NEW", label: "Mới" },
  { value: "IN_PROGRESS", label: "Đang xử lý" },
  { value: "RESOLVED", label: "Đã xử lý" },
  { value: "CLOSED", label: "Đã đóng" },
];

const statusTag = (status?: string) => {
  if (status === "IN_PROGRESS") return <Tag color="processing">Đang xử lý</Tag>;
  if (status === "RESOLVED") return <Tag color="success">Đã xử lý</Tag>;
  if (status === "CLOSED") return <Tag color="default">Đã đóng</Tag>;
  return <Tag color="gold">Mới</Tag>;
};

const SellerContactMessagesPage = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res: any = await getSellerContactMessages({
        Page: page,
        PageSize: PAGE_SIZE,
        Keyword: keyword.trim() || undefined,
        "Query.Status": statusFilter || undefined,
      });
      setItems(res.data || []);
      setTotal(res.metaData?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchItems();
  }, [page]);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldValue("status", "NEW");
    setOpenModal(true);
  };

  const openEdit = (record: any) => {
    setEditing(record);
    form.setFieldsValue(record);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = [
    { title: "Khách hàng", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "SĐT", dataIndex: "phone" },
    {
      title: "Nội dung",
      dataIndex: "message",
      ellipsis: true,
      render: (value) => value || "-",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value) => statusTag(value),
    },
    {
      title: "Thao tác",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm
            title="Xóa liên hệ này?"
            onConfirm={async () => {
              try {
                await deleteSellerContactMessage(record.id);
                notification.success({ message: "Thành công", description: "Đã xóa liên hệ" });
                void fetchItems();
              } catch {
                notification.error({ message: "Thất bại", description: "Xóa liên hệ thất bại" });
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
          <PanelTitle>Quản lý liên hệ</PanelTitle>
          <Space>
            <StatusDot>
              <span />Dữ liệu thật
            </StatusDot>
            <Button type="primary" className="admin-action-primary-btn" icon={<PlusOutlined />} onClick={openCreate}>
              Thêm liên hệ
            </Button>
          </Space>
        </PanelHeader>

        <div style={{ marginBottom: 12 }}>
          <Space wrap>
            <Search
              allowClear
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm theo tên, email, SĐT"
              onSearch={() => {
                setPage(1);
                void fetchItems();
              }}
            />
            <Select
              allowClear
              value={statusFilter}
              placeholder="Trạng thái"
              options={statusOptions}
              onChange={setStatusFilter}
              style={{ minWidth: 170 }}
            />
            <Button
              onClick={() => {
                setKeyword("");
                setStatusFilter(undefined);
                setPage(1);
                void fetchItems();
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
            dataSource={items}
            pagination={{ current: page, pageSize: PAGE_SIZE, total, onChange: setPage }}
          />
        </TableWrap>
      </Panel>

      <BaseModal
        title={editing ? "Sửa liên hệ" : "Tạo liên hệ"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => form.submit()}
        destroyOnClose
        width={860}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            try {
              if (editing) {
                await updateSellerContactMessage(editing.id, values);
                notification.success({ message: "Thành công", description: "Cập nhật liên hệ thành công" });
              } else {
                await createSellerContactMessage(values);
                notification.success({ message: "Thành công", description: "Tạo liên hệ thành công" });
              }
              setOpenModal(false);
              form.resetFields();
              setEditing(null);
              void fetchItems();
            } catch {
              notification.error({
                message: "Thất bại",
                description: editing ? "Cập nhật liên hệ thất bại" : "Tạo liên hệ thất bại",
              });
            }
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="fullName" label="Họ tên" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
                <Input placeholder="Nhập họ tên" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập SĐT" }]}>
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}>
                <Select options={statusOptions} placeholder="Chọn trạng thái" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="message" label="Nội dung" rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}>
                <Input.TextArea rows={4} placeholder="Nhập nội dung liên hệ" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="note" label="Ghi chú">
                <Input.TextArea rows={3} placeholder="Nhập ghi chú xử lý" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    </>
  );
};

export default SellerContactMessagesPage;
