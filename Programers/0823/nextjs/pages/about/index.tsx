import styled from "@emotion/styled";
import Link from "next/link";

const About = () => {
  return (
    <div>
      Hello there
      <Box />
      <Link href="/">Go to home</Link>
    </div>
  );
};

export default About;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;
