import {
  Button, Col,
  Row,
} from 'antd';

const InputSearchViewer:React.FC = () => {
  // const { name, onChange, value } = props;
  // const formRef = useRef<React.LegacyRef<FormInstance<any>> | any>();

  const handleSubmit = async () => {
  };

  return (
    <Row justify="space-between">
      <Col flex="auto">
        {/* <Input value={value} onChange={(e) => onChange(e.target.value)} /> */}
      </Col>
      <Col flex="100px">
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Col>
    </Row>
  );
};

export default InputSearchViewer;
