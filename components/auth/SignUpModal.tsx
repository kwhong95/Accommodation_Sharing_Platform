import { useState } from "react";
import styled from "styled-components";
import {
  AiOutlineClose,
  AiOutlineMail,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

import { Input, Selector } from "../common";
import palette from "../../styles/palette";
import { monthList } from "../../lib/staticData";

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

  .sign-up-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }
`;

export const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const onChangeFirstname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <Container>
      <AiOutlineClose className="modal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          name="email"
          icon={<AiOutlineMail />}
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름(예:길동)"
          icon={<BsPerson />}
          value={lastname}
          onChange={onChangeLastname}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성(예: 홍)"
          icon={<BsPerson />}
          value={firstname}
          onChange={onChangeFirstname}
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={hidePassword ? "password" : "text"}
          icon={
            hidePassword ? (
              <AiOutlineEyeInvisible onClick={toggleHidePassword} />
            ) : (
              <AiOutlineEye onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <p className="sign-up-birthday-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인 회원으로 가입할 수 있습니다. 생일은 다른 이용자에게
        공개되지 않습니다.
      </p>
      <Selector
        options={monthList}
        disabledOptions={["월"]}
        defaultValue="월"
      />
    </Container>
  );
};
