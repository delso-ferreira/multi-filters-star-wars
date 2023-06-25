import React, { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetContext';
import './table.css';

function Table() {
  const { planets, search, activeFilters, planetOrder } = useContext(planetContext);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  useEffect(() => {
    let newPlanets = planets.filter((planet) => (
      planet.name.toLowerCase().includes((search.toLowerCase()))
    ));

    activeFilters.forEach(({ column, comparacao, valor }, indice) => {
      console.log(indice, column, comparacao, valor);
      newPlanets = newPlanets.filter((planeta) => {
        switch (comparacao) {
        case 'maior que':
          return Number(planeta[column]) > Number(valor);
        case 'menor que':
          return Number(planeta[column]) < Number(valor);
        default:
          return Number(planeta[column]) === Number(valor);
        }
      });
    });

    if (planetOrder.column) {
      const planetWithVal = [];
      const planetWithNoVal = [];
      newPlanets.forEach((planeta) => {
        if (planeta[planetOrder.column] === 'unknown') {
          planetWithNoVal.push(planeta);
        } else {
          planetWithVal.push(planeta);
        }
      });
      if (planetOrder.sort === 'ASC') {
        planetWithVal
          .sort((a, b) => Number(a[planetOrder.column]) - Number(b[planetOrder.column]));
      }
      if (planetOrder.sort === 'DESC') {
        planetWithVal
          .sort((a, b) => Number(b[planetOrder.column]) - Number(a[planetOrder.column]));
      }
      newPlanets = [
        ...planetWithVal,
        ...planetWithNoVal,
      ];
    }

    setFilteredPlanets(newPlanets);
  }, [planets, search, activeFilters, planetOrder]);

  return (
    <div className="table__container">
      <table>
        <thead
          className="table__header--container"
        >
          <tr className="table__header--row">
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody className="table__body--container">
          {filteredPlanets.map((element) => (
            <tr
              key={ element.name }
              className="table__body--row"
            >
              {
                Object.values(element).map((option, i) => {
                  if (i === 0) {
                    return <td key={ i } data-testid="planet-name">{ option }</td>;
                  }
                  return <td key={ i }>{ option }</td>;
                })
              }

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Table;
