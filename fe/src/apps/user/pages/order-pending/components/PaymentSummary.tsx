import {
  PaidTag,
  PaymentCard,
  PaymentRow,
  PaymentTitle,
  PaymentTotal,
  PaymentTotalValue,
} from "../styled";

interface PaymentSummaryProps {
  subtotal: string;
  shippingFee: string;
  discount: string;
  total: string;
  itemCount?: number;
}

const PaymentSummary = ({ subtotal, shippingFee, discount, total, itemCount = 0 }: PaymentSummaryProps) => {
  return (
    <PaymentCard bordered={false}>
      <PaymentTitle>Tổng kết thanh toán</PaymentTitle>
      <PaymentRow>
        <span>Tạm tính ({itemCount.toString().padStart(2, "0")} mặt hàng)</span>
        <span>{subtotal}</span>
      </PaymentRow>
      <PaymentRow>
        <span>Phí vận chuyển</span>
        <span>{shippingFee}</span>
      </PaymentRow>
      <PaymentRow>
        <span>Giảm giá</span>
        <span>{discount}</span>
      </PaymentRow>
      <PaymentTotal>
        <span>Tổng cộng</span>
        <div>
          <PaymentTotalValue>{total}</PaymentTotalValue>
          <PaidTag>Thanh toán khi nhận hàng</PaidTag>
        </div>
      </PaymentTotal>
    </PaymentCard>
  );
};

export default PaymentSummary;
