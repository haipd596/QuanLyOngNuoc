import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { configLocale } from '@packages/utils';
import {
  Button, Card, Col, DatePicker, Form, Input, InputNumber, Row,
} from 'antd';

import dayjs from 'dayjs';
import { DATE_FORMAT_DD_MM_YYYY_WITH_SLASH } from '~/constants';
import { ThreadLandType } from '../../type';
import SelectAddress from '../SelectAddress';

const initValues = [
  {
    name: 'VŨ LINH GIANG',
    cccd: '026197002461',
    date: dayjs('01/01/2015', DATE_FORMAT_DD_MM_YYYY_WITH_SLASH),
  },
];

const ThreadLand1: React.FC<ThreadLandType> = ({ isChecked }) => {
  let handleAddField: any;

  return (
    <div className="wrapper-thread-land">
      <Row justify="start" align="middle" className="header-land">
        <Col xxl={11} xl={13} md={18}>
          <h3>1.Người sử dụng đất, chủ sở hữu tài sản gắn liền với đất</h3>
        </Col>
        <Col xxl={10} xl={11} md={6}>
          <Button
            type="link"
            icon={<PlusOutlined />}
            onClick={() => handleAddField()}
          >
            Thêm chủ sử dụng
          </Button>
        </Col>
      </Row>
      <div className="note-cccd">
        {isChecked ? (
          <p>
            (Lưu ý: Trường [Số CMND/CCCD]: Nhập số CMND cũ trong
            trường hợp có thay đổi số CMND cũ sang số CCCD gắn chíp.
            Trường hợp khác, nhập số CCCD gắn chíp)
          </p>
        ) : null}
      </div>

      <Form.List name="items" initialValue={initValues}>
        {(fields, { add, remove }) => {
          handleAddField = add;
          return (
            <Row justify="start" align="top" gutter={[0, 10]}>
              {fields.map((field) => (
                <Col span={24} key={field.key}>
                  <Row justify="space-between" align="middle">
                    <Col span={23}>
                      <Card>
                        <Form.Item
                          colon={false}
                          label="1.1.Họ và Tên(viết chữ in hoa)"
                          name={[field.name, 'name']}
                          rules={[{ required: true, message: 'Vui lòng nhập thông tin bắt buộc' }]}
                        >
                          <Input />
                        </Form.Item>
                        <Row justify="space-between" gutter={[20, 0]}>
                          <Col xxl={12}>
                            <Form.Item
                              colon={false}
                              label="Ngày sinh"
                              name={[field.name, 'date']}
                              rules={[{ required: true, message: 'Vui lòng nhập thông tin bắt buộc' }]}
                            >
                              <DatePicker
                                locale={configLocale}
                                format={DATE_FORMAT_DD_MM_YYYY_WITH_SLASH}
                                placeholder="Nhập ngày sinh"
                              />
                            </Form.Item>
                          </Col>
                          <Col xxl={12}>
                            <Form.Item
                              colon={false}
                              label={isChecked ? 'Số CMND/CCCD' : 'Số CCCD gắn chip'}
                              name={[field.name, 'cccd']}
                              rules={[{ required: true, message: 'Vui lòng nhập thông tin bắt buộc' }]}
                            >
                              <InputNumber controls={false} />
                            </Form.Item>
                          </Col>
                        </Row>
                        <SelectAddress name={[field.name, 'address']} />
                      </Card>
                    </Col>
                    <Col span={1}>
                      <Button type="link" icon={<CloseOutlined />} onClick={() => remove(field.name)} />
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          );
        }}
      </Form.List>
    </div>
  );
};

export default ThreadLand1;
