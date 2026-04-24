import {
  Button, Checkbox, Flex, Radio, RadioChangeEvent,
} from 'antd';
import React, { useState } from 'react';
import { ThreadThreeType } from '../../type';
import ThreadThreeForm from './ThreadThreeForm';

const ThreadThree:React.FC<ThreadThreeType> = (props) => {
  const { isChecked, onChange } = props;
  const [registedType, setRegistedType] = useState<number>(1);

  const onChangeRegistedType = (e: RadioChangeEvent) => {
    setRegistedType(e.target.value);
  };

  return (
    <div className="declaration-section">
      <h3>3. Nội dung biến động về</h3>
      <div className="declaration-section__content" style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Radio.Group onChange={onChangeRegistedType} value={registedType} className="f-input-group-wrap">
          <ul className="f-list f-list-padding-none">
            <li>
              <Checkbox onChange={onChange}>
                Thay đổi thông tin về người được cấp Giấy chứng nhận
                (đổi tên hoặc giấy tờ pháp nhân, giấy tờ nhân thân, địa chỉ)
              </Checkbox>
            </li>
            <li>
              <Radio value={1}>
                Chuyển nhượng, thừa kế, tặng cho,
                cho thuê toàn bộ thửa đất và tài sản gắn liền với đất
              </Radio>
            </li>
            <li>
              <Radio value={2}>
                Chuyển nhượng, thừa kế, tặng cho,
                cho thuê toàn bộ tài sản gắn liền với đất (không bao gồm diện tích đất)
              </Radio>
            </li>
            <li>
              <Radio value={3}>Chuyển nhượng, thừa kế, tặng cho, cho thuê một phần thửa đất</Radio>
            </li>
            <li>
              <Radio value={4}>
                Chuyển nhượng, thừa kế, tặng cho, cho thuê một phần
                tài sản gắn liền với đất (không bao gồm diện tích đất)
              </Radio>
            </li>
            <li>
              <Radio value={5}>
                Chuyển nhượng, thừa kế, tặng cho,
                cho thuê một hoặc một số thửa đất đối với GCN cấp nhiều thửa
              </Radio>
            </li>
          </ul>
        </Radio.Group>
      </div>
      <ThreadThreeForm isChecked={isChecked} />
      <Flex justify="center" style={{ margin: 10 }}>
        <Button type="primary">Kiểm tra thông tin từ CSDL Quốc gia về dân cư</Button>
      </Flex>
    </div>
  );
};

export default ThreadThree;
