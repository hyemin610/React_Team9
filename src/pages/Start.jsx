import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StartWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000; /* 선택적으로 배경색 지정 */
`;

const Startimg = styled.div`
  img {
    max-width: 100vw;
    max-height: 100vh;
    object-fit: cover;
  }
`;

const ClickBox = styled.div`
  position: absolute;
  top: 190px;
  left: 702px;
  width: 80px;
  height: 70px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  color: white;
`;

function Start() {
  return (
    <StartWrap>
      <Startimg>
        <Link to="/home">
          <img src="/image/startimage.gif" alt="시작 페이지 이미지" />
          <ClickBox>Click!</ClickBox>
        </Link>
      </Startimg>
    </StartWrap>
  );
}

export default Start;
