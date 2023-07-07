import React, { useState, useEffect } from 'react';
import './App.css';
import Modal from 'react-modal';

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then(response => response.json())
      .then(data => setCharacters(data))
      .catch(error => console.log(error));
  }, []);

  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value);
  };

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const filteredCharacters = selectedSpecies ? characters.filter(character => character.species === selectedSpecies) : characters;

  return (
    <div className="container">
      <h1>Harry Potter Characters</h1>
      <div className="filter-container">
        <label htmlFor="species">Select Species:</label>
        <select id="species" value={selectedSpecies} onChange={handleSpeciesChange}>
          <option value="">All</option>
          <option value="human">Human</option>
          <option value="elf">Elf</option>
          <option value="half-giant">Half-giant</option>
          {/* Agrega más opciones aquí */}
        </select>
      </div>
      <div className="card-container">
        {filteredCharacters.map(character => (
          <div key={character.name} className="card" onClick={() => handleCardClick(character)}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
            <p>House: {character.house}</p>
            <p>Ancestry: {character.ancestry}</p>
            <p>Eye Colour: {character.eyeColour}</p>
            <p>Hair Colour: {character.hairColour}</p>
            <p>Patronus: {character.patronus}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={selectedCharacter !== null}
        onRequestClose={handleCloseModal}
        contentLabel="Character Details"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedCharacter && (
          <div>
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
            <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            <h2>{selectedCharacter.name}</h2>
            <p>Species: {selectedCharacter.species}</p>
            <p>Gender: {selectedCharacter.gender}</p>
            <p>House: {selectedCharacter.house}</p>
            <p>Ancestry: {selectedCharacter.ancestry}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;


