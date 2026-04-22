import { Form, Radio } from "antd";

import { SHIPPING_METHOD_FEES } from "../shipping";
import {
  SectionTitle,
  ShippingGrid,
  ShippingOption,
  ShippingPrice,
  ShippingSubText,
  ShippingText,
  ShippingTitle,
  StepBadge,
  StyledForm,
} from "../styled";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const ShippingMethodSection = () => {
  return (
    <section>
      <SectionTitle>
        <StepBadge>3</StepBadge>
        Phương thức vận chuyển
      </SectionTitle>
      <StyledForm>
        <Form.Item name="shippingMethod" style={{ marginBottom: 0 }}>
          <Radio.Group style={{ width: "100%" }}>
            <ShippingGrid>
              <ShippingOption>
                <Radio value="standard" />
                <ShippingText>
                  <ShippingTitle>Giao hàng tiêu chuẩn</ShippingTitle>
                  <ShippingSubText>Dự kiến: 2-3 ngày làm việc</ShippingSubText>
                </ShippingText>
                <ShippingPrice>
                  {formatCurrency(SHIPPING_METHOD_FEES.standard)}
                </ShippingPrice>
              </ShippingOption>

              <ShippingOption>
                <Radio value="express" />
                <ShippingText>
                  <ShippingTitle>Hỏa tốc (2H)</ShippingTitle>
                  <ShippingSubText>Khu vực nội thành HCM</ShippingSubText>
                </ShippingText>
                <ShippingPrice>
                  {formatCurrency(SHIPPING_METHOD_FEES.express)}
                </ShippingPrice>
              </ShippingOption>
            </ShippingGrid>
          </Radio.Group>
        </Form.Item>
      </StyledForm>
    </section>
  );
};

export default ShippingMethodSection;
