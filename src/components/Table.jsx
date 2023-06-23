import React, { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetContext';

function Table() {
  const { planets,
    search,
    activeFilters,
    planetOrder } = useContext(planetContext);

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

    const planetWithValues = [];
    const planetWithUnkown = [];

    newPlanets.forEach((planet) => {
      if (planet[planetOrder.column] === 'unknown') {
        planetWithValues.push(planet);
      } else {
        planetWithUnkown.unshift(planet);
      }

      if (planetOrder.sort === 'ASC') {
        planetWithValues
          .sort((a, b) => Number(a[planetOrder.column]) - Number(b[planetOrder.column]));
      }
      if (planetOrder.sort === 'DESC') {
        planetWithValues
          .sort((a, b) => Number(b[planetOrder.column]) - Number(a[planetOrder.column]));
      }
      newPlanets = [
        ...planetWithValues,
        ...planetWithUnkown,
      ];
    });

    setFilteredPlanets(newPlanets);
  }, [planets, search, activeFilters, planetOrder]);

  return (
    <div>
      <table>
        <thead>
          <tr>
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
        <tbody>
          {filteredPlanets.map((element) => (
            <tr
              key={ element.name }
            >
              {Object.values(element).map((item, index) => (
                <td
                  key={ index }
                >
                  {item}

                </td>
              ))}

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Table;
