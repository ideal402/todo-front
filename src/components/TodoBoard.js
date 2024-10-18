import React from "react";
import TodoItem from "./TodoItem";


const sortTodoList = (a, b) => {
  if (a.isFlag && !a.isComplete && (!b.isFlag || b.isComplete)) return -1;
  if (b.isFlag && !b.isComplete && (!a.isFlag || a.isComplete)) return 1;
  
  if (!a.isFlag && !a.isComplete && (b.isFlag || b.isComplete)) return -1;
  if (!b.isFlag && !b.isComplete && (a.isFlag || a.isComplete)) return 1;
  
  if (a.isFlag && a.isComplete && (!b.isFlag || !b.isComplete)) return -1;
  if (b.isFlag && b.isComplete && (!a.isFlag || !a.isComplete)) return 1;
  
  if (a.isComplete && !a.isFlag && (!b.isComplete || b.isFlag)) return 1;
  if (b.isComplete && !b.isFlag && (!a.isComplete || a.isFlag)) return -1;

  return 0;
};

const TodoBoard = ({ todoList, onDelete, toggleComplete, toggleImportant }) => {
  const sortedTodoList = [...todoList].sort(sortTodoList);

  return (
    <div className="todo-board">
      <h2>Todo List</h2>
      {sortedTodoList.length > 0 ? (
        sortedTodoList.map((item) => (
          <TodoItem
            key={item._id}
            item={item}
            onDelete={onDelete}
            toggleComplete={toggleComplete}
            toggleImportant={toggleImportant}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
