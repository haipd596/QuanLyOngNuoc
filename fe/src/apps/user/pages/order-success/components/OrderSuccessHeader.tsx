import { CheckOutlined } from "@ant-design/icons";
import {
  SuccessDescription,
  SuccessHeader,
  SuccessIcon,
  SuccessTitle,
} from "../styled";

const OrderSuccessHeader = () => {
  return (
    <SuccessHeader>
      <SuccessIcon>
        <CheckOutlined />
      </SuccessIcon>
      <SuccessTitle>Đặt hàng thành công!</SuccessTitle>
      <SuccessDescription>
        Cảm ơn bạn đã tin tưởng Ống Nước Việt. Chúng tôi đang xử lý đơn hàng của
        bạn để chuẩn bị vận chuyển nhanh nhất.
      </SuccessDescription>
    </SuccessHeader>
  );
};

export default OrderSuccessHeader;
