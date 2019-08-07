import React from 'react';

const Cards = props => {
  return (
    <div class="ui link cards">
    {console.log(props)}
    {props.map(user => {
      return ( 
      <div class="card">
      <div class="content"> 
      <div class="header">{user.name}</div>
     </div>
      </div>
      )})}
      </div>
  );
};

export default Cards;