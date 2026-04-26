import { Col, Row } from "antd";
import {
  FooterBottom,
  FooterList,
  FooterText,
  FooterTextWhite,
  FooterTitle,
  FooterWrapper,
  StyledFooter,
} from "./styles/FooterStyled";

const AppFooter = () => (
  <StyledFooter>
    <FooterWrapper>
      <Row gutter={[28, 28]}>
        <Col xs={24} md={10}>
          <FooterTitle level={4}>Điện nước ONV</FooterTitle>

          <FooterText>
            Website quản lý bán vật liệu điện nước cho cửa hàng, hỗ trợ giới
            thiệu sản phẩm, đặt hàng, quản lý tồn kho và theo dõi đơn bán.
          </FooterText>

          <FooterTextWhite>
            <strong>Địa chỉ:</strong>
            <br />
            62A ngõ 238 Trần Quang Khải, phường Chi Lăng, TP. Lạng Sơn
          </FooterTextWhite>

          <FooterTextWhite>Kho Hà Nội: Kho K6 cảng Hà Nội, Hai Bà Trưng</FooterTextWhite>
          <FooterTextWhite>Kho TP.HCM: đường Kênh Tân Hóa, quận Tân Phú</FooterTextWhite>
          <FooterTextWhite>Hotline: 0843.490.333 - 0888.022.656</FooterTextWhite>
          <FooterTextWhite>Email: cskh.ovu@gmail.com</FooterTextWhite>
        </Col>

        <Col xs={12} md={5}>
          <FooterTitle level={5}>Hỗ trợ khách hàng</FooterTitle>
          <FooterList>
            <li>Giới thiệu cửa hàng</li>
            <li>Hệ thống phân phối</li>
            <li>Liên hệ tư vấn</li>
          </FooterList>
        </Col>

        <Col xs={12} md={5}>
          <FooterTitle level={5}>Nhóm sản phẩm</FooterTitle>
          <FooterList>
            <li>Ống nước và phụ kiện</li>
            <li>Van, vòi và thiết bị vệ sinh</li>
            <li>Thiết bị điện dân dụng</li>
            <li>Máy bơm nước</li>
          </FooterList>
        </Col>

        <Col xs={24} md={4}>
          <FooterTitle level={5}>Chính sách</FooterTitle>
          <FooterList>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách bảo mật</li>
            <li>Phương thức thanh toán</li>
            <li>Điều khoản dịch vụ</li>
          </FooterList>
        </Col>
      </Row>

      <FooterBottom>
        © 2026 Điện nước ONV. Dự án đồ án tốt nghiệp ngành công nghệ thông tin.
      </FooterBottom>
    </FooterWrapper>
  </StyledFooter>
);

export default AppFooter;
