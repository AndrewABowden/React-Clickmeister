import React from "react";
import "./FriendCard.css";

const FriendCard = props => (
  <div className="card"
  onClick={() => props.setClicked(props.id)}
  >
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
    <div className="content">
     {props.name}
     {props.occupation}
     {props.location}
    </div>
    {/* <span onClick={() => props.removeFriend(props.id)} className="remove">
      𝘅
    </span> */}
  </div>
);

export default FriendCard;