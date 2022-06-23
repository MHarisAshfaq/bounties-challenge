import React from "react";

const App1 = () => {
  return <div>App1</div>;
};

export default App1;
// import React, { Component } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { Card } from "./component/Card";
// // import logo from './logo.svg';
// // import './App.css';

// const getItems = (count: number, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k + offset}`,
//     content: `item ${k + offset}`,
//   }));

// // a little function to help us with reordering the result
// const reorder = (list: any[], startIndex: number, endIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// /**
//  * Moves an item from one list to another list.
//  */
// const move = (
//   source: any,
//   destination: any,
//   droppableSource: any,
//   droppableDestination: any
// ) => {
//   console.log({ source, destination, droppableSource, droppableDestination });
//   const sourceClone = Array.from(source);
//   const destClone = Array.from(destination);
//   const [removed] = sourceClone.splice(droppableSource.index, 1);

//   destClone.splice(droppableDestination.index, 0, removed);

//   const result: any = {};
//   result[droppableSource.droppableId] = sourceClone;
//   result[droppableDestination.droppableId] = destClone;

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging: any, draggableStyle: any) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle,
// });

// const getListStyle = (isDraggingOver: any) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250,
// });

// class App extends Component {
//   state: any = {
//     items: getItems(10),
//     selected: getItems(5, 10),
//     selected3: getItems(3, 20),
//   };

//   /**
//    * A semi-generic way to handle multiple lists. Matches
//    * the IDs of the droppable container to the names of the
//    * source arrays stored in the state.
//    */
//   id2List: any = {
//     droppable: "items",
//     droppable2: "selected",
//     droppable3: "selected3",
//   };

//   getList = (id: number) => this.state[this.id2List[id]];

//   onDragEnd = (result: any) => {
//     const { source, destination } = result;
//     // dropped outside the list
//     if (!destination) {
//       return;
//     }

//     if (source.droppableId === destination.droppableId) {
//       const items = reorder(
//         this.getList(source.droppableId),
//         source.index,
//         destination.index
//       );

//       let state: any = { items };

//       if (source.droppableId === "droppable2") {
//         state = { selected: items };
//       }
//       if (source.droppableId === "droppable3") {
//         state = { selected3: items };
//       }

//       this.setState(state);
//     } else {
//       const result = move(
//         this.getList(source.droppableId),
//         this.getList(destination.droppableId),
//         source,
//         destination
//       );
//       console.log(result, "result");
//       if (result["droppable3"] && !result["droppable2"]) {
//         this.setState({
//           items: result.droppable,
//           selected3: result["droppable3"],
//         });
//       } else if (result["droppable3"] && result["droppable2"]) {
//         this.setState({
//           selected: result.droppable2,
//           selected3: result["droppable3"],
//         });
//       } else {
//         this.setState({
//           items: result.droppable,
//           selected: result.droppable2,
//         });
//       }
//     }
//   };

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   render() {
//     return (
//       <DragDropContext onDragEnd={this.onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided, snapshot) => (
//             <div
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {this.state.items.map((item: any, index: number) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => {
//                     return (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         style={getItemStyle(
//                           snapshot.isDragging,
//                           provided.draggableProps.style
//                         )}
//                       >
//                         <Card id={item.id} />
//                       </div>
//                     );
//                   }}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//         <Droppable droppableId="droppable2">
//           {(provided, snapshot) => (
//             <div
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {this.state.selected.map((item: any, index: number) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       <Card id={item.id} />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//         <Droppable droppableId="droppable3">
//           {(provided, snapshot) => (
//             <div
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {this.state.selected3.map((item: any, index: number) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       <Card id={item.id} />
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     );
//   }
// }

// export default App;
