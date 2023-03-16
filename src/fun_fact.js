import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FunFact() {
  const [funFact, setFunFact] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getFact = () => {
    setIsLoading(true);
    axios.get("https://uselessfacts.jsph.pl/random.json?language=en")
      .then(response => {
        setFunFact(response.data.text);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getFact();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>Did you know?</header>
      {isLoading ? (
        <div className="loading-icon" />
      ) : error ? (
        <p>Oops, no fun facts for today. Try again later.</p>
      ) : (
        <p>{funFact}</p>
      )}
      <button onClick={() => getFact()} className='refresh-button'>Tell Me More!</button>
    </div>
  );
}

export default FunFact;
