import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import {
  Button, Col, Row, Space,
} from 'antd';
import _ from 'lodash';
import { IPropsWrapperColumns } from '../type';

const WrapperColumnKey:React.FC<IPropsWrapperColumns> = (props) => {
  const {
    dataValues, dataSource, onDeleteKey, onEditKey,
  } = props;
  if (!_.isArray(dataValues) || !_.isObject(dataSource)) return <div>Key value not found!</div>;

  return (
    <>
      {dataValues.map(({ key, value, id }, index) => (
        <Col key={index} xl={12} className="view-item-info">
          <Row justify="start">
            <Col span={10}>
              <span>{`${key}:`}</span>
            </Col>
            <Col span={14}>
              <span>{dataSource ? dataSource[value] : ''}</span>
            </Col>
          </Row>
          <Space size={[5, 0]} align="baseline" className="group-actions">
            <Button icon={<EditTwoTone />} onClick={() => onEditKey({ key, value, id })} />
            <Button icon={<DeleteTwoTone />} onClick={() => onDeleteKey(id)} />
          </Space>
        </Col>
      ))}
    </>
  );
};

export default WrapperColumnKey;
