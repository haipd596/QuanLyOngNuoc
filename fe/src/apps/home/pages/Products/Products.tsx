import MainLayout from '../../components/MainLayout';
import { HOME_ROUTE } from '../../constants';

import { Row, Col, Pagination } from 'antd';
import { useState } from 'react';

import CategoriesSidebar from './components/CategoriesSidebar';
import ProductGrid from './components/ProductGrid';

import useFilter from '~/shared/hooks/useFilter';
import { ISanPham, TFilter, useSanPhamQuery } from './services';
import { useAddToCartAction } from './hooks/useAction';

export const initialFilter: TFilter = {
  page: 1,
  pageSize: 12,
  Query: {
    CategoryId: undefined,
  },
};

const ProductsPage = () => {
  const { filter, setFilter } = useFilter(initialFilter);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data, isLoading } = useSanPhamQuery(filter);
  const { addProductToCart, isAdding, pendingProductId } = useAddToCartAction();

  const products = data?.data ?? [];
  const meta = data?.metaData;

  // ───────── CATEGORY ─────────
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    setFilter({
      ...filter,
      page: 1,
      Query: {
        ...filter.Query,
        CategoryId: categoryId === 'all' ? undefined : categoryId,
      },
    });
  };

  // ───────── PAGINATION ─────────
  const handleChangePage = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      page,
      pageSize,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout
      breadcrumb={[
        { label: 'Trang chủ', href: HOME_ROUTE },
        { label: 'Sản phẩm' },
      ]}
    >
      <div style={{ maxWidth: 1475, margin: '0 auto', padding: 24 }}>
        <Row gutter={[24, 24]}>

          {/* SIDEBAR */}
          <Col xs={24} sm={24} md={6} lg={5} xl={4}>
            <CategoriesSidebar
              selected={selectedCategory}
              onChange={handleCategoryChange}
            />
          </Col>

          {/* CONTENT */}
          <Col xs={24} sm={24} md={18} lg={19} xl={20}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

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
                  style={{ textAlign: 'center' }}
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
