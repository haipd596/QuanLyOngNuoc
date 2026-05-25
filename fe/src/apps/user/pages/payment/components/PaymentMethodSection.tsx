import {
  BankOutlined,  CreditCardOutlined,
  SafetyCertificateOutlined,
  UploadOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Button, Flex, Form, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { useEffect, useRef, useState } from "react";

import BaseModal from "@/shared/components/modals";

import {
  PaymentMethodCard,
  PaymentOption,
  SecurityNote,
  StyledForm,
  StyledRadioGroup,
  SubmitButton,
  SummaryTitle,
} from "../styled";

interface PaymentMethodSectionProps {
  onSubmit: () => void | Promise<void>;
  loading?: boolean;
  onUploadBill: (file: File) => Promise<string>;
  uploadingBill?: boolean;
}

const BANK_INFO = {
  bankName: "TPBank",
  accountNumber: "0586540730",
  accountName: "CÔNG TY TNHH ỐNG NƯỚC VIỆT",
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

const PaymentMethodSection = ({
  onSubmit,
  loading = false,
  onUploadBill,
  uploadingBill = false,
}: PaymentMethodSectionProps) => {
  const form = Form.useFormInstance();
  const paymentMethod = Form.useWatch("paymentMethod", form);
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [uploadedBillName, setUploadedBillName] = useState("");
  const [uploadedBillUrl, setUploadedBillUrl] = useState("");
  const previousMethodRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const previous = previousMethodRef.current;
    if (paymentMethod === "bank" && previous !== "bank") {
      setIsBankModalOpen(true);
    }
    previousMethodRef.current = paymentMethod;
  }, [paymentMethod]);

  const uploadProps: UploadProps = {
    accept: "image/*",
    maxCount: 1,
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const url = await onUploadBill(file as File);
        form.setFieldValue("billImageUrl", url);
        setUploadedBillName((file as File).name || "Ảnh bill");
        setUploadedBillUrl(url);
        message.success("Đã tải ảnh bill");
        onSuccess?.(url);
      } catch (error) {
        onError?.(error as Error);
        message.error("Tải ảnh bill thất bại");
      }
    },
  };

  const transferContent = `THANH TOAN DON HANG ${new Date().getTime()}`;
  const uploadedBillDisplayUrl = resolveImageUrl(uploadedBillUrl);
  const qrUrl = `https://img.vietqr.io/image/TPB-${BANK_INFO.accountNumber}-compact2.png?amount=0&addInfo=${encodeURIComponent(
    transferContent
  )}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  return (
    <>
      <PaymentMethodCard bordered={false}>
        <SummaryTitle>Phương thức thanh toán</SummaryTitle>

        <StyledForm>
          <Form.Item
            name="paymentMethod"
            style={{ marginBottom: 0 }}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phương thức thanh toán",
              },
            ]}
          >
            <StyledRadioGroup>
              <Flex vertical gap={18}>
                <PaymentOption value="cod">
                  <CreditCardOutlined style={{ marginRight: 8 }} />
                  Thanh toán khi nhận hàng (COD)
                </PaymentOption>
                <PaymentOption value="bank">
                  <BankOutlined style={{ marginRight: 8 }} />
                  Chuyển khoản ngân hàng
                </PaymentOption>
                <PaymentOption value="wallet">
                  <WalletOutlined style={{ marginRight: 8 }} />
                  Ví điện tử (Momo/ZaloPay)
                </PaymentOption>
              </Flex>
            </StyledRadioGroup>
          </Form.Item>
        </StyledForm>

        {paymentMethod === "bank" && (
          <>
            <Form.Item
              name="billImageUrl"
              hidden
              rules={[{ required: true, message: "Vui lòng tải ảnh bill chuyển khoản" }]}
            >
              <input />
            </Form.Item>
            <Form.Item
              label="Ảnh bill chuyển khoản"
              required
              validateStatus={!form.getFieldValue("billImageUrl") ? "error" : ""}
              help={!form.getFieldValue("billImageUrl") ? "Vui lòng tải ảnh bill chuyển khoản" : ""}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} loading={uploadingBill} block>
                  Tải ảnh bill
                </Button>
              </Upload>
              {uploadedBillName && (
                <div style={{ marginTop: 8, color: "#16a34a", fontSize: 13 }}>
                  Đã tải: {uploadedBillName}
                </div>
              )}
              {uploadedBillDisplayUrl && (
                <div style={{ marginTop: 8 }}>
                  <img
                    src={uploadedBillDisplayUrl}
                    alt="Ảnh bill chuyển khoản"
                    style={{
                      width: "100%",
                      maxWidth: 360,
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </Form.Item>
          </>
        )}

        <SubmitButton
          type="primary"
          block
          loading={loading}
          disabled={loading}
          onClick={() => void onSubmit()}
        >
          Xác nhận đặt hàng
        </SubmitButton>
        <SecurityNote>
          <SafetyCertificateOutlined style={{ marginRight: 6 }} />
          Cam kết bảo mật thông tin thanh toán 100%
        </SecurityNote>
      </PaymentMethodCard>

      <BaseModal
        open={isBankModalOpen}
        title="Thông tin chuyển khoản"
        onCancel={() => setIsBankModalOpen(false)}
        footer={null}
        width={560}
      >
        <div style={{ padding: 20, display: "grid", gap: 12 }}>
          <div style={{ textAlign: "center" }}>
            <img
              src={qrUrl}
              alt="QR chuyển khoản TPBank"
              style={{ width: 260, maxWidth: "100%", borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
          </div>
          <div><strong>Ngân hàng:</strong> {BANK_INFO.bankName}</div>
          <div><strong>Số tài khoản:</strong> {BANK_INFO.accountNumber}</div>
          <div><strong>Chủ tài khoản:</strong> {BANK_INFO.accountName}</div>
          <div><strong>Nội dung chuyển khoản:</strong> {transferContent}</div>
          <div style={{ color: "#6b7280" }}>
            Sau khi chuyển khoản, vui lòng tải ảnh bill ở bên dưới để hệ thống xác nhận đơn nhanh hơn.
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default PaymentMethodSection;

