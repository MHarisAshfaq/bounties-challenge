import React, { useState } from "react";
import { Card } from "./component/Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

// fake data generator
const getItems = (count: number, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    content: `item ${k + offset}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,
  // borderRadius: "12px",

  // change background colour if dragging
  background: isDragging ? "" : "",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "" : "",
  padding: grid,
  // width: 220,
});

function App() {
  const [lists, setLists] = useState<any>({
    list1: getItems(5),
    list2: getItems(5, 10),
    list3: getItems(5, 15),
    list4: getItems(5, 20),
  });
  const [listIds] = useState<any>({
    droppable1: "list1",
    droppable2: "list2",
    droppable3: "list3",
    droppable4: "list4",
  });

  const getList = (id: number) => lists[listIds[id]];

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      let state: any = { list1: items };

      if (source.droppableId === "droppable2") {
        state = { list2: items };
      }
      if (source.droppableId === "droppable3") {
        state = { list3: items };
      }
      if (source.droppableId === "droppable4") {
        state = { list4: items };
      }
      setLists((prev: any) => {
        return { ...prev, ...state };
      });
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      if (result["droppable1"] && result["droppable2"]) {
        setLists((prev: any) => {
          return {
            ...prev,
            list1: result.droppable1,
            list2: result.droppable2,
          };
        });
      } else if (result["droppable1"] && result["droppable3"]) {
        setLists((prev: any) => {
          return {
            ...prev,
            list1: result.droppable1,
            list3: result.droppable3,
          };
        });
      } else if (result["droppable1"] && result["droppable4"]) {
        setLists((prev: any) => {
          return {
            ...prev,
            list1: result.droppable1,
            list4: result.droppable4,
          };
        });
      } else if (result["droppable2"] && result["droppable3"]) {
        setLists((prev: any) => {
          return {
            ...prev,
            list2: result.droppable2,
            list3: result.droppable3,
          };
        });
      } else if (result["droppable2"] && result["droppable4"]) {
        setLists((prev: any) => {
          return {
            ...prev,
            list2: result.droppable2,
            list4: result.droppable4,
          };
        });
      } else if (result["droppable3"] && result["droppable4"]) {
        setLists((prev: any) => {
          return {
            ...prev,
            list3: result.droppable3,
            list4: result.droppable4,
          };
        });
      }
    }
  };
  return (
    <div className="App-Container">
      <h1 className="header">Bounties</h1>
      <hr />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="droppable">
          <div>
            <h5 className="col-header bottom-color">OPEN BOUNTIES</h5>
            <Droppable droppableId="droppable1">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {lists.list1.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            // style={getItemStyle(
                            //   snapshot.isDragging,
                            //   provided.draggableProps.style
                            // )}
                          >
                            <Card />
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div>
            <h5 className="col-header bottom-color">ASSIGNED / IN PROGRESS</h5>
            <Droppable droppableId="droppable2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {lists.list2.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // style={getItemStyle(
                          //   snapshot.isDragging,
                          //   provided.draggableProps.style
                          // )}
                        >
                          <Card />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div>
            <h5 className="col-header bottom-color">UNDER REVIEW</h5>
            <Droppable droppableId="droppable3">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {lists.list3.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // style={getItemStyle(
                          //   snapshot.isDragging,
                          //   provided.draggableProps.style
                          // )}
                        >
                          <Card />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div>
            <h5 className="col-header bottom-color">CLOSE / REWARDED</h5>
            <Droppable droppableId="droppable4">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {lists.list4.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // style={getItemStyle(
                          //   snapshot.isDragging,
                          //   provided.draggableProps.style
                          // )}
                        >
                          <Card />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
