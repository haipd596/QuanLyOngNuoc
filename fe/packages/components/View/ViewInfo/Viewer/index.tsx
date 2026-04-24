import {
  Button, Col, DatePickerProps, Form, Input, message, Modal, Row,
  Tabs,
} from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { FORM_CONFIG } from '@packages/constants/commons';
import { DATE_FORMAT } from '@packages/constants/date';
import { apiGetInfoCitizenFromCSDL } from '@packages/dvc-service/apiGetInfoCitizenFromCSDL';
import { apiGetInfoOrgFromCSDL } from '@packages/dvc-service/apiGetInfoOrgFromCSDL';
import { useFetchBaseLogin } from '@packages/hooks';
import { formManagers } from '@packages/utils/formManager';
import { isDetailsMode, isViewMode } from '@packages/utils/viewMode';
import { TabsProps } from 'antd/lib';
import dayjs from 'dayjs';
import _get from 'lodash/get';
import { useAppSelector } from '~/redux/hooks';
import { selectFormDataInit } from '~/redux/slices';
import { TAsyncViewInfoProps } from '../type';
import { listkeyCaNhan, listkeyToChuc } from './constant';
import FormRequestCSDL from './FormRequestCSDL';
import FormShowResultsCSDL from './FormShowResultsCSDL';
// import { message as antdMessage } from 'antd';
import './style.scss';

