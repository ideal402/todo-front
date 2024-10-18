import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";
import flagIcon from "../assets/flag.png"

const TodoItem = ({ item, onDelete, toggleComplete, toggleImportant }) => {
  const taskId = item._id;
  
  const deleteTask = async () => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      if (response.status === 200) {
        console.log("delete success");
        onDelete(taskId);
      } else {
        throw new Error("delete fail");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-item-left">
            <button className={`button-complete ${item.isComplete ? "button-completed" : ""}`} onClick={() => toggleComplete(item._id)}>
            </button>
            {item.isFlag ? <img className="flag" src={flagIcon}/>:<></>}
            <div className="todo-content">{item.task}</div>
          </div>

          <div>
            <button
              className="button-delete"
              onClick={() => toggleImportant(item._id)}
            >
              중요
            </button>
            <button className="button-delete" onClick={deleteTask}>
              삭제
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
