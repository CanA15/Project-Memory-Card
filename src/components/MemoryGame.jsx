import { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import ScoreBoard from "./ScoreBoard";

export default function MemoryGame() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [pokemonSequence, setPokemonSequence] = useState([
    { name: "pikachu", id: 1 },
    { name: "snorlax", id: 2 },
    { name: "charizard", id: 3 },
    { name: "diglett", id: 4 },
    { name: "squirtle", id: 5 },
    { name: "blastoise", id: 6 },
    { name: "beedrill", id: 7 },
    { name: "pidgey", id: 8 },
  ]);

  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const pokemonData = await Promise.all(
          pokemonSequence.map(async (poke) => {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${poke.name}`
            );
            const data = await response.json();
            return {
              id: poke.id,
              name: poke.name,
              image: data.sprites.front_default,
            };
          })
        );
        setPokemonSequence(pokemonData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };
    getPokemonData();
  }, []);

  const updateScore = (newScore) => {
    setScore(newScore);
    if (newScore > highscore) {
      setHighscore(newScore);
    }
  };

  const handleCardClick = (pokemonId) => {
    if (clickedPokemon.includes(pokemonId)) {
      // Game over
      updateScore(0);
      setClickedPokemon([]);
      setHasWon(false);
    } else {
      // Continue game
      setClickedPokemon((prev) => [...prev, pokemonId]);
      updateScore(score + 1);
      if (clickedPokemon.length + 1 === 8) {
        setHasWon(true);
      }
    }
  };

  return (
    <>
      <div className="container">
        <ScoreBoard
          score={hasWon ? "Congrats, You won!" : score}
          highscore={hasWon ? "Press an image to reset the game" : highscore}
        />
        <CardContainer
          pokemonSequence={pokemonSequence}
          onCardClick={handleCardClick}
        />
      </div>
    </>
  );
}
