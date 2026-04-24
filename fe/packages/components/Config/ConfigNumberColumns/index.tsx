/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DeleteOutlined } from '@ant-design/icons';
import { COLUMN_DEFAULT_CONFIG } from '@packages/constants/jsonConfig';
import { Field } from '@packages/schema/fields/fieldModel';
import {
  Button, ColProps,
  Flex,
  Grid,
  InputNumber, Tag,
} from 'antd';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import React, { useState } from 'react';
import './styles.scss';

const { useBreakpoint } = Grid;
type TConfigNumberColumnsProps = {
  isAutoLayout: boolean,
  defaultValue: ColProps[],
  fieldSchema: Field,
  onChange: (value: ColProps[]) => void,
  isAddable: boolean,
  isDeletable: boolean
};

const runAutoLayout = (cols: ColProps[]) => {
  const colsNumber = Math.round(24 / cols.length);
  const results = cols.map(() => ({
    xxl: colsNumber,
    xl: colsNumber,
    lg: colsNumber,
    md: colsNumber,
    sm: 24,
    xs: 24,
  }));

  return results;
};

const ConfigNumberColumns = (props: TConfigNumberColumnsProps) => {
  const {
    defaultValue, onChange, fieldSchema, isAddable = true, isDeletable = true,
  } = props;
  const [colArray, setColArray] = useState(defaultValue);
  const screens = useBreakpoint();

  const isAutoLayout = _get(fieldSchema, 'componentPropsAllowConfig.isAutoLayout.props.defaultValue', false);

  const handleChange = (value: number | null, key: string, index: number) => {
    setColArray((prev) => {
      const cloned = _cloneDeep(prev);
      // @ts-ignore
      cloned[index][key] = value;
      onChange(cloned);
      return cloned;
    });
  };

  const handleDelete = (index: number) => {
    setColArray((prev) => {
      let cloned = [...prev].filter((_item, _index) => index !== _index);
      if (isAutoLayout) {
        cloned = runAutoLayout(cloned);
      }
      onChange(cloned);
      return cloned;
    });
  };

  const handleAdd = () => {
    let added = colArray.concat({ ...COLUMN_DEFAULT_CONFIG });
    if (isAutoLayout) {
      added = runAutoLayout(added);
    }
    setColArray(added);
    onChange(added);
  };

  return (
    <div className="number-column-config">
      Current break point:
      {' '}
      {Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => (
          <Tag color="blue" key={screen[0]}>
            {screen[0]}
          </Tag>
        ))}
      {isAutoLayout && (
        <div><b>Turn off auto layout to edit these inputs below</b></div>
      )}
      {
        colArray.map((item, index) => (
          <div
            key={index}
            className="each-col"
          >
            <Flex justify="space-between">
              Column
              {' '}
              {index + 1}
              {isDeletable && (
                <span className="icon-delete" onClick={() => handleDelete(index)}><DeleteOutlined /></span>
              )}
            </Flex>
            {
              Object.keys(item).map((key) => (
                <div key={key}>
                  {key}
                  <InputNumber
                    // @ts-ignore
                    value={Number(item[key])}
                    onChange={(value) => handleChange(value, key, index)}
                    disabled={isAutoLayout}
                  />
                </div>
              ))
            }
          </div>
        ))
      }
      {isAddable && (
        <Button onClick={handleAdd} type="primary">Add</Button>
      )}
    </div>
  );
};

export default ConfigNumberColumns;
