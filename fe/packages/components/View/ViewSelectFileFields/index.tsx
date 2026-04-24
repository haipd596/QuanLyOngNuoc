import { TAsyncSupportProps } from '@packages/components/AsyncSupport';
import { AnyObject } from 'antd/es/_util/type';
import clsx from 'clsx';
import { useState } from 'react';

import IconWrapper from '@packages/components/IconWrapper';
import { ModalSelectFilePDF } from '@packages/components/ModalSelectFilePDF';
import ViewButton, { ViewButtonProps } from '../ViewButton';
import './styles.scss';

export type ViewSelectFileFieldsProps = {
  onChange: (values: string[] | AnyObject) => void,
  value: string[],
  isShowListImage: boolean,
} & TAsyncSupportProps & ViewButtonProps;

const ViewSelectFileFields = (props: ViewSelectFileFieldsProps) => {
  const {
    buttonContent,
    // buttonType,
    individualStyle,
    disabled,
    onChange,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectFile = (values: AnyObject) => {
    onChange(values);
    setIsOpen(false);
  };

  return (
    <>
      <ViewButton
        buttonContent={buttonContent}
        buttonType="default"
        individualStyle={individualStyle}
        block={false}
        onOpenModal={() => setIsOpen(true)}
        disabled={disabled}
        icon={
          <IconWrapper icon={<i className={clsx('fa-solid fa-folder-open fa-lg', 'icon_global_dvc')} />} />
        }
      />
      <ModalSelectFilePDF
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => setIsOpen(false)}
        onDownloadFile={handleSelectFile}
      />
    </>
  );
};

export default ViewSelectFileFields;
