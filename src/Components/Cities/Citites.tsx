import React, { useState } from "react";
import { cities } from "../../cities";

import "./Cities.scss";

type CitiesType = {
  currentCity: number;
  onChangeCurrentCity: (city: number) => void;
};

function Citites({ currentCity, onChangeCurrentCity }: CitiesType) {
  return (
    <div className="cities-list">
      {cities.map((city) => {
        return (
          <a
            className={"city" + (currentCity === city.id ? " active" : "")}
            href="#"
            onClick={() => {
              onChangeCurrentCity(city.id);
            }}
            key={city.id}
          >
            {city.title}
          </a>
        );
      })}
    </div>
  );
}

export default Citites;