const ViewerInfo: React.FC<TAsyncViewInfoProps> = (props) => {
  const {
    onChange,
    modeView,
    fieldKey,
    value,
  } = props;
  const { typeUser, loading } = useFetchBaseLogin();
  const [listKeyValueInViewInfo, setListKeyValueInViewInfo] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [dataSource, setDataSource] = useState<any>({});
  const [dataFromCSDL, setDataFromCSDL] = useState({});
  const formData = useAppSelector(selectFormDataInit);
  // const ref = useRef<FormInstance>();
  const [form] = Form.useForm();

  const {
    isPerson, isOrganization,
  } = typeUser;

  console.log("FORM DATA::", formData, typeUser)
  useEffect(() => {
    // get data from init data and transform
    const thongTinChung = _.get(formData, 'ThongTinChung', {});
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
            acc[cur.value] = thongTinChung[cur.serverPayloadKey];
            if(cur.valueCSDL){
              acc[cur.valueCSDL] = thongTinChung[cur.serverPayloadKey];
            }
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

  const onFinishFrmGetOrganizationInfoRequest = async (values: {
    id: string;
    fullName?: string;
    dob?: DatePickerProps['value'];
  }) => {
    try {
      let data: any = {};
      if (isPerson) {
        data = await apiGetInfoCitizenFromCSDL({
          id: values.id,
          name: values.fullName,
          dob: values?.dob?.format('MM/DD/YYYY'),
        });

        const { ChuDem, Ho, Ten } = _get(data, 'HoVaTen', {});
        const SoDinhDanh = _get(data, 'SoDinhDanh.#text.__text', '');
        const HoVaTen = `${_.get(Ho, '#text.__text') || ''} ${_.get(ChuDem, '#text.__text') || ''} ${_get(Ten, '#text.__text') || ''}`.trim();
        const ChiTiet = _get(data, 'QueQuan.#text.__text', '');

        data = {
          ...data,
          HoVaTen,
          QueQuan: ChiTiet,
          SoDinhDanh,
        };
      }

      if (isOrganization) {
        data = await apiGetInfoOrgFromCSDL(values.id);
        // Lấy data mới nhất từ API quốc gia trả về

        // Địa chỉ
        const AddressFullText = _get(data, 'HOAdress.AddressFullText', '');
        // Người đại diện
        const nameOfRepresentative = _get(data, 'Representatives.FULL_NAME', '');

        const mainInfo = _get(data, 'MainInformation', {});

        data = {
          AddressFullText,
          NguoiDaiDien: nameOfRepresentative,
          ...mainInfo,
        };
      }
      setDataFromCSDL(data);
      setActiveKey('2');
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '',
      children: (
        <FormRequestCSDL
          onFinish={onFinishFrmGetOrganizationInfoRequest}
          isPerson={isPerson}
          isOrganization={isOrganization}
          currentUser={typeUser}
        />
      ),
    },
    {
      key: '2',
      label: '',
      children: (
        <FormShowResultsCSDL
          initValue={{ ...dataSource, ...dataFromCSDL }}
          listKey={listKeyValueInViewInfo}
          onFinish={() => {
            setDataSource({ ...dataSource, ...dataFromCSDL });
            setIsModalOpen(false);
          }}
          onCancel={() => {
            setIsModalOpen(false);
            setDataSource(typeUser);
          }}
        />
      ),
    },
  ];

  function showModal() {
    setIsModalOpen(true);
  }

  function handleOk() {
    setIsModalOpen(false);
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

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
        const {
          value: _valueDatabaseLocal, serverPayloadKey, valueCSDL,
        } = cur;

        let fieldValue = _.get(dataSource, valueCSDL, '') || _.get(dataSource, _valueDatabaseLocal, '');

        if (!isDetailsMode(modeView) && serverPayloadKey === 'NgayCap' && fieldValue) {
          fieldValue = dayjs(fieldValue).format(DATE_FORMAT.DD_MM_YYYY);
        }

        acc[serverPayloadKey] = fieldValue;
        return acc;
      }, {} as AnyObject);
      form.setFieldsValue({ ...value, ...data });
      onChange(data);
      if (!data.DienThoaiDiDongNguoiNop || !data.EmailNguoiNop || !data.DiaChiThuongTruNguoiNop) {
        form.validateFields(['DienThoaiDiDongNguoiNop', 'EmailNguoiNop', 'DiaChiThuongTruNguoiNop']);
      }
    }
  }, [listKeyValueInViewInfo, dataSource]);

  const fieldGroups = useMemo<string[][]>(() => {
    if (dataSource.isPerson) {
      return [
        // 1 hàng: Họ và tên
        ['HoTenNguoiNopHoSo'],
        // 1 hàng: CMND, Ngày cấp, Nơi cấp
        ['CMNDNguoiNopHoSo', 'NgayCap', 'NoiCap'],
        // 1 hàng: SĐT, Email, Fax
        ['DienThoaiDiDongNguoiNop', 'EmailNguoiNop', 'Fax'],
        // 1 hàng: Địa chỉ
        ['DiaChiThuongTruNguoiNop'],
      ];
    }
    if (dataSource.isOrganization) {
      return [
        // 1 hàng: Tên tổ chức
        ['HoTenNguoiNopHoSo'],
        // 1 hàng: MST, GPĐKKD/QĐ thành lập
        ['MaSoThue', 'Ma_So_Doanh_Nghiep'],
        // 1 hàng: Ngày cấp, Nơi cấp
        ['NgayCap', 'NoiCap'],
        // 1 hàng: SĐT, Email, Fax
        ['DienThoaiDiDongNguoiNop', 'EmailNguoiNop', 'Fax'],
        // 1 hàng: Địa chỉ, Người đại diện, Chức vụ
        ['DiaChiThuongTruNguoiNop', 'NguoiDaiDien', 'ChucVu'],
        // 1 hàng: Người đại diện, Chức vụ
        // ['NguoiDaiDien', 'ChucVu'],
      ];
    }
    return [];
  }, [dataSource.isPerson, dataSource.isOrganization]);

  const title = isPerson ? 'Cập nhật từ CSDL Quốc Gia về Dân cư' : 'Cập nhật từ CSDL Doanh nghiệp ';

  if (loading) return <p>Loading...</p>;

  if (
    !_.isObject(dataSource)
    || _.isEmpty(listKeyValueInViewInfo)
  ) return null;

  const handleSubFormChange = () => {
    const subFormValues = form.getFieldsValue();
    onChange(subFormValues);
  };

  return (
    <div id={fieldKey} style={{ paddingInline: '20px' }}>
      <Form.Provider>
        <Form
          form={form}
          onValuesChange={handleSubFormChange}
          initialValues={value}
          {...FORM_CONFIG}
          requiredMark={false}
          ref={(node: any) => {
            // if (!ref.current) {
            //   formManagers.add({
            //     [fieldKey]: node,
            //   });
            //   ref.current = node;
            // }
            if (node && node !== formManagers.items[fieldKey]) {
              formManagers.items[fieldKey] = node;
            }
          }}
        >
          <Row className="wrapper-viewer-info" justify="space-between" gutter={[0, 0]}>
            {isViewMode(modeView) ? (
              <Col span={24} style={{ textAlign: 'end' }}>
                <Button
                  type="primary"
            // eslint-disable-next-line react/jsx-no-bind
                  onClick={showModal}
                >
                  <i className="fa-light fa-pen" />
                  <span>{title}</span>
                </Button>
              </Col>
            ) : null}
            {/* {listKeyValueInViewInfo.map(({
              key, serverPayloadKey,
            }: any, index: number) => {
              return (
                <Col key={index} xl={12} md={12} xs={24}>
                  <Row justify="start">
                    <Col xl={23} md={23} xs={23}>
                      <Form.Item
                        style={{ marginBottom: 0 }}
                        label={key}
                        name={serverPayloadKey}
                        rules={
                      ['EmailNguoiNop',
                      'DienThoaiDiDongNguoiNop',
                      'DiaChiThuongTruNguoiNop'].includes(serverPayloadKey)
                        ? [
                          { required: true,
                           message: 'Vui lòng cập nhật trong trang cập nhật thông tin tài khoản!' },
                          // {
                          //   validator: (_, val) => {
                          //     if (!val) {
                          //       antdMessage.error(
                          //         <>
                          //           {key}
                          //           {' '}
                          //           là bắt buộc.
                          //           Vui lòng cập nhật trong trang cập nhật thông tin tài khoản
                          //           {' '}
                          //           <a href="https://link-cua-ban" target="_blank" rel="noopener noreferrer">
                          //             tại đây
                          //           </a>
                          //           !
                          //         </>,
                          //       );
                          //       return Promise.reject(new Error('Trường bắt buộc'));
                          //     }
                          //     return Promise.resolve();
                          //   },
                          // },
                          {
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            validator: async (_, val) => {
                              if (serverPayloadKey === 'EmailNguoiNop' && val) {
                                const emailRegex = /[^@]{2,64}@[^.]{2,253}\.[0-9a-z-.]{2,63}/;
                                if (!emailRegex.test(val.trim())) {
                                  return Promise.reject(new Error('Email không hợp lệ'));
                                }
                              }
                              if (serverPayloadKey === 'DienThoaiDiDongNguoiNop' && val) {
                                const phoneRegex = /^(84|0[2|3|5|7|8|9])+([0-9]{8})\b/;
                                if (!phoneRegex.test(val.trim())) {
                                  return Promise.reject(new Error('Số điện thoại không hợp lệ'));
                                }
                              }
                              return Promise.resolve();
                            },
                          },
                        ]
                        : []
                    }
                      >
                        <Input
                          style={{ color: 'black', resize: 'none' }}
                          // disabled={!['DienThoaiDiDongNguoiNop'].includes(serverPayloadKey)}
                          disabled
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>

              );
            })} */}
            {fieldGroups.map((group, rowIndex) => {
              const span = 24 / group.length;

              return (
                <Row gutter={[0, 0]} key={rowIndex} style={{ width: '100%' }}>
                  {
                    group.map((serverPayloadKey: any) => {
                      const targetKey = listKeyValueInViewInfo.find(
                        (item: any) => item.serverPayloadKey === serverPayloadKey,
                      );
                      if (!targetKey) return null;

                      const rules = ['EmailNguoiNop', 'DienThoaiDiDongNguoiNop', 'DiaChiThuongTruNguoiNop'].includes(targetKey.serverPayloadKey)
                        ? [
                          { required: true, message: 'Vui lòng cập nhật trong trang cập nhật thông tin tài khoản!' },
                          {
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            validator: async (_: any, val: any) => {
                              if (targetKey.serverPayloadKey === 'EmailNguoiNop' && val) {
                                const emailRegex = /[^@]{2,64}@[^.]{2,253}\.[0-9a-z-.]{2,63}/;
                                if (!emailRegex.test(val.trim())) {
                                  return Promise.reject(new Error('Email không hợp lệ'));
                                }
                              }
                              if (targetKey.serverPayloadKey === 'DienThoaiDiDongNguoiNop' && val) {
                                const phoneRegex = /^(84\d{8,13}|0\d{9,14})$/;
                                if (!phoneRegex.test(val.trim())) {
                                  return Promise.reject(new Error('Số điện thoại không hợp lệ'));
                                }
                              }
                              return Promise.resolve();
                            },
                          },
                        ] : [];

                      return (
                        <Col key={targetKey.serverPayloadKey} lg={24} xl={span} md={24} xs={24}>
                          <Form.Item
                            label={targetKey.key}
                            name={targetKey.serverPayloadKey}
                            style={{ marginBottom: 0 }}
                            rules={rules}
                            className="test_123"
                          >
                            <Input
                              // disabled
                              style={{ color: 'black', resize: 'none' }}
                            />
                          </Form.Item>
                        </Col>
                      );
                    })
                  }
                </Row>
              );
            })}
            <Modal
              title={false}
              footer={null}
              open={isModalOpen}
            // eslint-disable-next-line react/jsx-no-bind
              onOk={handleOk}
            // eslint-disable-next-line react/jsx-no-bind
              onCancel={handleCancel}
              className="f-modal-csdl-quoc-gia f-modal-csdl-quoc-gia-wrap"
              width={1200}
            >
              <div className="f-modal-csdl-quoc-gia__title">
                {title}
              </div>
              <div className="f-modal-csdl-quoc-gia__content">
                <Tabs defaultActiveKey="1" items={items} activeKey={`${activeKey}`} />
              </div>
            </Modal>
          </Row>
        </Form>
      </Form.Provider>
    </div>
  );
};

export default ViewerInfo;
