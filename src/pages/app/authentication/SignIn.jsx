// Import necessary dependencies 
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { createSessionThunk } from "../../../redux/reducers/authReducer";
import styles from "./Auth.module.css";

// Sign In Page
function SignIn(){
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    // Sign In Form Submit
    async function handleSubmit(e){
        e.preventDefault();

        // Create an object containing email and password from the input fields 
        const data = {
            email:emailRef.current.value,
            password:passwordRef.current.value
        }

        // Dispatch the "createSessionThunk" action with the form data and await the result
        const currentStatus = await dispatch(createSessionThunk(data));

        // Navigate to the homepage ("/") if the login is successful, otherwise stay on the "signin" page
        {currentStatus ? navigate("/") : navigate("/signin")}
    }
    return(
        <div className={styles.container}>
            <div className={styles.inputForm}>

                {/* Heading */}
                <h1>Sign In Page</h1>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <input type="email" 
                        placeholder="Enter Email" 
                        required
                        ref={emailRef} />

                    <br />

                    {/* Password */}
                    <input type="password" 
                        placeholder="Enter Password"
                        required
                        ref={passwordRef} />
                    <br />

                    {/* Submit Button */}
                    <button className={styles.theButton}>Sign In</button>
                </form>
                <br /> 
                <span>Or &nbsp;</span>

                <NavLink to="/signup">
                    Sign-Up Instead
                </NavLink>
            </div>
        </div>
    )
}

export default SignIn;