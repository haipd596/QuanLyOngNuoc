import { SaveOutlined } from '@ant-design/icons';
import React from 'react';

type TSaveFileToStorageProps = {
  file: any
};

const SaveFileToStorage = ({ file }: TSaveFileToStorageProps) => {
  const handleSaveToStorage = () => {
    try {
      // eslint-disable-next-line no-eval
      eval(`callbackLuuKho(${JSON.stringify(file)})`);
    } catch (error) {
      console.error('Something went wrong when use callbackLuuKho', error);
    }
  };

  return (
    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={handleSaveToStorage}>
      <span>Lưu kho</span>
      <SaveOutlined
        style={{
          position: 'absolute', top: '50%', transform: 'translate(50%, -50%)', cursor: 'pointer',
        }}
      />
    </div>
  );
};

SaveFileToStorage.propTypes = {

};

SaveFileToStorage.defaultProps = {

};

export default SaveFileToStorage;
