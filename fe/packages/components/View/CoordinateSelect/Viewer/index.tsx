import {
  Col, Form, Row, Select,
} from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { useEffect } from 'react';
import { CENTRAL_MERIDIAN_OPTIONS, COORDINATE_OPTIONS, ZONE_OPTIONS } from './options';

const CoordinateSelectViewer:React.FC = ({
  optionsCoordinate,
  optionsCentralMeridian,
  optionsZone,
  gutter,
  disabled,
}: any) => {
  const form = useFormInstance();
  const getRules = (options: any) => [{
    required: options?.required || false,
    message: 'Vui lòng nhập dữ liệu',
  }];

  useEffect(() => {
    const fieldsToUpdate = [
      optionsCoordinate,
      optionsCentralMeridian,
      optionsZone,
    ].reduce((acc, option) => {
      let formValue = form.getFieldValue(option.name);

      if (!formValue && !option.required) {
        formValue = '';
      }

      acc[option.name] = formValue;
      return acc;
    }, {});
    form.setFieldsValue(fieldsToUpdate);
  }, [
    form,
    optionsCoordinate.name,
    optionsCentralMeridian.name,
    optionsZone.name,
  ]);

  return (
    <Row wrap gutter={Object.values(gutter[0]) as any} style={{ width: '100%' }}>
      <Col {...optionsCoordinate?.colConfig[0]}>
        <Form.Item {...optionsCoordinate} rules={getRules(optionsCoordinate)}>
          <Select
            options={COORDINATE_OPTIONS}
            allowClear
            placeholder={optionsCoordinate.placeholder}
            disabled={disabled}
          />
        </Form.Item>
      </Col>
      <Col {...optionsCentralMeridian?.colConfig[0]}>
        <Form.Item {...optionsCentralMeridian} rules={getRules(optionsCentralMeridian)}>
          <Select
            options={CENTRAL_MERIDIAN_OPTIONS}
            allowClear
            placeholder={optionsCentralMeridian.placeholder}
            disabled={disabled}
          />
        </Form.Item>
      </Col>
      <Col {...optionsZone?.colConfig[0]}>
        <Form.Item {...optionsZone} rules={getRules(optionsZone)}>
          <Select
            options={ZONE_OPTIONS}
            allowClear
            placeholder={optionsZone.placeholder}
            disabled={disabled}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default CoordinateSelectViewer;
