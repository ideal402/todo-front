import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import AlertModal from "../components/AlertModal";

const LoginPage = ({user, setUser}) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
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
      const response = await api.post("/user/login", { email, pw });
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        setError("");
        setUser(response.data.findUser);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error.error);
      handleOpenModal();
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/main");
    }
  }, [user, navigate]);

  if(user){
    return <Navigate to="/main"></Navigate>
  }

  return (
    <div className="display-center">
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: '#54735F'}}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: '#54735F'}}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPw(event.target.value)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <div className="link-box">
            <div className="link-line">
              <div style={{marginRight:'5px'}}>계정이 없다면?</div>
              <Link className="link" to="/register">회원가입 하기</Link>
            </div>
            {/* <div className="link-line">
              <div style={{marginRight:'5px'}}>비밀번호를 잊으셨나요? </div>
              <Link className="link" to="/find">비밀번호 찾기</Link>
            </div> */}
          </div>
        </div>
      </Form>
      <AlertModal
        isOpen={isModalOpen}
        message={error}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default LoginPage;
