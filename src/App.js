import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [dogs, setDogs] = useState(null)

  const defaultInput = ('Search by breed...')
  const [input, setInput] = useState(defaultInput);

  const [breed, setBreed] = useState(null)

  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleBreedSelection = () => {
    input !== defaultInput ? setBreed(input) : setBreed(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        !breed
          ? 'https://dog.ceo/api/breeds/image/random/7'
          : `https://dog.ceo/api/breed/${breed}/images/random/7`
      );
      setDogs(result.data);
    };

    fetchData();
  }, [breed]);

  return (
    <div className="App col">
      <header>
        <h1>Dogs and Puppies</h1>
      </header>

      {dogs === null
        ? <div className='hero'><h1>Loading....</h1></div>
        : <>
          <div className='hero col'>
            <img className='largeimage' src={dogs.message[0]}></img>
            <div className='inputfields row'>
              <input value={input} onFocus={(e) => e.target.select()} onChange={handleInput} onSubmit={handleBreedSelection}></input>
              <button onClick={handleBreedSelection}>Another One</button>
            </div>
          </div>
          <footer className='row'>
            {dogs.message.map((url, i) => (
              i !== 0
                ? <img className='smallimage' key={i} src={url}></img>
                : null
            ))}
          </footer>
        </>
      }
    </div>
  );
}

export default App;