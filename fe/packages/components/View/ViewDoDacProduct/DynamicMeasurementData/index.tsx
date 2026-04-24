import {
  Form, Input, Select, Spin, Table,
} from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import { MODE_VIEW } from '@packages/constants/modeView';
import { apiGetDuLieuDongDoDacBanDo } from '@packages/dvc-service/apGetBanDoTuLieu';
import { AnyObject } from 'antd/es/_util/type';
import { useWatch } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { TableProps } from 'antd/lib';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import { useEffect, useMemo, useState } from 'react';
import './style.scss';

type IDynamicMeasurementData = {
  relationshipKey: string,
  modeView: string;
  onChange: (value: any) => void
};

const DynamicMeasurementData: React.FC<IDynamicMeasurementData> = (
  { relationshipKey, modeView, onChange },
) => {
  const [dataSource, setDataSource] = useState<AnyObject>([]);
  const [dataOptions, setDataOptions] = useState<any[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useFormInstance();
  const getTotalRelationship = useWatch(relationshipKey, form);
  const pickKeyData = ['TenDichVu', 'KhuVucSuDung', 'DonViTinh', 'ThoiGianSuDung', 'MucDichSuDung', 'HinhThucTiepNhan'];

  const onHandleChange = (value: string) => {
    setDataSource((state) => state.map((item: AnyObject) => ({
      ...item,
      MucDichSuDung: value,
    })));
    if (onChange) {
      onChange(dataSource.map((item: AnyObject) => ({
        ...item,
        MucDichSuDung: value,
      })));
    }
  };

  const onHandleChangeSelect = (_val: any, _ops: AnyObject) => {
    form.setFieldsValue({ TenDichVu_Hidden: JSON.stringify(_ops) });
    const selectedOption = dataOptions.find((option) => option.ID === _val);
    if (selectedOption) {
      const pickData = _pick(selectedOption, pickKeyData);
      setDataSource([pickData]);
      if (onChange) onChange([pickData]);
      setPrice(parseFloat(selectedOption?.DonGia));
    }
  };

  const intDataDetail = (_datOptions: any[]) => {
    const _initialValueDetail = form.getFieldsValue();
    const _selectValue = JSON.parse(_initialValueDetail['TenDichVu_Hidden']);
    setPrice(_get(_datOptions.find((option) => option.ID === _selectValue['value']), 'DonGia', 0));
    setDataSource(_get(_initialValueDetail, 'DuLieuDoDong', []));
  }

  useEffect(() => {
    setLoading(true);
    apiGetDuLieuDongDoDacBanDo()
      .then((res) => {
        setDataOptions(res);
        if (modeView === MODE_VIEW.VIEW) {
          intDataDetail(res);
        }
      })
      .catch((erorr) => {
        console.error('🚀 ~ DynamicMeasurementData ~ erorr:', erorr);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderPrice = useMemo(() => {
    if (getTotalRelationship && price) {
      const _totalPrice = getTotalRelationship * price;

      form.setFieldsValue({ TotalPrice: _totalPrice });
      return new Intl.NumberFormat('vi-VN').format(_totalPrice);
    }
    return 0;
  }, [price, getTotalRelationship]);

  const columns: TableProps<any>['columns'] = [
    {
      title: 'STT',
      key: 'stt',
      align: 'center',
      render: (_value: any, _record: any, index: number) => index + 1,
    },
    {
      title: 'Danh mục thông tin, dữ liệu, sản phẩm',
      key: 'TenDichVu',
      dataIndex: 'TenDichVu',
    },
    {
      title: 'Khu vực',
      key: 'KhuVucSuDung',
      dataIndex: 'KhuVucSuDung',
      align: 'center',
    },
    {
      title: 'Đơn vị tính',
      key: 'DonViTinh',
      dataIndex: 'DonViTinh',
      align: 'center',
    },
    {
      title: 'Số lượng',
      key: 'ThoiGianSuDung',
      dataIndex: 'ThoiGianSuDung',
      align: 'center',
    },
    {
      title: 'Mục đích sử dụng (Ghi rõ tên đề án, dự án, công trình)',
      key: 'MucDichSuDung',
      dataIndex: 'MucDichSuDung',
      render: (value) => <Input value={value} onChange={(e) => onHandleChange(e.target.value)} />,
    },
    {
      title: 'Hình thức cung cấp (Trực tuyến)',
      key: 'HinhThucTiepNhan',
      dataIndex: 'HinhThucTiepNhan',
      align: 'center',
    },
  ];

  return (
    <div className="wrapper-dynamic-measurement">
      <h3>Chọn dịch vụ: Dữ liệu đo động thời gian thực(RTK)</h3>
      <Select
        options={dataOptions.map((_val) => ({
          label: _get(_val, 'TenDichVu', ''),
          value: _get(_val, 'ID', ''),
        }))}
        onChange={(_value, _ops: AnyObject) => onHandleChangeSelect(_value, _ops)}
        loading
        value={1}
        suffixIcon={loading && <Spin indicator={<LoadingOutlined spin />} />}
      />
      <div className="table-content-dynamic">
        <h3>Danh mục thông tin, dữ liệu, sản phẩm đo đạc và bản đồ yêu cầu cung cấp:</h3>
        <Table
          columns={columns}
          dataSource={dataSource as any}
          pagination={false}
          bordered
          rowClassName={() => 'editable-row'}
        />
      </div>
      <div>
        <Form.Item name="TotalPrice" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="TenDichVu_Hidden" hidden>
          <Input />
        </Form.Item>
      </div>
      <div className="total-price">
        <h3>
          Tổng tiền:
          {' '}
          {renderPrice}
          {' '}
          VNĐ
        </h3>
      </div>
    </div>
  );
};

export default DynamicMeasurementData;
