import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StartWrap = styled.div`
  position: relative;
`;

const Startimg = styled.div`
  position: relative;
  display: inline-block;
`;

const ClickableArea = styled.div`
  position: absolute;
  top: 634px;
  left: 350px;
  width: 160px;
  height: 120px;
  background-color: rgba(0, 0, 0, 0);
  pointer-events: auto; /* 클릭 이벤트를 받아들일 수 있도록 설정 */
`;
const ClickBox = styled.div`
  position: absolute;
  top: 514px; /* 이미지 내에서 원하는 위치로 조정 */
  left: 350px; /* 이미지 내에서 원하는 위치로 조정 */
  width: 160px;
  height: 120px;
  background-color: rgba(0, 0, 0, 0);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
  color: white;
`;

const BlockingBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  pointer-events: none; /* 클릭 이벤트를 무시하도록 설정 */
`;

function Start() {
  return (
    <StartWrap>
      <BlockingBackground />
      <Startimg>
        <img
          src="/image/startimage.gif"
          alt="시작 페이지 이미지"
          width="1920"
          height="940"
        />
        <ClickBox>Click!</ClickBox>
        <ClickableArea as={Link} to="/home" />
      </Startimg>
    </StartWrap>
  );
}

export default Start;
