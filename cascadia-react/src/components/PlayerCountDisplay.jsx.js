export default function PlayerCountDisplay({currentPlayerCount, setCurrentPlayerCount, resetScores, calculateHabitatBonuses}) {
  const rows = [];
  for (var i = 1; i < 7; i++) {
    rows.push(i);
  }
  function handleOnClick(text) {
    setCurrentPlayerCount(text);
    window.console.log(text);
    window.console.log(currentPlayerCount);
    setBodyData(text);
    if (currentPlayerCount === 1 || text === 1) {
      resetScores();
    }
    calculateHabitatBonuses(text);
  }

  return (
    <fieldset className="players">
      <legend>Players</legend>
      <ul>
        { rows.map( (text) => <PlayerCountControl key={text} playerCount={text} onClick={() => {handleOnClick(text)}} isChecked={currentPlayerCount === text ? "active" : ""} /> ) }
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