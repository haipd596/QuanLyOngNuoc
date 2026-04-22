import { Form, Input } from "antd";

import { SectionCard, SectionTitle, StepBadge, StyledForm } from "../styled";

const OrderNoteSection = () => {
  return (
    <section>
      <SectionTitle>
        <StepBadge>4</StepBadge>
        Ghi chú
      </SectionTitle>

      <SectionCard bordered={false}>
        <StyledForm>
          <Form.Item label="Ghi chú cho đơn hàng" name="note">
            <Input.TextArea
              placeholder="Nhập ghi chú cho người bán hoặc đơn vị giao hàng..."
              autoSize={{ minRows: 4 }}
            />
          </Form.Item>
        </StyledForm>
      </SectionCard>
    </section>
  );
};

export default OrderNoteSection;
