import { Input, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import React, { useState } from 'react';

function ThreadFive() {
  const [debt, setDebt] = useState(1);
  const [level, setLevel] = useState(1);

  const onChangeDebt = (e: RadioChangeEvent) => {
    setDebt(e.target.value);
  };
  const onChangeLevel = (e: RadioChangeEvent) => {
    setLevel(e.target.value);
  };

  return (
    <div className="declaration-section">
      <h3>
        5. Tình hình thực hiện nghĩa vụ tài chính
        về đất đai đối với thửa đất đăng ký biến động
      </h3>
      <div className="declaration-section__content">
        <Radio.Group onChange={onChangeDebt} value={debt} className="f-input-group-wrap">
          <ul className="f-list f-list-padding-large-horizontal">
            <li className="f-flex f-align-center">
              <Radio value={1}>Còn nợ nghĩa vụ tài chính</Radio>
              {debt === 1 ? <Input className="f-input f-only-bottom f-width-auto f-height-base" placeholder="Nhập số tiền nghĩa vụ tài chính còn nợ" style={{ marginLeft: 20, flex: '1 0 auto' }} /> : null}
            </li>
            <li>
              <Radio value={2}>Đã hoàn thành nghĩa vụ tài chính</Radio>
            </li>
          </ul>
        </Radio.Group>
      </div>
      <div className="declaration-section__footer" style={{ paddingLeft: 30, paddingRight: 30 }}>
        <span>Tôi</span>
        <Radio.Group onChange={onChangeLevel} value={level}>
          <ul className="f-list f-list-inline f-list-padding-large-horizontal">
            <li><Radio value={1}>có nhu cầu cấp GCN mới</Radio></li>
            <li><Radio value={2}>không có nhu cầu cấp GCN mới</Radio></li>
          </ul>
        </Radio.Group>
      </div>
    </div>
  );
}

export default ThreadFive;
