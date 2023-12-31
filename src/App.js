import React from 'react';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import Provider from './context/planetProvider';

function App() {
  return (
    <>
      <h1 className="app__title">Star Wars - Planets Filter</h1>
      <Provider>
        <Header />
        <Table />
      </Provider>
    </>
  );
}

export default App;
