// Import necessary dependencies 
import styles from "./Auth.module.css";

import { createUserThunk } from "../../../redux/reducers/authReducer";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";


// Sign Up Page
function SignUp(){

    const dispatch = useDispatch()

    const nameRef = useRef()
    const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    // Handle Sign Up Form Submit
    function handleSubmit(e){
        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        } 

        // Access the createUser thunk from the auth reducer
        dispatch(createUserThunk(data))

        // Navigate to the sign-in page after registration
        navigate("/signin");
    }

    return(
        <>
            {/* Sign Up Container  */}
            <div className={styles.container}>
                <div className={styles.inputForm}>

                    {/* Heading */}
                    <h1>Sign Up Page</h1>

                    {/* Form */}
                    <form onSubmit={handleSubmit}>

                        {/* Name */}
                        <input type="text" 
                            placeholder="Enter Name" 
                            required
                            ref={nameRef} />

                        {/* Email */}
                        <input type="email" 
                            placeholder="Enter Email"
                            required 
                            ref={emailRef}/>

                        {/* Password */}
                        <input type="password" 
                            placeholder="Enter Password"
                            required
                            ref={passwordRef} />
                        {/* Submit Button */}
                        <button className={styles.theButton}>Sign Up</button>
                    </form>
                    <br />
                    <span>Already Have an Account? &nbsp;</span>

                    {/* Sign In Link */}
                    <NavLink to="/signin">
                    Sign-In
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default SignUp;