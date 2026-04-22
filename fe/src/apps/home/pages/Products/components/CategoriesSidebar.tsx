import { Spin } from 'antd';
import { useDanhMucQuery } from '../services';
import { CategoryTitle, CategoryList, CategoryItem } from '../styled';

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

const CategoriesSidebar = ({ selected, onChange }: Props) => {
  const { data, isLoading } = useDanhMucQuery({});
  const categories = data?.data ?? [];

  return (
    <div>
      <CategoryTitle>Danh mục</CategoryTitle>

      <Spin spinning={isLoading}>
        <CategoryList
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          <CategoryItem value="all">Tất cả</CategoryItem>

          {categories.map((c: any) => (
            <CategoryItem key={c.id} value={c.id}>
              {c.name}
            </CategoryItem>
          ))}
        </CategoryList>
      </Spin>
    </div>
  );
};

export default CategoriesSidebar;