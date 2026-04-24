import { ExpandOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, {
  useCallback, useState,
} from 'react';

import { MODE_VIEW } from '@packages/constants/modeView';
import { FormViewerStandalone } from '@packages/main/Forms';
import { JsonSchema } from '@packages/schema/schemaModel';
import './styles.scss';

type TFullViewFormProps = {
  schema: JsonSchema,
};

function FullViewForm(props: TFullViewFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Button icon={<ExpandOutlined />} onClick={toggle} />
      <Modal
        open={isOpen}
        destroyOnHidden
        width="100vw"
        rootClassName="full-view-form"
        footer={null}
        onCancel={toggle}
      >
        <FormViewerStandalone
          {...props}
          modeView={MODE_VIEW.VIEW}
        />
      </Modal>
    </>
  );
}

export default FullViewForm;
