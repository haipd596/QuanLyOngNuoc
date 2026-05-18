import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { Panel, PanelHeader, PanelTitle, StatusDot, TableWrap } from "@/apps/admin/pages/dashboard/styled";
import { formatMoney } from "@/apps/admin/pages/dashboard/utils";
import { getSellerProducts } from "@/apps/seller/services/seller.api";

const PAGE_SIZE = 10;

const SellerProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res: any = await getSellerProducts({ Page: page, PageSize: PAGE_SIZE });
      setProducts(res.data || []);
      setTotal(res.metaData?.total || 0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, [page]);

  const columns: ColumnsType<any> = [
    { title: "SKU", dataIndex: "sku" },
    { title: "Tên", dataIndex: "name" },
    { title: "Đơn vị", dataIndex: "unit" },
    { title: "Giá bán", align: "right", render: (_, r) => formatMoney(Number(r.salePrice)) },
    { title: "Tồn kho", dataIndex: "stockQuantity" },
    { title: "Mức tối thiểu", dataIndex: "minStockLevel" },
  ];

  return (
    <Panel>
      <PanelHeader><PanelTitle>Sản phẩm đang bán</PanelTitle><StatusDot><span />Dữ liệu thật</StatusDot></PanelHeader>
      <TableWrap><Table rowKey="id" loading={loading} columns={columns} dataSource={products} pagination={{ current: page, pageSize: PAGE_SIZE, total, onChange: setPage }} /></TableWrap>
    </Panel>
  );
};

export default SellerProductsPage;
