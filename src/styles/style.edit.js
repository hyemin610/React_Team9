import { styled } from "styled-components";

export const FormContainer = styled.form`
  width: 80%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
`;

export const TitleInput = styled.input`
  width: 80%;
  height: 50px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgrey;
  padding: 4px;
  box-sizing: border-box;
`;

export const ChoiceContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ChoiceInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgrey;
  padding: 4px;
  box-sizing: border-box;
`;

export const BoldSpan = styled.span`
  margin: 0 10px;
  font-size: 18px;
  font-weight: bold;
`;

export const ContentTextarea = styled.textarea`
  resize: none;
  width: 80%;
  height: 40%;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightgrey;
  padding: 8px;
  box-sizing: border-box;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;
`;

export const EditButton = styled.button`
  flex: 1;
  height: 40px;
  border: none;
  color: white;
  border-radius: 8px;
  background-color: darkorange;
  cursor: pointer;
  font-size: 16px;
  min-width: 100px;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 40px;
  border: none;
  color: white;
  border-radius: 8px;
  background-color: skyblue;
  cursor: pointer;
  font-size: 16px;
  min-width: 100px;
`;
