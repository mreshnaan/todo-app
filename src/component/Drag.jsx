import React, { forwardRef, useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

const ITEM_WIDTH = 500;
const ITEM_HEIGHT = 100;

export function Wrapper({ children, center, style }) {
  return (
    <div className={`Wrapper ${center ? "center" : ""}`} style={style}>
      {children}
    </div>
  );
}

export const Draggable = forwardRef(function Draggable(
  {
    dragOverlay,
    dragging,
    handle,
    label,
    listeners,
    transform,
    style,
    buttonStyle,
    positions,
    id,
    width,
    height,
    ...props
  },
  ref
) {
  return (
    <div
      className={"Draggable dragging"}
      style={{
        ...style,
        "--translate-x": `${transform?.x ?? 0}px`,
        "--translate-y": `${transform?.y ?? 0}px`,
        position: "absolute",
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        border: "solid 1px red",
        backgroundColor: "blue",
        color: "white",
      }}
      {...props}
      aria-label="Draggable"
      data-cypress="draggable-item"
      {...(handle ? {} : listeners)}
      ref={ref}
    >
      {label}
    </div>
  );
});

function DraggableItem({
  label,
  style,
  top,
  left,
  positions,
  handle,
  buttonStyle,
  id,
  width,
  height,
}) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id,
    });

  return (
    <Draggable
      ref={setNodeRef}
      dragging={isDragging}
      handle={handle}
      label={label}
      listeners={listeners}
      style={{ ...style, top, left }}
      buttonStyle={buttonStyle}
      positions={positions}
      id={id}
      transform={transform}
      width={width}
      height={height}
      {...attributes}
    />
  );
}

function DraggableStory({
  activationConstraint,
  handle,
  label = "Go ahead, drag me.",
  modifiers,
  style,
  buttonStyle,
}) {
  // Initial positions
  const initialPosition1 = { x: 0, y: 0 };
  const initialPosition2 = { x: ITEM_WIDTH + 10, y: 0 };

  const [positions, setPositions] = useState({
    draggable1: initialPosition1,
    draggable2: initialPosition2,
  });

  const handleDragEnd = ({ active, delta }) => {
    const { id } = active;

    const newPosition = {
      x: positions[id].x + delta.x,
      y: positions[id].y + delta.y,
    };

    const otherId = id === "draggable1" ? "draggable2" : "draggable1";
    const otherPosition = positions[otherId];
    const newOtherPosition = {
      x: otherPosition.x + delta.x,
      y: otherPosition.y + delta.y,
    };

    const collisions = checkCollisions(id, newPosition, positions);

    if (collisions.length > 0) {
      // Collision detected, switch places with the collided item
      const collidedItemId = collisions[0];
      const collidedItemPosition = positions[collidedItemId];

      setPositions((prev) => ({
        ...prev,
        [id]: collidedItemPosition,
        [collidedItemId]: positions[id],
      }));
    } else {
      // No collision, update position
      setPositions((prev) => ({
        ...prev,
        [id]: newPosition,
        [otherId]: newOtherPosition,
      }));
    }
  };

  // Function to check collisions between draggable items
  const checkCollisions = (id, newPosition, positions) => {
    const collisions = [];

    for (const [itemId, itemPosition] of Object.entries(positions)) {
      if (itemId !== id) {
        const rect1 = {
          x1: newPosition.x,
          y1: newPosition.y,
          x2: newPosition.x + ITEM_WIDTH,
          y2: newPosition.y + ITEM_HEIGHT,
        };

        const rect2 = {
          x1: itemPosition.x,
          y1: itemPosition.y,
          x2: itemPosition.x + ITEM_WIDTH,
          y2: itemPosition.y + ITEM_HEIGHT,
        };

        if (
          rect1.x1 < rect2.x2 &&
          rect1.x2 > rect2.x1 &&
          rect1.y1 < rect2.y2 &&
          rect1.y2 > rect2.y1
        ) {
          collisions.push(itemId);
        }
      }
    }

    return collisions;
  };

  return (
    <DndContext onDragEnd={handleDragEnd} modifiers={modifiers}>
      <Wrapper>
        <DraggableItem
          id="draggable1"
          label="Draggable1"
          handle={handle}
          top={positions.draggable1.y}
          left={positions.draggable1.x}
          positions={positions}
          style={style}
          buttonStyle={buttonStyle}
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT}
        />
        <DraggableItem
          id="draggable2"
          label="Draggable2"
          handle={handle}
          top={positions.draggable2.y}
          left={positions.draggable2.x}
          positions={positions}
          style={style}
          buttonStyle={buttonStyle}
          width={ITEM_WIDTH}
          height={ITEM_HEIGHT}
        />
      </Wrapper>
    </DndContext>
  );
}

function OverflowWrapper({ children }) {
  return <div className={"OverflowWrapper"}>{children}</div>;
}

export const RestrictToWindowEdges = () => (
  <OverflowWrapper>
    <DraggableStory
      label="I'm only draggable within the window bounds"
      modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}
    />
  </OverflowWrapper>
);
