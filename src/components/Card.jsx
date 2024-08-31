import "../styles/card.css";

export default function Card({ pokemonName, pokemonIMG, pokemonID, onClick }) {
  const firstLetterToUpper = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className="pokemon-card" key={pokemonID} onClick={onClick}>
      <img src={pokemonIMG} alt={pokemonName} />
      <p>{firstLetterToUpper(pokemonName)}</p>
    </div>
  );
}
