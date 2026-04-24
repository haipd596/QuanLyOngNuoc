import {
  Col, Form, Input, Row, Select,
  SelectProps,
  Spin,
} from 'antd';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';

import { DIVIDER_HIDDEN } from '@packages/constants/commons';
import { apiGetMineralGroups, apiGetMineralType } from '@packages/dvc-service';
import { transformDataOptions } from '@packages/utils';
import { isEditMode } from '@packages/utils/viewMode';
import { useEffect, useState } from 'react';
import { GROUP_SELECT_NHOM_KHOANGSAN, GROUP_SELECT_TEN_KHOANGSAN } from './constants';
import './styles.scss';
import { FCGroupSelectType } from './type';

const FCGroupSelect:React.FC<FCGroupSelectType> = ({ modeView }) => {
  const form = Form.useFormInstance();
  const [minerals, setMinerals] = useState<SelectProps['options']>([]);
  const [mineralTypes, setMineralTypes] = useState<SelectProps['options']>([]);
  const [mineralId, setMineralId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectMineral = (value: string, options: any) => {
    setMineralId(value);
    form.resetFields([GROUP_SELECT_TEN_KHOANGSAN.NAME_KEY_TEN_KHOANG_SAN]);
    form.setFieldValue(
      `TenNhom${DIVIDER_HIDDEN}`,
      JSON.stringify(
        {
          ...options,
          serverPayloadKey: GROUP_SELECT_NHOM_KHOANGSAN.NAME_KEY_NHOM_KHOANG_SAN,
        },
      ),
    );
  };

  const handleSelectMineralType = (_value: string, options: any) => {
    form.setFieldValue(
      `TenKhoangSan${DIVIDER_HIDDEN}`,
      JSON.stringify(
        {
          ...options,
          serverPayloadKey: GROUP_SELECT_TEN_KHOANGSAN.NAME_KEY_TEN_KHOANG_SAN,
        },
      ),
    );
  };

  const fetchMineralTypes = async (id: string) => {
    setIsLoading(true);
    apiGetMineralType(id).then((response) => {
      if (_isArray(response)) {
        const options = response.map((item) => ({
          label: _get(item, 'TenKhoangSan'),
          value: _get(item, 'ID'),
        }));
        setMineralTypes(options);
        setIsLoading(false);
      }
    }).finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isEditMode(modeView)) return;
    setLoading(true);
    apiGetMineralGroups().then((response) => {
      if (_isArray(response)) {
        const options = transformDataOptions(response, 'TenNhom', 'ID');
        setMinerals(options);
        setLoading(false);
      }
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (isEditMode(modeView)) return;
    const initMineralId = form.getFieldValue(
      GROUP_SELECT_NHOM_KHOANGSAN.NAME_KEY_NHOM_KHOANG_SAN,
    ) ?? mineralId;
    if (initMineralId) fetchMineralTypes(initMineralId);
  }, [mineralId]);

  return (
    <Row wrap justify="start" gutter={[10, 0]} className="wrapper-group-select">
      <Col xl={12}>
        <Form.Item
          label={GROUP_SELECT_NHOM_KHOANGSAN.LABEL_NHOM_KHOANG_SAN}
          name={GROUP_SELECT_NHOM_KHOANGSAN.NAME_KEY_NHOM_KHOANG_SAN}
          labelCol={{ xxl: 8, xl: 10, md: 24 }}
          rules={[{ required: true, message: 'Vui lòng nhập dữ liệu!' }]}
        >
          <Select
            disabled={isEditMode(modeView)}
            options={minerals}
            onChange={handleSelectMineral}
            suffixIcon={loading && <Spin size="small" />}
          />
        </Form.Item>
        <Form.Item name={`TenNhom${DIVIDER_HIDDEN}`} hidden>
          <Input />
        </Form.Item>
      </Col>
      <Col xl={12}>
        <Form.Item
          label="Loại khoáng sản"
          name={GROUP_SELECT_TEN_KHOANGSAN.NAME_KEY_TEN_KHOANG_SAN}
          labelCol={{ xxl: 8, xl: 10, md: 24 }}
          rules={[{ required: true, message: 'Vui lòng nhập dữ liệu!' }]}
        >
          <Select
            disabled={isEditMode(modeView)}
            options={mineralTypes}
            onChange={handleSelectMineralType}
            suffixIcon={isLoading && <Spin size="small" />}
          />
        </Form.Item>
        <Form.Item name={`TenKhoangSan${DIVIDER_HIDDEN}`} hidden>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FCGroupSelect;
