import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PlayerCountDisplay from './components/PlayerCountDisplay.jsx';
import PlayerInitialsDisplay from './components/PlayerInitialsDisplay.jsx';
import ScoringRow from './components/ScoringRow.jsx';
import SubtotalsRow from './components/SubtotalsRow.jsx';
import TotalsRow from './components/TotalsRow.jsx';
import ResetScores from './components/ResetScores.jsx';
import FixedHeader from './components/FixedHeader.js';
import TranslationControl from './components/TranslationControl.jsx';
import './App.scss';
import './components/i18n';

function App() {

  // Fixes the player initials on scroll
  useEffect(() => {
    FixedHeader();
  });

  const { t } = useTranslation();

  // Define number of scoring rows per section, so blank arrays are correct length
  const wildlifeScoreRows = 5;
  const habitatScoreRows = 5;
  const extraScoreRows = 2;
  const startingPlayerCount = 2;
  
  // Create player, scoring and bonus arrays
  const [currentPlayerCount, setCurrentPlayerCount] = useState(startingPlayerCount);
  const [currentWildlifeScores, setCurrentWildlifeScores] = useState(Array.from({length: wildlifeScoreRows},()=> Array.from({length:6}, () => 0)));
  const [currentHabitatScores, setCurrentHabitatScores] = useState(Array.from({length: habitatScoreRows},()=> Array.from({length:6}, () => 0)));
  const [currentHabitatBonuses, setCurrentHabitatBonuses] = useState(Array.from({length: habitatScoreRows},()=> Array.from({length:6}, () => 0)));
  const [currentExtraScores, setCurrentExtraScores] = useState(Array.from({length: extraScoreRows},()=> Array.from({length:6}, () => 0)));
  
  // Change a score in any category
  const changeScore = (category, row, player, val) => {
    var scores = '';
    if (category === 'wildlife') {
      scores = [...currentWildlifeScores];
    } else if (category === 'habitat') {
      scores = [...currentHabitatScores];
    } else {
      scores = [...currentExtraScores];
    }
    val = parseInt(val,10);
    if (val < 0 || !val) { val = 0 };
    scores[row-1][player-1] = val;
    if (category === 'wildlife') {
      setCurrentWildlifeScores(scores);
    } else if (category === 'habitat') {
      setCurrentHabitatScores(scores);
      // Calculate bonuses on new habitat scores
      calculateHabitatBonuses();
    } else {
      setCurrentExtraScores(scores);
    }
  };

  // Assign bonus points depending on player count
  function calculateHabitatBonuses(playerCount = currentPlayerCount) {
    let bonuses = [...currentHabitatBonuses];
    for (let row = 0; row < habitatScoreRows; row++) {
      const scores = currentHabitatScores[row];
      if (playerCount === 1) {
        if (scores[0] > 6) {
          bonuses[row][0] = 2;
        } else {
          bonuses[row][0] = 0;
        }
      } else {
        let players = [];

        // Create player objects
        for (var i = 0; i < playerCount; i++) {
          var player = {
            number: i + 1,
            score: scores[i],
            bonus: 0
          };
          players.push(player);
        }

        // Sort players by score in descending order
        players.sort((a, b) => b.score - a.score);

        // Calculate find max score and tied players
        let maxScore = players[0].score;
        let tiedPlayers = players.filter(player => player.score === maxScore);

        // Stop current row iteration if scores are all zero
        if (maxScore === 0) {
          for (var j = 0; j < playerCount; j++) {
            bonuses[row][j] = 0;
          }
          continue;
        }

        // Assign first place
        if (tiedPlayers.length === 1) { // One player with the top score = 3 bonus points
          tiedPlayers[0].bonus = (playerCount === 2) ? 2 : 3;
          // Update players array with modified bonus score
          players[players.findIndex(p => p.number === tiedPlayers[0].number)] = tiedPlayers[0];
        } else {
          // Calculate bonus points based on the number of tied players
          let bonusPoints = (tiedPlayers.length >= 3 || playerCount === 2) ? 1 : 2; // 3 or more players tied, or both in 2-player game = 1 point. Otherwise 2 points each

          // Assign bonus points to tied players
          tiedPlayers.forEach(player => {
            player.bonus = bonusPoints;
            // Update players array with modified bonus scores
            players[players.findIndex(p => p.number === player.number)] = player;
          });
        }

        // Assign second place
        if (tiedPlayers.length < 2 && tiedPlayers.length < playerCount) { // Ensure not everyone tied
          let secondPlaceScore = players[tiedPlayers.length].score; // get the next highest score
          let secondPlaceTies = players.filter(player => player.score === secondPlaceScore);
          if (secondPlaceTies.length === 1) {
            secondPlaceTies[0].bonus = (playerCount === 2) ? 0 : 1;
            // Update players array with modified bonus score
            players[players.findIndex(p => p.number === secondPlaceTies[0].number)] = secondPlaceTies[0];
          } // More than one person ties = 0 points
        }

        // Sort players back to original order (1 to 6)
        players.sort((a, b) => a.number - b.number);

        // Prepare bonus values array in player order
        let bonusValues = players.map(player => player.bonus);

        // Update bonus values
        for (var k = 0; k < bonuses[row].length; k++) {
          bonuses[row][k] = bonusValues[k] ? bonusValues[k] : 0;
        }
      }
    }
  }

  // Calculate player score total for any category
  const getTotalScoreByPlayer = (category, player) => {
    let score = 0;
    if (category === 'wildlife') {
      currentWildlifeScores.map( (text) => { return score += text[player] } );
    } else if (category === 'habitat') {
      // Habitat scores are bundled with bonuses (could be shown separately)
      currentHabitatScores.map( (text) => { return score += text[player] } );
      currentHabitatBonuses.map( (text) => { return score += text[player] } );
    } else if (category === 'bonus') {
      currentHabitatBonuses.map( (text) => { return score += text[player] } );
    } else {
      currentExtraScores.map( (text) => { return score += text[player] } );
    }
    return score;
  };

  // Clear down all scores
  const resetScores = () => {
    setCurrentWildlifeScores(Array.from({length: wildlifeScoreRows},()=> Array.from({length: 6}, () => 0)));
    setCurrentHabitatScores(Array.from({length: habitatScoreRows},()=> Array.from({length: 6}, () => 0)));
    setCurrentHabitatBonuses(Array.from({length: habitatScoreRows},()=> Array.from({length: 6}, () => 0)));
    setCurrentExtraScores(Array.from({length: extraScoreRows},()=> Array.from({length: 6}, () => 0)));
    return null;
  };

  return (
    <div className="wrap">
      <h1>Cascadia score calculator</h1>
      <PlayerCountDisplay currentPlayerCount={currentPlayerCount} setCurrentPlayerCount={setCurrentPlayerCount} resetScores={resetScores} calculateHabitatBonuses={calculateHabitatBonuses} />
      <PlayerInitialsDisplay currentPlayerCount={currentPlayerCount} />
      <ul className="rows">
        <ScoringRow category="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Bear" rowNumber="1" />
        <ScoringRow category="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Elk" rowNumber="2" />
        <ScoringRow category="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Hawk" rowNumber="3" />
        <ScoringRow category="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Fox" rowNumber="4" />
        <ScoringRow category="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Salmon" rowNumber="5" end="end" />
      </ul>
      <div className="total-scores subtotals">
        <SubtotalsRow category="wildlife" currentPlayerCount={currentPlayerCount} getTotalScoreByPlayer={getTotalScoreByPlayer} />
      </div>
      <ul className="rows">
        <ScoringRow category="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Mountain" rowNumber="1" />
        <ScoringRow category="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Forest" rowNumber="2" />
        <ScoringRow category="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Prairie" rowNumber="3" />
        <ScoringRow category="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Wetland" rowNumber="4" />
        <ScoringRow category="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="River" rowNumber="5" end="end" />
      </ul>
      <div className="total-scores subtotals">
        <SubtotalsRow category="habitat" currentPlayerCount={currentPlayerCount} getTotalScoreByPlayer={getTotalScoreByPlayer} />
      </div>
      <ul className="rows">
        <ScoringRow category="extra" currentPlayerCount={currentPlayerCount} currentScores={currentExtraScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Tokens" rowNumber="1" />
        <ScoringRow category="extra" currentPlayerCount={currentPlayerCount} currentScores={currentExtraScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Landmarks" rowNumber="2" end="end" />
      </ul>
      <div className="total-scores">
        <TotalsRow currentPlayerCount={currentPlayerCount} getTotalScoreByPlayer={getTotalScoreByPlayer} />
      </div>
      <ResetScores resetScores={resetScores} />
      <p className="links"><a href="https://ronansprake.co.uk/board-game-score-calculators#contact" rel="noreferrer" target="_blank" data-i18n="feedback">{t('Give feedback')}</a> | <a href="https://www.alderac.com/wp-content/uploads/2021/08/Cascadia-Rules.pdf" rel="noreferrer" target="_blank" data-i18n="rules">{t('Official rules')}</a> | <span data-i18n="thanks">{t('Thanks to')}</span> <a href="https://github.com/josh-vin" rel="noreferrer" target="_blank">Josh</a></p>
      <TranslationControl />
    </div>
  );
}

export default App;
