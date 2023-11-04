import React from "react";
import style from "./Learn.module.css";
import coursesData from "../../../data/courses.json";
import { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, setLoggedIn, setUserLoggedIn } from "../../../redux/reducers/authReducer";

function Learn() {

  const dispatch = useDispatch();
  const {courseId} = useParams();
  const course = coursesData.find((course) => course.id === courseId);

  const {isLoggedIn} = useSelector(authSelector);

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
    {isLoggedIn ? // Check if User is Logged In
    (
      // Display if User is Logged In
      <div className={style.courses_container}>

      <div className={style.top_head}>
        <Link to="/enrolled">
          <h2 className={style.back}>{"<<BACK"}</h2>
        </Link>

        <h1 className={style.heading}>{course.title}</h1>
      </div>

      <div className={style.chapter_box}>
        <div className={style.chapters}>
          <h1>Chapters</h1>
          <hr />
          <ul>{course.chapters.map((chap, i) => {
            return (
              <div className={style.chapterId} key={i}>
                  <Link to={`chapter/${chap.chapter}`}>
                    {chap.title}
                  </Link>
              </div>
            )
          })}</ul>
        </div>
          
        {/* Render nested routes with course data context */} 
        <div className={style.courses}>
            <Outlet context={{...course}}/>
        </div>
      </div>
    </div>
    ) : 
    (
      // Display if User isn't logged in
      <div className={style.courses_container}>
        <div className={style.heading}>
          <h1>Hmm... Something Seems wrong!</h1>
          <h4>Please Sign in first!</h4>
        </div>
      </div>
    )}
    
</>);
}

export default Learn;
