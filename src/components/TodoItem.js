import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";

const TodoItem = ({ item, onDelete, toggleImportant }) => {
  const [isComplete, setIsComplete] = useState();
  const taskId = item._id;

  const updateTask = async () => {
    try {
      const response = await api.put(`/tasks/${taskId}`);
      if (response.status === 200) {
        console.log("update success");
        setIsComplete(!isComplete);
      } else {
        throw new Error("update fail");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <div
          className={`todo-item 
            ${isComplete ? "item-complete" : ""} 
            ${item.isFlag ? "item-important" : ""}`
          }
        >
          <div className="todo-content">{item.task}</div>

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
            <button className="button-delete" onClick={updateTask}>
              {isComplete ? "안끝남" : "끝남"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
