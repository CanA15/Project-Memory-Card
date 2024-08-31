import { useState, useEffect } from "react";
import Card from "./Card";
import "../styles/cardcontainer.css";

export default function CardContainer({ pokemonSequence, onCardClick }) {
  const [shuffledPokemon, setShuffledPokemon] = useState([]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    setShuffledPokemon(shuffleArray(pokemonSequence));
  }, [pokemonSequence]);

  const handleCardClick = (pokemonId) => {
    onCardClick(pokemonId);
    setShuffledPokemon(shuffleArray(pokemonSequence));
  };

  return (
    <div className="card-container">
      {shuffledPokemon.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemonID={pokemon.id}
          pokemonName={pokemon.name}
          pokemonIMG={pokemon.image}
          onClick={() => handleCardClick(pokemon.id)}
        />
      ))}
    </div>
  );
}
