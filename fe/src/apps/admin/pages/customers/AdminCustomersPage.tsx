import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Popconfirm, Row, Space, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import BaseModal from "@/shared/components/modals";
import { createCustomer, deleteCustomer, getCustomers, updateCustomer } from "@/apps/admin/services/admin.api";
import { ADMIN_PAGE_SIZE } from "../dashboard/utils";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "../dashboard/styled";

const AdminCustomersPage = () => {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res: any = await getCustomers({ Page: page, PageSize: ADMIN_PAGE_SIZE });
      setCustomers(res.data || []);
      setTotal(res.metaData?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCustomers();
  }, [page]);

  const openCreate = () => {
    setEditingCustomer(null);
    form.resetFields();
    setOpenModal(true);
  };

  const openEdit = (record: any) => {
    setEditingCustomer(record);
    form.setFieldsValue(record);
    setOpenModal(true);
  };

  const columns: ColumnsType<any> = [
    { title: "Họ tên", dataIndex: "fullName" },
    { title: "Điện thoại", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    { title: "Địa chỉ", dataIndex: "address" },
    {
      title: "Thao tác",
      render: (_, r) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(r)} />
          <Popconfirm title="Xóa khách hàng này?" onConfirm={async () => { await deleteCustomer(r.id); message.success("Đã xóa khách hàng"); void fetchCustomers(); }}>
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Panel>
        <PanelHeader><PanelTitle>Danh sách khách hàng</PanelTitle><Space><StatusDot><span />Dữ liệu thật</StatusDot><Button className="admin-action-primary-btn" type="primary" onClick={openCreate}>Tạo khách hàng</Button></Space></PanelHeader>
        <TableWrap><Table rowKey="id" loading={loading} columns={columns} dataSource={customers} pagination={{ current: page, pageSize: ADMIN_PAGE_SIZE, total, onChange: setPage }} /></TableWrap>
      </Panel>

      <BaseModal title={editingCustomer ? "Sửa khách hàng" : "Tạo khách hàng"} open={openModal} onCancel={() => setOpenModal(false)} onOk={() => form.submit()} destroyOnClose width={860}>
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            if (editingCustomer) {
              await updateCustomer(editingCustomer.id, values);
              message.success("Cập nhật khách hàng thành công");
            } else {
              await createCustomer(values);
              message.success("Tạo khách hàng thành công");
            }
            setOpenModal(false);
            form.resetFields();
            setEditingCustomer(null);
            void fetchCustomers();
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}><Form.Item name="fullName" label="Họ tên" rules={[{ required: true }]}><Input placeholder="Nhập họ tên khách hàng" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="phone" label="Số điện thoại"><Input placeholder="Nhập số điện thoại" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="email" label="Email"><Input placeholder="Nhập email" /></Form.Item></Col>
            <Col xs={24} md={12}><Form.Item name="address" label="Địa chỉ"><Input placeholder="Nhập địa chỉ" /></Form.Item></Col>
            <Col xs={24}><Form.Item name="note" label="Ghi chú"><Input.TextArea rows={3} placeholder="Nhập ghi chú" /></Form.Item></Col>
          </Row>
        </Form>
      </BaseModal>
    </>
  );
};

export default AdminCustomersPage;
