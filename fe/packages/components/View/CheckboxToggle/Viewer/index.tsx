import DelayRender from '@packages/components/DelayRender';
import { Field, IField } from '@packages/schema/fields/fieldModel';
import { getFieldsByColumnIndex } from '@packages/utils/fields';
import { Row } from 'antd';
import _get from 'lodash/get';
import { useMemo } from 'react';
import CheckBoxWrapper from './CheckBoxWrapper';

type TViewCheckboxToggleProps = {
  fieldsInColumnIndex: IField['fieldsInColumnIndex'],
  fields: Field[],
  fieldKey: string,
  isFullWidth: boolean,
  modeView: string,
  checkboxToggleServerPayloadKey: string,
  labelPosition?: 'left' | 'right',
  enableMutualExclusion?: boolean,
  groupName?: string;
};

const ViewCheckboxToggle = (props: TViewCheckboxToggleProps) => {
  const {
    fields,
    isFullWidth,
    fieldsInColumnIndex,
    modeView,
    labelPosition,
    checkboxToggleServerPayloadKey,
    enableMutualExclusion,
    groupName,
  } = props;
  const fieldInToggle = useMemo(() => {
    return getFieldsByColumnIndex(fields, fieldsInColumnIndex);
  }, [fields, fieldsInColumnIndex]);

  return (
    <DelayRender>
      <Row justify="start" style={{ gap: 8 }}>
        {fieldInToggle
          .map((field, index) => {
            if (!field) return null;

            const label = _get(field, 'componentPropsAllowConfig.labelCheckBox.props.defaultValue', '');
            const serverPayloadKey = _get(field, 'formItemPropsAllowConfig.serverPayloadKey.props.defaultValue', '');

            const isCapMoiOrDoi = (serverPayloadKey === 'CapMoi' || serverPayloadKey === 'CapLaiDoiGiaHan');

            return (
              <CheckBoxWrapper
                label={label}
                index={index}
                isFullWidth={isFullWidth}
                labelPosition={labelPosition}
                field={field}
                modeView={modeView}
                checkboxToggleServerPayloadKey={checkboxToggleServerPayloadKey}
                defaultChecked={isCapMoiOrDoi}
                disabled={isCapMoiOrDoi}
                enableMutualExclusion={enableMutualExclusion}
                groupName={groupName}
              />
            );
          })}
      </Row>
    </DelayRender>
  );
};

export default ViewCheckboxToggle;
