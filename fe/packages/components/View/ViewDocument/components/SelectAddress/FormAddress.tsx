import { useAddress } from '@packages/components/FAddress/hooks';
import { IDistrict, IWard } from '@packages/components/FAddress/types';
import { FORM_CONFIG } from '@packages/constants/commons';
import {
  Col, Form, Input, Row, Select,
} from 'antd';
import React, { useState } from 'react';

const FormAddress = React.forwardRef((
  _props,
  ref: any,
) => {
  const [form] = Form.useForm();
  const [address] = useAddress(null, true);
  const [wards, setWards] = useState<IWard[]>([]);
  const [districts, setDistricts] = useState<IDistrict[]>([]);

  const handleSelectProvince = (value: string) => {
    form.resetFields(['district', 'ward']);
    const codeNameProvince = address.find((code) => code.value === value);
    if (codeNameProvince) setDistricts(codeNameProvince.districts);
  };

  const handleSelectDistrict = (value: string) => {
    form.resetFields(['ward']);
    const codeNameDistrict = districts.find((code) => code.value === value);
    if (codeNameDistrict) setWards(codeNameDistrict.wards);
  };

  const filterOption = (input: string, option?: { label: string; value: string }) => {
    const replaceLabel = (option?.label.normalize('NFD').replace(/[\u0300-\u036f]/g, '') ?? '').toLowerCase();
    const replaceSearchString = (input.normalize('NFD').replace(/[\u0300-\u036f]/g, '')).toLowerCase();

    return replaceLabel.includes(replaceSearchString);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      ref={ref}
      {...FORM_CONFIG}
    >
      <Row gutter={[20, 0]}>
        <Col xl={12}>
          <Form.Item colon={false} label="Tỉnh/Thành phố" name="province">
            <Select
              showSearch
              options={address}
              filterOption={filterOption}
              onChange={handleSelectProvince}
              placeholder="Chọn tỉnh thành phố..."
            />
          </Form.Item>
        </Col>
        <Col xl={12}>
          <Form.Item colon={false} label="Quận/Huyện" name="district">
            <Select
              showSearch
              options={districts}
              filterOption={filterOption}
              onChange={handleSelectDistrict}
              placeholder="Chọn quận huyện..."
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[20, 0]}>
        <Col xl={12}>
          <Form.Item colon={false} label="Phường/Xã" name="ward">
            <Select
              showSearch
              options={wards}
              filterOption={filterOption}
              placeholder="Chọn phường xã..."
            />
          </Form.Item>
        </Col>
        <Col xl={12}>
          <Form.Item colon={false} label="Số Nhà/Đường/Xóm" name="road">
            <Input placeholder="Nhập Số Nhà/Đường/Xóm..." />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default FormAddress;
