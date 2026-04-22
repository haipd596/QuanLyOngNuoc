import MainLayout from "../../components/MainLayout";
import Banner from "./component/Banner/Banner";
import ProductHighlight from "./component/ProductHighlight/ProductHightlight";
import QualitySection from "./component/Quality/QualitySection";
import Quote from "./component/Quote/Quote";
import ValuePillars from "./component/ValuePillar/ValuePillar";

const AboutPage = () => {
  return (
    <MainLayout>
      <Banner />
      <ValuePillars />
      <QualitySection />
      <Quote />
      <ProductHighlight />
    </MainLayout>
  );
};

export default AboutPage;