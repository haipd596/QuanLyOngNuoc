interface RawItem {
  [key: string]: any;
}

export interface TreeNode extends RawItem {
  key: number;
  children?: TreeNode[];
}

interface ConfigTreeOption {
  idKey: string;
  parentKey: string;
}

export function buildModeTree(
  data: RawItem[],
  options: ConfigTreeOption,
  parentId: number | null = null,
): TreeNode[] {
  const { idKey, parentKey } = options;

  return data
    .filter((item: any) => item[parentKey] === parentId)
    .map((item: any) => {
      const children = buildModeTree(data, options, item[idKey]);

      return {
        ...item,
        key: item[idKey],
        ...(children.length > 0 ? { children } : {}),
      };
    });
}
