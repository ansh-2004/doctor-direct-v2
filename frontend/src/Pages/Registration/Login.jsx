import React from 'react'
import Template from '../../Components/Registration/Template'
import { useSearchParams } from 'react-router-dom';
import ResetPassword from './ResetPassword';
const Login = () => {

  const { resetToken } = useSearchParams();

  return (
    resetToken ? <ResetPassword /> : <Template formType="login" />
  );
  // return (
  //   {
  //     resetToken ? (<ResetPassword/> ) : (<Template 
  //       formType = "login"
  //     />)
  //   }
  //   // <Template 
  //   //   formType = "login"
  //   // />
  // )
}

export default Login;