import {
  Button, FormInstance, Modal, Space,
} from 'antd';
import clsx from 'clsx';
import React, {
  ReactNode, useCallback, useMemo,
} from 'react';
import { useAppSelector } from '~/redux/hooks';
import { selectIsDuThao } from '~/redux/slices';
import { TYPE_ACTION } from '../../../type.table';

interface IPropsModal {
  openModal: boolean,
  children: ReactNode,
  width: string,
  typeAction: string,
  formRef: React.RefObject<FormInstance<any>>
  titleModal?: string;
  onOk: () => void,
  onCancel: () => void,
  onAddData?: () => void,
  onUpdateData?: () => void,
  onFormWatchChange?: (values: any) => void;
  isDisabledSave?: boolean
}

const ModalreplaceSubForm: React.FC<IPropsModal> = (props) => {
  const {
    openModal, children, width, formRef, typeAction, titleModal,
    onOk, onCancel, onAddData, onUpdateData, isDisabledSave,
  } = props;
  const isDuThao = useAppSelector(selectIsDuThao);

  const handleOnOke = useCallback(() => {
    onOk();
    formRef?.current?.resetFields();
  }, [onOk, formRef]);

  const handleOnCancel = useCallback(() => {
    onCancel();
    formRef?.current?.resetFields();
  }, [onCancel, formRef]);

  let buttonColor = '#87b4d4';
  if (isDisabledSave) {
    buttonColor = '#cecece';
  } else if (isDuThao) {
    buttonColor = '#428BCA';
  }

  const FooterModal = useMemo(() => (
    <Space>
      {typeAction === TYPE_ACTION.BUILDER ? (
        <Button onClick={handleOnCancel}>Hủy</Button>
      ) : (
        <Space>
          {typeAction === TYPE_ACTION.ADD ? (
            <Button
              style={{
                backgroundColor: buttonColor,
              }}
              className="custom_btn_modal_table"
              onClick={onAddData}
              disabled={isDisabledSave}
            >
              Lưu
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: buttonColor,
              }}
              className="custom_btn_modal_table"
              onClick={onUpdateData}
            >
              Cập Nhật
            </Button>
          )}
          <Button onClick={handleOnCancel}>Thoát</Button>
        </Space>
      )}
    </Space>
  ), [typeAction, handleOnOke, onAddData, onUpdateData, handleOnCancel, isDisabledSave]);

  return (
    <Modal
      title={titleModal}
      className={clsx('modal-field-table')}
      open={openModal}
      width={width}
      style={{ top: 20 }}
      footer={FooterModal}
      
      onOk={handleOnOke}
      onCancel={handleOnCancel}
    >
      {children}
      {/* {clonedChildren} */}
    </Modal>
  );
};

export default ModalreplaceSubForm;
