import { ColProps } from 'antd';
import { RowProps } from 'antd/lib';

export interface IBaseColumnField {
  columns: ColProps[],
  isAutoLayout: boolean,
  rows: Omit<RowProps, 'gutter'> & {
    gutter: {
      gutterX: number,
      gutterY: number,
    }[]
  },
}
