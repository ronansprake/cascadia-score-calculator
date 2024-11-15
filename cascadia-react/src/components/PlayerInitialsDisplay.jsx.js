export default function PlayerInitialsDisplay({currentPlayerCount}) {
  const rows = [];
  for (var i = 1; i <= currentPlayerCount; i++) {
    rows.push(i);
  }
  if (rows.length > 1) {
    return (
      <div className="player-multi js-player-multi">
        <h2 className="group-label hide">Player initials</h2>
        <ul className="rows no-margin-top">
          <li className="row end">
            <div className="row-label"data-i18n="player">Player</div>
            { rows.map( (text) => <PlayerInitialControl key={text} player={text} /> ) }
          </li>
        </ul>
      </div>
    );
  }
}

function PlayerInitialControl({player}) {

  const rowClass = "initials player-" + player;
  const inputId = "player-" + player + "-initials";

  return (
    <div className={rowClass}>
      <label htmlFor={inputId}>Player {player} initials</label>
      <input id={inputId} type="text" maxLength="2" />
    </div>
  );
}