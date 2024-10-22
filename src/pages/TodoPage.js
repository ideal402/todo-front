import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TodoBoard from "../components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "../utils/api";

const TodoPage = ({user, setUser}) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();

  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("🚀 ~ getTasks ~ response:", response.data.data);
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isComplete: false,
        isFlag: false,
      });
      if (response.status === 200) {
        console.log("success");
        setTodoValue("");
        // getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTask = (taskId) => {
    setTodoList(todoList.filter((task) => task._id !== taskId));
  };

  const toggleImportant = async (taskId) => {
    try {
      const response = await api.put(`/tasks/${taskId}`,{
        flag: true,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const response = await api.put(`/tasks/${taskId}`,{
        complete: true,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
        <button className="logout" onClick={handleLogout}>로그아웃</button>
        </Col>
      </Row>
      <Row className="add-item-row">
        <Col>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </div>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        onDelete={handleDeleteTask}
        toggleComplete={toggleComplete}
        toggleImportant={toggleImportant}
      />
    </Container>
  );
};

export default TodoPage;
