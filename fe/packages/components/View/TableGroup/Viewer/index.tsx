import {
  Checkbox, Col, Form, Row,
} from 'antd';
import { useWatch } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React from 'react';
import en from '../locales/en/table-en.json';
import vi from '../locales/vi/table-vi.json';
import '../styles.scss';
import { LanguageProviderForIndividual, Translations, useLanguageForIndividual } from './LanguageSwitcherForIndividuals';
import { SUBSTANCE_FIELD, SUBSTANCE_FIELD_NAME } from './options';
import './styles.scss';
import Table1 from './Table1';
import Table2 from './Table2';
import Table3 from './Table3';
import Table4 from './Table4';
import TransformCheckboxData from './TransformCheckboxData';
import TransformTableData from './TransformTableData';
import TransformTableDataTable3 from './TransformTableDataTable3';
import { TTableProps } from './type';

export interface TableGroupProps extends TTableProps {
  languages?: string
}

export const TableGroupViewer : React.FC<TableGroupProps> = () => {
  const { translations } = useLanguageForIndividual();

  const substances:string[] = useWatch('substances') || [];

  // Table 1
  const displayFirstTable = substances.some((result) => [
    SUBSTANCE_FIELD_NAME.CHECKBOX_1,
    SUBSTANCE_FIELD_NAME.CHECKBOX_2,
    SUBSTANCE_FIELD_NAME.CHECKBOX_3,
  ].includes(result));

  // Table 2
  const displaySecondTable = substances.some((result) => [
    SUBSTANCE_FIELD_NAME.CHECKBOX_4,
    SUBSTANCE_FIELD_NAME.CHECKBOX_5,
  ].includes(result));

  // Table 3
  const displayThirdTable = substances.some((result) => [
    SUBSTANCE_FIELD_NAME.CHECKBOX_6,
    SUBSTANCE_FIELD_NAME.CHECKBOX_7,
  ].includes(result));

  // Table 4
  const displayFourthTable = substances.some((result) => [
    SUBSTANCE_FIELD_NAME.CHECKBOX_8,
  ].includes(result));

  const hiddenStyle = (isShow: boolean) => ({ style: { display: isShow ? 'block' : 'none' } });

  return (
    <div className="container_tablegroup">
      <div>
        <p className="main_title_a">
          {translations.title_a}
        </p>
        <p className="subtitle_a">{translations.title_a_notice}</p>
      </div>
      <Form.Item name="substances">
        <TransformCheckboxData>
          <Checkbox.Group>
            <Row gutter={[0, 8]} style={{ marginBottom: '20px' }}>
              {SUBSTANCE_FIELD.map((option) => (

                <Col span={24} key={option.value}>

                  <Checkbox value={option.value}>
                    {translations[option.label as keyof Translations]}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </TransformCheckboxData>
      </Form.Item>

      <div>
        <p className="main_title_b">
          {translations.title_b}
        </p>
        <p className="subtitle_b">
          {translations.title_b_notice}
        </p>
      </div>
      <div {...hiddenStyle(displayFirstTable)}>
        <p className="table-title">
          {translations.title_table_1_1}
        </p>
        <FormItem name="table1">
          <TransformTableData>
            <Table1 />
          </TransformTableData>
        </FormItem>
        <p style={{ marginLeft: 20 }}>
          {translations.des_table_1_1}
        </p>
      </div>
      <div {...hiddenStyle(displaySecondTable)}>
        <p className="table-title">
          {translations.title_table_1_2}
        </p>
        <FormItem name="table2">
          <TransformTableData>
            <Table2 />
          </TransformTableData>
        </FormItem>
        <p style={{ marginLeft: 20 }}>
          {translations.des_table_1_2}
        </p>
      </div>
      <div {...hiddenStyle(displayThirdTable)}>
        <p className="table-title">
          {translations.title_table_1_3}
        </p>
        <FormItem name="table3">
          <TransformTableDataTable3>
            <Table3 />
          </TransformTableDataTable3>
        </FormItem>
        <p style={{ marginLeft: 20 }}>
          {translations.des_table_1_3}
        </p>
      </div>
      <div {...hiddenStyle(displayFourthTable)}>
        <p className="table-title">
          {translations.title_table_1_4}
        </p>
        <FormItem name="table4">
          <TransformTableData>
            <Table4 />
          </TransformTableData>
        </FormItem>
        <p style={{ marginLeft: 20 }}>
          {translations.des1_table_1_4}
        </p>
        <p style={{ marginLeft: 20 }}>
          {translations.des2_table_1_4}
        </p>
      </div>
    </div>
  );
};

export default ({ languages, ...props }: any) => (
  <LanguageProviderForIndividual lng={languages} translationsVi={vi} translationsEn={en}>
    <TableGroupViewer {...props} />
  </LanguageProviderForIndividual>
);
