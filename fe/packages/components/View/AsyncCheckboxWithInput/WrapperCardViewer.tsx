import {
  Checkbox, Col, Input, Row,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';

import { useEffect, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectTthc } from '~/redux/slices';
import { ViewCheckboxGroupProps } from '../ViewCheckboxGroup';

const WrapperCardViewer:React.FC<ViewCheckboxGroupProps> = (props) => {
  const tthc = useAppSelector(selectTthc);
  const tthcid = _get(tthc, 'ThuTucHanhChinhId.Id', null);
  const [listOption, setListOption] = useState<AnyObject[]>([]);
  const { options, onChange, value } = props;

  useEffect(() => {
    const customOptions: any = options?.map(({ label, value: _value }) => {
      const selected = value && value?.find(({ Key }) => Key === _value);

      return (
        {
          TenNoiDungHoatDong: selected?.TenNoiDungHoatDong || label,
          // NoiDungHoatDongId: label,
          NoiDungHoatDongId: selected?.NoiDungHoatDongId || _value,
          Key: _value,
          enabled: selected?.enabled === true,
        }
      );
    });
    setListOption(customOptions);
  }, [options, value]);

  const handleOnChange = (_value: string | boolean, _key: number, type: string) => {
    const transformOption = listOption.map((item) => {
      const key = _get(item, 'Key');
      if (key === _key) {
        if (type === 'CHECKBOX') {
          item.enabled = _value;
        } else {
          item.TenNoiDungHoatDong = _value;
        }
      }
      return item;
    });
    setListOption(transformOption);
    const payloadData = transformOption.filter(({ enabled }) => enabled).map((
      {
        TenNoiDungHoatDong, NoiDungHoatDongId, Key, enabled,
      },
    ) => ({
      TenNoiDungHoatDong,
      NoiDungHoatDongId,
      HoSoId: tthcid,
      Key,
      enabled,
    }));
    if (onChange) onChange(payloadData);
  };

  if (!_isArray(options)) return <div>Options not found!</div>;

  return (
    <Row justify="space-between" gutter={[30, 30]}>
      {listOption.map(({ Key, TenNoiDungHoatDong, enabled }: any, index) => (
        <Col key={index} xl={12} md={24} sm={24} xs={24}>
          <Row justify="space-between" gutter={[10, 0]}>
            <Col flex="25px">
              <Checkbox
                checked={enabled}
                onChange={(e) => handleOnChange(e.target.checked, Key, 'CHECKBOX')}
              />
            </Col>
            <Col flex="auto">
              <Input.TextArea
                value={TenNoiDungHoatDong}
                autoSize={{ minRows: 2, maxRows: 2 }}
                disabled={!enabled}
                // readOnly={enabled}
                onChange={
                  (e) => {
                    // if (!enabled) handleOnChange(e.target.value, Key, 'INPUT');
                    handleOnChange(e.target.value, Key, 'INPUT');
                  }
                }
              />
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default WrapperCardViewer;
