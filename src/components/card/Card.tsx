import React from "react";
import "./card.css";

interface CardProps {
  customFooterClass: string;
}

export const Card = ({ customFooterClass }: CardProps) => {
  return (
    <div className="container custom-card">
      <div className="card">
        <h3 className="card-header">Write A Blogpost For DAOHelper</h3>
        <div className="card-body">
          <p className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            voluptatem optio tempore
          </p>
        </div>
      </div>
      <div className={`card-footer ${customFooterClass}`}>
        <span>Reward: $5</span>
        <span>Time left: 2 days</span>
      </div>
    </div>
  );
};
