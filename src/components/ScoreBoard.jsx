import "../styles/scoreboard.css";

export default function ScoreBoard({ score, highscore }) {
  return (
    <div className="score-board">
      <div className="current-score">Current Score: {score}</div>
      <div className="high-score">High Score: {highscore}</div>
    </div>
  );
}
