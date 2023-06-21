import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Provider from '../context/planetProvider';
import mockData from '../helpers/mockdata';
import userEvent from '@testing-library/user-event';

describe('Table testing', () => {
  beforeEach(() => {

    jest.spyOn(global, 'fetch');

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    render (
      <Provider>
        <App />
      </Provider>
    )
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('teting search filter', () => {
    const search = screen.getByRole('textbox')

    userEvent.type(search, 't')

    const row = screen.getAllByRole('row')
    expect(row.length).toBe(4);
  });

  it('testing dropbox and value filters', () => {
    const filterColumn = screen.getByTestId('column-filter');
    userEvent.selectOptions(filterColumn, 'diameter');

    expect(filterColumn.value).toBe('diameter')

    const comparisonValue = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonValue, 'menor que');

    expect(comparisonValue.value).toBe('menor que')

    const valueColumn = screen.getByTestId('value-filter');
    userEvent.type(valueColumn, '5000');

    const filterButton = screen.getByRole('button', {
      name: /enviar/i})
    
      userEvent.click(filterButton);

      const row = screen.getAllByRole('row')
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
  })
  it('Filters must be deleted from dropdown', () => {
    let filterColumn = screen.getByTestId('column-filter');
    let filterButton = screen.getByRole('button', {name: /enviar/i});
    
    userEvent.click(filterColumn)

    userEvent.click(filterButton)

    expect(filterColumn.length).toBe(4)

    userEvent.click(filterColumn)
    userEvent.click(filterButton)

    expect(filterColumn.length).toBe(3)

    userEvent.click(filterColumn)
    userEvent.click(filterButton)

    expect(filterColumn.length).toBe(2)

    userEvent.click(filterColumn)
    userEvent.click(filterButton)

    expect(filterColumn.length).toBe(1)
    
    userEvent.click(filterColumn)
    userEvent.click(filterButton)

    expect(filterColumn.length).toBe(0)

    // primeiro: fazer um teste para retirar um filtro ou seja, testar o length de 4 -> 3
    // fazer teste do de remoção de todos os filtros , não precisando fazer todas as remoções 1 por 1
  })
});
