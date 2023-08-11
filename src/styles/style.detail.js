import { styled } from "styled-components";

export const FormContainer = styled.div`
  display: flex;
`;
export const selected = styled.div`
  background-color: #4caf50; //Green color
  color: white;
`;

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const VoteButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const VoteButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: ${({ isActive }) => (isActive ? "gray" : "transparent")};
  border: 1px solid gray;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: gray;
    color: white;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProgressBar = styled.div`
  flex: 1;
  position: relative;
  height: 20px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`;

export const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background-color: white;
  border-radius: 5px;
`;
