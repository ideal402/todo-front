// AlertModal.js
import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.h3`
  margin: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;

const ModalBody = styled.p`
  font-size: 16px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: 8AA696;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #666;
  }
`;

const AlertModal = ({ isOpen, message, onClose }) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Alert</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ButtonContainer>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ButtonContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default AlertModal;
