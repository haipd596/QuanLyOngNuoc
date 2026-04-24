import { DeleteOutlined } from '@ant-design/icons';
import {
  Button, Collapse, CollapseProps, Flex, Modal, Tag,
} from 'antd';
import clsx from 'clsx';
import _cloneDeep from 'lodash/cloneDeep';
import _get from 'lodash/get';
import _set from 'lodash/set';
import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';

import { COLUMN_REFERENCES } from '@packages/constants/commons';
import { FIELD_IN_TABLE_NEED_FORMAT } from '@packages/constants/fields';
import { getComponentForArrayConfig } from '@packages/utils/autoRun';
import { generateUniqIdConfigArray } from '@packages/utils/generateUniqIdColKey';
import DragMode from './DragMode';
import './styles.scss';
import {
  canDeleteOption, ConfigArrayProps, GROUP_TABLE_FIELD,
} from './type';

function ConfigArray(props: ConfigArrayProps) {
  const {
    defaultValue, onSave, isAddable = true, fieldSchema,
  } = props;
  const [dataSource, setDataSource] = useState(defaultValue);
  const [isOpenReorder, setIsOpenReorder] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onSave(dataSource);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [dataSource]);

  // useEffect(() => {
  //   const isTable = fieldSchema.fieldName === 'TABLE';
  //   const isNewTable = isTable
  //   && dataSource.length === 3
  //   && dataSource.some((item) => Object.prototype.hasOwnProperty.call(item, 'isInitialized'))
  //   && !dataSource.every((item) => item.isInitialized);

  //   if (isNewTable) {
  //     const baseItem = dataSource.length >= 2 ? dataSource[1] : dataSource[0];

  //     const newItem = {
  //       ...baseItem,
  //       uniqId: generateUniqIdConfigArray(),
  //       isInitialized: true,
  //     };

  //     const lastItem = dataSource[dataSource.length - 1];

  //     const temp = [
  //       newItem, {
  //         ...lastItem,
  //         isInitialized: true,
  //       },
  //     ];

  //     const cleanDataSource = temp.map((({ isInitialized, ...rest }) => rest));

  //     setDataSource(cleanDataSource);
  //   }
  // }, [fieldSchema.fieldName, dataSource]);
  const transformDataSourceToDisplay = useCallback((_dataSource: ConfigArrayProps['defaultValue']) => _dataSource.map((item, index) => ({
    key: item.uniqId,
    renderFields:
    Object.keys(item).map((key) => ({
      label: key,
      component: getComponentForArrayConfig(item[key], {
        onChange: (value: any) => {
          setDataSource((prev) => {
            if (value === null || value === undefined) {
              const prevValue = _get(prev, `${index}.${key}`);
              value = typeof prevValue === 'string' ? '' : 0;
            }
            const newValue = _set(_cloneDeep(prev), `${index}.${key}`, value);

            if (key === 'columnDataType') {
              const fieldName = value?.props?.defaultValue;

              if (FIELD_IN_TABLE_NEED_FORMAT.includes(fieldName)) {
                const finalConfig = {
                  columnDataType: value,
                  uniqId: generateUniqIdConfigArray(),
                };

                const finalValue = _set([...prev], `${index}`, finalConfig);

                return finalValue;
              }
            }

            return newValue;
          });
        },
        fieldSchema,
      }),
      key: item.uniqId,
    })),
  })), [fieldSchema]);

  // const handleSave = () => {
  //   onSave(dataSource);
  // };

  const handleAdd = () => {
    setDataSource((prev) => {
      if (prev.length === 1) {
        const newOptions = {
          ...prev[0],
          uniqId: generateUniqIdConfigArray(),
        };

        return prev.concat({ ...newOptions });
      }

      const updateOptions = GROUP_TABLE_FIELD.includes(fieldSchema.fieldName)
        ? prev[prev.length - 2]
        : prev[prev.length - 1];

      const newDataSource = [
        ...prev.slice(0, prev.length - 1),
        {
          ...updateOptions,
          uniqId: generateUniqIdConfigArray(),
        },
        ...prev.slice(prev.length - 1),
      ];

      return newDataSource;
    });
  };

  const handleRemove = (index: number) => {
    setDataSource((prev) => {
      if (prev.length === 1) return prev;
      const results = prev.filter((_item, _index) => index !== _index);

      return results;
    });
  };

  const isDisabledDeleteOptions = useMemo(() => {
    const _fieldName = _get(fieldSchema, 'fieldName', '');
    if (canDeleteOption(dataSource, _fieldName)) {
      return true;
    }
    return false;
  }, [dataSource]);

  const itemCollapse = useMemo(() => {
    const items: CollapseProps['items'] = transformDataSourceToDisplay(dataSource).map(({ renderFields, key: _key }, index) => {
      const isReference = renderFields.some(
        (data) => data.component.props.defaultValue === COLUMN_REFERENCES,
      );

      return {
        key: _key,
        label: (
          <Tag color="#108ee9">
            {
            // eslint-disable-next-line no-nested-ternary
            GROUP_TABLE_FIELD.includes(fieldSchema?.fieldName)
              ? (isReference ? 'REFERENCES' : `CỘT_${index + 1}`)
              : `OPTION_${index + 1}`
            }
          </Tag>
        ),
        children: (
          <div>
            {renderFields.map(({ label, component, key }) => (
              <div key={key + label} className="array-item">
                {label !== 'uniqId' && (
                <>
                  {label}
                  <span>&nbsp;</span>
                  {component}
                </>
                )}
              </div>
            ))}
          </div>
        ),
        extra: <Button
          type="link"
          icon={(<DeleteOutlined className={clsx('delete-icon')} />)}
          className={isReference || isDisabledDeleteOptions ? 'is-disable' : ''}
          disabled={isReference || isDisabledDeleteOptions}
          // eslint-disable-next-line no-sequences
          onClick={(event) => (!isReference && handleRemove(index), event.stopPropagation())}
        />,
      };
    });

    return items;
  }, [dataSource]);

  return (
    <div className="array-from-type">
      <Button onClick={() => setIsOpenReorder(true)}>
        Reorder columns
      </Button>
      <Modal
        open={isOpenReorder}
        footer={null}
        // onClose={() => setIsOpenReorder(false)}
        onCancel={() => setIsOpenReorder(false)}
      >
        {isOpenReorder ? (
          <DragMode
            defaultValue={dataSource}
            fieldSchema={fieldSchema}
            onSave={(reordered) => {
              setDataSource(reordered);
              setIsOpenReorder(false);
            }}
          />
        ) : null}
      </Modal>
      <Collapse items={itemCollapse} />
      <Flex gap={50}>
        {isAddable && <Button block onClick={handleAdd}>Thêm</Button>}
        {/* <Button block type="primary" onClick={handleSave}>Lưu</Button> */}
      </Flex>
    </div>
  );
}

export default ConfigArray;
