import { Input } from 'antd';
import { ProductsHeader, ProductsTitle, FilterWrapper } from '../styled';

const { Search } = Input;

type Props = {
  value: string;
  onSearch: (value: string) => void;
};

const ProductHeader = ({ value, onSearch }: Props) => {
  return (
    <ProductsHeader>
      <ProductsTitle>Tất cả sản phẩm</ProductsTitle>

      <FilterWrapper>
        <Search
          placeholder="Tìm kiếm sản phẩm..."
          allowClear
          enterButton
          value={value}
          onChange={(e) => onSearch(e.target.value)}
          onSearch={(val) => onSearch(val)}
          style={{ width: 320 }}
        />
      </FilterWrapper>
    </ProductsHeader>
  );
};

export default ProductHeader;