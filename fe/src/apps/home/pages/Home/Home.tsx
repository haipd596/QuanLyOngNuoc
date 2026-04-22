import MainLayout from "../../components/MainLayout";
import Badge from "./component/Badge/Badge";
import Banner from "./component/Banner/Banner";
import BannerPromo from "./component/BannerPromo/BannerPromo";
import BestSell from "./component/BestSell/BestSell";

const HomePage = () => {
  return (
    <MainLayout>
      <Banner />
      <BestSell />
      <BannerPromo />
      <Badge />
    </MainLayout>
  );
};

export default HomePage;