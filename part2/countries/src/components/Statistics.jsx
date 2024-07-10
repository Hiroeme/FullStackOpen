export const Statistics = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <b>languages:</b>

      <ul>
        {(Object.values(country.languages).map(value => <li key={value}>{value}</li>

        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
    </div>
  );
};
