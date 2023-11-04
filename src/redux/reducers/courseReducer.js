// Import necessary dependencies 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onSnapshot, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseInit";
import { toast } from "react-toastify";

// Define the initial state 
const initialState = {
    cart:[],
    completed: false,
}


// Create an async Redux thunk for fetching initial cart orders
export const getInitialCartOrdersThunk = createAsyncThunk(
    "course/getCartOrders",
    (args, thunkAPI) => {
        const {authReducer, courseReducer} = thunkAPI.getState();
        const {userLoggedIn, isLoggedIn} = authReducer;

        if(isLoggedIn){
            onSnapshot(doc(db, "learninghub", userLoggedIn.id), (doc) => {
                thunkAPI.dispatch(setCart(doc.data().cart));
            });

            return courseReducer.cart;
        }
    }
)


// Create an async Redux thunk for updating the cart in the database
export const updateCartInDatabase = createAsyncThunk(
    "course/updateCartInDatabase",
    async(args, thunkAPI) => {

        // Get a reference to the user's Firestore document
        const {authReducer, courseReducer} = thunkAPI.getState();
        const { userLoggedIn } = authReducer;

        // Update the user's cart data in the database
        const userRef = doc(db, "learninghub", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: courseReducer.cart
        });
    }
)

// Create an async Redux thunk for toggling the completed state of a course
export const toggleCompletedThunk = createAsyncThunk(
    "course/toggleCompleted",
    async (args, thunkAPI) => {
        const { authReducer, courseReducer } = thunkAPI.getState();
        const {userLoggedIn} = authReducer;
        const { completed } = courseReducer;
    
        // Toggle the completed state
        const updatedCompleted = !completed;
    
        thunkAPI.dispatch(setCompleted(updatedCompleted));

        // Get a reference to the user's Firestore document
        const userRef = doc(db, "learninghub", userLoggedIn.id);

        // Update the completed state in the database
        await updateDoc(userRef, {
            completed: updatedCompleted
        });

        // Display a notification based on the completed state        
        if(completed){
            toast.success("Course Completed!");
        } else{
            toast.error("Course Incomplete!");
        }
        return updatedCompleted;
    }
);



// Create an async Redux thunk for adding a course to the cart
export const addToCartThunk = createAsyncThunk(
    "course/addToCart",
    async (course, thunkAPI) => {
        const { authReducer, courseReducer } = thunkAPI.getState();
        const { isLoggedIn, userLoggedIn } = authReducer;
    
        if (!isLoggedIn) {
            toast.error("Kindly log in first!");
            return;
        }
    
        const updatedCart = [...courseReducer.cart];
    
        // Check if the course is already in the cart
        const index = updatedCart.findIndex((item) => item.title === course.title);
    
        if (index !== -1) {
            toast.error("Already Enrolled!");
            return;
        }

        const dueDate = new Date();

        // Calculate a due date 3 months from the current date
        dueDate.setMonth(dueDate.getMonth() + 3);
        
        updatedCart.push({ ...course, dueDate: dueDate.toISOString()}); 

        // Get a reference to the user's Firestore document        
        const userRef = doc(db, "learninghub", userLoggedIn.id);

        // Update the cart data in the database        
        await updateDoc(userRef, {
            cart: updatedCart, 
        });
    
        thunkAPI.dispatch(setCart(updatedCart));
        toast.success("Enrolled Successfully!");
    }
);


// Create an async Redux thunk for removing a course from the cart
export const removeFromCartThunk = createAsyncThunk(
    "course/removeFromCart",
    async (course, thunkAPI) => {
        const { authReducer } = thunkAPI.getState();
        const { userLoggedIn } = authReducer;

        // Find the user's cart and remove the specific course
        const userRef = doc(db, "learninghub", userLoggedIn.id);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        if (userData && userData.cart) {
            // Find the index of the course to remove
            const index = userData.cart.findIndex((item) => item.title === course.title);

            if (index !== -1) {
                // Remove the course from the cart
                userData.cart.splice(index, 1);

                // Update the cart in the database
                await updateDoc(userRef, {
                    cart: userData.cart
                });

                // Notify successful removal
                toast.error("Course removed from your dashboard!");

                // Return the updated cart
                return userData.cart;
            }
        }

        // Return the existing cart if no removal occurred
        return userData ? userData.cart : [];
    }
);

  

// Define the initial state and reducers for the course slice
const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCart: (state,action) => {
            state.cart = action.payload;
            return;
        },
        setCompleted: (state, action) => {
            state.completed = action.payload;
        },
    }
})

export const courseReducer = courseSlice.reducer;

export const {
    setCart,
    setCompleted,
} = courseSlice.actions;

export const courseSelector = (state) => state.courseReducer;