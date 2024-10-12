import React from "react";
import PropTypes from "prop-types";
import './App.css';
import { useState, useEffect } from "react";
import styled from "@emotion/styled";

//Row component to show pokemon in columns by name, types, and button to select the pokemon.
const PokemonRow = ({ pokemon, onSelect }) => (

  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select! </button>
    </td>
  </tr>

)

//Pokemon row component prop types
PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  onSelect: PropTypes.func.isRequired,
};

//Component containing pokemon info to show upon selection. Uses name header and maps all base object properties to display in one row key name and value. 
const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {
        Object.keys(base).map(key =>
          <tr
            key={key}
          >
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        )
      }
    </table>
  </div>
)

//Pokemon info component prop types
PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  })
};

const Title = styled.h1`
  text-align:center;
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70%, 30%;
  grid-column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  paddingTop: 1rem;
`;

const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
}
`;

function App() {
  //Filter value that changes upon user typing value into input bar.
  const [filter, setFilter] = useState("");
  //Pokemon value state that populates an array with pokemon info from fetched data. 
  const [pokemon, setPokemon] = useState([]);
  //Selected pokemon value state that starts off empty, upon select sets with pokemon selected and displays at bottom of table. 
  const [selectedItem, setSelectedItem] = useState(null);

  //Use effect function to fetch pokemon data and populate pokemon state value.
  useEffect(() => {
    fetch("http://localhost:3000/starting-react/pokemon.json")
      .then(res => res.json())
      .then(data => setPokemon(data))
  }, [])

  return (
    <Container>
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <Input
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow
                    pokemon={pokemon}
                    onSelect={(pokemon) => setSelectedItem(pokemon)}
                    key={pokemon.id} />
                ))}
            </tbody>
          </table>
        </div>
        {selectedItem && <PokemonInfo {...selectedItem} />}
      </TwoColumnLayout>
    </ Container>
  );
}

export default App;
