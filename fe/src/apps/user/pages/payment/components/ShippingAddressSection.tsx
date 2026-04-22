import { Col, Form, Input, Row, Select } from "antd";
import { useEffect, useMemo } from "react";

import {
  usePublicProvincesQuery,
  usePublicWardsQuery,
} from "../services";
import { SectionCard, SectionTitle, StepBadge, StyledForm } from "../styled";

const ShippingAddressSection = () => {
  const form = Form.useFormInstance();
  const selectedProvinceId = Form.useWatch("city", form);

  const { data: provincesResponse, isLoading: isLoadingProvinces } =
    usePublicProvincesQuery();

  const { data: wardsResponse, isLoading: isLoadingWards } = usePublicWardsQuery(
    selectedProvinceId
  );

  useEffect(() => {
    form.setFieldValue("ward", undefined);
  }, [form, selectedProvinceId]);

  const provinceOptions = useMemo(
    () =>
      (provincesResponse?.data ?? []).map((province) => ({
        label: province.ten,
        value: province.id,
      })),
    [provincesResponse]
  );

  const wardOptions = useMemo(
    () =>
      (wardsResponse?.data ?? []).map((ward) => ({
        label: ward.ten,
        value: ward.id,
      })),
    [wardsResponse]
  );

  return (
    <section>
      <SectionTitle>
        <StepBadge>2</StepBadge>
        Địa chỉ nhận hàng
      </SectionTitle>

      <SectionCard bordered={false}>
        <StyledForm>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tỉnh / thành phố"
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn tỉnh / thành phố",
                  },
                ]}
              >
                <Select
                  showSearch
                  loading={isLoadingProvinces}
                  placeholder="Chọn tỉnh / thành phố"
                  options={provinceOptions}
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Phường / xã"
                name="ward"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn phường / xã",
                  },
                ]}
              >
                <Select
                  showSearch
                  loading={isLoadingWards}
                  placeholder="Chọn phường / xã"
                  options={wardOptions}
                  optionFilterProp="label"
                  disabled={!selectedProvinceId}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Địa chỉ chi tiết"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ chi tiết",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Nhập số nhà, tên đường..."
                  autoSize={{ minRows: 3 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </StyledForm>
      </SectionCard>
    </section>
  );
};

export default ShippingAddressSection;
