import { DeliverySteps, MainCard, SectionHeading } from "../styled";

const DeliveryStatus = () => {
  return (
    <MainCard bordered={false}>
      <SectionHeading>Trạng thái vận chuyển</SectionHeading>
      <DeliverySteps
        current={3}
        items={[
          {
            title: "Đã đặt hàng",
            description: "24/05 - 14:30",
          },
          {
            title: "Xác nhận",
            description: "24/05 - 16:15",
          },
          {
            title: "Đang giao",
            description: "25/05 - 09:00",
          },
          {
            title: "Đến trạm trung chuyển",
            description: "Đang xử lý",
          },
          {
            title: "Hoàn tất",
            description: "Dự kiến 26/05",
          },
        ]}
      />
    </MainCard>
  );
};

export default DeliveryStatus;
