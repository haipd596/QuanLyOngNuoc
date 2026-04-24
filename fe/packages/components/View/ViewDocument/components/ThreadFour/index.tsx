/* eslint-disable react/no-unescaped-entities */
import { Input, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import React, { useState } from 'react';

const { TextArea } = Input;
function ThreadFour() {
  const [registed, setRegisted] = useState(true);

  const onChangeRegisted = (e: RadioChangeEvent) => {
    setRegisted(e.target.value);
  };

  return (
    <div className="declaration-section">
      <h3>4. Lý do biến động</h3>
      <div className="declaration-section__content">
        <Radio.Group onChange={onChangeRegisted} value={registed} className="f-input-group-wrap">
          <ul className="f-list f-list-padding-large-horizontal">
            <li className="f-flex f-align-center">
              <Radio value>
                Trường hợp người bán thực hiện đăng ký
              </Radio>
            </li>
            <li>
              <Radio value={false}>Trường hợp người mua thực hiện đăng ký</Radio>
            </li>
          </ul>
        </Radio.Group>
        <TextArea className="f-input f-width-full f-only-bottom f-base-paragrap f-outline-none" value={registed ? 'Chuyển nhượng, thừa kế, tặng cho, cho thuê toàn bộ thửa đất và tài sản gắn liền với đất' : 'Nhận Chuyển nhượng, thừa kế, tặng cho, cho thuê toàn bộ thửa đất và tài sản gắn liền với đất'} />
      </div>
      <div className="declaration-section__footer">
        <p className="f-base-paragrap">
          <i>
            (Lưu ý: đối với trường hợp hộ gia đình, cá nhân nhận chuyển quyền sử dụng
            đất nông nghiệpthì phải thể hiện tổng diện tích nhận chuyển quyền như
            sau:"Nhận … (ghi hình thức chuyển quyền sử dụng đất) …m2 đất
            (ghi diện tích đất nhận chuyển quyền); tổng diện tích đất nông nghiệp đang
            sử dụng do nhận chuyển quyền và đã đăng ký chuyển quyền sử dụng đất từ
            ngày 01/7/2007 đến trước ngày 01/7/2014 là … m2 và từ ngày 01/7/2014 đến nay là … m2
            (ghi cụ thể diện tích nhận chuyển quyền theo từng loại đất, từng địa bàn tỉnh,
            thành phố trực thuộc Trung ương)")
          </i>
        </p>
      </div>
    </div>
  );
}

export default ThreadFour;
