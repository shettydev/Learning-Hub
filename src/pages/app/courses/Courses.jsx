// Import necessary dependencies 
import React, { useState, useEffect } from 'react';
import style from './Courses.module.css';
import Card from '../../../components/card/index';
import coursesData from '../../../data/courses.json';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, setLoggedIn, setUserLoggedIn } from '../../../redux/reducers/authReducer';
 
// Courses Page
function Courses() {
  const dispatch = useDispatch();

  const {isLoggedIn} = useSelector(authSelector);

  const [search, setSearch] = useState("");

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
    // Conditional rendering based on user authentication
    <>{isLoggedIn ? 
      (
      <div className={style.courses_container}>
        <div className={style.heading}>
          <h1>Popular Courses</h1>
          <h4>Choose your Katana ⚔️</h4>
        </div>
        <div className={style.search_bar}>
          <input 
          type="text"
          placeholder="Search for the course or instructor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={style.courses}>

          {/* Main Content: Filter and map through course data based on search input */}
          {coursesData.filter((course) => {
            return search.toLocaleLowerCase() === ""
              ? course : 
              course.title.toLocaleLowerCase().includes(search) || 
              course.instructor.toLocaleLowerCase().includes(search);
          })

          .map((course, index) => {
            return (
              <div key={index} className={style.card_container}>
                <Link to={`/courses/${course.id}`}>
                <Card
                key={course.id}
                id={course.id}
                title={course.title}
                img={course.img}
                instructor={course.instructor}
                />
                </Link>
              </div>
            );
          })
          }
/
        </div>
      </div>
      ) : (
        
        // Display a message when the user is not logged in
        <div className={style.courses_container}>
        <div className={style.heading}>
          <h1>Hmm... Something Seems wrong!</h1>
          <h4>Please Sign in first!</h4>
        </div>
      </div>
      )}
    </>
  );
}

export default Courses;
