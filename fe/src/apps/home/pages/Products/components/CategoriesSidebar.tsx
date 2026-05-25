import { Spin } from "antd";
import { CategoryItem, CategoryList, CategoryPanel, CategoryTitle } from "../styled";
import { useCategoryProductCountsQuery, useDanhMucQuery } from "../services";

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

const CategoriesSidebar = ({ selected, onChange }: Props) => {
  const { data, isLoading } = useDanhMucQuery({});
  const { data: countData, isLoading: isLoadingCount } = useCategoryProductCountsQuery();

  const categories = data?.data ?? [];
  const counts = Array.isArray(countData?.data)
    ? countData.data
    : Array.isArray(countData)
      ? countData
      : [];

  const countByCategoryId = new Map(
    counts.map((item: any) => [String(item.id), Number(item.productCount) || 0]),
  );

  const totalProducts = counts.reduce(
    (sum: number, item: any) => sum + (Number(item.productCount) || 0),
    0,
  );

  return (
    <CategoryPanel>
      <CategoryTitle>Danh mục sản phẩm</CategoryTitle>

      <Spin spinning={isLoading || isLoadingCount}>
        <CategoryList value={selected} onChange={(e) => onChange(e.target.value)}>
          <CategoryItem value="all">Tất cả sản phẩm ({totalProducts})</CategoryItem>

          {categories.map((c: any) => (
            <CategoryItem key={c.id} value={c.id}>
              {c.name} ({countByCategoryId.get(String(c.id)) ?? 0})
            </CategoryItem>
          ))}
        </CategoryList>
      </Spin>
    </CategoryPanel>
  );
};

export default CategoriesSidebar;
