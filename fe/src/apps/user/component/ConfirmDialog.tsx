import BaseModal from "@/shared/components/modals";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";

const { Paragraph } = Typography;

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({
  open,
  title = "Xác nhận đăng xuất",
  description = "Bạn có muốn đăng xuất khỏi tài khoản hiện tại không?",
  confirmText = "Đăng xuất",
  cancelText = "Hủy",
  loading = false,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <BaseModal
      open={open}
      onCancel={onCancel}
      hideModal={onCancel}
      title={title}
      icon={<ExclamationCircleOutlined style={{ color: "#faad14", fontSize: 20 }} />}
      width={520}
      footer={null}
    >
      <div style={{ padding: 24 }}>
        <Paragraph style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: "#4b5565" }}>
          {description}
        </Paragraph>

        <Flex justify="flex-end" gap={12} style={{ marginTop: 24 }}>
          <Button size="large" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button danger type="primary" size="large" loading={loading} onClick={onConfirm}>
            {confirmText}
          </Button>
        </Flex>
      </div>
    </BaseModal>
  );
};

export default ConfirmDialog;
