import { Editor } from '@monaco-editor/react';
import { Field } from '@packages/schema/fields/fieldModel';
import {
  Button, Col, Modal, Row,
} from 'antd';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import _get from 'lodash/get';
import React, { useState } from 'react';

export type TConfigHtmlViewerEditorProps = {
  fieldSchema: Field,
  onSave: (value: any) => any
};

const ConfigHtmlViewerEditor = (props: TConfigHtmlViewerEditorProps) => {
  const { onSave, fieldSchema } = props;
  const defaultValue = _get(fieldSchema, 'componentPropsAllowConfig.initialContent.props.defaultValue', '') as any;
  const [content, setContent] = useState<string>(defaultValue);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleChange = (value: string | undefined) => {
    setContent(value || '');
  };

  const handleSave = () => {
    onSave(content);
    setIsModalVisible(false);
  };

  const cleanHTML = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        title="Edit HTML Content"
        open={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        height={700}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Editor
              height="500px"
              defaultLanguage="html"
              onChange={handleChange}
              value={content}
            />
          </Col>
          <Col span={12}>
            <div className="html-viewer">
              {parse(cleanHTML)}
            </div>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ConfigHtmlViewerEditor;
