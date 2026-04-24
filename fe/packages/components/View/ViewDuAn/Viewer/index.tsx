import { apiGetDuAn } from '@packages/dvc-service/apiGetDuAn';
import { Col, Input, Row } from 'antd';
import _get from 'lodash/get';
import { useEffect, useState } from 'react';

const listKey = [
  {
    label: 'Tên dự án',
    dataIndex: 'TenDuAn',
  },
  {
    label: 'Địa điểm thực hiện dự án',
    dataIndex: 'DiaDiemThucHienDuAn',
  },
  {
    label: 'Đơn vị chủ dự án',
    dataIndex: 'DonViChuDuAn',
  },
];

const ViewDuAnViewer:React.FC = ({ onChange }: any) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiGetDuAn().then((_data: any) => {
      setData(_data);
      onChange([
        listKey.reduce((acc, cur) => {
          acc[cur.dataIndex] = _data[cur.dataIndex] || '';

          return acc;
        }, {} as any),
      ]);
    }).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Row className="wrapper-viewer-info" justify="space-between" align="middle" gutter={[0, 10]} wrap>
      {listKey.map(({ label, dataIndex }, index) => (
        <Col key={index} xl={24} md={24} xs={24}>
          <Row justify="start">
            <Col xl={10} md={24} xs={24}>
              <span>{label}</span>
            </Col>
            <Col xl={14} md={24} xs={24}>
              <Input
                value={_get(data, dataIndex, '')}
                disabled
                style={{ color: 'black' }}
              />
            </Col>
          </Row>
        </Col>
      ))}
    </Row>

  );
};

export default ViewDuAnViewer;
