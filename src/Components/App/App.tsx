import React from 'react';

import './App.scss';
import Citites from "../Cities/Citites";
import CityStorage from "../CityStorage/CityStorage";
import Storage from "../Storage/Storage";
import Transportations from "../Transportations/Transportations";

function App() {
  return (
    <div className="app">
      <header className="app-name">
        Спекулянтик
      </header>

        <Citites/>

        <div className="content">
            <div className="column">
                <div className="storage">
                    <Storage/>
                </div>
                <div className="transportations">
                    <Transportations/>
                </div>
            </div>
            <div className="column">
                <div className="city-storage">
                    <CityStorage/>
                </div>
            </div>
        </div>

    </div>
  );
}

export default App;
