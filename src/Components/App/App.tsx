import React, { useEffect, useState } from "react";

import "./App.scss";
import Citites from "../Cities/Citites";
import CityStorage from "../CityStorage/CityStorage";
import Storage from "../Storage/Storage";
import Transportations from "../Transportations/Transportations";
import Stats from "../Stats/Stats";
import storage from "../Storage/Storage";
import { log } from "node:util";
import cityStorage from "../CityStorage/CityStorage";

type StoragesT = { cityId: number; storage: StorageT }[];
export type StorageT = { id: number; qty: number }[];
type GoodT = { id: number; title: string };
export type GoodsT = GoodT[];

export type StorageOfCityStorages = {
  id: number;
  priceStats: number[];
  maxStep: number;
  minPrice: number;
  maxPrice: number;
}[];

export type CityStoragesT = {
  cityId: number;
  storage: StorageOfCityStorages;
}[];

function App() {
  const [currentCity, setCurrentCity] = useState(1);

  const [selectedGood, setSelectedGood] = useState(1);
  const [storages, setStorages] = useState<StoragesT>([
    {
      cityId: 1,
      storage: [
        {
          id: 1,
          qty: 10,
        },
        {
          id: 2,
          qty: 20,
        },
        {
          id: 3,
          qty: 30,
        },
        {
          id: 4,
          qty: 35,
        },
        {
          id: 5,
          qty: 10,
        },
        {
          id: 6,
          qty: 350,
        },
      ],
    },
    {
      cityId: 2,
      storage: [
        {
          id: 1,
          qty: 5,
        },
      ],
    },
  ]);
  const [money, setMoney] = useState(100);
  const [days, setDays] = useState(1);
  const [cityStorages, setCityStorages] = useState<CityStoragesT>([
    {
      cityId: 1,
      storage: [
        {
          id: 1,
          priceStats: [10, 15, 18, 13, 15, 18, 10],
          maxStep: 5,
          minPrice: 5,
          maxPrice: 100,
        },
        {
          id: 2,
          priceStats: [10, 15, 18, 30, 15, 50, 10],
          maxStep: 7,
          minPrice: 15,
          maxPrice: 120,
        },
        {
          id: 3,
          priceStats: [5, 7, 9, 12, 15, 18, 10],
          maxStep: 15,
          minPrice: 2,
          maxPrice: 50,
        },
      ],
    },
    {
      cityId: 2,
      storage: [],
    },
  ]);

  const goods: GoodsT = [
    {
      id: 1,
      title: "Квас",
    },
    {
      id: 2,
      title: "Молоко",
    },
    {
      id: 3,
      title: "Пшеница",
    },
    {
      id: 4,
      title: "Грибы",
    },
    {
      id: 5,
      title: "Клевер",
    },
    {
      id: 6,
      title: "Редиска",
    },
    {
      id: 7,
      title: "Виноград",
    },
    {
      id: 8,
      title: "Орехи",
    },
    {
      id: 9,
      title: "Вилы",
    },
    {
      id: 10,
      title: "Доска",
    },
    {
      id: 11,
      title: "Коса",
    },
    {
      id: 12,
      title: "Лопата",
    },
    {
      id: 13,
      title: "Топор",
    },
    {
      id: 14,
      title: "Кирка",
    },
  ];

  function getStorageByCity(): StorageT {
    const store = storages.find((storage) => storage.cityId === currentCity);

    if (store) {
      return store.storage;
    } else {
      return [];
    }
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function updateCityStorages() {
    let newCityStorages: CityStoragesT = cityStorages;

    for (let cityIndex = 0; cityIndex < newCityStorages.length; cityIndex++) {
      const storage = newCityStorages[cityIndex].storage;

      for (let goodIndex = 0; goodIndex < storage.length; goodIndex++) {
        const goodData = storage[goodIndex];
        const priceChangeSign = getRandomInt(2) ? 1 : -1;
        const priceChangeValue =
          getRandomInt(goodData.maxStep) * priceChangeSign;

        let newPrice =
          // @ts-ignore
          goodData.priceStats.slice(-1).pop() + priceChangeValue;

        if (newPrice > goodData.maxPrice) {
          newPrice = goodData.maxPrice;
        }

        if (newPrice < goodData.minPrice) {
          newPrice = goodData.minPrice;
        }

        for (let i = 0; i < goodData.priceStats.length - 1; i++) {
          goodData.priceStats[i] = goodData.priceStats[i + 1];
        }

        goodData.priceStats[goodData.priceStats.length - 1] = newPrice;
      }
    }

    setCityStorages(newCityStorages);
  }

  function liveProcess(newDays: number) {
    setTimeout(() => {
      updateCityStorages();
      setDays(newDays + 1);
    }, 5000);
  }

  function sellGoods(goodId: number, qty: number) {
    const storagesNew = storages;
    let profit = 0;

    const index = storagesNew.findIndex(
      (storage) => storage.cityId === currentCity,
    );

    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex(
        (good) => good.id === goodId,
      );

      if (goodIndex > -1) {
        const goods = storagesNew[index].storage[goodIndex].qty;

        if (goods > 0 && goods >= qty) {
          storagesNew[index].storage[goodIndex].qty -= qty;

          profit += qty * 10;

          setMoney((prevState) => (prevState += profit));
        }
      }
    }

    setStorages(storagesNew);
  }

  function getCityStorage() {
    const store = cityStorages.find(
      (storage) => storage.cityId === currentCity,
    );

    if (store) {
      return store.storage;
    } else {
      const errorStorage: StorageOfCityStorages = [
        {
          id: 0,
          maxPrice: 0,
          maxStep: 0,
          minPrice: 0,
          priceStats: [0, 0, 0, 0, 0],
        },
      ];

      return errorStorage;
    }
  }

  useEffect(() => {
    liveProcess(days);
  }, [days]);

  return (
    <div className="app">
      <header className="app-name">Спекулянтик</header>

      <Citites
        currentCity={currentCity}
        onChangeCurrentCity={(city) => {
          setCurrentCity(city);
        }}
      />

      <div className="content">
        <div className="column">
          <div className="storage">
            <Storage
              currentCity={currentCity}
              storage={getStorageByCity()}
              goods={goods}
              selectedGood={selectedGood}
              onSelectGood={(goodId) => {
                setSelectedGood(goodId);
              }}
              onSell={(goodId: number, qty: number) => {
                sellGoods(goodId, qty);
              }}
            />
          </div>
          <div className="transportations">
            <Transportations />
          </div>
          <div className="stats">
            <Stats days={days} money={money} />
          </div>
        </div>
        <div className="column">
          <div className="city-storage">
            <CityStorage storage={getCityStorage()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
