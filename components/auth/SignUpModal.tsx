import styled from "styled-components";
import palette from "../../styles/palette";
import {
  AiOutlineClose,
  AiOutlineMail,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

const Container = styled.div`
  width: 568px;
  padding: 32px;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }

  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
    input {
      position: relative;
      width: 100%;
      height: 46px;
      padding: 0 44px 0 11px;
      border: 1px solid ${palette.gray_eb};
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      ::placeholder {
        color: ${palette.gray_76};
      }
    }

    svg {
      position: absolute;
      right: 11px;
      top: 16px;
    }
  }
`;

export const SignUpModal: React.FC = () => {
  return (
    <Container>
      <AiOutlineClose className="modal-close-x-icon" />
      <div className="input-wrapper">
        <input placeholder="이메일 주소" type="email" name="email" />
        <AiOutlineMail />
      </div>
      <div className="input-wrapper">
        <input placeholder="이름(예:길동)" />
        <BsPerson />
      </div>
      <div className="input-wrapper">
        <input placeholder="성(예: 홍)" />
        <BsPerson />
      </div>
      <div className="input-wrapper">
        <input placeholder="비밀번호 설정하기" type="password" />
        <AiOutlineEyeInvisible />
      </div>
    </Container>
  );
};
