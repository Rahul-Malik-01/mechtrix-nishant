import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux"
// import login from './authAPI';
function App() {
  // const dispatch = useDispatch()
  const [justifyActive, setJustifyActive] = useState('tab1');;
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [done, setDone] = useState('');
  const [password , setPassword] = useState('');
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // })
  // const { email, password } = formData
  // const handleOnChange = (e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [e.target.name]: e.target.value,
  //   }))
  // }
  // const handleOnSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(login(email, password, navigate))
  // }

  const createUser = async (data) => {
    try {
      const savedUserResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/createUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      });

      const savedUserResult = await savedUserResponse.json();

      if (savedUserResult.success) {
        setDone(`You have successfully signed. Please Login 🥳`)
        // User created successfully
      } else {
        // User already exists or other error occurred
        console.log('Error:', savedUserResult.message);
        setError(savedUserResult.message);
        // Display the error message to the user or perform any other action
      }
    } catch (error) {
      console.log('Error:', error.message);
      // Handle the error or display an error message to the user
    }
  };


      const handleFirstNameChange = (event) => {
          setFirstName(event.target.value);
        };        
      const handleLastNameChange = (event) => {
          setLastName(event.target.value);
        };
      const handleEmailChange = (event) => {
          setEmail(event.target.value);
        };   
      const handlePasswordChange = (event) => {
          setPassword(event.target.value);
        };
        // const handleSubmit = (event) => {
        //   event.preventDefault(); // Prevents the default form submission behavior
      
        //   // Perform any necessary validation or processing here
        //   // For example, you can send the form data to a server or update the state
      
        //   console.log('Submitted email:', email, firstName,lastName,password);
        // };

        const loginUser = async (data) => {
          try {
            const loginResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/loginUser`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...data }),
            });
        
            const loginResult = await loginResponse.json();
        
            if (loginResult.success) {
              // Login successful
              navigate('/landing');
            } else {
              // Invalid email or password
              console.log('Error:', loginResult.message);
              setError1(loginResult.message);
              // Display the error message to the user or perform any other action
            }
          } catch (error) {
            console.log('Error:', error.message);
            // Handle the error or display an error message to the user
          }
        };
        
  // const handleJustifyClick = (value) => {
  //   if (value === justifyActive) {
  //     return;
  //   }

  //   setJustifyActive(value);
  // };
const handleJustifyClick = (value) => {
  setJustifyActive(value);
  setError(''); // Clear any previous error messages
};

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

      <MDBTabsPane show={justifyActive === 'tab1'}>
  <div className="text-center mb-3">
    <p>Log in with:</p>
  </div>

  <MDBInput
    value={email}
    onChange={handleEmailChange}
    wrapperClass='mb-4'
    label='Email address'
    id='form1'
    type='email'
  />

  <MDBInput
    value={password}
    onChange={handlePasswordChange}
    wrapperClass='mb-4'
    label='Password'
    id='form2'
    type='password'
  />

  <div className="d-flex justify-content-between mx-4 mb-4">
    {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
    <a href="!#">Forgot password?</a>
  </div>

  <MDBBtn type="submit" className="mb-4 w-100" onClick={() => loginUser({ email, password })}>
    Sign in
  </MDBBtn>
  <p>{error1}</p>
  <p className="text-center">
    Not a member?{" "}
    <MDBTabsLink
      onClick={() => {
        handleJustifyClick("tab2");
        setError(""); // Clear any previous error messages
      }}
      active={justifyActive === "tab2"}
    >
      Register
    </MDBTabsLink>
  </p>
</MDBTabsPane>


        <MDBTabsPane show={justifyActive === 'tab2'}>
        <form onSubmit={handleSubmit(createUser)}>
          <div className="text-center mb-3">
            <p>Get Sign in:</p>
          </div>

          <MDBInput {...register("name")} wrapperClass='mb-4' label='First Name' id='form1' type='text'/>
          {/* <MDBInput {...register("email")} wrapperClass='mb-4' label='Last Name' id='form1' type='text'/> */}
          <MDBInput {...register("email")} wrapperClass='mb-4' label='Email' id='form1' type='email'/>
          <MDBInput {...register("password")} wrapperClass='mb-4' label='Password' id='form1' type='password'/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn type='submit' className="mb-4 w-100">Sign up</MDBBtn>
          </form>
          <p>{error}</p>
          <p>{done}</p>
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default App;