// Import necessary dependencies 
import React from "react";
import style from "./EnrolledDetails.module.css";
import checked from "../../misc/checked.png"
import unchecked from "../../misc/unchecked.png"
import coursesData from "../../../data/courses.json";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { courseSelector, removeFromCartThunk, toggleCompletedThunk } from "../../../redux/reducers/courseReducer";
import { setLoggedIn, setUserLoggedIn} from "../../../redux/reducers/authReducer";
import { useEffect } from "react";

// Enrolled Deails Page
function EnrolledDetails() {

  const dispatch = useDispatch();

  const {enrolledId} = useParams();
  const {cart} = useSelector(courseSelector);
  const course = coursesData.find((course) => course.id === enrolledId);

  const completed = useSelector(courseSelector).completed;

  const cartItem = cart.find((item) => item.title === course.title);
  
  const dueDate = cartItem?.dueDate;
  
  // Format the due date for display, or display 'N/A' if no due date is available
  const formattedDueDate = dueDate ? new Date(dueDate).toLocaleDateString() : 'N/A';

  // Use an effect to check for user authentication and retrieve user data from local storage
  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if(token){
      const index = window.localStorage.getItem("index");
      const user = JSON.parse(index);

      dispatch(setLoggedIn(token));
      dispatch(setUserLoggedIn(user));
    }
  }, [])


  return (
    <>
    <Link to="/enrolled">
      <h2>{"<< BACK"}</h2>
    </Link>
    <div className={style.courses_container}>
      

      <span 
          className={style.toggle_complete}
          onClick={() => dispatch(toggleCompletedThunk())}
          >
            {!completed ? <img src={unchecked} alt="not-complete"/> : <img src={checked} alt="completed"/>}
      </span>

      <div className={style.card_container}>
        <div className={style.card_image}>
          <div className={style.image_container}>
            <img src={course.img} alt="icons" />
          </div>
        </div>
        <div className={style.card_content}>

          <h1 className={style.card_title}>{course.title}</h1>
          <br />
          <h4> Instructor for this course is <u>{course.instructor}</u></h4>
          <br />
          <p className={style.card_description}>{course.description}</p>
        </div>

        <div className={style.dueDate}>
          <br />
          <h2>Due Date: {formattedDueDate} </h2>
        </div>

      </div>

      <div className={style.btn_container}>
        <Link to={`/learn/${course.id}`}>
          <button className={style.button_73}>
            Start Learning
          </button>
        </Link>
      </div>

      <div className={style.btn_container}>
        <Link to={"/enrolled"}>
          <button 
          className={style.button_82_pushable}
          onClick={() => dispatch(removeFromCartThunk(course))} 
          >
            <span className={style.button_82_shadow}></span>
            <span className={style.button_82_edge}></span>
            <span className={style.button_82_front} text>
              Remove Course
            </span>
          </button>
        </Link>
      </div>

    </div>
    </>);
}

export default EnrolledDetails;
