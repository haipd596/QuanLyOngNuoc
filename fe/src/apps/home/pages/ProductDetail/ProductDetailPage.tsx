import {
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
  TruckOutlined,
} from "@ant-design/icons";
import { Empty, Skeleton } from "antd";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import MainLayout from "../../components/MainLayout";
import { HOME_ROUTE, PRODUCTS_ROUTE } from "../../constants";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { useAddToCartAction } from "../Products/hooks/useAction";
import ProductGrid from "../Products/components/ProductGrid";
import { ISanPham, useSanPhamDetailQuery, useSanPhamQuery } from "../Products/services";
import { lcStorage } from "@/shared/utils";
import { canUseCart } from "@/shared/utils/roleAccess";
import {
  AddButton,
  DetailGrid,
  DetailText,
  EyebrowRow,
  GalleryPanel,
  InfoPanel,
  MainImage,
  MainImageBox,
  MetaGrid,
  MetaItem,
  PageShell,
  PolicyGrid,
  PolicyItem,
  Price,
  PriceBlock,
  ProductTitle,
  PurchaseCard,
  QuantityInput,
  QuantityRow,
  RelatedHeader,
  SectionCard,
  ShortDescription,
  SpecGrid,
  StockTag,
  ThumbButton,
  ThumbGrid,
  UnitText,
} from "./styled";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=80";

