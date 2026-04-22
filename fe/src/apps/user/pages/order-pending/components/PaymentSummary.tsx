import { PaidTag, PaymentCard, PaymentRow, PaymentTitle, PaymentTotal, PaymentTotalValue } from "../styled";

interface PaymentSummaryProps {
  subtotal: string;
  shippingFee: string;
  discount: string;
  total: string;
}

const PaymentSummary = ({ subtotal, shippingFee, discount, total }: PaymentSummaryProps) => {
  return (
    <PaymentCard bordered={false}>
      <PaymentTitle>Tổng kết thanh toán</PaymentTitle>
      <PaymentRow>
        <span>Tạm tính (03 mặt hàng)</span>
        <span>{subtotal}</span>
      </PaymentRow>
      <PaymentRow>
        <span>Phí vận chuyển (vận tải nặng)</span>
        <span>{shippingFee}</span>
      </PaymentRow>
      <PaymentRow>
        <span>Giảm giá dự án (5%)</span>
        <span>{discount}</span>
      </PaymentRow>
      <PaymentTotal>
        <span>Tổng cộng</span>
        <div>
          <PaymentTotalValue>{total}</PaymentTotalValue>
          <PaidTag>Đã thanh toán (ví Momo)</PaidTag>
        </div>
      </PaymentTotal>
    </PaymentCard>
  );
};

export default PaymentSummary;
