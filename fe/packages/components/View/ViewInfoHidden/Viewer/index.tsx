import {
  Col, Form, Input, Row,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { DATE_FORMAT } from '@packages/constants/date';
import { useFetchBaseLogin } from '@packages/hooks';
// import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { FORM_CONFIG } from '@packages/constants/commons';
import { formManagers } from '@packages/utils/formManager';
import { FormInstance } from 'antd/lib';
import dayjs from 'dayjs';
import { useAppSelector } from '~/redux/hooks';
import {
  selectFormDataInit,
} from '~/redux/slices';
import { TAsyncViewInfoProps } from '../../ViewInfo/type';
import { listkeyCaNhan, listkeyToChuc } from './constant';
import './style.scss';

const ViewInfoHiddenViewer: React.FC<TAsyncViewInfoProps> = (props) => {
  const {
    onChange = () => {}, value, fieldKey,
  } = props;
  const { typeUser, loading } = useFetchBaseLogin();
  const [listKeyValueInViewInfo, setListKeyValueInViewInfo] = useState<any>([]);
  const [dataSource, setDataSource] = useState<any>({});
  const formData = useAppSelector(selectFormDataInit);
  // const isDuThao = useAppSelector(selectIsDuThao);
  const ref:any = useRef<FormInstance>(null);
  // const form = useFormInstance();

  const [form] = Form.useForm();

  const {
    isPerson, isOrganization,
  } = typeUser;

  useEffect(() => {
    if (!typeUser && _.isEmpty(formData)) return; 
    // get data from init data and transform
    const thongTinChung = _.get(formData, 'ThongTinChung_BoSung', {});
    if (!_.isEmpty(thongTinChung)) {
      let listKey: any = [];
      if (isPerson) {
        listKey = listkeyCaNhan;
      }

      if (isOrganization) {
        listKey = listkeyToChuc;
      }

      setDataSource(
        {
          ...listKey.reduce((acc: any, cur: any) => {
            acc[cur.valueCSDL] = thongTinChung[cur.serverPayloadKey];
            acc[cur.value] = thongTinChung[cur.serverPayloadKey];
            return acc;
          }, {}),
          isOrganization,
          isPerson,
        },
      );
    } else if (typeUser) { // or saved current user by api
      setDataSource(typeUser);
    }
  }, [typeUser, formData]);

  useEffect(() => {
    if (dataSource.isOrganization) {
      setListKeyValueInViewInfo(listkeyToChuc);
      // setActiveKey(1);
    }

    if (dataSource.isPerson) {
      setListKeyValueInViewInfo(listkeyCaNhan);
      // setActiveKey(2);
    }
  }, [dataSource]);

  useEffect(() => {
    if (!_.isEmpty(dataSource)) {
      const data = listKeyValueInViewInfo.reduce((acc: any, cur: any) => {
        const { value: _valueDatabaseLocal, serverPayloadKey, valueCSDL } = cur;

        let fieldValue = _.get(dataSource, valueCSDL, '') || _.get(dataSource, _valueDatabaseLocal, '');

        if (serverPayloadKey === 'CaNhan_ToChuc_NgayCap' && fieldValue) {
          fieldValue = dayjs(fieldValue).format(DATE_FORMAT.DD_MM_YYYY);
        }

        acc[serverPayloadKey] = fieldValue;
        return acc;
      }, {} as AnyObject);

      form.setFieldsValue({ ...value, ...data });

      onChange(data);
    }
  }, [listKeyValueInViewInfo, dataSource]);

  const handleSubFormChange = () => {
    const subFormValues = form.getFieldsValue();
    onChange(subFormValues);
  };

  // console.log({ value }, 'fasdfasdf', listKeyValueInViewInfo);

  if (loading) return <p>Loading...</p>;

  if (
    !_.isObject(dataSource)
    || _.isEmpty(listKeyValueInViewInfo)
  ) return null;

  return (
    <div id={fieldKey} style={{ display: 'none' }}>
      <Form
        form={form}
        onValuesChange={handleSubFormChange}
        initialValues={value}
        {...FORM_CONFIG}
        ref={(node: any) => {
          if (!ref.current) {
            formManagers.add({
              [fieldKey]: node,
            });
            ref.current = node;
          }
        }}
      >
        <Row className="wrapper-viewer-info-hidden" justify="space-between" align="middle" gutter={[10, 10]}>
          {listKeyValueInViewInfo.map(({
            key, serverPayloadKey,
          }: any, index: number) => (
            // const _value = getInputValues(dataSource, indexValue, valueCSDL, serverPayloadKey);

            <Col
              key={index}
              xl={12}
              md={12}
              xs={24}
            >
              <Row justify="start">
                <Col xl={23} md={23} xs={23}>
                  <Form.Item
                    label={key}
                    name={serverPayloadKey}
                  >
                    <Input
                      style={{ color: 'black', resize: 'none' }}
                      disabled={!['CaNhan_ToChuc_EmailNguoiNop', 'CaNhan_ToChuc_Fax', 'CaNhan_ToChuc_SoDienThoai', 'CaNhan_ToChuc_DiaChi'].includes(serverPayloadKey)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Form>
    </div>
  );
};

export default ViewInfoHiddenViewer;
