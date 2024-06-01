import React, { forwardRef, useRef, useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Assessment from "./component/Assessment";
import {
  restrictToHorizontalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { useContainerDimensions } from "./component/hooks/useContainerDimensions";

const isColliding = (rect1, rect2) => {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

const AnchoredPopups = () => {
  const [isExpanded1, setIsExpanded1] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);

  const draggable1Ref = useRef(null);
  const draggable2Ref = useRef(null);

  const { width: draggable1Width } = useContainerDimensions(draggable1Ref);
  const { width: draggable2Width } = useContainerDimensions(draggable2Ref);

  // Manage positions state into one object
  const [positions, setPositions] = useState({
    draggable1: { x: 0 },
    draggable2: { x: 600 + 10 },
  });

  const handleDragEnd = ({ active, delta }) => {
    const { id } = active;
    const newPositionX = positions[id].x + delta.x;

    // Define the new position rectangle
    const currentRect = {
      left: newPositionX,
      right: newPositionX + (id === "draggable1" ? draggable1Width : draggable2Width),
    };

    let newPositions = { ...positions };
    let swapped = false;

    // Check for collisions and swap positions if necessary
    Object.keys(positions).forEach((key) => {
      if (key !== id) {
        const otherRect = {
          left: positions[key].x,
          right: positions[key].x + (key === "draggable1" ? draggable1Width : draggable2Width),
        };

        if (isColliding(currentRect, otherRect)) {
          newPositions = {
            ...newPositions,
            [id]: positions[key],
            [key]: { x: positions[id].x },
          };
          swapped = true;
        }
      }
    });

    if (!swapped) {
      // Update position if no collision
      newPositions[id] = { x: newPositionX };
    }

    setPositions(newPositions);
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]}
    >
      <div className="sticky-navbar">
        <div className="navbar-container">
          <DraggableComponent
            ref={draggable1Ref}
            id="draggable1"
            expanded={isExpanded1}
            setIsExpanded={setIsExpanded1}
            initialPosition={positions.draggable1}
          />
          <DraggableComponent
            ref={draggable2Ref}
            id="draggable2"
            expanded={isExpanded2}
            setIsExpanded={setIsExpanded2}
            initialPosition={positions.draggable2}
          />
        </div>
      </div>
    </DndContext>
  );
};

const DraggableComponent = forwardRef(
  ({ id, expanded, setIsExpanded, initialPosition }, ref) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
      data: { id },
    });

    const style = {
      cursor: "grab",
      userSelect: "none",
      position: "absolute",
      left: initialPosition.x,
      transform: CSS.Transform.toString(transform),
    };

    return (
      <div ref={setNodeRef} {...attributes} style={style}>
        <Assessment
          listeners={listeners}
          ref={ref}
          expanded={expanded}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      </div>
    );
  }
);

export default AnchoredPopups;
