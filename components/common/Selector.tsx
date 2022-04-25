/* eslint-disable indent */
import styled from "styled-components";
import { AiOutlineDown } from "react-icons/ai";

import palette from "../../styles/palette";

const Container = styled.div`
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;

  select {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    font-size: 16px;

    &:focus {
      border-color: ${palette.dark_cyan};
    }
  }

  svg {
    position: relative;
    right: 30px;
  }
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
}

export const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  ...props
}) => {
  return (
    <Container>
      <select {...props}>
        {disabledOptions.map((option, idx) => (
          <option key={idx} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      <AiOutlineDown />
    </Container>
  );
};
