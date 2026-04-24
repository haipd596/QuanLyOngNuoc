export type TItem = {
  title: string,
  id: string,
  renderChildren?: (item: TItem) => React.ReactNode
};

export type RenderChildren = {
  moveRow: (dragIndex: number, hoverIndex: number) => void,
  index: number,
  item: TItem
};

export type TDraggable<T = any> = {
  dataSource: (TItem & T)[],
  renderItems: (props: RenderChildren) => React.ReactNode,
  onChange: (items: TItem[]) => void
};
