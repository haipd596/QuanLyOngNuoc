import { IConfigBasic } from '@packages/schema/fields/fieldConfig';

export type TColumnTableTree = {
  title: string,
  dataIndex: string,
  key: string,
  width?: number | string,
  transformDataColumn?: IConfigBasic
};
interface RawItem {
  [key: string]: any;
}

export interface TreeNodeDanhMuc extends RawItem {
  key: number;
  children?: TreeNodeDanhMuc[];
}

interface ConfigTreeOption {
  idKey: string;
  parentKey: string;
}

export function buildTree(
  data: RawItem[],
  options: ConfigTreeOption,
  parentId: number | null = null,
): TreeNodeDanhMuc[] {
  const { idKey, parentKey } = options;

  return data
    .filter((item: any) => item[parentKey] === parentId)
    .map((item: any) => {
      const children = buildTree(data, options, item[idKey]);

      return {
        ...item,
        key: item[idKey],
        ...(children.length > 0 ? { children } : {}),
      };
    });
}
