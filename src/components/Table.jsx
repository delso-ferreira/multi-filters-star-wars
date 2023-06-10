import React, { useContext, useEffect, useState } from 'react';
import planetContext from '../context/planetContext';

function Table() {
  const { planets, search, activeFilters } = useContext(planetContext);
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  useEffect(() => {
    let newPlanets = planets.filter((planet) => (
      planet.name.toLowerCase().includes((search.toLowerCase()))
    ));

    /* const newPlanets.filter((element) => ( */
    /* )) */

    activeFilters.forEach(({ column, comparacao, valor }) => {
      console.log(column, comparacao, valor);
      newPlanets = newPlanets.filter((planeta) => {
        switch (comparacao) {
        case 'maior que':
          console.log('1');
          return Number(planeta[column]) > Number(valor);
        case 'menor que':
          console.log('2');
          return Number(planeta[column]) < Number(valor);
        case 'igual a':
          console.log('3');
          /* console.log(planeta[column], valor); */
          /* console.log(Number(planeta[column]) === Number(valor)); */
          return Number(planeta[column]) === Number(valor);
        default:
          return false;
        }
      });
    });

    /* newPlanets = */
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
