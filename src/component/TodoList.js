import React, { useState } from "react";
import { QueryRenderer, useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import environment from "../relay/environment";
import AddTodoForm from "../AddTodoForm";
import { debounce } from "lodash";

const TodoListQuery = graphql`
  query TodoList_TodoListQuery(
    $filter: TodoFilterInput
    $pagination: PaginationInput
  ) {
    todos(filter: $filter, pagination: $pagination) {
      todos {
        id
        task
        completed
      }
      pageInfo {
        totalPages
        currentPage
        totalResults
        resultsPerPage
      }
    }
  }
`;

const ToggleTodoMutation = graphql`
  mutation TodoList_TodoListToggleTodoMutation($id: ID!) {
    toggleTodoCompleted(id: $id) {
      id
      completed
    }
  }
`;

const AddTodoMutation = graphql`
  mutation TodoList_TodoListAddTodoMutation($task: String!) {
    addTodo(task: $task) {
      id
      task
      completed
    }
  }
`;

const RemoveTodoMutation = graphql`
  mutation TodoList_TodoListRemoveTodoMutation($id: ID!) {
    removeTodo(id: $id) {
      id
    }
  }
`;

const TodoList = () => {
  const [toggleTodo] = useMutation(ToggleTodoMutation);
  const [addTodo] = useMutation(AddTodoMutation);
  const [removeTodo] = useMutation(RemoveTodoMutation);

  const [filter, setFilter] = useState({});

  const [pagination, setPagination] = useState({ skip: 0, take: 5 });

  const handlePrevPage = () => {
    if (pagination.skip > 0) {
      setPagination({ ...pagination, skip: pagination.skip - pagination.take });
    }
  };

  const handleNextPage = (totalResults) => () => {
    if (pagination.skip + pagination.take < totalResults) {
      setPagination({ ...pagination, skip: pagination.skip + pagination.take });
    }
  };

  // filter
  const debouncedFilterChange = debounce((value, callback) => {
    callback(value);
  }, 500);

  const handleFilterChange = (e) => {
    let { name, value } = e.target;
    if (name === "task" && value === "") {
      setFilter((prevFilter) => {
        const { task, ...rest } = prevFilter;
        return rest;
      });
      return;
    }
    if (name === "task") {
      debouncedFilterChange(value, (totalValue) => {
        setFilter((prevFilter) => ({
          ...prevFilter,
          [name]: totalValue,
        }));
      });
    }
    if (name === "completed" && value === "") {
      setFilter((prevFilter) => {
        const { completed, ...rest } = prevFilter;
        return rest;
      });
      return;
    }

    if (name === "completed") {
      value = value === "true";
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
      }));
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      await toggleTodo({
        variables: { id },
        onError: (error) => {
          console.error("Error toggling todo:", error);
        },
      });
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleAddTodo = (task) => {
    addTodo({
      variables: { task },
      onError: (error) => {
        console.error("Error adding todo:", error);
      },
      updater: (store) => {
        const newTodo = store.getRootField("addTodo");
        const viewer = store.getRoot();
        const todosConnection = viewer.getLinkedRecord("todos", {
          filter,
          pagination,
        });
        const todos = todosConnection.getLinkedRecords("todos") || [];
        const updatedTodoList = [...todos, newTodo];
        todosConnection.setLinkedRecords(updatedTodoList, "todos");
      },
    });
  };

  const handleRemoveTodo = async (id) => {
    try {
      await removeTodo({
        variables: { id },
        onError: (error) => {
          console.error("Error removing todo:", error);
        },
        updater: (store) => {
          const viewer = store.getRoot();
          const todosConnection = viewer.getLinkedRecord("todos", {
            filter,
            pagination,
          });
          const todos = todosConnection.getLinkedRecords("todos") || [];
          const updatedTodoList = todos.filter(
            (todo) => todo.getDataID() !== id
          );
          todosConnection.setLinkedRecords(updatedTodoList, "todos");
        },
      });
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  return (
    <QueryRenderer
      environment={environment}
      variables={{ filter, pagination }}
      query={TodoListQuery}
      render={({ error, props }) => {
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!props) {
          return (
            <div className="loader">
              <div className="loader-icon"></div>
              <div className="loader-text">Loading...</div>
            </div>
          );
        } else {
          const { todos, pageInfo } = props.todos;

          return (
            <div className="todo-container">
              <h2 className="list-title">Todo List</h2>
              <div className="filter-section">
                <input
                  type="text"
                  name="task"
                  value={filter.task}
                  onChange={handleFilterChange}
                  placeholder="Search task..."
                  className="filter-input"
                />
                <select
                  name="completed"
                  value={filter.completed}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">All</option>
                  <option value="true">Complete</option>
                  <option value="false">Pending</option>
                </select>
              </div>
              <AddTodoForm onAddTodo={handleAddTodo} />
              <ul className="todo-list">
                {todos.length === 0 ? (
                  <div className="empty-message">
                    No todos found. Start by adding some tasks!
                  </div>
                ) : (
                  todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                      <span className="todo-text">{todo.task}</span>
                      <div className="todo-status">
                        <input
                          type="checkbox"
                          className="custom-checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleTodo(todo.id)}
                        />

                        <div
                          className={`todo-status-tag ${
                            todo.completed ? "completed" : "pending"
                          }`}
                        >
                          {todo.completed ? "Completed" : "Pending"}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveTodo(todo.id)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </li>
                  ))
                )}
              </ul>
              <div className="pagination">
                <button onClick={handlePrevPage}>Previous</button>
                <span>
                  Page {pagination.skip / pagination.take + 1} of{" "}
                  {Math.ceil(pageInfo.totalResults / pagination.take)}
                </span>
                <button onClick={handleNextPage(pageInfo.totalResults)}>
                  Next
                </button>
              </div>
            </div>
          );
        }
      }}
    />
  );
};

export default TodoList;
