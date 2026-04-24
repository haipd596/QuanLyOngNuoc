import {
  Button, Col, Input, Row,
} from 'antd';
import '../FormRequestCSDL/styles.scss';
import { getInputValues } from '../utils';

type TProps = {
  initValue: any;
  onFinish: () => void;
  onCancel: () => void;
  listKey: any
};

function FormShowResultsCSDL(props: TProps) {
  const {
    initValue, onFinish, onCancel, listKey,
  } = props;

  return (
    <div>
      <Row
        className="wrapper-"
        justify="space-between"
        align="middle"
        gutter={[10, 10]}
      >
        {listKey.map(({
          value, valueCSDL, id, key, serverPayloadKey,
        }: any) => (
          <Col xl={12} md={12} xs={24} key={`listkeyCty-${id}`}>
            <p>{key}</p>
            <Input
              disabled
              defaultValue={getInputValues(initValue, value, valueCSDL, serverPayloadKey)}
            />
          </Col>
        ))}
      </Row>
      <Row className="f-modal-csdl-quoc-gia__footer" style={{ marginTop: 10 }} justify="center">
        <Col>
          <Button onClick={onCancel}>Bỏ qua</Button>
          <Button type="primary" onClick={onFinish} style={{ marginLeft: 10 }}>
            Đồng ý
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default FormShowResultsCSDL;
