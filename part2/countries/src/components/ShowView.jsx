import { Statistics } from './Statistics';

export const ShowView = ({ country, countries }) => {

  if (!country || countries.length <= 1) {
    return null;
  }

  // console.log(country.name.common)
  return (
    <Statistics country={country} />
  );
};
