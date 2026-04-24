import { fetchNgoaiTe } from '@packages/components/View/TableProfit/service/api';
import { useValidate } from '@packages/hooks/useValidate';
import { getProjectTypeInfo } from '@packages/utils/projectHelper';
import { Alert, Col, Form, Input, InputNumber, Row, Select, Spin } from 'antd';
import _get from 'lodash/get';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import { TAsyncViewProjectProps } from '../type';

const { TextArea } = Input;

// Constants
const DEFAULT_CURRENCY = 'VND';

// Utility functions
const formatNumber = (value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const parseNumber = (value: any) => value?.replace(/,/g, '');

const ViewerProject: React.FC<TAsyncViewProjectProps> = (props) => {
  const { fieldKey, onChange, value, listKeyValueInViewInfo } = props;
  const schema = useAppSelector(selectActiveSchema);

  const { 
    RULE_REQUIRED, 
    RULE_NO_HTML,
    RULES_256_NO_HTML, 
  } = useValidate();

  // States
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get server payload key
  const curField = useMemo(
    () => schema?.fields?.find((item: any) => item?.key === fieldKey),
    [schema?.fields, fieldKey]
  );
  const _curServerKey = useMemo(
    () => _get(curField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', ''),
    [curField]
  );

  // Get project type info
  const { type } = useMemo(() => getProjectTypeInfo(listKeyValueInViewInfo), [listKeyValueInViewInfo]);

  // Validation rules
  const validationRules = useMemo(() => {
    const isRequired = type === 'Thuong';
    return {
      RULE_REQUIRED: isRequired ? RULE_REQUIRED : ([] as any[]),
      RULE_TEXT_256: [...RULES_256_NO_HTML] as any[],
      RULE_TEXT_3000: [...RULE_NO_HTML] as any[]
    };
  }, [type]);

  // Transform currency options for Select
  const selectCurrencyOptions = useMemo(
    () => currencyOptions.map((item) => ({ label: item.ma, value: item.ma })),
    [currencyOptions]
  );

  // Fetch currency data
  useEffect(() => {
    let isMounted = true;

    fetchNgoaiTe()
      .then((data) => {
        if (isMounted) {
          setCurrencyOptions(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Lỗi khi tải danh sách tiền tệ');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize form data
  useEffect(() => {
    if (!value) {
      onChange({
        LoaiDuAn: type,
        TenDuAn: '',
        TongVonDauTu: null,
        LoaiTienTe: DEFAULT_CURRENCY,
        MucTieu: '',
        QuyMoDuAn: '',
        DiaDiem: '',
        TienDo: '',
        ThoiHanDuAn: '',
        HienTrangDuAn: ''
      });
    }
  }, [value, onChange, type]);

  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin tip="Đang tải danh sách tiền tệ..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon style={{ marginBottom: 16 }} />;
  }

  return (
    <div>
      {/* Hidden input để lưu loại dự án */}
      <Form.Item name={[_curServerKey, 'LoaiDuAn']} hidden initialValue={type}>
        <input />
      </Form.Item>

      <Row gutter={16}>
        {/* Tên dự án */}
        <Col span={24}>
          <Form.Item
            name={[_curServerKey, 'TenDuAn']}
            label="Tên dự án"
            rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
          >
            <Input placeholder="Nhập tên dự án" />
          </Form.Item>
        </Col>

        {/* Tổng vốn đầu tư */}
        <Col span={12}>
          <Form.Item
            name={[_curServerKey, 'TongVonDauTu']}
            label="Tổng vốn đầu tư"
            rules={validationRules.RULE_REQUIRED}
          >
            <InputNumber
              placeholder="Nhập tổng vốn đầu tư"
              style={{ width: '100%' }}
              formatter={formatNumber}
              parser={parseNumber}
              min={0}
            />
          </Form.Item>
        </Col>

        {/* Loại tiền tệ */}
        <Col span={12}>
          <Form.Item
            name={[_curServerKey, 'LoaiTienTe']}
            label="Loại tiền tệ"
            rules={validationRules.RULE_REQUIRED}
          >
            <Select placeholder="Chọn loại tiền tệ" showSearch optionFilterProp="label" options={selectCurrencyOptions} />
          </Form.Item>
        </Col>

        {/* Mục tiêu */}
        <Col span={24}>
          <Form.Item
            name={[_curServerKey, 'MucTieu']}
            label="Mục tiêu"
            rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_3000]}
          >
            <TextArea placeholder="Nhập mục tiêu dự án" rows={3} />
          </Form.Item>
        </Col>

        {/* Quy mô dự án */}
        <Col span={12}>
          <Form.Item
            name={[_curServerKey, 'QuyMoDuAn']}
            label="Quy mô dự án"
            rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
          >
            <Input placeholder="Nhập quy mô dự án" />
          </Form.Item>
        </Col>

        {/* Địa điểm */}
        <Col span={12}>
          <Form.Item
            name={[_curServerKey, 'DiaDiem']}
            label="Địa điểm"
            rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
          >
            <Input placeholder="Nhập địa điểm" />
          </Form.Item>
        </Col>

        {/* Tiến độ */}
        <Col span={12}>
          <Form.Item
            name={[_curServerKey, 'TienDo']}
            label="Tiến độ"
            rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
          >
            <Input placeholder="Nhập tiến độ" />
          </Form.Item>
        </Col>

        {/* Thời hạn dự án */}
        <Col span={12}>
          <Form.Item
            name={[_curServerKey, 'ThoiHanDuAn']}
            label="Thời hạn dự án"
            rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
          >
            <Input placeholder="Nhập thời hạn dự án" />
          </Form.Item>
        </Col>

        {/* Hiện trạng dự án */}
        <Col span={24}>
          <Form.Item
            name={[_curServerKey, 'HienTrangDuAn']}
            label="Hiện trạng dự án/Tóm tắt tình hình triển khai dự án"
            rules={validationRules.RULE_TEXT_3000}
          >
            <TextArea placeholder="Nhập hiện trạng dự án/Tóm tắt tình hình triển khai dự án" rows={4} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

export default ViewerProject;
