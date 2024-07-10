import { Statistics } from './Statistics';

export const Results = ({ countries, showHandler, weatherHandler }) => {
  // first render will be null since countries will be initially null
  if (!countries) {
    return null;
  }

  if (countries.length >= 10) {

    return (
      <div>
        Too many matches, specify another filter
      </div>
    );
  } else if (countries.length > 1) {
    // bad practice, but the key for each item is the country's name
    
    return (
      <div>

        {countries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={showHandler(country)}>show</button></div>
        )}

      </div>
    );
  } else if (countries.length === 1) {

    const selected = countries[0];

    return (
      <Statistics country={selected} />
    );

  } else {
    return (
      <div>
        Zero matches, specify another filter
      </div>
    );
  }
};
