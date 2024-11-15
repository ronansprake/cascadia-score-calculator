import { useState } from 'react';
import { useEffect } from 'react';
import translator from "./components/translator";
import PlayerCountDisplay from './components/PlayerCountDisplay.jsx';
import PlayerInitialsDisplay from './components/PlayerInitialsDisplay.jsx';
import ScoringRow from './components/ScoringRow.jsx';
import SubtotalsRow from './components/SubtotalsRow.jsx';
import TotalsRow from './components/TotalsRow.jsx';
import ResetScores from './components/ResetScores.jsx';
import FixedHeader from './components/FixedHeader.js';
import './App.scss';

function App() {

  useEffect(() => {
      FixedHeader();
  });

  const wildlifeScoreRows = 5;
  const habitatScoreRows = 5;
  const extraScoreRows = 2;
  const [currentPlayerCount, setCurrentPlayerCount] = useState(2);
  const [currentWildlifeScores, setCurrentWildlifeScores] = useState(Array.from({length: wildlifeScoreRows},()=> Array.from({length:6}, () => 0)));
  const [currentHabitatScores, setCurrentHabitatScores] = useState(Array.from({length: habitatScoreRows},()=> Array.from({length:6}, () => 0)));
  const [currentHabitatBonuses, setCurrentHabitatBonuses] = useState(Array.from({length: habitatScoreRows},()=> Array.from({length:6}, () => 0)));
  const [currentExtraScores, setCurrentExtraScores] = useState(Array.from({length: extraScoreRows},()=> Array.from({length:6}, () => 0)));
  
  const changeScore = (type, row, player, val) => {
    var scores = '';
    if (type == 'wildlife') {
      scores = [...currentWildlifeScores];  
    } else if (type == 'habitat') {
      scores = [...currentHabitatScores];
    } else {
      scores = [...currentExtraScores];
    }
    val = parseInt(val,10);
    if (val < 0 || !val) { val = 0 };
    scores[row-1][player-1] = val;
    if (type == 'wildlife') {
      setCurrentWildlifeScores(scores);
    } else if (type == 'habitat') {
      setCurrentHabitatScores(scores);
      // Calculate bonuses
      calculateHabitatBonuses();
    } else {
      setCurrentExtraScores(scores);
    }
  };

  const calculateHabitatBonuses = () => {
    let bonuses = [...currentHabitatBonuses];
    for (let row = 0; row < habitatScoreRows; row++) {
      const scores = currentHabitatScores[row];
      if (currentPlayerCount == 1) {
        if (scores[0] > 6) {
          bonuses[row][0] = 2;
        } else {
          bonuses[row][0] = 0;
        }
      } else if (currentPlayerCount >= 2) {
        var players = [];

        // Create player objects
        for (var i = 0; i < currentPlayerCount; i++) {
          var player = {
              number: i + 1, // Player number
              score: scores[i], // Player score
              bonus: 0 // Player bonus score, initialized to 0
          };
          players.push(player);
        }
        // Sort players by score in descending order
        players.sort((a, b) => b.score - a.score);

        // Calculate bonus scores
        var maxScore = players[0].score; // Maximum score
        var tiedPlayers = players.filter(player => player.score === maxScore); // Find tied players
        
        if (maxScore == 0) {
          for (var i = 0; i < bonuses[row].length; i++) {
            bonuses[row][i] = 0;
            return;
          }
        }

        // FIRST PLACE POINTS LOGIC
        if (tiedPlayers.length === 1) { // If there's only one player with the top score, they get 3 points
          tiedPlayers[0].bonus = (players.length == 2) ? 2 : 3;
          // Update player array with modified bonus score
          players[players.findIndex(p => p.number === tiedPlayers[0].number)] = tiedPlayers[0];
        } else {
          // Calculate bonus points based on the number of tied players
          var bonusPoints = (tiedPlayers.length >= 3 || players.length == 2) ? 1 : 2; // if 3 people tied then its 1 point each otherwise 2 points each

          // Assign bonus points to tied players and update players array
          tiedPlayers.forEach(player => {
            player.bonus = bonusPoints;
            // Update players array with modified bonus scores
            players[players.findIndex(p => p.number === player.number)] = player;
          });
        }
        // END FIRST PLACE POINTS LOGIC

        // SECOND PLACE POINTS LOGIC
        if (tiedPlayers.length < 2 && tiedPlayers.length < players.length) { // make sure not everyone tied and that both players didn't tie
          var secondPlaceScore = players[tiedPlayers.length].score; // get the next players score
          var secondPlaceTies = players.filter(player => player.score === secondPlaceScore);
          if (secondPlaceTies.length === 1) { 
            secondPlaceTies[0].bonus = (players.length == 2) ? 0 : 1;
            // Update players array with modified bonus score
            players[players.findIndex(p => p.number === secondPlaceTies[0].number)] = secondPlaceTies[0];
          } // if more than one person ties, no one gets points.
        }
        // END SECOND PLACE POINTS LOGIC

        // Sort players back to original order (1 to 6)
        players.sort((a, b) => a.number - b.number);

        // Prepare bonus values array in player order
        var bonusValues = players.map(player => player.bonus);

        // Update bonus values
        for (var i = 0; i < bonuses[row].length; i++) {
          bonuses[row][i] = bonusValues[i] ? bonusValues[i] : 0;
        }
      }
    }
    
  };

  const getTotalScoreByPlayer = (type, player) => {
    let score = 0;
    if (type == 'wildlife') {
      currentWildlifeScores.map( (text) => { score += text[player] } );
    } else if (type == 'habitat') {
      currentHabitatScores.map( (text) => { score += text[player] } );
      currentHabitatBonuses.map( (text) => { score += text[player] } );
    } else if (type == 'bonus') {
      currentHabitatBonuses.map( (text) => { score += text[player] } );
    } else {
      currentExtraScores.map( (text) => { score += text[player] } );
    }
    return score;
  };

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
      <PlayerCountDisplay currentPlayerCount={currentPlayerCount} setCurrentPlayerCount={setCurrentPlayerCount} resetScores={resetScores} />
      <PlayerInitialsDisplay currentPlayerCount={currentPlayerCount} />
      <ul className="rows">
        <ScoringRow type="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Bear" rowNumber="1" />
        <ScoringRow type="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Elk" rowNumber="2" />
        <ScoringRow type="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Hawk" rowNumber="3" />
        <ScoringRow type="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Fox" rowNumber="4" />
        <ScoringRow type="wildlife" currentPlayerCount={currentPlayerCount} currentScores={currentWildlifeScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Salmon" rowNumber="5" end="end" />
      </ul>
      <div className="total-scores subtotals">
        <SubtotalsRow type="wildlife" currentPlayerCount={currentPlayerCount} getTotalScoreByPlayer={getTotalScoreByPlayer} />
      </div>
      <ul className="rows">
        <ScoringRow type="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Mountain" rowNumber="1" />
        <ScoringRow type="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Forest" rowNumber="2" />
        <ScoringRow type="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Prairie" rowNumber="3" />
        <ScoringRow type="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Wetland" rowNumber="4" />
        <ScoringRow type="habitat" currentPlayerCount={currentPlayerCount} currentScores={currentHabitatScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="River" rowNumber="5" end="end" />
      </ul>
      <div className="total-scores subtotals">
        <SubtotalsRow type="habitat" currentPlayerCount={currentPlayerCount} getTotalScoreByPlayer={getTotalScoreByPlayer} />
      </div>
      <ul className="rows">
        <ScoringRow type="extra" currentPlayerCount={currentPlayerCount} currentScores={currentExtraScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Tokens" rowNumber="1" />
        <ScoringRow type="extra" currentPlayerCount={currentPlayerCount} currentScores={currentExtraScores} bonuses={currentHabitatBonuses} changeScore={changeScore} rowLabel="Landmarks" rowNumber="2" end="end" />
      </ul>
      <div className="total-scores">
        <TotalsRow currentPlayerCount={currentPlayerCount} getTotalScoreByPlayer={getTotalScoreByPlayer} />
      </div>
      <ResetScores resetScores={resetScores} />
      <p className="links"><a href="https://ronansprake.co.uk/board-game-score-calculators#contact" target="_blank" data-i18n="feedback">Give feedback</a> | <a href="https://www.alderac.com/wp-content/uploads/2021/08/Cascadia-Rules.pdf" target="_blank" data-i18n="rules">Official rules</a> | <span data-i18n="thanks">Thanks to</span> <a href="https://github.com/josh-vin" target="_blank">Josh</a></p>
      <div className="language">
        <label htmlFor="language-select">Change language</label>
        <select id="language-select">
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="pl">Polski</option>
            <option value="tr">Türkçe</option>
        </select>
    </div>
    </div>
  );
}

export default App;
