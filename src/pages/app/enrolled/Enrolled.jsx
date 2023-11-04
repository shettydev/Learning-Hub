// Import necessary dependencies 
import style from './Enrolled.module.css';
import Card from '../../../components/card/index';
import { useDispatch, useSelector } from 'react-redux';
import { courseSelector, getInitialCartOrdersThunk } from '../../../redux/reducers/courseReducer';
import { useEffect } from 'react';
import { authSelector, setLoggedIn, setUserLoggedIn } from '../../../redux/reducers/authReducer';
import { Link } from 'react-router-dom';

// Enrolled Page 
function Enrolled() {

    const dispatch = useDispatch();
    const {cart} = useSelector(courseSelector);
    const {userLoggedIn} = useSelector(authSelector);

    // Fetch the initial cart orders from the server when the component mounts    
    useEffect(() => {
        dispatch(getInitialCartOrdersThunk());
    },[userLoggedIn]);

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
        <div className={style.courses_container}>
            {
                cart.length === 0 ? 
                (
                    <div className={style.heading}>
                        <h1>Uh oh... You haven't enrolled to any course!</h1>
                        <h4>Yet...</h4>
                    </div>
                ) :
                (
                    <div className={style.courses}>
                        <div className={style.heading}>
                            <h1>Welcome to Students Dashboard!</h1>
                            <h4>Below are your enrolled courses...</h4>
                        </div>
                        {cart.map((course, index) => (
                            <div key={index} className={style.card_container}>
                                <Link to={`/enrolled/${course.id}`}>
                                <Card
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                img={course.img}
                                instructor={course.instructor}
                                />
                                </Link>
                            </div>
                        ))}
                    </div>
                )
            }
            

        </div>

    );
}

export default Enrolled;
