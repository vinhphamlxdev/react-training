import * as React from "react";
import styled from "styled-components";
export default function LoadingButton(props) {
  return <StyledLodingBtn></StyledLodingBtn>;
}
const StyledLodingBtn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 99rem;
  position: relative;
  margin: 0 auto;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    border: 4px solid transparent;
    border-right-color: #fff;
    border-bottom-color: #fff;
    animation: circleLoading 1s forwards infinite linear;
  }

  @keyframes circleLoading {
    to {
      transform: rotate(360deg);
    }
  }
`;
