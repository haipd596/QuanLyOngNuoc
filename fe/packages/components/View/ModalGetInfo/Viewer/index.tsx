import { FORM_CONFIG } from '@packages/constants/commons';
import type { DatePickerProps } from 'antd';
import {
  Button, Col, Form, Input, Modal, Row, Tabs,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { TabsProps } from 'antd/lib';
import { useState } from 'react';
import { initFormValuesEmpty, listkeyCty, listkeyPerson } from './constant';
import FrmGetOrganizationInfo from './FrmGetOrganizationInfo';
import FrmGetOrganizationInfoRequest from './FrmGetOrganizationInfoRequest';
import getDataInfo from './getDataInfo';
import './styles.scss';
import {
  FieldType,
  IInfoOrganization,
  IInfoPerson,
  TModalGetInfoBuiderProps,
} from './types';

function formatDate(date: string) {
  return new Date(date.replace(/\//g, ''));
}

function coverDataToForm(
  isPerson: 1 | 0,
  data: IInfoOrganization | IInfoPerson,
) {
  // 1 is person
  if (isPerson) {
    return {
      ENTERPRISE_ID: (data as IInfoPerson).SoCongDan,
      NAME: `${(data as IInfoPerson).CongDan.HoVaTen.Ho} ${
        (data as IInfoPerson).CongDan.HoVaTen.ChuDem
      } ${(data as IInfoPerson).CongDan.HoVaTen.Ten}`,
      ENTERPRISE_GDT_CODE: '',
      IMP_BUSINESS_CODE: '',
      SHORT_NAME: '',
      NAME_F: '',
      ENTERPRISE_TYPE_NAME: '',
      FOUNDING_DATE: '',
      AddressFullText: '',
      CityName: '',
      DistrictName: '',
      ENTERPRISE_STATUS: '',
      WardName: '',
      LEGAL_NAMES: (data as IInfoPerson).CongDan.NoiOHienTai.ChiTiet,
      CAPITAL_AMOUNT: '',
    };
  }
  // 0 is organization

  return {
    ENTERPRISE_ID: (data as IInfoOrganization).ENTERPRISE_ID,
    NAME: (data as IInfoOrganization).NAME,
    ENTERPRISE_GDT_CODE: (data as IInfoOrganization).ENTERPRISE_GDT_CODE,
    IMP_BUSINESS_CODE: formatDate((data as IInfoOrganization).FOUNDING_DATE),
    SHORT_NAME: '',
    NAME_F: '',
    ENTERPRISE_TYPE_NAME: '',
    FOUNDING_DATE: '',
    AddressFullText: `${
      (data as IInfoOrganization).DiaChiTruSoChinh.AddressFullText
    }`,
    CityName: '',
    DistrictName: '',
    ENTERPRISE_STATUS: '',
    WardName: '',
    LEGAL_NAMES: (data as IInfoOrganization).LEGAL_NAMES,
    CAPITAL_AMOUNT: '',
  };
}

const ModalGetInfoViewer: React.FC<TModalGetInfoBuiderProps> = (props) => {
  const { styleWrapperParseFromJsonTree, value, onChange } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selfType] = useState(false);
  const [activeKey, setActiveKey] = useState(1);
  const [initInfoData, setInitInfoData] = useState<FieldType>(initFormValuesEmpty);
  const [form] = useForm();
  // 1 is person
  // 0 is organization
  const isPerson = 0;

  // const onChangeOnlyType: CheckboxProps['onChange'] = (e) => {
  //   setSelfType(e.target.checked);
  // };

  function handleCancel() {
    setIsModalOpen(false);
    setActiveKey(1);
  }

  function onFinishFrmGetOrganizationInfo(values: FieldType) {
    form.setFieldsValue(values);
    onChange(values);
    handleCancel();
  }

  function showModal() {
    setIsModalOpen(true);
  }

  function handleOk() {
    setIsModalOpen(false);
  }

  function nextTab() {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const newActiveKey = activeKey < items!.length ? activeKey + 1 : activeKey;
    setActiveKey(newActiveKey);
  }
  const onFinishFrmGetOrganizationInfoRequest = async (values: {
    id: string;
    fullName?: string;
    dob?: DatePickerProps['format'];
  }) => {
    let data;
    if (isPerson) {
      data = await getDataInfo(
        isPerson,
        values.id,
        values.fullName,
        // @ts-expect-error: should work
        values?.dob?.format('DD/MM/YYYY'),
      );
    } else {
      data = await getDataInfo(isPerson, values.id);
    }

    // @ts-expect-error: should work
    setInitInfoData(coverDataToForm(isPerson, data));
    nextTab();
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '',
      children: (
        <FrmGetOrganizationInfoRequest
          onFinish={onFinishFrmGetOrganizationInfoRequest}
          type={isPerson}
          initNumber={isPerson ? '111111111111' : '0109000304'}
        />
      ),
    },
    {
      key: '2',
      label: '',
      children: (
        <FrmGetOrganizationInfo
          initValue={initInfoData}
          // eslint-disable-next-line react/jsx-no-bind
          onCancel={handleCancel}
          // eslint-disable-next-line react/jsx-no-bind
          onFinish={onFinishFrmGetOrganizationInfo}
          type={isPerson}
        />
      ),
    },
  ];

  // function prevTab() {
  //   const newActiveKey = activeKey > 1 ? items!.length : activeKey - 1;
  //   setActiveKey(newActiveKey);
  // }

  return (
    <div style={styleWrapperParseFromJsonTree}>
      <Row justify="end" style={{ marginBottom: 20 }}>
        {/* <Checkbox
          onChange={onChangeOnlyType}
          style={{ alignItems: 'center', display: 'flex', marginRight: 10 }}
        >
          Không lấy thông tin từ CSDL Doanh nghiệp
        </Checkbox> */}
        <Button
          type="primary"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={showModal}
          disabled={selfType}
        >
          <i className="fa-light fa-pen" />
          <span>Cập nhật từ CSDL Doanh nghiệp</span>
        </Button>
      </Row>
      <Form initialValues={value} form={form} {...FORM_CONFIG}>
        <Row
          className="f-wrapper-form"
          justify="space-between"
          align="middle"
          gutter={[10, 10]}
        >
          {(isPerson ? listkeyPerson : listkeyCty).map((item) => (
            <Col
              xl={12}
              md={12}
              xs={24}
              key={`${isPerson ? 'listkeyPerson' : 'listkeyCty'}-${item.id}`}
            >
              <Form.Item<FieldType>
                label={item.key}
                name={item.value as keyof FieldType}
                vertical
              >
                <Input disabled={!selfType} />
              </Form.Item>
            </Col>
          ))}
        </Row>
      </Form>
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
          Cập nhật từ CSDL Quốc Gia
        </div>
        <div className="f-modal-csdl-quoc-gia__content">
          <Tabs defaultActiveKey="1" items={items} activeKey={`${activeKey}`} />
        </div>
      </Modal>
    </div>
  );
};

export default ModalGetInfoViewer;
