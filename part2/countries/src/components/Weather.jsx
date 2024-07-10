export const Weather = ({ weather }) => {
  if (!weather) {
    return null;
  }

  return (
    <div>
      <h1>Weather in {weather.location.country}</h1>
      <p>temperature in fahrenheit {weather.current.temp_f}</p>
      <p>wind in miles {weather.current.wind_mph}</p>

    </div>);

};
