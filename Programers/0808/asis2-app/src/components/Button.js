import styled from "@emotion/styled"

const Button = styled.button`
   display: block;
   width: 94%;
   height: 40px;
   padding: 8px 8px;
   font-size: 20px;
   color: white;
   border-radius: 4px;
   border: none;
   outline: none;
   background-color: gray;
   box-sizing: border-box;

   &:hover {
      color: black;
      border: 3px solid black;
      background-color: balck;
   }

   &:active {
      color: balck;
      border: 2px solid black;
      background-color: white;
   }
`

export default Button