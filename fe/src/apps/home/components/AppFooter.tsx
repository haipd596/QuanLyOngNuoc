import { Col, Row } from "antd";
import {
  StyledFooter,
  FooterWrapper,
  FooterTitle,
  FooterText,
  FooterTextWhite,
  FooterList,
  FooterBottom,
} from "./styles/FooterStyled";

const AppFooter = () => (
  <StyledFooter>
    <FooterWrapper>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={10} lg={10}>
          <FooterTitle level={4}>
            Điện nước ONV - Sản xuất và phân phối ống công trình
          </FooterTitle>

          <FooterText>
            Công ty Trách Nhiệm Hữu Hạn ANTHI VINA, GPDKKD: 4900874826 do sở Kế Hoạch & Đầu tư Tỉnh Lạng Sơn cấp ngày 15/03/2021.
          </FooterText>

          <FooterText>
            Chịu trách nhiệm nội dung: Nguyễn Thị Kim Ánh
          </FooterText>

            <FooterTextWhite>
            <strong>Địa chỉ:</strong><br />
            Công Ty TNHH AnthiVina, Số 62A ngõ 238 đường Trần Quang Khải,<br />
            phường Chi Lăng, TP. Lạng Sơn
            </FooterTextWhite>

          <FooterTextWhite>
            - Kho Hà Nội: Kho K6 cảng Hà Nội, Q. Hai Bà Trưng
          </FooterTextWhite>

          <FooterTextWhite>
            - Kho HCM: đường Kênh Tân Hóa, Q. Tân Phú
          </FooterTextWhite>

          <FooterTextWhite>
            ☎ 0843.490.333 - 0888.022.656
          </FooterTextWhite>

          <FooterTextWhite>
            ✉ cskh.ovu@gmail.com - anthivina@gmail.com
          </FooterTextWhite>
        </Col>

        <Col xs={12} sm={12} md={5} lg={5}>
          <FooterTitle level={5}>Hỗ trợ khách hàng</FooterTitle>
          <FooterList>
            <li>Về Ông Việt Úc</li>
            <li>Hệ thống phân phối</li>
            <li>Liên hệ chúng tôi</li>
          </FooterList>
        </Col>

        <Col xs={12} sm={12} md={5} lg={5}>
          <FooterTitle level={5}>Sản phẩm của chúng tôi</FooterTitle>
          <FooterList>
            <li>Ống cao su bố vải</li>
            <li>Ống cao su bố thép</li>
            <li>Ống nhựa lõi thép</li>
            <li>Ống nhựa lưới dẻo</li>
          </FooterList>
        </Col>

        <Col xs={24} sm={24} md={4} lg={4}>
          <FooterTitle level={5}>Chính sách</FooterTitle>
          <FooterList>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách bảo mật</li>
            <li>Phương thức thanh toán</li>
            <li>Chính sách chung</li>
            <li>Điều khoản dịch vụ</li>
          </FooterList>
        </Col>
      </Row>

      <FooterBottom>
        © 2024 Ông Việt Úc. Bản quyền thuộc về Ông Việt Úc.
      </FooterBottom>
    </FooterWrapper>
  </StyledFooter>
);

export default AppFooter;