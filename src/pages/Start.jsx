import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Start() {
  return (
    <StartWrap>
      <Startimg>
        <Link to="/home">
          <img
            src="/image/startimage.gif"
            alt="시작 페이지 이미지"
            width="1920"
            height="940"
          />
        </Link>
      </Startimg>
    </StartWrap>
  );
}

export default Start;

const StartWrap = styled.div``;

const Startimg = styled.div``;
