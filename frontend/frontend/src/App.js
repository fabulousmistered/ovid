import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [translations, setTranslations] = useState([]);
  const [userTranslations, setUserTranslations] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
      axios.get('http://localhost:3000/translations')
          .then(response => {
              setTranslations(response.data);
              setUserTranslations(response.data.map(() => ''));
          });
  }, []);

  const handleChange = (index, value) => {
      const newTranslations = [...userTranslations];
      newTranslations[index] = value;
      setUserTranslations(newTranslations);
  };

  const handleSubmit = () => {
      axios.post('http://localhost:3000/check-translations', userTranslations)
          .then(response => {
              setResult(response.data.percentageCorrect);
          });
  };

  return (
      <div>
          <h1>Translation App</h1>
          {translations.map((translation, index) => (
              <div key={index}>
                  <p>{translation.latin}</p>
                  <input
                      type="text"
                      value={userTranslations[index]}
                      onChange={(e) => handleChange(index, e.target.value)}
                  />
              </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
          {result !== null && <p>Percentage Correct: {result}%</p>}
      </div>
  );
}

export default App;