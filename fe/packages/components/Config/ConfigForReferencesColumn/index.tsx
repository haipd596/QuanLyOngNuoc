import { Editor } from '@monaco-editor/react';
import { useState } from 'react';

type TConfigForReferencesColumnProps = {
  onChange: (value: any) => void,
  defaultValue: string,
};

const ConfigForReferencesColumn = (props: TConfigForReferencesColumnProps) => {
  const { defaultValue, onChange } = props;
  const [isError, setIsError] = useState(false);

  const handleChange = (value: string | undefined) => {
    try {
      if (value) {
        JSON.parse(value);
      }
      onChange(value);
      setIsError(false);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div>
      <Editor
        value={defaultValue}
        onChange={handleChange}
        height={200}
      />
      {isError && <b style={{ color: 'red' }}>JSON is error</b>}
    </div>
  );
};

export default ConfigForReferencesColumn;
