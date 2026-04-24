import {
  Col, Form, Input, message, Row, Select, SelectProps,
  Spin,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { DIVIDER_HIDDEN } from '@packages/constants/commons';
import {
  apiGetListProvincesNew,
  // apiGetListWars,
  apiGetListWarsNew,
} from '@packages/dvc-service';
import { apiGetCoQuanTiepNhanByProvince, apiGetLinhVucByTTHCID } from '@packages/dvc-service/apiGetCoQuanTiepNhanByProvince';
import { filterOptionSelect, transformDataOptions } from '@packages/utils';
import { isDetailsMode, isEditMode, isViewMode } from '@packages/utils/viewMode';
import './styles.scss';
import { IProps } from './types';
import { withForm } from './withForm';

const FAddress: React.FC<IProps> = (props) => {
  const {
    optionsProvince,
    // optionsDistrict,
    optionsWard,
    showSearch,
    // isShowDistrict,
    isShowWard,
    form,
    disabled,
    gutter,
    modeView,
    isShowDetailAddress,
    isAddressWrappedSpecial,
    optionsAgency,
  } = props;
  const sectionFourRef = useRef<HTMLDivElement>(null);
  const [provinces, setProvinces] = useState<SelectProps['options']>([]);
  // const [districts, setDistricts] = useState<SelectProps['options']>([]);
  const [wards, setWards] = useState<SelectProps['options']>([]);
  const [provinceId, setProvinceId] = useState<number>();

  const params = new URL(window.location.href).searchParams;
  const _tthcId = params.get('tthcId');
  const targetTthcId = _tthcId ? Number(_tthcId) : undefined;
  // const [districtId, setDistrictId] = useState<number>();
  const [loading, setLoading] = useState<AnyObject>(
    {
      province: false,
      // district: false,
      ward: false,
    },
  );
  const [listDanhSach, setListDanhSach] = useState<SelectProps['options']>([]);
  const [loadingAgency, setLoadingAgency] = useState(false);
  const isDisabled = isDetailsMode(modeView) ? true : disabled;

  const getColConfig = (name: string) => _get(props, `${name}.colConfig.0`, {});

  const getGutter = useMemo(() => {
    if (gutter[0]) {
      return [gutter[0]?.gutterX, gutter[0]?.gutterY];
    }
    return [8, 8];
  }, [gutter]);

  const handleSelectProvince = async (value: number, options: any) => {
    if (optionsWard) {
      if (isAddressWrappedSpecial) {
        const newValue = [
          {
            [optionsProvince.name]: value,
            [`${optionsProvince?.name}${DIVIDER_HIDDEN}`]: JSON.stringify(options),
          }];
        form.setFieldsValue({ DiaDiem_Special: newValue });
        // form.setFieldsValue({
        //   [optionsProvince.name]: undefined,
        // });
      } else {
        form.setFieldsValue({
          [optionsWard.name]: '',
          [`${optionsWard?.name}${DIVIDER_HIDDEN}`]: JSON.stringify({ label: '', value: 0 }),
        });

        form.setFieldValue(
          `${optionsProvince.name}${DIVIDER_HIDDEN}`,
          JSON.stringify(options),
        );
      }
    }
    setProvinceId(value);

    if (isAddressWrappedSpecial && targetTthcId) {
      setListDanhSach([]);
      form.setFieldValue('CoQuanTiepNhan_Special', undefined);
      setLoadingAgency(true);
      try {
        const targetLinhVucId = await apiGetLinhVucByTTHCID(targetTthcId);
        const data = await apiGetCoQuanTiepNhanByProvince(value, targetLinhVucId);
        if (!data?.length) {
          message.warning('Không tìm thấy cơ quan tiếp nhận tương ứng!');
          return;
        }
        const optionsList = data.map((x: any) => ({
          label: x.Ten,
          value: x.ID,
        }));
        setListDanhSach(optionsList);
      } finally {
        setLoadingAgency(false);
      }
    }
  };

  const handleSelectWard = (_value: number, options: any) => {
    if (optionsWard) {
      form.setFieldValue(
        `${optionsWard.name}${DIVIDER_HIDDEN}`,
        JSON.stringify(options),
        // `${_get(options, 'label')}${DIVIDER}${_get(options, 'value')}`,
      );
    }
  };

  const fetchingProvinces = () => {
    setLoading((state) => ({ ...state, province: true }));
    apiGetListProvincesNew().then((response) => {
      if (_isArray(response)) {
        const options = transformDataOptions(response, 'Ten', 'ID');
        setProvinces(options);
      }
    }).finally(() => setLoading((state) => ({ ...state, province: false })));
  };

  const fetchingWards = (provId: number) => {
    setLoading((state) => ({ ...state, ward: true }));
    apiGetListWarsNew(provId).then((response) => {
      if (_isArray(response)) {
        const options = transformDataOptions(response, 'Ten', 'ID');
        setWards(options);
      }
    }).finally(() => setLoading((state) => ({ ...state, ward: false })));
  };

  // FETCHING LIST PROVINCES
  useEffect(() => {
    if (isEditMode(modeView)) return;
    fetchingProvinces();
  }, []);

  // FETCHING LIST WARDS
  useEffect(() => {
    if (isEditMode(modeView)) return;
    const initProvinceId = form.getFieldValue(optionsProvince?.name) ?? provinceId;
    if (initProvinceId) fetchingWards(initProvinceId);
  }, [provinceId]);

  useEffect(() => {
    const fetch = async () => {
      if (!form.getFieldValue('TinhId')) {
        if (isAddressWrappedSpecial) {
          const newValue = [
            {
              [optionsProvince.name]: null,
              [`${optionsProvince?.name}${DIVIDER_HIDDEN}`]: JSON.stringify({ label: '', value: 0 }),
            }];
          form.setFieldsValue({ DiaDiem_Special: newValue });
        } else {
          form.setFieldsValue({
            [optionsProvince.name]: null,
            [`${optionsProvince?.name}${DIVIDER_HIDDEN}`]: JSON.stringify({ label: '', value: 0 }),
          });
        }
      }
      if (!form.getFieldValue('XaId')) {
        form.setFieldsValue({
          [optionsWard?.name as any]: null,
          [`${optionsWard?.name}${DIVIDER_HIDDEN}`]: JSON.stringify({ label: '', value: 0 }),
        });
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchForEditOrDetail = async () => {
      if (!isViewMode(modeView) && !isDetailsMode(modeView)) return;
      const initProvinceId = form.getFieldValue(optionsProvince?.name);
      const initAgencyId = form.getFieldValue('CoQuanTiepNhan_Special');
      if(initProvinceId){
        setLoadingAgency(true);
        try{
          const linhVucId = await apiGetLinhVucByTTHCID(targetTthcId);
          const data = await apiGetCoQuanTiepNhanByProvince(initProvinceId, linhVucId);

          const optionsAgency = data?.map((_option: any) => ({
            label: _option.Ten,
            value: _option.ID,
          }))
          setListDanhSach(optionsAgency)

          if (initAgencyId) {
            form.setFieldValue('CoQuanTiepNhan_Special', initAgencyId);
          }
        } finally {
          setLoadingAgency(false);
        }
      };
    };

    fetchForEditOrDetail()
}, [modeView, targetTthcId]);


  return (
    <div ref={sectionFourRef}>
      <Row wrap gutter={getGutter as any}>
        <Col {...getColConfig('optionsProvince')}>
          <Form.Item
            colon={false}
            label={optionsProvince.label || ''}
            name={optionsProvince.name || ''}
            rules={[{
              required: optionsProvince.required || false,
              message: 'Vui lòng chọn tỉnh/thành phố',
            }]}
          >
            <Select
              showSearch={showSearch}
              options={provinces as any}
              filterOption={filterOptionSelect}
              onChange={handleSelectProvince}
              suffixIcon={loading.province && <Spin size="small" />}
              placeholder={optionsProvince.placeholder || ''}
              disabled={isDisabled}
              allowClear
            />
          </Form.Item>
          <Form.Item name={`${optionsProvince.name}${DIVIDER_HIDDEN}`} hidden>
            <Input />
          </Form.Item>
          {isAddressWrappedSpecial
          && (
            <>
              <Form.List name="DiaDiem_Special">
                {(fields) => (
                  <div>
                    {fields.map((field) => (
                      <Form.Item {...field} hidden>
                        <Input />
                      </Form.Item>
                    ))}
                  </div>
                )}
              </Form.List>
            </>
          )}
        </Col>
        {isAddressWrappedSpecial && (
          <Col span={12}>
            <Form.Item
              colon={false}
              label={optionsAgency?.label}
              name="CoQuanTiepNhan_Special"
              rules={[{ required: optionsAgency?.required, message: `Vui lòng chọn ${optionsAgency?.label}` }]}
            >
              <Select
                options={listDanhSach}
                placeholder={optionsAgency?.placeholder}
                disabled={isDisabled}
                loading={loadingAgency}
                allowClear
              />
            </Form.Item>
          </Col>
        )}
        {isShowWard && !isAddressWrappedSpecial && (
          <Col {...getColConfig('optionsWard')}>
            <Form.Item
              colon={false}
              label={optionsWard?.label || ''}
              name={optionsWard?.name || ''}
              rules={[{
                required: optionsWard?.required || false,
                message: 'Vui lòng chọn phường/xã',
              }]}
            >
              <Select
                showSearch={showSearch}
                options={wards as any}
                filterOption={filterOptionSelect}
                placeholder={optionsWard?.placeholder || ''}
                disabled={isDisabled}
                suffixIcon={loading.ward && <Spin size="small" />}
                onChange={handleSelectWard}
                allowClear
              />
            </Form.Item>
            <Form.Item name={`${optionsWard?.name}${DIVIDER_HIDDEN}`} hidden>
              <Input />
            </Form.Item>
          </Col>
        )}
        {isShowDetailAddress
        && (
        <Col span={24}>
          <Form.Item
            colon={false}
            label="Thông tin chi tiết"
            name="thongTinChiTiet"
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        )}
      </Row>
    </div>
  );
};

export default FAddress;
export const FAddressWithForm = withForm(FAddress);
