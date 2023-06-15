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
    let filterColumn = screen.getByTestId('column-filter');
    let comparisonValue = screen.getByTestId('comparison-filter');
    let valueColumn = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', {name: /enviar/i});
  


    userEvent.selectOptions(filterColumn, 'surface_water')  
    userEvent.selectOptions(comparisonValue, 'menor que')
    userEvent.type(valueColumn, '40')

    userEvent.click(filterButton);

    const secondFilterRow = screen.getAllByRole('row')
    expect(secondFilterRow.length).toBe(7)        
    console.log('\nsecondFilterRow:', secondFilterRow);
    

    filterColumn = screen.getByTestId('column-filter');
    comparisonValue = screen.getByTestId('comparison-filter');
    valueColumn = screen.getByTestId('value-filter');


    userEvent.selectOptions(filterColumn, 'diameter');
    expect(filterColumn.value).toBe('diameter')
    
    userEvent.selectOptions(comparisonValue, 'maior que');
    expect(comparisonValue.value).toBe('maior que')

    userEvent.type(valueColumn, '5000');

    userEvent.click(filterButton);

    const row = screen.getAllByRole('row')
    expect(row.length).toBe(6);
  })
});
