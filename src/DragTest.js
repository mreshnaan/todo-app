import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";
import "./App.css";
import { RestrictToWindowEdges } from "./component/Drag2";
import Assessment from "./component/Assessment";

// Calculate the item width as 50% of the window's width
const ITEM_WIDTH = window.innerWidth * 0.5;
// item container height
const ITEM_HEIGHT = 100;

const DraggableItem = ({ id, position, setPosition }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x + position.x}px, ${
          transform.y + position.y
        }px, 0)`
      : `translate3d(${position.x}px, ${position.y}px, 0)`,
    position: "absolute",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="draggable"
    >
      {id}
    </div>
  );
};

const App = () => {
  const [positions, setPositions] = useState({
    "draggable-1": { x: 0, y: 0 },
    "draggable-2": { x: ITEM_WIDTH, y: 0 },
  });

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const { id } = active;
    const newPosition = {
      x: positions[id].x + delta.x,
      y: positions[id].y + delta.y,
    };

    // Check for collisions with other items
    let collisionDetected = false;
    const updatedPositions = { ...positions, [id]: newPosition };

    Object.keys(positions).forEach((key) => {
      if (key !== id) {
        const otherPosition = positions[key];

        const horizontalOverlap =
          newPosition.x < otherPosition.x + ITEM_WIDTH &&
          newPosition.x + ITEM_WIDTH > otherPosition.x;
        const verticalOverlap =
          newPosition.y < otherPosition.y + ITEM_HEIGHT &&
          newPosition.y + ITEM_HEIGHT > otherPosition.y;

        if (horizontalOverlap && verticalOverlap) {
          collisionDetected = true;
          // Simple resolution: reposition the item to avoid overlap
          newPosition.x = positions[id].x;
          newPosition.y = positions[id].y;
        }
      }
    });

    if (!collisionDetected) {
      setPositions(updatedPositions);
    } else {
      alert("Collision detected!");
      setPositions({
        ...positions,
        [id]: newPosition,
      });
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "150vh",
      }}
    >
      <RestrictToWindowEdges />
      {/* <Assessment /> */}
    </div>
    // <DndContext onDragEnd={handleDragEnd}>
    //   <div className="container">
    //     {Object.entries(positions).map(([id, position]) => (
    //       <DraggableItem
    //         key={id}
    //         id={id}
    //         position={position}
    //         setPosition={setPositions}
    //       />
    //     ))}
    //   </div>
    // </DndContext>
  );
};

export default App;
