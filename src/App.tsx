import React, { useState } from "react";
import { Card } from "./components/card/Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { move, getItems, reorder } from "./utils/dragAndDrop";
import "./App.css";

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
      <div className="col">
        <h3 className="col-header-one">OPEN BOUNTIES</h3>
        <h3 className="col-header-two ">ASSIGNED / IN PROGRESS</h3>
        <h3 className="col-header-three ">UNDER REVIEW</h3>
        <h3 className="col-header-four ">CLOSE / REWARDED</h3>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="droppable">
          <div>
            <Droppable droppableId="droppable1">
              {(provided) => (
                <div ref={provided.innerRef} className="col-droppable1">
                  {lists.list1.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Card customFooterClass="card-footer-one" />
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
            <Droppable droppableId="droppable2">
              {(provided) => (
                <div ref={provided.innerRef} className="col-droppable2">
                  {lists.list2.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card customFooterClass="card-footer-two" />
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
            <Droppable droppableId="droppable3">
              {(provided) => (
                <div ref={provided.innerRef} className="col-droppable3">
                  {lists.list3.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card customFooterClass="card-footer-three" />
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
            <Droppable droppableId="droppable4">
              {(provided) => (
                <div ref={provided.innerRef} className="col-droppable4">
                  {lists.list4.map((item: any, index: number) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card customFooterClass="card-footer-four" />
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
