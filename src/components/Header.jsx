import React, { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetContext';
import './header.css';

function Header() {
  const { setSearch,
    setActiveFilters,
    activeFilters,
    setPlanetOrder } = useContext(planetContext);

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

  const [columnOrder, setColumnOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

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

  const columnHandleSort = ({ target }) => {
    const { value, name } = target;
    setColumnOrder((prevState) => ({
      ...prevState, [name]: value,
    }));
  };

  useEffect(() => {
    setSelectOptions({
      column: columnSelect[0],
      comparacao: 'maior que',
      valor: 0,
    });
  }, [columnSelect]);

  return (
    <div className="header__full--container">
      <form className="header__form--container">
        <div className="header__form--head">
          <label
            htmlFor="name"
            className="header__label--name"
          >
            Name:
          </label>
          <input
            data-testid="name-filter"
            type="text"
            name="name"
            onChange={ handleNameFilter }
            className="header__input--name"
          />
          <label
            htmlFor="column"
            className="header__label--column"
          >
            Filter By:
          </label>
          <select
            value={ selectOptions.column }
            onChange={ handleColumnFilters }
            name="column"
            data-testid="column-filter"
            className="header__select--column"
          >
            {columnSelect.map((option, index) => (
              <option key={ index }>{option}</option>
            ))}
          </select>
          <label
            htmlFor="comparacao"
            className="header__label--comparison"
          >
            Comparison:
          </label>
          <select
            data-testid="comparison-filter"
            onChange={ handleColumnFilters }
            name="comparacao"
            value={ selectOptions.comparacao }
            className="header__input-comparison"
          >
            <option value="maior que">bigger then</option>
            <option value="menor que">less then</option>
            <option value="igual a">equal to</option>
          </select>
          <label
            htmlFor="valor"
            className="header__label--value"
          >
            Value:
          </label>
          <input
            type="number"
            data-testid="value-filter"
            onChange={ handleColumnFilters }
            name="valor"
            value={ selectOptions.valor }
            className="header__input--value"
          />
          <button
            data-testid="button-filter"
            type="button"
            onClick={ handleSubmit }
            className="header__submit--button"
          >
            Submit
          </button>
        </div>

        <div className="header__filterlist--map">
          <p className="header__paragraph--filter">Filters:</p>
          <div className="header__filterlist--container">
            {activeFilters.map(({ column, comparacao, valor }, index) => (
              <div
                key={ index }
                data-testid="filter"
                className="header__filterlist--list"
              >
                <button
                  type="button"
                  className="header__filterlist--button"
                  onClick={ () => deleteFilters(column) }
                >
                  {`X -- ${column} / ${comparacao} ${valor}`}
                </button>
              </div>
            ))}

            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ deleteAllFilters }
              className="header__removefilters--button"
            >
              Remove Filters
            </button>

          </div>
        </div>
      </form>
      <div className="header__sort--container">
        <label
          htmlFor="column-sort"
          className="header__label--sort"
        >
          Sort By:
          <select
            name="column"
            id="column-sort"
            data-testid="column-sort"
            onChange={ columnHandleSort }
            className="header__sort--input"
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
        <label
          htmlFor="column-sort-input-asc"
          className="header__asc--label"
        >
          <input
            type="radio"
            name="sort"
            value="ASC"
            id="column-sort-input-asc"
            data-testid="column-sort-input-asc"
            onChange={ columnHandleSort }
            className="header__asc--input"
          />
          Ascending:
        </label>
        <label
          htmlFor="column-sort-input-desc"
          className="header__desc--label"
        >
          <input
            type="radio"
            name="sort"
            value="DESC"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            onChange={ columnHandleSort }
            className="header__desc--input"
          />
          Descending:
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => setPlanetOrder(columnOrder) }
          className="header__sort--button"
        >
          Sort
        </button>
      </div>
    </div>
  );
}

export default Header;
