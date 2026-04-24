import { isEditMode } from '@packages/utils/viewMode';
import {
  Col, Input, Row, Select,
} from 'antd';
import { ViewFieldInputUnitType } from '../type';

const { Option } = Select;

const InputUnitBuilder:React.FC<ViewFieldInputUnitType> = (props) => {
  const { options, modeView } = props;

  return (
    <Row gutter={[10, 0]} justify="space-between" align="middle">
      <Col span={16}>
        <Input disabled={isEditMode(modeView)} />
      </Col>
      <Col span={8}>
        <Select disabled={isEditMode(modeView)}>
          {options.map(({ value, label }) => (
            <Option key={value} value={value}>{label}</Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
};

export default InputUnitBuilder;
