import React, { useEffect, useState } from "react";
import "./login.scss"
// import Form from "react-bootstrap/Form";

// import Button from "react-bootstrap/Button";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import { signin } from "../../actions/userActions";






const SignInUser = () => {
  return (
    <div>SignInUser</div>
  )
}

export default SignInUser

//  const SignInUser = () => {

//   const dispatch = useDispatch()
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const userSignin = useSelector((state)=> state.userSignin);
//    const { userInfoData , loading , error} = userSignin;

//   function validateForm() {

//     return email.length > 0 && password.length > 0;

//   }

//   function handleSubmit(event) {

//     event.preventDefault();
//     dispatch(signin(email, password))
    
//   }

// //   useEffect(()=>{
// //     if(userInfo){
// //        navigate('/home');
// //     }
// // },[userInfo]);

//   return (

//     <div className="loginBox">
//      <div>
//           {loading ? (
//             <h2>Loading ....</h2>
//           ) : (

//       <>
//       <div>
//       <p>{error}</p>
//       </div>
//       <Form onSubmit={handleSubmit}>

//         <Form.Group size="lg" controlId="email">

//           <Form.Label>Email</Form.Label>

//           <Form.Control

//             autoFocus

//             type="email"

//             value={email}

//             onChange={(e) => setEmail(e.target.value)}

//           />

//         </Form.Group>

//         <Form.Group size="lg" controlId="password">

//           <Form.Label>Password</Form.Label>

//           <Form.Control

//             type="password"

//             value={password}

//             onChange={(e) => setPassword(e.target.value)}

//           />

//         </Form.Group>
//       <br/>
//         <Button block size="lg" type="submit" >

//           Login

//         </Button>

//       </Form>
//       </>
//           )}
//           </div>
//     </div>

//   );

// }


// export default SignInUser