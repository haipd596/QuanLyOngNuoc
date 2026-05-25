import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Popconfirm, Row, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import BaseModal from "@/shared/components/modals";
import useNotification from "@/shared/hooks/useNotification";
import {
  createUser,
  deleteUser,
  getRoles,
  getUserById,
  getUsers,
  updateUser,
} from "@/apps/admin/services/admin.api";
import { ADMIN_PAGE_SIZE } from "../dashboard/utils";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "../dashboard/styled";

const STATUS_OPTIONS = [
  { label: "Hoạt động", value: "ACTIVE" },
  { label: "Tạm ngưng", value: "INACTIVE" },
  { label: "Khóa", value: "LOCKED" },
];

const statusTag = (status?: string) => {
  if (status === "ACTIVE") return <Tag color="green">Hoạt động</Tag>;
  if (status === "INACTIVE") return <Tag color="gold">Tạm ngưng</Tag>;
  if (status === "LOCKED") return <Tag color="red">Khóa</Tag>;
  return <Tag>{status || "-"}</Tag>;
};

const AdminStaffsPage = () => {
  const { Search } = Input;
  const { showSuccessNotify, showErrorNotify } = useNotification();
  const [loading, setLoading] = useState(false);
  const [staffs, setStaffs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [sellerRoleId, setSellerRoleId] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();

  const fetchRoles = async () => {
    const res: any = await getRoles({ Page: 1, PageSize: 1000 });
    const items = res?.data || [];
    const sellerRole = items.find((item: any) => String(item.name || "").toUpperCase() === "SELLER");
    if (sellerRole?.id) setSellerRoleId(sellerRole.id);
  };

  const fetchStaffs = async () => {
    setLoading(true);
    try {
      const params: Record<string, unknown> = {
        Page: page,
        PageSize: ADMIN_PAGE_SIZE,
        Keyword: keyword.trim() || undefined,
        "Query.Status": statusFilter || undefined,
      };
      if (sellerRoleId) {
        params["Query.RoleId"] = sellerRoleId;
      }

      const res: any = await getUsers(params as any);
      setStaffs(res.data || []);
      setTotal(res.metaData?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchRoles();
  }, []);

  useEffect(() => {
    void fetchStaffs();
  }, [page, sellerRoleId]);

  const columns: ColumnsType<any> = [
    { title: "Họ tên", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "SĐT", dataIndex: "phone", render: (value) => value || "-" },
    {
      title: "Vai trò",
      render: (_, r) => r.role?.name || "-",
    },
    {
      title: "Trạng thái",
      render: (_, r) => statusTag(r.status),
    },
    {
      title: "Thao tác",
      width: 120,
      render: (_, r) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={async () => {
              try {
                const res: any = await getUserById(r.id);
                const detail = res?.data || r;
                setEditingStaff(detail);
                form.setFieldsValue({
                  fullName: detail.fullName,
                  email: detail.email,
                  phone: detail.phone,
                  status: detail.status,
                });
                setOpenModal(true);
              } catch {
                showErrorNotify("Không thể tải chi tiết nhân viên");
              }
            }}
          />
          <Popconfirm
            title="Xóa nhân viên này?"
            onConfirm={async () => {
              try {
                await deleteUser(r.id);
                showSuccessNotify("Đã xóa nhân viên");
                void fetchStaffs();
              } catch {
                showErrorNotify("Xóa nhân viên thất bại");
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
          <PanelTitle>Danh sách nhân viên</PanelTitle>
          <Space>
            <StatusDot>
              <span />Dữ liệu thật
            </StatusDot>
            <Button
              className="admin-action-primary-btn"
              type="primary"
              onClick={() => {
                setEditingStaff(null);
                form.resetFields();
                setOpenModal(true);
              }}
            >
              Tạo nhân viên
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
                void fetchStaffs();
              }}
            />
            <Select
              allowClear
              placeholder="Lọc trạng thái"
              style={{ width: 180 }}
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={setStatusFilter}
            />
            <Button
              onClick={() => {
                setKeyword("");
                setStatusFilter(undefined);
                setPage(1);
                void fetchStaffs();
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
            dataSource={staffs}
            pagination={{ current: page, pageSize: ADMIN_PAGE_SIZE, total, onChange: setPage }}
          />
        </TableWrap>
      </Panel>

      <BaseModal
        title={editingStaff ? "Sửa nhân viên" : "Tạo nhân viên"}
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
            const payload: any = {
              fullName: values.fullName,
              email: values.email,
              phone: values.phone || undefined,
              roleId: sellerRoleId,
            };
            if (editingStaff && values.status) {
              payload.status = values.status;
            }

            try {
              if (editingStaff) {
                await updateUser(editingStaff.id, payload);
                showSuccessNotify("Cập nhật nhân viên thành công");
              } else {
                await createUser(payload);
                showSuccessNotify("Tạo nhân viên thành công");
              }

              setOpenModal(false);
              form.resetFields();
              setEditingStaff(null);
              void fetchStaffs();
            } catch {
              showErrorNotify(editingStaff ? "Cập nhật nhân viên thất bại" : "Tạo nhân viên thất bại");
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
              <Form.Item name="phone" label="Số điện thoại">
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>

            {editingStaff && (
              <Col xs={24} md={12}>
                <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}>
                  <Select options={STATUS_OPTIONS} placeholder="Chọn trạng thái" />
                </Form.Item>
              </Col>
            )}

          </Row>
        </Form>
      </BaseModal>
    </>
  );
};

export default AdminStaffsPage;
