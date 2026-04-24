import {
  Checkbox, Flex, Row,
} from 'antd';
import { Col } from 'antd/lib';
import React, { useState } from 'react';
import './styles.scss';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import FileItem from './FileItem';

type TImagesGridProps = {
  images: {
    label: string,
    value: string,
    [x: string]: string
  }[],
  selectedFiles: string[],
  onChange: (img: string[]) => void
};

const ImagesGrid = (props: TImagesGridProps) => {
  const { images, onChange, selectedFiles } = props;
  const [selected, setSelected] = useState<string[]>(selectedFiles || []);

  const handleOnChange: CheckboxGroupProps['onChange'] = (newValues: any) => {
    setSelected(newValues);
    onChange(newValues);
  };

  if (images.length === 0) return <p>Empty</p>;

  return (
    <div>
      <Checkbox.Group onChange={handleOnChange} value={selected}>
        <Row className="image-item">
          {images.map(({ label, value, thumb }) => (
            <Col key={value} className="each-col" xxl={6} xl={6} style={{ padding: '8px 16px' }}>
              <Flex vertical className="flex-item">
                <div className="img-wrapper">
                  <label htmlFor={value}>
                    <FileItem url={thumb} fileName={value} />
                  </label>
                </div>
                <Checkbox id={value} value={value}>
                  <p className="label">{label}</p>
                </Checkbox>
              </Flex>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
      <ul>
        <p>
          Đã chọn
        </p>
        {selected
          .map((selectedValue) => (
            <li key={selectedValue}>
              {images.find(({ value }) => value === selectedValue)?.label}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ImagesGrid;
