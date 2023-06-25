import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Provider from '../context/planetProvider';
import mockData from '../helpers/mockdata';
import userEvent from '@testing-library/user-event';

describe('Table Header Testing', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(
      <Provider>
        <App />
      </Provider>
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  const columnOptions = [
    'name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population', 'films', 'created', 'edited', 'url',
  ];

  it('Verifica renderização do cabeçalho da tabela', async () => {
    const columnHead = await screen.findAllByRole('columnheader');
    columnHead.forEach((header, index) => {
      expect(header).toHaveTextContent(columnOptions[index]);
    });
  });
});

describe('Table Filtering Testing', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render(
      <Provider>
        <App />
      </Provider>
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('testing search filter', () => {
    const search = screen.getByRole('textbox');
    userEvent.type(search, 't');
    const row = screen.getAllByRole('row');
    expect(row.length).toBe(4);
  });

  it('testing dropbox and value filters', () => {
    const filterColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterColumn, 'diameter');
    expect(filterColumn.value).toBe('diameter');

    const comparisonValue = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonValue, 'menor que');
    expect(comparisonValue.value).toBe('menor que');

    const valueColumn = screen.getByTestId('value-filter');
    userEvent.type(valueColumn, '5000');

    const filterButton = screen.getByRole('button', {
      name: /enviar/i
    });
    userEvent.click(filterButton);

    const row = screen.getAllByRole('row');
    expect(row.length).toBe(2);
  });

  it('Should test multiple filters in sequence', () => {
    const filterColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterColumn, 'orbital_period');
    expect(filterColumn.value).toBe('orbital_period');

    const filterComparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(filterComparison, 'menor que');

    const filterValue = screen.getByTestId('value-filter');
    userEvent.type(filterValue, '315');

    const filterButton = screen.getByTestId('button-filter');
    userEvent.click(filterButton);

    const filteredRows = screen.getAllByRole('row');
    expect(filteredRows.length).toBe(3);

    userEvent.selectOptions(filterColumn, 'surface_water');
    userEvent.selectOptions(filterComparison, 'maior que');
    userEvent.type(filterValue, '5');
    userEvent.click(filterButton);

    const filteredRows2 = screen.getAllByRole('row');
    expect(filteredRows2.length).toBe(2);

    userEvent.selectOptions(filterColumn, 'rotation_period');
    userEvent.selectOptions(filterComparison, 'igual a');
    userEvent.type(filterValue, '300');
    userEvent.click(filterButton);

    const filteredRows3 = screen.getAllByRole('row');
    expect(filteredRows3.length).toBe(1);
    expect(filterColumn.length).toBe(2);

    const removeButton = screen.getByTestId('button-remove-filters');
    userEvent.click(removeButton);

    expect(filterColumn.length).toBe(5);
  });

  it('Filters must be deleted from dropdown', () => {
    let filterColumn = screen.getByTestId('column-filter');
    let filterButton = screen.getByRole('button', { name: /enviar/i });

    userEvent.click(filterColumn);
    userEvent.click(filterButton);
    expect(filterColumn.length).toBe(4);

    userEvent.click(filterColumn);
    userEvent.click(filterButton);
    expect(filterColumn.length).toBe(3);

    userEvent.click(filterColumn);
    userEvent.click(filterButton);
    expect(filterColumn.length).toBe(2);

    userEvent.click(filterColumn);
    userEvent.click(filterButton);
    expect(filterColumn.length).toBe(1);

    userEvent.click(filterColumn);
    userEvent.click(filterButton);
    expect(filterColumn.length).toBe(0);
  });

  it('testing remove all filters', async () => {
    const filtroColuna = screen.getByTestId('column-filter');
    const filtoCompare = screen.getByTestId('comparison-filter');
    const filtroVal = screen.getByTestId('value-filter');
    const filtroBtn = screen.getByRole('button', { name: /enviar/i });
    const filtroRmv = screen.getByTestId('button-remove-filters');
    const checkCol = screen.getAllByRole('row');

    userEvent.click(filtroColuna);
    userEvent.click(filtoCompare);
    userEvent.type(filtroVal, '1');
    userEvent.click(filtroBtn);

    await waitFor(() => {
      expect(checkCol.length).toBe(9);
    });
  });

  it('Crescent Ordering', () => {
    const columnOrder = screen.getByTestId('column-sort');
    const inputAsc = screen.getByTestId('column-sort-input-asc');
    const buttonOrder = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnOrder, 'population');

    userEvent.click(inputAsc);

    userEvent.click(buttonOrder);

    const newPlanets = screen.getAllByTestId('planet-name');

    const planetSort = mockData.results.sort((a, b) => {

      if (a.population === 'unknown') return 1;
      if (b.population === 'unknown') return -1;

      return Number(a.population) - Number(b.population);

    });

    newPlanets.forEach((planet, i) => {
      expect(planet).toHaveTextContent(planetSort[i].name);

      // https://stackoverflow.com/questions/68295232/react-testing-library-tohavetextcontent-exact-match
      // https://stackoverflow.com/questions/57895949/jest-coverage-on-conditional-array-sort
      
    });
  });
});
