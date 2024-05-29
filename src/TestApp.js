// import React, { useEffect } from "react";
// import {
//   useMutation,
//   usePreloadedQuery,
//   useQueryLoader,
// } from "react-relay/hooks";
// import { graphql } from "babel-plugin-relay/macro";
// import AddTodoForm from "./AddTodoForm";

// const TodoListQuery = graphql`
//   query App_TodoListQuery {
//     todos {
//       id
//       task
//       completed
//     }
//   }
// `;

// const ToggleTodoMutation = graphql`
//   mutation App_TodoListToggleTodoMutation($id: ID!) {
//     toggleTodoCompleted(id: $id) {
//       id
//       completed
//     }
//   }
// `;

// const AddTodoMutation = graphql`
//   mutation App_TodoListAddTodoMutation($task: String!) {
//     addTodo(task: $task) {
//       id
//       task
//       completed
//     }
//   }
// `;

// const RemoveTodoMutation = graphql`
//   mutation App_TodoListRemoveTodoMutation($id: ID!) {
//     removeTodo(id: $id) {
//       id
//     }
//   }
// `;

// function App() {
//   const [queryReference, loadQuery] = useQueryLoader(TodoListQuery);

//   useEffect(() => {
//     if (!queryReference) {
//       loadQuery({});
//     }
//   }, [queryReference, loadQuery]);

//   if (!queryReference) {
//     return (
//       <div className="loader">
//         <div className="loader-icon"></div>
//         <div className="loader-text">Loading...</div>
//       </div>
//     );
//   }

//   return <TodoList queryReference={queryReference} />;
// }

// function TodoList({ queryReference }) {
//   const data = usePreloadedQuery(TodoListQuery, queryReference);

//   const [toggleTodo] = useMutation(ToggleTodoMutation);
//   const [addTodo] = useMutation(AddTodoMutation);
//   const [removeTodo] = useMutation(RemoveTodoMutation);

//   const handleToggleTodo = async (id) => {
//     try {
//       await toggleTodo({
//         variables: { id },
//         onError: (error) => {
//           console.error("Error toggling todo:", error);
//         },
//       });
//     } catch (error) {
//       console.error("Error toggling todo:", error);
//     }
//   };

//   const handleAddTodo = (task) => {
//     addTodo({
//       variables: { task },
//       onError: (error) => {
//         console.error("Error adding todo:", error);
//       },
//       updater: (store) => {
//         const newTodo = store.getRootField("addTodo");
//         const root = store.getRoot();
//         const todos = root.getLinkedRecords("todos");
//         const newTodos = [...todos, newTodo];
//         root.setLinkedRecords(newTodos, "todos");
//       },
//     });
//   };

//   const handleRemoveTodo = async (id) => {
//     try {
//       await removeTodo({
//         variables: { id },
//         onError: (error) => {
//           console.error("Error removing todo:", error);
//         },
//         updater: (store) => {
//           const root = store.getRoot();
//           const todos = root.getLinkedRecords("todos");
//           const updatedTodos = todos.filter(
//             (todo) => todo.getValue("id") !== id
//           );
//           root.setLinkedRecords(updatedTodos, "todos");
//         },
//       });
//     } catch (error) {
//       console.error("Error removing todo:", error);
//     }
//   };

//   return (
//     <div className="todo-container">
//       <h2 className="list-title">Todo List</h2>
//       <AddTodoForm onAddTodo={handleAddTodo} />
//       <ul className="todo-list">
//         {data.todos.length === 0 ? (
//           <div className="empty-message">
//             No todos found. Start by adding some tasks!
//           </div>
//         ) : (
//           data.todos.map((todo) => (
//             <li key={todo.id} className="todo-item">
//               <span className="todo-text">{todo.task}</span>
//               <div className="todo-status">
//                 <input
//                   type="checkbox"
//                   className="custom-checkbox"
//                   checked={todo.completed}
//                   onChange={() => handleToggleTodo(todo.id)}
//                 />

//                 <div
//                   className={`todo-status-tag ${
//                     todo.completed ? "completed" : "pending"
//                   }`}
//                 >
//                   {todo.completed ? "Completed" : "Pending"}
//                 </div>
//               </div>

//               <button
//                 onClick={() => handleRemoveTodo(todo.id)}
//                 className="remove-button"
//               >
//                 Remove
//               </button>
//             </li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;
