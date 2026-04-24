import { FIELD_NAME } from '@packages/constants/fields';
import { apiGetListIdsByHsId } from '@packages/dvc-service/apiGetFormDataByHsId';
import {
  Form, Input, InputNumber, message,
} from 'antd';
import _get from 'lodash/get';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { EditableCellProps, EditableContext } from '../../type.table.single';

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = (
  props,
) => {
  const {
    title,
    editable,
    children,
    dataIndex,
    fieldKeyName,
    record,
    rules,
    handleSaveDataField,
    listDataSource,
    ...restProps
  } = props;
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;
  const [editing, setEditing] = useState(false);
  const [notification, contextHolder] = message.useMessage();
  const [idGiayToDinhKem, setIdGiayToDinhKem] = useState<any[]>([]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    setTimeout(() => {
      apiGetListIdsByHsId().then((response) => {
        setIdGiayToDinhKem(response);
      }).catch((error) => {
        console.error('🚀 ~ apiGetListIdsByHsId ~ error:', error);
      });
    }, 300);
  }, []);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const handleSaveData = async () => {
    form.validateFields().then((values) => {
      const getValues = _get(values, dataIndex);
      const filterTenGiayToFromServer = idGiayToDinhKem?.find((obj) => obj.Ten === getValues);
      const filterTenGiayToFromLocal = listDataSource?.some(
        (row) => row.key !== record.key && row[dataIndex]?.trim?.() === getValues,
      );
      if (filterTenGiayToFromServer || filterTenGiayToFromLocal) {
        form.setFields([
          {
            name: dataIndex, // Tên giấy tờ
            errors: ['Tên giấy tờ đã tồn tại'], // Hoạt động khi url tồn tại hsid
          },
        ]);
        return;
      }
      toggleEdit();
      handleSaveDataField({
        ...record,
        ...values,
        idGiayToDinhKem: filterTenGiayToFromServer?.ID || null,
        isDelete: !!filterTenGiayToFromServer?.ID,
      });
    }).catch((errInfo) => {
      notification.open({
        type: 'error',
        content: 'Tạo dữ liệu không thành công!',
      });
      console.error('handle save data in editable column field', errInfo);
    });
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: 'Vui lòng nhập dữ liệu!' }]}>
        {fieldKeyName === FIELD_NAME.INPUT_NUMBER ? (
          <InputNumber
            ref={inputRef}
            onPressEnter={handleSaveData}
            onBlur={handleSaveData}
            placeholder="Nhập nội dung"
          />
        ) : (
          <Input
            ref={inputRef}
            onPressEnter={handleSaveData}
            onBlur={handleSaveData}
            placeholder="Nhập nội dung"
          />
        )}
      </Form.Item>
    ) : (
      // <div className="editable-cell-value-wrap" onClick={toggleEdit}>
      // contentEditable and data-text is the property name to add placeholder inside div tag
      // <div
      //   className="editable-cell-value-wrap"
      //   onClick={toggleEdit}
      //   contentEditable={editing}
      //   data-text="Nhập nội dung"
      // >
      //   {children}
      // </div>
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {record[dataIndex] || <span className="placeholder">Nhập nội dung</span>}
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <td {...restProps}>{childNode}</td>
    </>
  );
};

export default EditableCell;
