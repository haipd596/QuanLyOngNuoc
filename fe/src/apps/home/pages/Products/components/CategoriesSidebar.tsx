import { Spin } from "antd";
import { CategoryItem, CategoryList, CategoryPanel, CategoryTitle } from "../styled";
import { useDanhMucQuery } from "../services";

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

const CategoriesSidebar = ({ selected, onChange }: Props) => {
  const { data, isLoading } = useDanhMucQuery({});
  const categories = data?.data ?? [];

  return (
    <CategoryPanel>
      <CategoryTitle>Danh mục sản phẩm</CategoryTitle>

      <Spin spinning={isLoading}>
        <CategoryList value={selected} onChange={(e) => onChange(e.target.value)}>
          <CategoryItem value="all">Tất cả sản phẩm</CategoryItem>

          {categories.map((c: any) => (
            <CategoryItem key={c.id} value={c.id}>
              {c.name}
            </CategoryItem>
          ))}
        </CategoryList>
      </Spin>
    </CategoryPanel>
  );
};

export default CategoriesSidebar;
