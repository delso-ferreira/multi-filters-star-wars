import React, { useContext, useState } from 'react';
import planetContext from '../context/planetContext';

function Header() {
  const { setSearch, setActiveFilters } = useContext(planetContext);
  const [selectOptions, setSelectOptions] = useState({
    column: 'population',
    comparacao: 'maior que',
    valor: 0,
  });

  const columnOptions = ['population', 'orbital_period',
    'rotation_period', 'diameter', 'surface_water'];

  const handleNameFilter = (event) => {
    setSearch(event.target.value);
  };

  const handleColumnFilters = (event) => {
    const { name, value } = event.target;
    setSelectOptions((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    // setActiveFilters((prevFilter) => ([...prevFilter, selectOptions]));
    setActiveFilters((previous) => ([...previous, selectOptions]));
  };

  return (
    <div>
      <form>
        <label htmlFor="name">
          Name:
        </label>
        <input
          data-testid="name-filter"
          type="text"
          name="name"
          onChange={ handleNameFilter }
        />
        <select
          value={ selectOptions.column }
          onChange={ handleColumnFilters }
          name="column"
          data-testid="column-filter"
        >
          {columnOptions.map((option, index) => (
            <option
              key={ index }
            >
              {option}

            </option>
          ))}
        </select>
        <label htmlFor="valor">
          Comparação
        </label>
        <select
          data-testid="comparison-filter"
          onChange={ handleColumnFilters }
          name="comparacao"
          value={ selectOptions.comparacao }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <label htmlFor="valor">
          Valores
        </label>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ handleColumnFilters }
          name="valor"
          value={ selectOptions.valor }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleSubmit }
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Header;
