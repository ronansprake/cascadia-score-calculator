import { useState } from 'react';

export default function PlayerCountDisplay({currentPlayerCount, setCurrentPlayerCount, resetScores}) {
  const rows = [];
  for (var i = 1; i < 7; i++) {
    rows.push(i);
  }
  const handleOnClick = (text) => {
    setCurrentPlayerCount(text);
    setBodyData(text);
    if (currentPlayerCount == 1 || text == 1) {
      resetScores();
    }
  };
  return (
    <fieldset className="players">
      <legend>Players</legend>
      <ul>
        { rows.map( (text) => <PlayerCountControl key={text} playerCount={text} onClick={() => {handleOnClick(text)}} isChecked={currentPlayerCount == text ? "active" : ""} /> ) }
      </ul>
    </fieldset>
  );
}

function PlayerCountControl({playerCount, onClick, isChecked}) {

  return (
    <li>
      <button onClick={onClick} className={isChecked}>{playerCount}</button>
    </li>
  );
}

function setBodyData(i) {
  return document.body.dataset.players = i;
}