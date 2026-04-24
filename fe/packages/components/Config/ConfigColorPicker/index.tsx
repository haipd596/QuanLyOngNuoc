import {
  blue,
  green,
  presetPalettes,
  red,
} from '@ant-design/colors';
import { ColorPicker, ColorPickerProps } from 'antd';
import { Color } from 'antd/es/color-picker';
import React, { useCallback } from 'react';
import { THEMES } from '~/constants/themeColor';

export type ConfigColorProps = Omit<ColorPickerProps, 'onChange'> & {
  onChange: (value: string) => void;
  defaultValue: string;
};

type Presets = Required<ColorPickerProps>['presets'][number];

const genPresets = (presets = presetPalettes) => Object.entries(presets).map<Presets>(
  ([label, colors]) => ({
    label,
    colors,
  }),
);

const contrast = [
  '#ffffff', // pure white
  '#e5e5e5',
  '#d9d9d9',
  '#cccccc',
  '#bfbfbf',
  '#b3b3b3',
  '#a6a6a6',
  '#999999',
  '#8c8c8c',
  '#808080',
];

const themconfig = [
  '#ffffff', // pure white
  '4096FF',
  '#d9d9d9',
  '#DFBA49',
  '#C1D9BA',
].concat(Object.values(THEMES).map(({ PRIMARY }) => PRIMARY()));

function ConfigColor(props: ConfigColorProps) {
  const { onChange } = props;

  const handleChange: ColorPickerProps['onChange'] = (e) => {
    onChange(e.toHexString());
  };

  const showText = useCallback((e: Color) => <span>{e.toHexString()}</span>, []);

  const presets = genPresets({
    themconfig, contrast, blue, red, green,
  });

  return (
    <ColorPicker
      {...props}
      allowClear
      disabledAlpha
      presets={presets}
      onChange={handleChange}
      showText={showText}
    />
  );
}

export default ConfigColor;
