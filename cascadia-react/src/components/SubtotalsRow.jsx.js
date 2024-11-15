export default function TotalsRow({category, currentPlayerCount, getTotalScoreByPlayer}) {
  const rows = [];
  if (currentPlayerCount === 1) {
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
      <h2 className="row-label">{category}</h2>
      { rows.map( (text) => <PlayerTotal key={text[0]} category={category} player={text[0]} getTotalScoreByPlayer={getTotalScoreByPlayer} /> ) }
    </>
  );
}

function PlayerTotal({category, player, getTotalScoreByPlayer}) {

  const rowClass = "total-score player-" + player;

  return (
    <div className={rowClass}>{ getTotalScoreByPlayer(category, player - 1) }</div>
  );
}
