import React from "react";
import "./card.css";

export const Card = () => {
  return (
    <div className="container">
      <div className="card">
        <h4 className="card-header">Write a blogpost for DAOHelper</h4>
        <div className="card-body">
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            voluptatem optio tempore
          </p>
        </div>
      </div>
      <div className="card-footer bottom-color">Footer</div>
    </div>
  );
};
// {/* <div className="card__body">
//         <span className="tag tag-blue">Technology</span>
//         <h4>What's new in 2022 Tech</h4>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
//           perferendis molestiae non nemo doloribus. Doloremque, nihil! At ea
//           atque quidem!
//         </p>
//       </div>
//       <div className="card__footer">
//         <div className="user">
//           <div className="user__info">
//             <h5>Jane Doe</h5>
//             <small>2h ago</small>
//           </div>
//         </div>
//       </div> */}
