import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import planetContext from './planetContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [planetOrder, setPlanetOrder] = useState({});

  const getPlanets = async () => {
    const fetchAPI = await fetch('https://swapi.dev/api/planets');
    const data = await fetchAPI.json();

    return data.results.map((planet) => {
      delete planet.residents;
      return planet;
    });
  };

  useEffect(() => {
    const returnPlanets = async () => {
      setPlanets(await getPlanets());
    };
    returnPlanets();
  }, []);

  const contexto = {
    planets,
    setPlanets,
    search,
    setSearch,
    activeFilters,
    setActiveFilters,
    planetOrder,
    setPlanetOrder,
  };

  return (
    <planetContext.Provider value={ contexto }>
      {children}
    </planetContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
