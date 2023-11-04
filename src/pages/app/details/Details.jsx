// Import necessary dependencies 
import React from "react";
import { useEffect } from "react";
import style from "./Details.module.css";
import coursesData from "../../../data/courses.json";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "../../../redux/reducers/courseReducer";
import { setLoggedIn, setUserLoggedIn } from "../../../redux/reducers/authReducer";

// Details Page
function Details() {

  const dispatch = useDispatch();

  const {courseId} = useParams();
  const course = coursesData.find((course) => course.id === courseId);


  // Use an effect to check for user authentication and retrieve user data from local storage
  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if(token){
      const index = window.localStorage.getItem("index");
      const user = JSON.parse(index);

      // Dispatch actions to update user login status and user data in the Redux store
      dispatch(setLoggedIn(token));
      dispatch(setUserLoggedIn(user));
    }
  }, [])

  return (
    <>
    {/* Back link to courses page */}
    <Link to="/courses">
          <h2>{"<< BACK"}</h2>
    </Link>


    <div className={style.courses_container}>
      
      <div className={style.card_container}>

        {/* Display course image */}
        <div className={style.card_image}>
          <div className={style.image_container}>
            <img src={course.img} alt="icons" />
          </div>
        </div>

        {/* Display course title, instructor, & description */}
        <div className={style.card_content}>

          <h1 className={style.card_title}>{course.title}</h1>  
          <br />
          <h4> Instructor for this course is <u>{course.instructor}</u></h4>
          <br />
          <p className={style.card_description}>{course.description}</p>
        </div>

      </div>

      {/* Enroll button to add the course */}
      <div className={style.btn_container}>

        <button 
        className={style.button_73}
        onClick={() => dispatch(addToCartThunk(course))} 
        >
          Enroll
        </button>

      </div>

    </div>
    </>);
}

export default Details;
