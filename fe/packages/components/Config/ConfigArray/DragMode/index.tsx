import {
  Button, Flex,
} from 'antd';
import { useState } from 'react';

import './styles.scss';

import { Draggable } from '@packages/components/DndComponents/Draggable';
import { DropZone } from '@packages/components/DndComponents/DropZone';
import _ from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAppDispatch } from '~/redux/hooks';
import { updateField } from '~/redux/slices';
import { ConfigArrayProps } from '../type';

function DragMode(props: Omit<ConfigArrayProps, 'isAddable'>) {
  const {
    defaultValue, fieldSchema, onSave,
  } = props;
  const [dataSource, setDataSource] = useState(defaultValue);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    let _cloneField = _.cloneDeep(fieldSchema);
    const path = 'componentPropsAllowConfig.columns.props.defaultValue';
    _cloneField = _.set(_cloneField, path, dataSource);
    _cloneField.configChanged = {
      ..._cloneField.configChanged,
      [path]: dataSource,
    };

    dispatch(updateField({
      key: fieldSchema.key,
      newData: _cloneField,
    }));
    onSave(dataSource);
  };

  return (
    <div className="array-from-type">
      <DndProvider backend={HTML5Backend}>
        <DropZone<any>
          dataSource={dataSource}
          renderItems={({ item, ...rest }: any) => (
            <Draggable
              {...rest}
              item={{
                id: item.key,
                renderChildren: () => <div className="drag-column">{item.title || `Mục ${rest.index + 1}`}</div>,
              }}
            />
          )}
          onChange={setDataSource}
        />
      </DndProvider>
      <Flex gap={50} justify="end">
        <Button type="primary" onClick={handleSave}>Lưu</Button>
      </Flex>
    </div>
  );
}

export default DragMode;
