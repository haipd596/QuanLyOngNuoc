import MainLayout from "../../components/MainLayout";
import { HOME_ROUTE } from "../../constants";

import { Col, Pagination, Row } from "antd";
import { useState } from "react";

import useFilter from "~/shared/hooks/useFilter";
import { useAddToCartAction } from "./hooks/useAction";
import { ISanPham, TFilter, useSanPhamQuery } from "./services";
import CategoriesSidebar from "./components/CategoriesSidebar";
import ProductGrid from "./components/ProductGrid";
import { PageIntro } from "./styled";

export const initialFilter: TFilter = {
  page: 1,
  pageSize: 12,
  Query: {
    CategoryId: undefined,
  },
};

const ProductsPage = () => {
  const { filter, setFilter } = useFilter(initialFilter);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data, isLoading } = useSanPhamQuery(filter);
  const { addProductToCart, isAdding, pendingProductId } = useAddToCartAction();

  const products = data?.data ?? [];
  const meta = data?.metaData;

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilter({
      ...filter,
      page: 1,
      Query: {
        ...filter.Query,
        CategoryId: categoryId === "all" ? undefined : categoryId,
      },
    });
  };

  const handleChangePage = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page,
      pageSize,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MainLayout
      breadcrumb={[
        { label: "Trang chủ", href: HOME_ROUTE },
        { label: "Sản phẩm" },
      ]}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 24px 64px" }}>
        <PageIntro>
          <span>Cửa hàng điện nước ONV</span>
          <h1>Danh sách sản phẩm</h1>
          <p>
            Tìm kiếm vật tư điện nước, xem giá bán và thêm nhanh vào giỏ hàng.
            Dữ liệu được lấy từ API sản phẩm của hệ thống.
          </p>
        </PageIntro>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={7} lg={5}>
            <CategoriesSidebar selected={selectedCategory} onChange={handleCategoryChange} />
          </Col>

          <Col xs={24} md={17} lg={19}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <ProductGrid
                products={products}
                loading={isLoading}
                isAdding={isAdding}
                pendingProductId={pendingProductId}
                onAddToCart={(p: ISanPham) => addProductToCart(p, 1)}
              />

              {!isLoading && (
                <Pagination
                  current={filter.page}
                  pageSize={filter.pageSize}
                  total={meta?.total || 0}
                  onChange={handleChangePage}
                  align="center"
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
