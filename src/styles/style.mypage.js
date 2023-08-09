import { styled } from "styled-components";

export const Allpage = styled.div`
  /* border: 1px solid black; */
  display: flex;
  text-align: row;
  /* justify-content: space-between; */
`;

export const Profile = styled.div`
  border: 1px solid black;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Nickname = styled.div`
  font-weight: bold;
  font-size: 30px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto 100px 2px;
`;

export const Content = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  width: 300px;
  height: 200px;
  margin-left: 30px;
  margin-top: 10px;
`;
