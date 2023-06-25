import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Provider from '../context/planetProvider';
/* import mockData from '../helpers/mockdata'; */
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import testData from '../../cypress/mocks/testData';



/* beforeEach(() => {

  jest.spyOn(global, 'fetch');

  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
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
 */

beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData)
    }));
});
afterEach(jest.restoreAllMocks);


describe('Table testing', () => {

  it('teting search filter', async () => {
    render (
      <Provider>
        <App />
      </Provider>
    )

    const search = screen.getByTestId('name-filter')

    act(() => userEvent.type(search, 't'))


    const row = await screen.findAllByRole('row')
    await waitFor(() => expect(row).toHaveLength(3));
    screen.debug()
  });

  it('testing dropbox and value filters', () => {
    
    render (
      <Provider>
        <App />
      </Provider>
    )

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
    
    render (
      <Provider>
        <App />
      </Provider>
    )

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
    expect(filterColumn.length).toBe(2)

    const removeButton = screen.getByTestId('button-remove-filters')

    userEvent.click(removeButton)

    expect(filterColumn.length).toBe(5)
    
  })
  it('Filters must be deleted from dropdown', () =>  {
    
    render (
      <Provider>
        <App />
      </Provider>
    )

    let filterColumn = screen.getByTestId('column-filter');
    let filterButton = screen.getByRole('button', {name: /enviar/i});

    userEvent.click(filterColumn)

    userEvent.click(filterButton)
    
    expect(filterColumn.length).toBe(4)
    screen.debug()
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

  it('testing remove all filters', async () => {

    render (
      <Provider>
        <App />
      </Provider>
    )

    const filtroColuna = screen.getByTestId('column-filter');
    const filtoCompare = screen.getByTestId('comparison-filter')
    const filtroVal = screen.getByTestId('value-filter')
    const filtroBtn = screen.getByRole('button', {name: /enviar/i});
    /* const filtroRmv = screen.getByTestId('button-remove-filters') */
    const checkCol = screen.getAllByRole('row');

    userEvent.click(filtroColuna)

    userEvent.click(filtoCompare)

    userEvent.type(filtroVal, '1')

    userEvent.click(filtroBtn)

    await waitfor (() => 
      expect(checkCol.length).toBe(9)
    )

  }) 
});
