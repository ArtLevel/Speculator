import React, { useState } from "react";

import "./Cities.scss";

type CitiesArrT = { id: number; title: string }[];
type CitiesType = {
  currentCity: number;
  onChangeCurrentCity: (city: number) => void;
};

function Citites({ currentCity, onChangeCurrentCity }: CitiesType) {
  const cities: CitiesArrT = [
    {
      id: 1,
      title: "Город 1",
    },
    {
      id: 2,
      title: "Город 2",
    },
    {
      id: 3,
      title: "Город 3",
    },
  ];

  return (
    <div className="cities-list">
      {cities.map((city) => {
        return (
          <a
            className={"city" + (currentCity === city.id ? "active" : "")}
            href="#"
            onClick={() => {
              onChangeCurrentCity(city.id);
            }}
          >
            {city.title}
          </a>
        );
      })}
    </div>
  );
}

export default Citites;
