import {
  Progress, Row, Tabs, message,
} from 'antd';
import _isEmpty from 'lodash/isEmpty';
import React, { useEffect, useMemo, useState } from 'react';

import FieldItem from '@packages/main/Forms/FormBase/FieldItem';
import { Field } from '@packages/schema/fields/fieldModel';
import { getFieldsByColumnIndex } from '@packages/utils/fields';
import { isViewMode } from '@packages/utils/viewMode';
import { AnyObject } from 'antd/es/_util/type';
import TabLabel from '../TabLabel';
import '../styles.scss';
import { TFormStepProps } from '../type';
import FormWrapperEachStep from './FormWrapperEachStep';

const FormStepViewer = (props: TFormStepProps) => {
  const {
    fieldsInColumnIndex,
    fields,
    items,
    value,
    onChange,
    isShowProgressBar,
    fieldKey: viewContainerKey,
    callBackFunctionName,
    name: serverPayloadKey,
    modeView,
    ...rest
  } = props;

  const [activeStep, setActiveStep] = useState(0);
  const [tabValues, setTabValues] = useState<AnyObject>(value || {});
  const [visitedSteps, setVisitedSteps] = useState<number[]>([]);

  const isLast = activeStep === items.length - 1;
  const isFirst = activeStep === 0;
  const isAtMiddle = !isLast && !isFirst;

  const handleChange = (allValuesChange: AnyObject) => {
    setTabValues((prev: any) => {
      const newValues = ({
        ...prev,
        [activeStep]: {
          ...prev[activeStep],
          ...allValuesChange,
        },
      });

      onChange(newValues);
      return newValues;
    });
  };

  const handleNext = (valueInTab: AnyObject) => {
    if (_isEmpty(valueInTab)) return;

    if (isLast) {
      try {
        // eslint-disable-next-line no-eval
        eval(`${callBackFunctionName}(${JSON.stringify({ [serverPayloadKey]: value })})`);
      } catch (error: any) {
        message.error(error?.message || 'Đã có lỗi xảy ra');
      }
      return;
    }

    setActiveStep((prev) => {
      setVisitedSteps((prevSteps) => [...prevSteps, prev]);
      prev += 1;
      return prev;
    });
  };

  const handleBack = () => {
    setActiveStep((prev) => {
      prev -= 1;
      setVisitedSteps((prevSteps) => prevSteps.filter((_step, index) => index !== prev));
      return prev;
    });
  };

  // Get style from props
  const { stylesPropsParseFromJsonTree } = props;

  const transitionStyle = {
    transition: 'all 0.2s ease-in-out',
  };

  const {
    stepButtonColor,
    stepButtonTextColor,
    progressBar: strokeColor,
    trailColor,
    height,
    underlineTabColor,
    colorAfter,
    hideLabel,
    hideIcon,
    ...restStyle
  } = stylesPropsParseFromJsonTree;

  const fieldContainer = useMemo(() => (
    getFieldsByColumnIndex(fields, fieldsInColumnIndex)
  ), [fields, fieldsInColumnIndex]);

  const itemFields = items?.map((item, index) => ({
    ...item,
    key: String(index),
    label: (
      <TabLabel
        index={index}
        label={item.label}
        hideLabel={hideLabel}
        hideIcon={hideIcon}
        stepOrderStyle={{
          backgroundColor: visitedSteps.includes(index) ? colorAfter : stepButtonColor,
          color: stepButtonTextColor,
          ...transitionStyle,
          ...restStyle,
        }}
        visitedSteps={visitedSteps}
      />
    ),
    disabled: isViewMode(modeView),
    children: (
      <FormWrapperEachStep
        value={tabValues[activeStep]}
        onNext={handleNext}
        onBack={isLast || isAtMiddle ? handleBack : undefined}
        onChange={handleChange}
        isLast={isLast}
      >
        <>
          {
            isShowProgressBar && (
              <Progress
                percent={((index + 1) / items.length) * 100}
                showInfo={false}
                strokeColor={strokeColor}
                trailColor={trailColor}
                strokeLinecap="square"
                className="border_progressBar hidden-in-details"
                // @ts-expect-error: [ts] Property 'size' does not exist on type 'ProgressProps'.
                size={[undefined, height]}
              />
            )
          }
          <Row justify="start" gutter={[20, 0]}>
            {fieldContainer.map((field, fieldIndex) => {
              if (field && field?.columnIndex === activeStep) {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                const { columnIndex, ...item } = field;

                return (
                  // Display Each Field Items
                  <FieldItem
                    field={item as Field<any>}
                    fieldIndex={fieldIndex}
                    modeView={modeView}
                    key={field?.key}
                    fields={fields}
                  />
                );
              }

              return null;
            })}
          </Row>
        </>
      </FormWrapperEachStep>
    ),
  }));

  // [x] Allow user to change active tab border colour
  useEffect(() => {
    // Active Tab Color
    document.documentElement.style.setProperty('--active-indicator-color', underlineTabColor);

    // const inkBarElement = document.getElementsByClassName('ant-tabs-ink-bar')[1] as HTMLElement;

    // if (inkBarElement) {
    //   inkBarElement.style.backgroundColor = underlineTabColor; // This might cause a bug
    // }
  }, [stylesPropsParseFromJsonTree]);

  return (
    <Tabs
      className="form-step"
      moreIcon={<span />}
      destroyInactiveTabPane
      activeKey={String(activeStep)}
      onChange={(_value) => setActiveStep(Number(_value))}
      items={itemFields}
      centered
      {...rest}
    />
  );
};

export default FormStepViewer;
