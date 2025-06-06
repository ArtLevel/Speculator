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
          <span
            className={"city" + (currentCity === city.id ? " active" : "")}
            onClick={() => {
              onChangeCurrentCity(city.id);
            }}
            key={city.id}
          >
            {city.title}
          </span>
        );
      })}
    </div>
  );
}

export default Citites;
