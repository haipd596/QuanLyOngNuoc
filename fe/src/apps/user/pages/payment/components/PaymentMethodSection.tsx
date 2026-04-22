import {
  BankOutlined,
  CreditCardOutlined,
  SafetyCertificateOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Flex, Form } from "antd";

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
}

const PaymentMethodSection = ({ onSubmit }: PaymentMethodSectionProps) => {
  return (
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

      <SubmitButton type="primary" block onClick={() => void onSubmit()}>
        Xác nhận đặt hàng
      </SubmitButton>
      <SecurityNote>
        <SafetyCertificateOutlined style={{ marginRight: 6 }} />
        Cam kết bảo mật thông tin thanh toán 100%
      </SecurityNote>
    </PaymentMethodCard>
  );
};

export default PaymentMethodSection;
