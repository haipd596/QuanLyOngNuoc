import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import DatePickerMask from "@packages/components/DatePickerMask";
import { fetchNgoaiTe } from '@packages/components/View/TableProfit/service/api';
import { useValidate } from '@packages/hooks/useValidate';
import { getProjectTypeInfo } from '@packages/utils/projectHelper';
import { Alert, Button, Col, Form, Input, InputNumber, Row, Select, Spin } from 'antd';
import dayjs from 'dayjs';
import _get from 'lodash/get';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectActiveSchema } from '~/redux/slices/FormSlice';
import { TAsyncViewProjectAdvanceProps } from '../type';

const { TextArea } = Input;

// Constants
const DEFAULT_CURRENCY = 'VND';

const EMPTY_DOCUMENT = {
  TenGiay: '',
  SoGiay: '',
  NgayCap: '',
  CoQuanCap: '',
  GhiChu: ''
};


// Utility functions
const formatNumber = (value: any) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const parseNumber = (value: any) => value?.replace(/,/g, '');

const ViewerProjectAdvance: React.FC<TAsyncViewProjectAdvanceProps> = (props) => {
  const { fieldKey, onChange, value, listKeyValueInViewInfo } = props;
  const schema = useAppSelector(selectActiveSchema);

  const { 
    RULE_REQUIRED, 
    RULES_256_NO_HTML, 
    RULE_DATE,
    RULE_NO_HTML
  } = useValidate();

  // States
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get server payload key and project type
  const curField = useMemo(
    () => schema?.fields?.find((item: any) => item?.key === fieldKey),
    [schema?.fields, fieldKey]
  );
  const _curServerKey = useMemo(
    () => _get(curField, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', ''),
    [curField]
  );
  const { type } = useMemo(
    () => getProjectTypeInfo(listKeyValueInViewInfo),
    [listKeyValueInViewInfo]
  );

  // Validation rules
  const validationRules = useMemo(() => {
    const isRequired = type === 'Thuong';
    return {
      RULE_REQUIRED: isRequired ? RULE_REQUIRED : [] as any[],
      RULE_TEXT_256: [...RULES_256_NO_HTML] as any[],
      RULE_TEXT_3000: [...RULE_NO_HTML] as any[],
      RULE_DATE: [...RULE_REQUIRED, ...RULE_DATE] as any[]
    };
  }, [type]);

  // Transform currency options for Select
  const selectCurrencyOptions = useMemo(
    () => currencyOptions.map((item) => ({ label: item.ma, value: item.ma })),
    [currencyOptions]
  );

  // Create default project data
  const createDefaultProject = useCallback(
    () => ({
      GiayToDuAn: [{ ...EMPTY_DOCUMENT }],
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
    }),
    [type]
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
      onChange([createDefaultProject()]);
    }
  }, [value, onChange, createDefaultProject]);

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
    return (
      <Alert
        message="Lỗi"
        description={error}
        type="error"
        showIcon
        style={{ marginBottom: 16 }}
      />
    );
  }

  return (
    <Form.List name={_curServerKey}>
      {(projectFields, { add: addProject, remove: removeProject }) => (
        <>
          {projectFields.map((projectField, projectIndex) => (
            <div
              key={projectField.key}
              style={{
                borderRadius: '6px',
                padding: '6px 0px',
                marginBottom: '6px'
              }}
            >
              {/* Project Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #d9d9d9'
                }}
              >
                <h3 style={{ margin: 0, color: 'var(--primary)' }}>Dự án {projectIndex + 1}</h3>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeProject(projectField.name)}
                >
                  Xóa dự án
                </Button>
              </div>

              {/* Phần 1: Bảng giấy tờ dự án */}
              <h4 style={{ marginBottom: '12px', color: '#333' }}>Phần 1: Bảng giấy tờ dự án</h4>
              <Form.List name={[projectField.name, 'GiayToDuAn']}>
                {(docFields, { add: addDoc, remove: removeDoc }) => (
                  <div
                    style={{
                      border: '1px solid #EEE',
                      borderRadius: '6px',
                      padding: '0px 4px 8px 4px',
                      backgroundColor: 'white'
                    }}
                  >
                    {/* Header Row */}
                    <Row
                      gutter={[8, 8]}
                      style={{
                        fontWeight: 600,
                        marginBottom: 8,
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '8px 0',
                        borderRadius: '6px'
                      }}
                    >
                      <Col flex="0 0 50px" style={{ textAlign: 'center' }}>
                        STT
                      </Col>
                      <Col flex="1">Tên giấy</Col>
                      <Col flex="1">Số giấy/Mã số dự án</Col>
                      <Col flex="0 0 140px">Ngày cấp</Col>
                      <Col flex="1">Cơ quan cấp</Col>
                      <Col flex="1">Ghi chú</Col>
                      <Col flex="0 0 50px" style={{ textAlign: 'center' }}>
                        <Button
                          type="primary"
                          onClick={() => addDoc({ ...EMPTY_DOCUMENT })}
                          icon={<PlusOutlined />}
                          style={{
                            backgroundColor: 'white',
                            color: 'var(--primary)',
                            border: 'none',
                            height: '32px',
                            width: '32px',
                            padding: 0
                          }}
                        />
                      </Col>
                    </Row>

                    {/* Data Rows */}
                    {docFields.map((docField, docIndex) => (
                      <Row key={docField.key} gutter={[8, 8]} style={{ marginBottom: 16 }}>
                        {/* STT */}
                        <Col flex="0 0 50px">
                          <div
                            style={{
                              padding: '5px 4px',
                              border: '1px solid #d9d9d9',
                              borderRadius: '6px',
                              textAlign: 'center',
                              lineHeight: '20px',
                              backgroundColor: '#fafafa'
                            }}
                          >
                            {docIndex + 1}
                          </div>
                        </Col>

                        {/* Tên giấy */}
                        <Col flex="1">
                          <Form.Item
                            name={[docField.name, 'TenGiay']}
                            style={{ marginBottom: 0 }}
                            rules={[
                              { required: true, message: 'Vui lòng nhập tên giấy' },
                              ...validationRules.RULE_TEXT_256
                            ]}
                          >
                            <Input placeholder="Nhập tên giấy" />
                          </Form.Item>
                        </Col>

                        {/* Số giấy */}
                        <Col flex="1">
                          <Form.Item
                            name={[docField.name, 'SoGiay']}
                            style={{ marginBottom: 0 }}
                            rules={[
                              { required: true, message: 'Vui lòng nhập số giấy' },
                              ...validationRules.RULE_TEXT_256
                            ]}
                          >
                            <Input placeholder="Nhập số giấy" />
                          </Form.Item>
                        </Col>

                        {/* Ngày cấp */}
                        <Col flex="0 0 140px">
                          <Form.Item
                            name={[docField.name, 'NgayCap']}
                            style={{ marginBottom: 0 }}
                            // rules={validationRules.RULE_DATE}
                            rules={[ RULE_REQUIRED ]}
                            getValueProps={(value) => ({ value: value ? dayjs(value, 'DD/MM/YYYY') : undefined })}
                            getValueFromEvent={(date) => date ? date.format('DD/MM/YYYY') : null}
                          >
                            {/* <Input placeholder="DD/MM/YYYY" /> */}
                            <DatePickerMask disabledDate={(current) => current.isAfter(dayjs(), 'day')} />
                          </Form.Item>
                        </Col>

                        {/* Cơ quan cấp */}
                        <Col flex="1">
                          <Form.Item
                            name={[docField.name, 'CoQuanCap']}
                            style={{ marginBottom: 0 }}
                            rules={[
                              { required: true, message: 'Vui lòng nhập cơ quan cấp' },
                              ...validationRules.RULE_TEXT_256
                            ]}
                          >
                            <Input placeholder="Nhập cơ quan cấp" />
                          </Form.Item>
                        </Col>

                        {/* Ghi chú */}
                        <Col flex="1">
                          <Form.Item
                            name={[docField.name, 'GhiChu']}
                            style={{ marginBottom: 0 }}
                            rules={validationRules.RULE_TEXT_3000}
                          >
                            <TextArea placeholder="Nhập ghi chú" autoSize={{ minRows: 1, maxRows: 3 }} />
                          </Form.Item>
                        </Col>

                        {/* Delete Button */}
                        <Col
                          flex="0 0 50px"
                          style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                          <Button
                            type="primary"
                            onClick={() => removeDoc(docField.name)}
                            icon={<DeleteOutlined style={{ color: 'white', fontSize: 14 }} />}
                            style={{ backgroundColor: 'var(--error)', height: '32px', width: '32px', padding: 0 }}
                          />
                        </Col>
                      </Row>
                    ))}
                  </div>
                )}
              </Form.List>

              {/* Phần 2: Nội dung dự án */}
              <h4 style={{ marginTop: '24px', marginBottom: '12px', color: '#333' }}>
                Phần 2: Nội dung dự án
              </h4>
              <div style={{ backgroundColor: 'white', padding: '0px', borderRadius: '6px' }}>
                {/* Hidden input for project type */}
                <Form.Item name={[projectField.name, 'LoaiDuAn']} hidden initialValue={type}>
                  <input />
                </Form.Item>

                <Row gutter={16}>
                  {/* Tên dự án */}
                  <Col span={24}>
                    <Form.Item
                      name={[projectField.name, 'TenDuAn']}
                      label="Tên dự án"
                      rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
                    >
                      <Input placeholder="Nhập tên dự án" />
                    </Form.Item>
                  </Col>

                  {/* Tổng vốn đầu tư */}
                  <Col span={12}>
                    <Form.Item
                      name={[projectField.name, 'TongVonDauTu']}
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
                      name={[projectField.name, 'LoaiTienTe']}
                      label="Loại tiền tệ"
                      rules={validationRules.RULE_REQUIRED}
                    >
                      <Select
                        placeholder="Chọn loại tiền tệ"
                        showSearch
                        optionFilterProp="label"
                        options={selectCurrencyOptions}
                      />
                    </Form.Item>
                  </Col>

                  {/* Mục tiêu */}
                  <Col span={24}>
                    <Form.Item
                      name={[projectField.name, 'MucTieu']}
                      label="Mục tiêu"
                      rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_3000]}
                    >
                      <TextArea placeholder="Nhập mục tiêu dự án" rows={3} />
                    </Form.Item>
                  </Col>

                  {/* Quy mô dự án */}
                  <Col span={12}>
                    <Form.Item
                      name={[projectField.name, 'QuyMoDuAn']}
                      label="Quy mô dự án"
                      rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
                    >
                      <Input placeholder="Nhập quy mô dự án" />
                    </Form.Item>
                  </Col>

                  {/* Địa điểm */}
                  <Col span={12}>
                    <Form.Item
                      name={[projectField.name, 'DiaDiem']}
                      label="Địa điểm"
                      rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
                    >
                      <Input placeholder="Nhập địa điểm" />
                    </Form.Item>
                  </Col>

                  {/* Tiến độ */}
                  <Col span={12}>
                    <Form.Item
                      name={[projectField.name, 'TienDo']}
                      label="Tiến độ"
                      rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
                    >
                      <Input placeholder="Nhập tiến độ" />
                    </Form.Item>
                  </Col>

                  {/* Thời hạn dự án */}
                  <Col span={12}>
                    <Form.Item
                      name={[projectField.name, 'ThoiHanDuAn']}
                      label="Thời hạn dự án"
                      rules={[...validationRules.RULE_REQUIRED, ...validationRules.RULE_TEXT_256]}
                    >
                      <Input placeholder="Nhập thời hạn dự án" />
                    </Form.Item>
                  </Col>

                  {/* Hiện trạng dự án */}
                  <Col span={24}>
                    <Form.Item
                      name={[projectField.name, 'HienTrangDuAn']}
                      label="Hiện trạng dự án"
                      rules={validationRules.RULE_TEXT_3000}
                    >
                      <TextArea placeholder="Nhập hiện trạng dự án" rows={4} />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          ))}

          {/* Add Project Button */}
          <Button
            type="primary"
            onClick={() => addProject(createDefaultProject())}
            icon={<PlusOutlined />}
            style={{ width: '160px', height: '40px', fontSize: '16px' }}
          >
            Thêm dự án mới
          </Button>
        </>
      )}
    </Form.List>
  );
};

export default ViewerProjectAdvance;
