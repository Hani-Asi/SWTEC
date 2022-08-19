import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: ${({ block }) => (block ? "block" : "inline-block")};
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid ${({ invalid }) => (invalid ? "red" : "gray")};
  border-radius: 4px;
  box-sizing: border-box;
`;

const Input = ({
  label,
  block = false, // input박스가 100%로 길어짐
  invalid = false, // 라벨 빨간 테두리로 바뀜
  required = false, //
  disabled = false, // 입력 불가
  readonly = false, // 클릭은 되는데 입력 불가
  wrapperProps,
  ...props
}) => {
  return (
    <Wrapper block={block} {...wrapperProps}>
      <Label>{label}</Label>
      <StyledInput
        invalid={invalid}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        {...props}
      />
    </Wrapper>
  );
};

export default Input;
