import React, { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetContext';

function Header() {
  const { setSearch,
    setActiveFilters,
    activeFilters,
    /* setPlanetOrder */ } = useContext(planetContext);

  const columnOptions = [
    'population',
    'orbital_period',
    'rotation_period',
    'diameter',
    'surface_water',
  ];

  const [columnSelect, setColumnSelect] = useState(columnOptions);

  const [selectOptions, setSelectOptions] = useState({
    column: columnSelect[0],
    comparacao: 'maior que',
    valor: 0,
  });

  /*  const [columnOrder, setColumnOrder] = useState({
    column: 'population',
    sort: 'ASC',
  }); */

  const handleNameFilter = (event) => {
    const { value } = event.target;
    setSearch(event.target.value);
    console.log(value);
  };

  const handleColumnFilters = (event) => {
    const { name, value } = event.target;
    setSelectOptions((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    const handleColumChoices = columnSelect.filter((el) => el !== selectOptions.column);
    setColumnSelect(handleColumChoices);

    setActiveFilters((previous) => [...previous, selectOptions]);
  };

  const deleteFilters = (column) => {
    const newList = activeFilters.filter((filtro) => filtro.column !== column);
    setActiveFilters(newList);

    setColumnSelect([...columnSelect, column]);
  };

  const deleteAllFilters = () => {
    setColumnSelect(columnOptions);
    setActiveFilters([]);
  };

  /* const columnHandleSort = ({ target }) => {
    const { value, name } = target;
    setColumnOrder((prevState) => ({
      ...prevState, [name]: value,
    }));
  }; */

  useEffect(() => {
    setSelectOptions({
      column: columnSelect[0],
      comparacao: 'maior que',
      valor: 0,
    });
  }, [columnSelect]);

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
          {columnSelect.map((option, index) => (
            <option key={ index }>{option}</option>
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

        <div>
          <p>Filters:</p>

          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ deleteAllFilters }
          >
            Remove Filters
          </button>

          <div>
            {activeFilters.map(({ column, comparacao, valor }, index) => (
              <div key={ index } data-testid="filter">
                <button type="button" onClick={ () => deleteFilters(column) }>
                  {`X -- ${column} / ${comparacao} ${valor}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
      {/* <div>
        <label htmlFor="column-sort">
          Ordenação:
          <select
            name="column"
            id="column-sort"
            data-testid="column-sort"
            onChange={ columnHandleSort }
          >
            {
              columnOptions.map((column) => (
                <option value={ column } key={ column }>
                  {column}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="column-sort-input-asc">
          <input
            type="radio"
            name="sort"
            value="ASC"
            id="column-sort-input-asc"
            data-testid="column-sort-input-asc"
            onChange={ columnHandleSort }
          />
          Crescente:
        </label>
        <label htmlFor="column-sort-input-desc">
          <input
            type="radio"
            name="sort"
            value="DESC"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            onChange={ columnHandleSort }
          />
          Decrescente:
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => setPlanetOrder(columnOrder) }
        >
          Ordenar
        </button>
      </div> */}
    </div>
  );
}

export default Header;
