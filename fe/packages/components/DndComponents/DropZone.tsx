import update from 'immutability-helper';
import React, { useCallback, useState } from 'react';
import { Draggable } from './Draggable';
import { TDraggable } from './type';

export function DropZone<T>({ dataSource, renderItems, onChange }: TDraggable<T>) {
  // grabbing api data and rendering it with `renderDndCharacterCards`
  const [items, setItems] = useState(dataSource);

  // a memoized function that uses js `immutability-helper` & `splice` to update the
  // order of our rows
  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setItems((prevCharacters) => {
      const newData = update(prevCharacters, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCharacters[dragIndex]],
        ],
      });

      onChange(newData);

      return newData;
    });
  }, []);

  const renderDndCharacterCards = () => {
    return items.map((item, index) => (
      renderItems ? renderItems({ item, moveRow, index }) : (
        <Draggable
          index={index}
          key={item.id}
          item={item}
          moveRow={moveRow}
        />
      )
    ));
  };

  return (
    <>
      {renderDndCharacterCards()}
    </>
  );
}
