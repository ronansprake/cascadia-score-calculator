import { useState } from 'react';

export default function TotalsRow({type, currentPlayerCount, getTotalScoreByPlayer}) {
  const rows = [];
  if (currentPlayerCount == 1) {
    currentPlayerCount = 2;
  }
  for (var i = 1; i <= currentPlayerCount; i++) {
    const input = [
      i
    ]
    rows.push(input);
  }
  return (
    <>
      <h2 className="row-label">{type}</h2>
      { rows.map( (text) => <PlayerTotal key={text[0]} type={type} player={text[0]} getTotalScoreByPlayer={getTotalScoreByPlayer} /> ) }
    </>
  );
}

function PlayerTotal({type, player, getTotalScoreByPlayer}) {

  const rowClass = "total-score player-" + player;

  return (
    <div className={rowClass}>{ getTotalScoreByPlayer(type, player - 1) }</div>
  );
}
