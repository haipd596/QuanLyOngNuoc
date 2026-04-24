import {
  Checkbox, CheckboxProps, Col, Row,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import Input, { TextAreaProps } from 'antd/es/input';
import _ from 'lodash';

interface IPropsFormItemChange {
  value: AnyObject,
  onChange: (value: AnyObject) => void,
}

const FormItemChange:React.FC<IPropsFormItemChange> = ({ value, onChange }) => {
  const enabled = _.get(value, 'enabled', false);
  const content = _.get(value, 'content', '');

  const handleCheckboxChange: CheckboxProps['onChange'] = (e) => {
    value.enabled = e.target.checked;
    onChange({ ...value });
  };

  const handleInputChange: TextAreaProps['onChange'] = (e) => {
    value.content = e.target.value;
    onChange({ ...value });
  };

  return (
    <Row justify="space-between" align="top" style={{ height: 60 }}>
      <Col flex="25px">
        <Checkbox checked={enabled} onChange={handleCheckboxChange} />
      </Col>
      <Col flex="auto">
        <Input.TextArea
          value={content}
          autoSize={{ minRows: 2, maxRows: 2 }}
          disabled={!enabled}
          onChange={handleInputChange}
        />
      </Col>
    </Row>
  );
};

export default FormItemChange;
