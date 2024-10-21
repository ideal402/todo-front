import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import AlertModal from "../components/AlertModal";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [secPw, setSecPw] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (name === "" || pw === "" || secPw === "" || email === "") {
        throw new Error("내용을 입력해주세요");
      }
      if (pw !== secPw) {
        throw new Error("패스워드가 일치하지 않습니다.");
      }
      const response = await api.post("/user", { name, email, pw });
      if (response.status === 200) {
        navigate("/login");
      } 

    } catch (error) {
      if(error.error){
        setError(error.error)
      }
      else{
        setError(error.message)
      }
      handleOpenModal();
    }
  };

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPw(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            type="password"
            placeholder="re-enter the password"
            onChange={(event) => setSecPw(event.target.value)}
          />
          {secPw !== "" && pw !== secPw ? (
            <div className="alert-red">비밀번호가 일치하지 않습니다.</div>
          ) : (
            <></>
          )}
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
      <AlertModal
        isOpen={isModalOpen}
        message={error}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RegisterPage;
