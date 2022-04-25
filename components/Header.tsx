import styled from "styled-components";
import Image from "next/image";
import Logo from "../public/static/png/logo/logo.png";
import palette from "../styles/palette";

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 1px 12px;
  z-index: 10;
  .header-logo-wrapper {
    display: flex;
    align-items: center;
    .header-logo {
      margin-right: 6px;
    }
  }

  /* 헤더 로그인 회원가입 버튼 */
  .header-auth-buttons {
    .header-sign-up-button {
      height: 42px;
      margin-right: 8px;
      padding: 0 16px;
      border: 0;
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: ${palette.gray_f7};
      }
    }
    .header-login-button {
      height: 42px;
      padding: 0 16px;
      border: 0;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
      border-radius: 21px;
      background-color: white;
      cursor: pointer;
      outline: none;
      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
`;

export const Header: React.FC = () => {
  return (
    <Container>
      <div className="header-logo-wrapper">
        <Image
          className="header-logo"
          src={Logo}
          alt="Logo"
          width={30}
          height={30}
        />
      </div>
      <div className="header-auth-buttons">
        <button type="button" className="header-sign-up-button">
          회원가입
        </button>
        <button type="button" className="header-login-button">
          로그인
        </button>
      </div>
    </Container>
  );
};
