import React, { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetContext';

function Table() {
  const { planets, search, activeFilters } = useContext(planetContext);
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
        case 'igual a':
          return Number(planeta[column]) === Number(valor);
        default:
          return false;
        }
      });
    });

    setFilteredPlanets(newPlanets);
  }, [planets, search, activeFilters]);

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
