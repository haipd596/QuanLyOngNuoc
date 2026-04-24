import IconWrapper from '@packages/components/IconWrapper';
import ViewDatePickerWithVnFormat from '@packages/components/ViewDate/ViewDatePickerWithVnFormat';
import { DATE_FORMAT } from '@packages/constants/date';
import { DEPENDENCE_FIELDS } from '@packages/constants/fields';
import { buildDisplayForHiddenField } from '@packages/utils';
import { observableRangPicker } from '@packages/utils/observable';
import {
  Col, DatePicker, DatePickerProps, Form, Row,
} from 'antd';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { generateFieldName } from '../../InputUnit/Viewer/util';
import './styles.scss';

export type IOptions = {
  label: React.ReactNode;
  name: string;
  placeholder: string;
  initialValue?: string;
  errorMessage?: string;
  isCheckCurrentDate?: boolean;
  isCheckGreaterThanDate?: boolean;
  maxYearDiff?: number | undefined
};

export type ViewRangePickerProps = {
  nameStartDate: IOptions;
  nameEndDate: IOptions;
  typeOfDate?: string;
  onOk?: (value: DatePickerProps['value']) => void;
  gutter?: any;
  configSpan?: any;
  isRequired?: boolean,
  fields: any
};

const RangepickerViewer:React.FC<ViewRangePickerProps> = ({ fields, ...props }) => {
  const form = useFormInstance();
  const [countToDeadline, setCountToDeadline] = useState<number | null>(null);
  const [selectUnit, setSelectUnit] = useState<string | null>(null);
  const {
    nameStartDate: optionStartDate,
    nameEndDate: optionsEndDate,
    typeOfDate,
    onOk,
    gutter,
    configSpan,
    isRequired,
  } = props;

  const startDateNameDisplay = useMemo(() => (
    buildDisplayForHiddenField(optionStartDate.name)
  ), [optionStartDate.name]);

  const endDateNameDisplay = useMemo(() => (
    buildDisplayForHiddenField(optionsEndDate.name)
  ), [optionsEndDate.name]);

  const isDisabledEndDate = useMemo(() => {
    return _.some((field: any) => {
      return DEPENDENCE_FIELDS.includes(_.get(field, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', ''));
    });
  }, [fields]);

  const watchValueStartDate = Form.useWatch(startDateNameDisplay);

  useEffect(() => {
    if (_.isNumber(countToDeadline) && _.isString(selectUnit)) {
      const currentStartValue = watchValueStartDate;
      if (currentStartValue) {
        let calculatedEndDate;
        if (selectUnit === 'Năm') {
          calculatedEndDate = dayjs(currentStartValue).add(countToDeadline, 'year');
        } else if (selectUnit === 'Ngày') {
          calculatedEndDate = dayjs(currentStartValue).add(countToDeadline, 'day');
        } else if (selectUnit === 'Tháng') {
          calculatedEndDate = dayjs(currentStartValue).add(countToDeadline, 'month');
        }

        if (calculatedEndDate) {
          form.setFieldValue(endDateNameDisplay, calculatedEndDate);
        }
      }
    }
  }, [countToDeadline, selectUnit, watchValueStartDate]);

  useEffect(() => {
    DEPENDENCE_FIELDS.forEach((key) => {
      observableRangPicker.subscribe(key, (values: any) => {
        setCountToDeadline(_.get(values, generateFieldName(key, 'input')));
        setSelectUnit(_.get(values, generateFieldName(key, 'select')));
      });
    });

    return () => {
      DEPENDENCE_FIELDS.forEach((key) => {
        observableRangPicker.unsubscribe(key);
      });
    };
  }, [endDateNameDisplay]);

  const getGutter = () => {
    if (gutter) {
      return [gutter[0].gutterX, gutter[0].gutterY];
    }
    return [];
  };

  useEffect(() => {
    const startDate = form.getFieldValue(startDateNameDisplay);
    const endDate = form.getFieldValue(endDateNameDisplay);

    form.setFieldsValue({
      [startDateNameDisplay]: startDate || '',
      [endDateNameDisplay]: endDate || '',
    });
  }, [startDateNameDisplay, endDateNameDisplay]);

  return (
    <Row wrap gutter={getGutter() as any} className="rowTwoDatePicker">
      <Col span={configSpan} className="colStartDate">
        <Form.Item
          label={optionStartDate?.label || ''}
          name={startDateNameDisplay}
          getValueProps={(value) => ({ value: value && dayjs(value) })}
          normalize={(value) => value && value.format(DATE_FORMAT.YYYY_MM_DD)}
          dependencies={[startDateNameDisplay]}
          rules={[
            ...(isRequired
              ? [
                {
                  required: true,
                  message: optionStartDate.errorMessage,
                },
              ]
              : []),
            ({ getFieldValue }) => ({
              validator(_test, value) {
                const endDate = getFieldValue(endDateNameDisplay);
                const today = dayjs();

                if (!value) {
                  return Promise.resolve();
                }

                if (endDate && dayjs(value).isAfter(dayjs(endDate), 'day')) {
                  return Promise.reject(
                    new Error(`${optionStartDate.label} không được lớn hơn ${optionsEndDate.label}!`),
                  );
                }

                if (optionStartDate.isCheckCurrentDate && dayjs(value).isAfter(today, 'day')) {
                  return Promise.reject(
                    new Error(`${optionStartDate.label} không được lớn hơn ngày hiện tại!`),
                  );
                }

                if (optionStartDate.isCheckGreaterThanDate && dayjs(value).isBefore(today, 'day')) {
                  return Promise.reject(
                    new Error(`${optionStartDate.label} không được nhỏ hơn ngày hiện tại!`),
                  );
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <DatePicker
            placeholder={optionStartDate?.placeholder || ''}
            format={typeOfDate}
            onOk={onOk}
            suffixIcon={(
              <IconWrapper icon={<i className="fa-sharp fa-solid fa-calendar-days" />} />
            )}
            allowClear={{
              clearIcon: (
                <IconWrapper icon={<i className="fa-solid fa-xmark" />} />
              ),
            }}
            className="startDate theme-dvc"
          />
        </Form.Item>
        <Form.Item name={optionStartDate.name} hidden>
          <ViewDatePickerWithVnFormat parentName={startDateNameDisplay} />
        </Form.Item>
      </Col>
      <Col span={configSpan} className="colEndDate">
        <Form.Item
          label={optionsEndDate?.label || ''}
          name={endDateNameDisplay}
          getValueProps={(value) => ({ value: value && dayjs(value) })}
          normalize={(value) => (value && value.format(DATE_FORMAT.YYYY_MM_DD))}
          dependencies={[endDateNameDisplay]}
          rules={[
            ...(isRequired
              ? [
                {
                  required: true,
                  message: optionsEndDate.errorMessage,
                },
              ]
              : []),
            ({ getFieldValue }) => ({
              validator(_test, value) {
                const startDate = getFieldValue(startDateNameDisplay);
                const today = dayjs();

                if (!value) {
                  return Promise.resolve();
                }

                if (startDate && dayjs(value).isBefore(dayjs(startDate), 'day')) {
                  return Promise.reject(
                    new Error(`${optionsEndDate.label} phải lớn hơn ${optionStartDate.label}!`),
                  );
                }

                if (
                  startDate
                  && optionsEndDate?.maxYearDiff != null
                  && dayjs(value).diff(dayjs(startDate), 'year', true) > optionsEndDate.maxYearDiff
                ) {
                  return Promise.reject(
                    new Error(`${optionsEndDate.label} không được cách ${optionStartDate.label} quá ${optionsEndDate.maxYearDiff} năm!`),
                  );
                }

                if (optionsEndDate.isCheckCurrentDate && dayjs(value).isAfter(today, 'day')) {
                  return Promise.reject(
                    new Error(`${optionsEndDate.label} không được lớn hơn ngày hiện tại!`),
                  );
                }

                if (optionsEndDate.isCheckGreaterThanDate && dayjs(value).isBefore(today, 'day')) {
                  return Promise.reject(
                    new Error(`${optionsEndDate.label} không được nhỏ hơn ngày hiện tại!`),
                  );
                }

                return Promise.resolve();
              },
            }),
          ]}

        >
          <DatePicker
            placeholder={optionsEndDate?.placeholder || ''}
            format={typeOfDate}
            onOk={onOk}
            suffixIcon={(
              <IconWrapper icon={<i className="fa-sharp fa-solid fa-calendar-days" />} />
            )}
            allowClear={{
              clearIcon: (
                <IconWrapper icon={<i className="fa-solid fa-xmark" />} />
              ),
            }}
            className="endDate theme-dvc"
            disabled={isDisabledEndDate}
            // disabledDate={(currentDate) => {
            //   const startDate = form.getFieldValue(startDateNameDisplay);
            //   const today = dayjs();

            //   if (optionsEndDate.isCheckCurrentDate) {
            //     if (startDate) {
            //       return (
            //         currentDate.isBefore(dayjs(startDate), 'day')
            //         || currentDate.isAfter(today, 'day')
            //       );
            //     }
            //     return currentDate.isAfter(today, 'day');
            //   }

            //   if (startDate) {
            //     return currentDate.isBefore(dayjs(startDate), 'day');
            //   }
            //   return false;
            // }}
          />
        </Form.Item>
        <Form.Item name={optionsEndDate.name} hidden>
          <ViewDatePickerWithVnFormat parentName={endDateNameDisplay} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default RangepickerViewer;
