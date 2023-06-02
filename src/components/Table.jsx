import React, { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetContext';

function Table() {
  const { planets } = useContext(planetContext);

  const [search, setSearch] = useState('');

  const [newPlanets, setFilteredPlanets] = useState(planets);

  const [filterOptions, setFilterOptions] = useState({
    geografia: '',
    comparação: '',
    valores: '',
  });

  const [activeFilters, setActiveFilters] = useState([]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const getFilteredPlanets = () => {
    const filteredPlanets = planets.filter((planet) => (
      !search ? planets : planet.name.includes(search)));
    return filteredPlanets;
  };

  useEffect(() => {
    setFilteredPlanets(getFilteredPlanets());
  }, [search, planets]);

  return (
    <div>
      <label htmlFor="texto">
        Digite:
      </label>
      <input
        type="texto"
        data-testid="name-filter"
        name="texto"
        value={ search }
        onChange={ handleChange }
      />
      <label htmlFor="option">
        Geografia Planetária
      </label>
      <select data-testid="column-filter">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="rotation_period">rotation_period</option>
        <option value="diameter">diameter</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="valor">
        Comparação
      </label>
      <select data-testid="comparison-filter">
        <option value="maior">maior que</option>
        <option value="menor">menor que</option>
        <option value="igual">igual a</option>
      </select>
      <label htmlFor="valor">
        Valores
      </label>
      <input
        type="number"
        data-testid="value-filter"
      />
      <button
        data-testid="button-filter"
        type="submit"
        onClick={ () => {
          setActiveFilters([...activeFilters, filterOptions]);
          setFilterOptions({
            geografia: '',
            comparação: '',
            valores: '',
          });
        } }
      >
        Enviar
      </button>
      {setActiveFilters.map((filter, index) => (

        <div key={ index }>
          <button
            onClick={ () => {
              const options = [...activeFilters];
              /* options.splice(index, 1); */
              setActiveFilters(options);
            } }
          >
            o
          </button>
          <span>
            {filter.column}
            {filter.condition}
            {filter.value}
          </span>
        </div>
      ))}
      <table>
        <thead>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
            <th>11</th>
            <th>12</th>
            <th>13</th>
          </tr>
        </thead>
        <tbody>
          {newPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
