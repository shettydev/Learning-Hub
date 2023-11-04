import React from "react";
import styles from "./Chapter.module.css";
import { useParams, useOutletContext } from "react-router-dom";

// Chapter Page
function Chapter() {
  const {chapterId} = useParams();
  const course = useOutletContext();

  // Find the chapter data that matches the "chapterId"
  const chapter = course.chapters.find((chap) => String(chap.chapter) === chapterId);

  return (
    <div>
      {/* Display the chapter title */}
      <h1>{chapter.title}</h1>

      {/* Display the chapter description */}
      <h2>{chapter.description}</h2>

      {/* Display the chapter details with specific styling */}
      <p className={styles.para}>{chapter.details}</p>
      <br />
      <br />
      <div className={styles.videos}>
        
        {/* Embed a video using an iframe element */}
        <iframe
          width="800"
          height="560"
          src={chapter.video}
          title="React Video"
          frameborder="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Chapter;
