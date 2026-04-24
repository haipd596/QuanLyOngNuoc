import BaseIconFontAwesome from '@packages/components/BaseIconFontAwesome';
import { apiGetByTthcId, apiGetListDocumentFromNationalDatabase } from '@packages/dvc-service';
import { useFetchBaseLogin } from '@packages/hooks';
import { searchString, transformDataFilePDF } from '@packages/utils/generateUniqId';
import {
  Button, Space, Table,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import Column from 'antd/es/table/Column';
import _get from 'lodash/get';
import { useEffect, useRef, useState } from 'react';
import { DocumentEnum } from '../enum';
import { ListDataWareHouseType } from '../type';

const ListDataWareHouse:React.FC<ListDataWareHouseType> = (props) => {
  const { keySearch, tabKey, onDownloadFile } = props;
  const [dataSource, setDataSource] = useState<AnyObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const currentData = useRef<AnyObject[]>([]);
  console.info('🚀 ~ dataSource:', dataSource);
  console.info('🚀 ~ loading:', loading);
  // const fileServerUrl = useAppSelector(selectFileUrlServer);

  const [maThuTuc, setMaThuTuc] = useState<number>();

  const result = useFetchBaseLogin();

  useEffect(() => {
    const fetchDocumentMaThuTuc = async () => {
      try {
        const response = await apiGetByTthcId();
        if (_get(response, 'MaQG')) {
          setMaThuTuc(_get(response, 'MaQG'));
        }
      } catch (error) {
        throw new Error(JSON.stringify(error));
      }
    };
    fetchDocumentMaThuTuc();
  }, []);

  useEffect(() => {
    const fetchDocument = async () => {
      setLoading(true);
      try {
        const response = await apiGetListDocumentFromNationalDatabase(
          {
            maThuTuc,
            kenhThucHien: 1,
            soDinhDanhChuSoHuu: _get(result, 'typeUser.customMaDinhDanh'),
            soDinhDanhNguoiYeuCau: _get(result, 'typeUser.customMaDinhDanh'),
            hoTenNguoiYeuCau: _get(result, 'typeUser.Title'),
          },
        );

        if (response.Data) {
          setDataSource(response.Data);
          currentData.current = response.Data;
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error(JSON.stringify(error));
      }
    };
    if (maThuTuc && result.typeUser) {
      fetchDocument();
    }
  }, [result.typeUser, maThuTuc]);

  useEffect(() => {
    if (tabKey === DocumentEnum.DOCUMENT_NATIONAL_DATA) {
      if (keySearch.trim()) {
        const filterData = currentData.current.filter((item) => {
          return item.DanhSachTepDinhKem.some(
            (nameFile: any) => searchString(nameFile.TenTep, keySearch),
          );
        });
        setDataSource(filterData);
      } else {
        setDataSource(currentData.current);
      }
    }
  }, [keySearch, tabKey]);

  return (
    <div>
      <Table
        loading={false}
        locale={{ emptyText: 'không có dữ liệu!' }}
        dataSource={dataSource}
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
          dataIndex="DanhSachTepDinhKem"
          width="95%"
          render={(value: AnyObject[]) => (
            <Space>
              <BaseIconFontAwesome
                className="fa-solid fa-file-pdf"
                color="#e70808"
                fontSize={18}
              />
              <span>{value[0]?.TenTep}</span>
            </Space>
          )}
        />
        <Column
          dataIndex="DanhSachTepDinhKem"
          width="5%"
          render={(_value: string, record: AnyObject) => (
            <Button
              onClick={() => onDownloadFile(transformDataFilePDF(record))}
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

export default ListDataWareHouse;
