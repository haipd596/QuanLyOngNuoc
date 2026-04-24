import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { RenderChildren } from './type';

// High Level 101 -- react-dnd uses drop areas and draggable items

export function Draggable({ item: dragItem, moveRow, index }: RenderChildren) {
  const { id, renderChildren } = dragItem;
  // react-dnd uses refs as its vehicle to make elements draggable
  const ref = useRef<HTMLDivElement>(null);

  // we use `useDrop` to designate a drop zone
  // it returns `collectedProps` and a `drop` function
  const [collectedProps, drop] = useDrop({
    // collectedProps is an object containing collected properties from the collect function

    // `accept` is very important. It determines what items are allowed to be dropped inside it
    // this corresponds with the useDrag `type` value we'll see in a bit.
    accept: 'dnd-character',

    // here's that collect function!
    // Usually the info we want out of `collect()` comes from the `monitor` object
    // react- dnd gives us. We can use `monitor` to know things about the state of dnd,
    // like isDragging, clientOffset, etc.
    // If we we want to expose this data outside of the hook and use in other places, we
    // should return it as a part of the `collect(monitor)` function.
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        // Example: maybe you want `isOver: monitor.isOver()` for dynamic styles
      };
    },

    // `hover` gets called by react-dnd when an `accept`ed draggable item is hovering
    // over the drop zone. There is a decent amount of vanilla js that is required to
    // make the reorder ui work:
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // useDrag allows us to interact with the drag source
  const [, drag] = useDrag({
    // here's that `type` that corresponds with `accept`. These two have to align.
    type: 'dnd-character',
    // `item` describes the item being dragged. It's called by react-dnd when drag begins.
    // `item` gets passed into hover and we use that data there
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Here's an example of how we use `collectedProps`.
  // I'm using bgColor instead of opacity to demonstrate the difference between the item
  // being dragged and the preview, meaning the element in dragging state. isDragging affects
  // the actual dragged element, not the preview.
  //* Note:
  // if we want to change the preview we would want to use a custom drag
  // layer and render a preview component
  // const bgColor = collectedDragProps.isDragging ? 'gray' : '';

  // in the return statement, we assign the ref to be the value of the div

  // Join the two refs together. This is a shorthand that allows us to create
  // a drop zone around our draggables in one line.
  drag(drop(ref));

  return renderChildren && (
    <div
      // here's that ref
      ref={ref}
      data-handler-id={collectedProps.handlerId}
    >
      {renderChildren(dragItem)}
    </div>
  );
}
