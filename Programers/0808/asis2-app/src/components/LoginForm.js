import styled from "@emotion/styled";
import Input from "./Input"
import Button from "./Button";
import useForm from "../hooks/useForm";

const CardForm = styled.form`
   padding: 16px;
   width: 400px;
   background-color: white;
   box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
   box-sizing: border-box;
`

const Title = styled.h1`
   font-size: 24px;
   text-align: center;
`

const sleep = () => {
   return new Promise((resolve) => {
      setTimeout(() => resolve(), 1000)
   })
}

const LoginForm = ({ onSubmit }) => {
   const { values, errors, handleChange, handleSubmit } = useForm({
      initialValues: {
         id: "",
         password: ""
      },
      onSubmit: async () => {
         await sleep()
         console.log("Submit")
      },
      validate: ({ id, password }) => {
         const newErrors = {}
         if (!id) newErrors.id = "ID를 입력해주세요."
         if (!password) newErrors.password = "비밀번호를 입력해주세요."
         return newErrors
      }
   })

   console.log(values, errors)

   return (
      <CardForm onSubmit={handleSubmit}>
         <Title>Login</Title>
         <Input 
            type="text" 
            name="id" 
            placeholder="ID" 
            onChange={handleChange} 
            style={{marginBottom: 6}}
         />
         <Input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            style={{marginBottom: 10}}
         />
         <Button type="submit">Login</Button>
      </CardForm>
   )
}

export default LoginForm