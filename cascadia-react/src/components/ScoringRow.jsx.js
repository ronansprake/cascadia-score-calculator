export default function ScoringRow({category, rowLabel, currentPlayerCount, currentScores, bonuses, changeScore, rowNumber, end}) {
  const rows = [];
  for (var i = 1; i <= currentPlayerCount; i++) {
    const input = [
      i
    ]
    rows.push(input);
  }
  const rowClass = "row js-row" + (end ? " " + end : "");
  return (
    <li className={rowClass}>
      <h2 className="row-label" data-i18n={rowLabel.toLowerCase()}>{rowLabel}</h2>
      { rows.map( (text) => <PlayerInitialControl key={text[0]} category={category} label={rowLabel.replace(/\s+/g, '-').toLowerCase()} player={text[0]} row={rowNumber} changeScore={changeScore} currentScores={currentScores} bonuses={bonuses} value={currentScores[rowNumber-1][text[0]-1] ? currentScores[rowNumber-1][text[0]-1] : 0} /> ) }
    </li>
  );
}

function PlayerInitialControl({category, label, player, row, currentScores, bonuses, changeScore, ...props}) {
  var bonus = bonuses[row - 1][player - 1];
  if (category === 'habitat') {
    return (
      <div className="counter">
        <label htmlFor={"player-" + player + "-" + label} data-i18n="player">Player {player}</label>
        <button onClick={() => {changeScore(category,row,player,parseInt(currentScores[row-1][player-1]) - 1)}} className="js-decrement" data-player={row + "-" + player} tabIndex="-1">&ndash;</button>
        <div className="input">
          <input onChange={(e) => {changeScore(category,row,player,(e.target.value))}} id={"player-" + player + "-" + label} onContextMenu={(e)=> e.preventDefault()} onFocus={(e)=> { e.target.select(); }} type="number" className="js-score" {...props} />
          <div className="bonus">{bonus > 0 ? bonus : ''}</div>
        </div>
        <button onClick={() => {changeScore(category,row,player,parseInt(currentScores[row-1][player-1]) + 1)}} className="js-increment" tabIndex="-1">+</button>
      </div>
    );  
  } else {
    return (
      <div className="counter">
        <label htmlFor={"player-" + player + "-" + label} data-i18n="player">Player {player}</label>
        <button onClick={() => {changeScore(category,row,player,parseInt(currentScores[row-1][player-1]) - 1)}} className="js-decrement" data-player={row + "-" + player} tabIndex="-1">&ndash;</button>
        <div className="input">
          <input onChange={(e) => {changeScore(category,row,player,(e.target.value))}} id={"player-" + player + "-" + label} onContextMenu={(e)=> e.preventDefault()} onFocus={(e)=> { e.target.select(); }} type="number" className="js-score" {...props} />
        </div>
        <button onClick={() => {changeScore(category,row,player,parseInt(currentScores[row-1][player-1]) + 1)}} className="js-increment" tabIndex="-1">+</button>
      </div>
    );  
  }
}
