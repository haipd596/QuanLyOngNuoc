import { Input } from 'antd';
import React from 'react';
import './styles.scss';

type IProps = {
  fullname?: string;
  vneid?: string;
  address?: string;
};

const { TextArea } = Input;
function FormAutoFill(props:IProps) {
  const { fullname, vneid, address } = props;

  return (
    <div className="f-form-auto-fill">
      <ul className="f-list">
        <li className="f-flex">
          <span style={{ width: 150 }}>Họ và tên</span>
          <Input className="f-input f-border-dashed f-only-bottom f-bg-none" disabled placeholder="Tên được tự động điền" value={fullname} />
        </li>
        <li className="f-flex">
          <span style={{ width: 150 }}>Số CMND/CCCD:</span>
          <Input className="f-input f-border-dashed f-only-bottom f-bg-none" disabled placeholder="Số CMND được tự động điền" value={vneid} />
        </li>
        <li className="f-flex">
          <span style={{ width: 150 }}>Địa chỉ:</span>
          <TextArea className="f-input f-border-dashed f-only-bottom f-bg-none" disabled placeholder="Địa chỉ được tự động điền" value={address} />
        </li>
      </ul>
    </div>
  );
}

export default FormAutoFill;
