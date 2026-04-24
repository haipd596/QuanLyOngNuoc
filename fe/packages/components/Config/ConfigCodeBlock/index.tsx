import Editor, { EditorProps } from '@monaco-editor/react';
import { stringToFunc } from '@packages/utils/common';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import './styles.scss';

export type ConfigCodeCheckboxProps = {
  onChange?: (value: string | undefined) => void,
  onSave?: (text: string) => void,
  showFullView?: boolean,
} & EditorProps;

function ConfigCodeBlock(props: ConfigCodeCheckboxProps) {
  const {
    onChange, options = {}, onSave, showFullView = true, defaultValue, ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState(defaultValue as string);

  const handleChange = (_value: string | undefined) => {
    if (_value) {
      const { errorMessage } = stringToFunc(_value);
      if (errorMessage) {
        setError(errorMessage);
        return;
      }
      setError('');
      setText(_value);
      if (onChange) {
        onChange(_value);
      }
      return;
    }

    if (onChange) {
      onChange('');
    }
  };

  return (
    <div className="code-config-block">
      <Editor
        {...rest}
        defaultValue={defaultValue}
        height="100px"
        defaultLanguage="javascript"
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          ...options,
        }}
        value={text}
      />
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        width={800}
        footer={null}
      >
        {isOpen && (
        <Editor
          {...rest}
          height="400px"
          defaultLanguage="javascript"
          onChange={handleChange}
          options={{
            minimap: { enabled: false },
            ...options,
          }}
          value={text}
        />
        )}
      </Modal>
      <span className="error">
        {error}
      </span>
      {showFullView && (
      <Button type="link" onClick={() => setIsOpen(true)}>
        full view
      </Button>
      )}
      {onSave && !error && (
        <div className="save-button">
          <Button type="link" onClick={() => onSave(text)}>Save</Button>
        </div>
      )}
    </div>
  );
}

export default ConfigCodeBlock;
