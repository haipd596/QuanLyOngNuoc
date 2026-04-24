import BaseIconFontAwesome from '@packages/components/BaseIconFontAwesome';
import { apiGetListDocumentFromMyDatabase } from '@packages/dvc-service';
import { useFetchBaseLogin } from '@packages/hooks';
import { Button, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { DocumentEnum } from '../enum';
import { ListDocumentMyDataType, ListDocumentMyResponseType } from '../type';

const ListDocumentMyData:React.FC<ListDocumentMyDataType> = (props) => {
  const { keySearch, tabKey, onDownloadFile } = props;
  const { typeUser, loading } = useFetchBaseLogin();
  const [dataSource, setDataSource] = useState<ListDocumentMyResponseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const customMaDinhDanh = _get(typeUser, 'customMaDinhDanh');

  const fetchingDocument = async (userId: string, textSearch: string) => {
    setIsLoading(true);
    if (tabKey === DocumentEnum.DOCUMENT_MY_DATA && userId) {
      const searchString = _isEmpty(textSearch.trim());
      let initialData : any = [];

      if (searchString) {
        const response = await apiGetListDocumentFromMyDatabase(userId);
        if (response) initialData = response;
      } else {
        const response = await apiGetListDocumentFromMyDatabase(userId, textSearch.trim());
        if (response) initialData = response;
      }
      const filterData = initialData?.filter(({ FileName }: any) => FileName);
      if (filterData && filterData.length > 0) setDataSource(filterData);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchingDocument(customMaDinhDanh, keySearch);
  }, [customMaDinhDanh, keySearch, tabKey]);

  return (
    <div>
      <Table
        loading={loading || isLoading}
        dataSource={dataSource}
        locale={{ emptyText: 'không có dữ liệu!' }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '20', '25'],
          locale: { items_per_page: 'Số giấy tờ/trang' },
        }}
        className="wrapper-table-pdf"
          // eslint-disable-next-line react/no-unstable-nested-components
        footer={() => (<span>{`Tổng số: ${dataSource.length} giấy tờ`}</span>)}
      >
        <Column
          dataIndex="FileName"
          width="95%"
          render={(value: string) => (
            <Space>
              <BaseIconFontAwesome
                className="fa-solid fa-file-pdf"
                color="#e70808"
                fontSize={18}
              />
              <span>{value}</span>
            </Space>
          )}
        />
        <Column
          dataIndex="NodeId"
          width="5%"
          render={(_value: string, record: any) => (
            <Button
              onClick={() => onDownloadFile(record)}
              type="link"
              icon={(
                <BaseIconFontAwesome
                  className="fa-solid fa-cloud-arrow-down"
                  color="#0975c8"
                />
              )}
            />
          )}
        />
      </Table>
    </div>
  );
};

export default ListDocumentMyData;