const resolveImageUrl = (imageUrl?: string) => {
  if (!imageUrl) return FALLBACK_IMAGE;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (!baseUrl) return imageUrl;
  try {
    const origin = new URL(baseUrl).origin;
    return `${origin}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  } catch {
    return imageUrl;
  }
};

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { productId?: string };
  const productId = params.productId;
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart, pendingProductId } = useAddToCartAction();
  const currentUser = lcStorage.get<{ role?: string }>(LOCAL_STORAGE_KEYS.user);
  const canAddToCart = !currentUser || canUseCart(currentUser.role);

  const { data, isLoading } = useSanPhamDetailQuery(productId);
  const product = data?.data;
  const inStock = Number(product?.stockQuantity || 0) > 0;

  const imageUrls = useMemo(() => {
    const images = product?.images?.length
      ? [...product.images].sort((a, b) => Number(b.isMain) - Number(a.isMain))
      : [];
    return images.map((item) => resolveImageUrl(item.imageUrl));
  }, [product?.images]);

  const mainImage = selectedImage || imageUrls[0] || FALLBACK_IMAGE;

  const { data: relatedResponse, isLoading: isRelatedLoading } = useSanPhamQuery(
    {
      page: 1,
      pageSize: 5,
      Query: { CategoryId: product?.categoryId },
    },
    { enabled: !!product?.categoryId },
  );

  const relatedProducts = ((relatedResponse?.data || []) as ISanPham[])
    .filter((item) => item.id !== product?.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;
    addProductToCart(product, quantity);
  };

  const handleViewProduct = (item: ISanPham) => {
    navigate({ to: `${PRODUCTS_ROUTE}/${item.id}` as any });
  };

  if (isLoading) {
    return (
      <MainLayout breadcrumb={[{ label: "Trang chủ", href: HOME_ROUTE }, { label: "Sản phẩm", href: PRODUCTS_ROUTE }, { label: "Đang tải" }]}>
        <PageShell>
          <Skeleton active paragraph={{ rows: 12 }} />
        </PageShell>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout breadcrumb={[{ label: "Trang chủ", href: HOME_ROUTE }, { label: "Sản phẩm", href: PRODUCTS_ROUTE }, { label: "Không tìm thấy" }]}>
        <PageShell>
          <Empty description="Không tìm thấy sản phẩm" />
        </PageShell>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      breadcrumb={[
        { label: "Trang chủ", href: HOME_ROUTE },
        { label: "Sản phẩm", href: PRODUCTS_ROUTE },
        { label: product.name },
      ]}
    >
      <PageShell>
        <DetailGrid>
          <GalleryPanel>
            <MainImageBox>
              <MainImage src={mainImage} alt={product.name} />
            </MainImageBox>

            <ThumbGrid>
              {(imageUrls.length ? imageUrls : [FALLBACK_IMAGE]).map((imageUrl) => (
                <ThumbButton
                  key={imageUrl}
                  type="button"
                  $active={mainImage === imageUrl}
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  <img src={imageUrl} alt={product.name} />
                </ThumbButton>
              ))}
            </ThumbGrid>
          </GalleryPanel>

          <InfoPanel>
            <EyebrowRow>
              <StockTag $inStock={inStock}>{inStock ? "Còn hàng" : "Tạm hết hàng"}</StockTag>
              {product.hotYN && <StockTag $inStock>Đang bán chạy</StockTag>}
              <StockTag>SKU: {product.sku}</StockTag>
            </EyebrowRow>

            <ProductTitle>{product.name}</ProductTitle>
            <ShortDescription>
              {product.description || "Sản phẩm vật tư điện nước được chọn lọc cho công trình dân dụng và thương mại."}
            </ShortDescription>

            <PriceBlock>
              <Price>{formatMoney(Number(product.salePrice))}</Price>
              <UnitText>/ {product.unit}</UnitText>
            </PriceBlock>

            <MetaGrid>
              <MetaItem>
                <span>Danh mục</span>
                <strong>{product.category?.name || "Chưa phân loại"}</strong>
              </MetaItem>
              <MetaItem>
                <span>Tồn kho</span>
                <strong>{product.stockQuantity} {product.unit}</strong>
              </MetaItem>
              <MetaItem>
                <span>Mức tồn tối thiểu</span>
                <strong>{product.minStockLevel} {product.unit}</strong>
              </MetaItem>
            </MetaGrid>

            {canAddToCart && (
              <PurchaseCard>
                <QuantityRow>
                  <span>Số lượng</span>
                  <QuantityInput
                    min={1}
                    max={Math.max(1, product.stockQuantity)}
                    value={quantity}
                    disabled={!inStock}
                    onChange={(value) => setQuantity(Number(value || 1))}
                  />
                  <UnitText>Còn {product.stockQuantity} {product.unit}</UnitText>
                </QuantityRow>

                <AddButton
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  loading={pendingProductId === product.id}
                  disabled={!inStock}
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </AddButton>
              </PurchaseCard>
            )}
          </InfoPanel>
        </DetailGrid>

        <SectionCard title="Thông tin chi tiết">
          <SpecGrid>
            <MetaItem>
              <span>Mã sản phẩm</span>
              <strong>{product.sku}</strong>
            </MetaItem>
            <MetaItem>
              <span>Đơn vị tính</span>
              <strong>{product.unit}</strong>
            </MetaItem>
            <MetaItem>
              <span>Trạng thái</span>
              <strong>{product.status === "ACTIVE" ? "Đang kinh doanh" : product.status}</strong>
            </MetaItem>
            <MetaItem>
              <span>Danh mục</span>
              <strong>{product.category?.name || "-"}</strong>
            </MetaItem>
          </SpecGrid>
        </SectionCard>

        <SectionCard title="Mô tả sản phẩm">
          <DetailText>
            {product.description ||
              "Sản phẩm phù hợp cho các nhu cầu thi công, sửa chữa và bảo trì hệ thống điện nước. Liên hệ cửa hàng để được tư vấn thông số kỹ thuật, phương án lắp đặt và số lượng phù hợp với công trình."}
          </DetailText>
        </SectionCard>

        <SectionCard title="Cam kết mua hàng">
          <PolicyGrid>
            <PolicyItem>
              <strong><SafetyCertificateOutlined /> Hàng đúng mô tả</strong>
              <span>Thông tin sản phẩm, mã SKU, đơn vị tính và tồn kho được đồng bộ từ hệ thống.</span>
            </PolicyItem>
            <PolicyItem>
              <strong><TruckOutlined /> Hỗ trợ giao hàng</strong>
              <span>Đội ngũ bán hàng hỗ trợ xác nhận đơn và phương án giao phù hợp theo khu vực.</span>
            </PolicyItem>
            <PolicyItem>
              <strong><SyncOutlined /> Đổi trả linh hoạt</strong>
              <span>Hỗ trợ xử lý khi sản phẩm lỗi kỹ thuật hoặc không đúng thông tin đặt hàng.</span>
            </PolicyItem>
          </PolicyGrid>
        </SectionCard>

        <RelatedHeader>
          <h2>Sản phẩm cùng danh mục</h2>
          <CheckCircleOutlined style={{ color: "var(--secondary)", fontSize: 22 }} />
        </RelatedHeader>

        <ProductGrid
          products={relatedProducts}
          loading={isRelatedLoading}
          isAdding={false}
          pendingProductId={pendingProductId}
          canAddToCart={canAddToCart}
          onAddToCart={(item) => addProductToCart(item, 1)}
          onViewDetails={handleViewProduct}
        />
      </PageShell>
    </MainLayout>
  );
};

export default ProductDetailPage;
