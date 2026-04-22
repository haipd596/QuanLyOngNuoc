import { EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import {
  InsightCard,
  InsightCardText,
  InsightGrid,
  InsightIcon,
  InsightLabel,
  InsightPrimary,
  InsightSecondary,
  LoyaltyCard,
} from "../styled";

const ProfileInsights = () => {
  return (
    <InsightGrid>
      <InsightCard>
        <InsightCardText>
          <InsightLabel>
            <InsightIcon>
              <EnvironmentOutlined />
            </InsightIcon>
            Địa chỉ mặc định
          </InsightLabel>
          <InsightPrimary>Công trình Quận 7</InsightPrimary>
          <InsightSecondary>
            Số 45 Đường số 2, KDC Him Lam, Phường Tân Hưng, Quận 7, TP. Hồ Chí Minh
          </InsightSecondary>
        </InsightCardText>
      </InsightCard>

      <LoyaltyCard>
        <InsightCardText>
          <InsightLabel $dark>
            <InsightIcon $dark>
              <StarFilled />
            </InsightIcon>
            Điểm tích lũy thợ
          </InsightLabel>
          <InsightPrimary $light>1,250</InsightPrimary>
          <InsightSecondary $light>
            Còn 250 điểm để lên hạng Vàng
          </InsightSecondary>
        </InsightCardText>
      </LoyaltyCard>
    </InsightGrid>
  );
};

export default ProfileInsights;
