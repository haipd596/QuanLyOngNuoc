import MainLayout from "../../components/MainLayout";
import { HOME_ROUTE } from "../../constants";
import ContactFormSection from "./ContactFormSection";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";
import {
  Heading,
  LeftPane,
  Page,
  RightPane,
  Shell,
  TwoCol,
} from "./styled";

const ContactPage = () => {
  return (
    <MainLayout
      breadcrumb={[
        { label: "Trang chủ", href: HOME_ROUTE },
        { label: "Liên hệ" },
      ]}
    >
      <Page>
        <Shell>
          <TwoCol>
            <LeftPane>
              <Heading>Thông tin liên hệ</Heading>
              <ContactInfo />
              <ContactFormSection />
            </LeftPane>

            <RightPane>
              <ContactMap />
            </RightPane>
          </TwoCol>
        </Shell>
      </Page>
    </MainLayout>
  );
};

export default ContactPage;
