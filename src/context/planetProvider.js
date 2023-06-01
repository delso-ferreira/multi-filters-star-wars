import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import planetContext from './planetContext';
import fetchAPI from '../services/fetchAPI';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    const { results } = await fetchAPI('https://swapi.dev/api/planets');

    return results.map((planet) => {
      const planetElement = { ...planet };
      delete planetElement.residents;
      return planetElement;
    });
  };

  useEffect(() => {
    const returnPlanets = async () => {
      setPlanets(await getPlanets());
    };
    returnPlanets();
  }, []);

  return (
    <planetContext.Provider value={ { planets } }>
      {children}
    </planetContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
