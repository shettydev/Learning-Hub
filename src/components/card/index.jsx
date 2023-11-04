// Import necessary dependencies 
import React from "react";
import style from "./style.module.css";

// Function Component Card
function Card({ title, img, id, instructor }) {
  return (
    <div style={{ cursor: "pointer" }} className={style.card_container}>

      {/* Render the course card container with pointer cursor */}
      <div className={style.card_image}>

        {/* Render the course image container */}
        <div className={style.image_container}>
          <img src={img} alt="icons" />
        </div>
      </div>

      {/* Render the content container of the course card */}
      <div className={style.card_content}>
        <h1 className={style.card_title}>{title}</h1>
        <small>Instructor: <i>{instructor}</i></small>
      </div>
    </div>
  );
}

export default Card;
