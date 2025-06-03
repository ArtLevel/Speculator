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

export type StorageOfCityStoragesT = {
  id: number;
  priceStats: number[];
  maxStep: number;
  minPrice: number;
  maxPrice: number;
}[];

export type GoodItemT = {
  id: number;
  priceStats: number[];
  maxStep: number;
  minPrice: number;
  maxPrice: number;
};

export type CityStoragesT = {
  cityId: number;
  storage: StorageOfCityStoragesT;
}[];

export type TransportOrdersT = {
  fromCityId: number;
  targetCityId: number;
  goodId: number;
  qty: number;
  days: number;
}[];

function App() {
  const [currentCity, setCurrentCity] = useState(1);

  const [selectedGood, setSelectedGood] = useState(1);
  const [storages, setStorages] = useState<StoragesT>([
    {
      cityId: 1,
      storage: [
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
          minPrice: 5,
          maxPrice: 120,
        },
        {
          id: 3,
          priceStats: [5, 7, 9, 12, 15, 18, 10],
          maxStep: 10,
          minPrice: 2,
          maxPrice: 35,
        },
      ],
    },
    {
      cityId: 2,
      storage: [],
    },
  ]);
  const [transportOrders, setTransportOrders] = useState<TransportOrdersT>([]);

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

  function updateTransportOrders() {
    setTransportOrders((prevState) => {
      const newOrders = [...prevState];

      newOrders.forEach((order) => {
        if (order.days >= 1) {
          order.days -= 1;
        }
      });

      return newOrders;
    });
  }

  function liveProcess() {
    setInterval(() => {
      updateCityStorages();
      setDays((prevState) => prevState + 1);
      updateTransportOrders();
    }, 5000);
  }

  function getCityStorageByCity() {
    const store = cityStorages.find(
      (storage) => storage.cityId === currentCity,
    );

    if (store) {
      return store.storage;
    } else {
      return [];
    }
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
          const currentCityStorage = getCityStorageByCity();

          const goodIndexForCityStorage = currentCityStorage.findIndex(
            (good) => good.id === goodId,
          );

          if (currentCityStorage[goodIndexForCityStorage]) {
            storagesNew[index].storage[goodIndex].qty -= qty;

            const price =
              currentCityStorage[goodIndexForCityStorage].priceStats[
                currentCityStorage[goodIndexForCityStorage].priceStats.length -
                  1
              ];

            profit += qty * price;
            setStorages(storagesNew);
            setMoney((prevState) => (prevState += profit));
          }
        }
      }
    }
  }

  function getCityStorage() {
    const store = cityStorages.find(
      (storage) => storage.cityId === currentCity,
    );

    if (store) {
      return store.storage;
    } else {
      const errorStorage: StorageOfCityStoragesT = [
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

  function buyGoods(qty: number, price: number, goodId: number) {
    const totalPrice = qty * price;

    if (money >= totalPrice) {
      const storagesNew = storages;

      const index = storagesNew.findIndex(
        (storage) => storage.cityId === currentCity,
      );

      if (index > -1) {
        const goodIndex = storagesNew[index].storage.findIndex(
          (good) => good.id === goodId,
        );

        if (goodIndex > -1) {
          storagesNew[index].storage[goodIndex].qty += qty;
        } else {
          storagesNew[index].storage.push({
            id: goodId,
            qty,
          });
        }
      }

      setStorages(storagesNew);

      setMoney(money - totalPrice);
    }
  }

  function createTransportOrder(targetCityId: number) {
    const newOrders = [...transportOrders];

    const storage = getStorageByCity();

    const goodIndex = storage.findIndex((item) => item.id === selectedGood);

    if (goodIndex > -1) {
      newOrders.push({
        fromCityId: currentCity,
        targetCityId,
        goodId: selectedGood,
        qty: storage[goodIndex].qty,
        days: 30,
      });

      setTransportOrders(newOrders);
    }
  }

  useEffect(() => {
    liveProcess();
  }, []);

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
              onTransport={(targetCityId) => {
                createTransportOrder(targetCityId);
              }}
            />
          </div>
          <div className="transportations">
            <Transportations orders={transportOrders} goods={goods} />
          </div>
          <div className="stats">
            <Stats days={days} money={money} />
          </div>
        </div>
        <div className="column">
          <div className="city-storage">
            <CityStorage
              onBuy={(qty, price, goodId) => {
                buyGoods(qty, price, goodId);
              }}
              storage={getCityStorage()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
