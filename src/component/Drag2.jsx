import React, { useState, useRef, useEffect } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import Assessment from "./Assessment";

// Utility function to detect collisions between two rectangles
const isColliding = (rect1, rect2) => {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

export function Wrapper({ children, center, style }) {
  return (
    <div className={`Wrapper ${center ? "center" : ""}`} style={style}>
      {children}
    </div>
  );
}

export const Draggable = React.forwardRef(function Draggable(
  { dragging, handle, label, listeners, transform, style, children, ...props },
  ref
) {
  return (
    <div
      style={{
        ...style,
        transform: `translate(${transform?.x ?? 0}px)`,
        position: "absolute",
      }}
      {...props}
      ref={ref}
    >
      <div className="flex">
        {/* drag button */}
        <div
          {...listeners}
          style={{
            cursor: "grab",
            height: "50px",
            width: "50px",
            backgroundColor: "darkgray",
            color: "white",
            border: "none",
          }}
        >
          Drag Me
        </div>
        {children}
      </div>
    </div>
  );
});

function DraggableItem({ label, style, left, handle, id, children, itemRef }) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id,
    });

  return (
    <Draggable
      ref={(node) => {
        setNodeRef(node);
        itemRef.current[id] = node;
      }}
      dragging={isDragging}
      handle={handle}
      label={label}
      listeners={listeners}
      style={{ ...style, left }}
      transform={transform}
      {...attributes}
    >
      {children}
    </Draggable>
  );
}

function DraggableStory({ handle, modifiers, style, children }) {
  const [positions, setPositions] = useState({});
  const itemRefs = useRef({});
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && Object.keys(itemRefs.current).length > 0) {
      const initialPositions = {};
      Object.keys(itemRefs.current).forEach((key, index) => {
        const node = itemRefs.current[key];
        const rect = node.getBoundingClientRect();
        initialPositions[key] = {
          x: index * (rect.width + 10),
          y: 0,
          width: rect.width,
          height: rect.height,
        };
      });
      setPositions(initialPositions);
      initialized.current = true;
    }
  }, [children]);

  const handleDragEnd = ({ active, delta }) => {
    const { id } = active;
    const newPosition = {
      x: positions[id].x + delta.x,
    };

    let swapped = false;

    // Measure all items to get their dimensions
    const itemRects = {};
    Object.keys(itemRefs.current).forEach((key) => {
      const node = itemRefs.current[key];
      if (node) {
        const rect = node.getBoundingClientRect();
        itemRects[key] = {
          width: rect.width,
          height: rect.height,
        };
      }
    });

    // Check for collisions and swap positions if necessary
    Object.keys(positions).forEach((key) => {
      if (key !== id && !swapped) {
        const currentRect = {
          left: newPosition.x,
          top: newPosition.y,
          right: newPosition.x + itemRects[id].width,
        };
        const otherRect = {
          left: positions[key].x,
          top: positions[key].y,
          right: positions[key].x + itemRects[key].width,
        };

        if (isColliding(currentRect, otherRect)) {
          setPositions((prev) => ({
            ...prev,
            [id]: positions[key],
            [key]: prev[id],
          }));
          swapped = true;
        }
      }
    });

    if (!swapped) {
      setPositions((prev) => ({
        ...prev,
        [id]: newPosition,
      }));
    }
  };

  return (
    <div className="sticky-bottom-nav">
      <DndContext onDragEnd={handleDragEnd} modifiers={modifiers}>
        {React.Children.map(children, (child, index) => (
          <DraggableItem
            key={index}
            id={`draggable${index + 1}`}
            label={`Draggable ${index + 1}`}
            handle={handle}
            left={positions[`draggable${index + 1}`]?.x || 0}
            style={style}
            itemRef={itemRefs}
          >
            {child}
          </DraggableItem>
        ))}
      </DndContext>
    </div>
  );
}

export const RestrictToWindowEdges = () => (
  <DraggableStory
    style={{}}
    modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}
  >
    <Assessment />
    <Assessment />
  </DraggableStory>
);
