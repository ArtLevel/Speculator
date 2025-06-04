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

export type TransportOrdersT = TransportationOrderT[];

export type TransportationOrderT = {
  id: number;
  fromCityId: number;
  targetCityId: number;
  goodId: number;
  qty: number;
  days: number;
};

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
      ],
    },
    {
      cityId: 2,
      storage: [],
    },
    {
      cityId: 3,
      storage: [],
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
          priceStats: [12, 13, 14, 15, 14, 13, 14],
          maxStep: 1,
          minPrice: 10,
          maxPrice: 18,
        },

        {
          id: 2,
          priceStats: [15, 16, 16, 15, 14, 13, 12],
          maxStep: 1,
          minPrice: 12,
          maxPrice: 20,
        },
        {
          id: 3,
          priceStats: [8, 9, 10, 11, 12, 11, 10, 9],
          maxStep: 1,
          minPrice: 8,
          maxPrice: 15,
        },
        {
          id: 8,
          priceStats: [40, 47, 49, 55, 53, 55, 58],
          maxStep: 7,
          minPrice: 40,
          maxPrice: 120,
        },
        {
          id: 4,
          priceStats: [15, 17, 15, 16, 18, 20, 21],
          maxStep: 2,
          minPrice: 15,
          maxPrice: 22,
        },
      ],
    },
    {
      cityId: 2,
      storage: [
        {
          id: 5,
          priceStats: [20, 22, 25, 29, 33, 30, 29],
          maxStep: 4,
          minPrice: 20,
          maxPrice: 40,
        },
        {
          id: 3,
          priceStats: [8, 9, 10, 11, 12, 11, 10, 9],
          maxStep: 2,
          minPrice: 6,
          maxPrice: 20,
        },
        {
          id: 11,
          priceStats: [45, 50, 48, 51, 53, 55, 60],
          maxStep: 5,
          minPrice: 45,
          maxPrice: 60,
        },
        {
          id: 1,
          priceStats: [15, 16, 17, 18, 19, 20, 21],
          maxStep: 2,
          minPrice: 15,
          maxPrice: 25,
        },
        {
          id: 7,
          priceStats: [25, 26, 27, 28, 30, 33, 39],
          maxStep: 6,
          minPrice: 25,
          maxPrice: 55,
        },
        {
          id: 4,
          priceStats: [15, 17, 15, 16, 18, 20, 21],
          maxStep: 4,
          minPrice: 15,
          maxPrice: 25,
        },
      ],
    },
    {
      cityId: 3,
      storage: [
        {
          id: 7,
          priceStats: [30, 31, 30, 32, 33, 34, 33],
          maxStep: 5,
          minPrice: 30,
          maxPrice: 50,
        },
        {
          id: 8,
          priceStats: [60, 65, 66, 67, 62, 61, 60],
          maxStep: 10,
          minPrice: 60,
          maxPrice: 100,
        },
        {
          id: 3,
          priceStats: [15, 17, 19, 21, 19, 22, 25],
          maxStep: 3,
          minPrice: 15,
          maxPrice: 30,
        },

        {
          id: 5,
          priceStats: [15, 20, 27, 33, 36, 40, 41],
          maxStep: 9,
          minPrice: 15,
          maxPrice: 70,
        },
      ],
    },
  ]);
  const [transportOrders, setTransportOrders] = useState<TransportOrdersT>([]);
  const [orderId, setOrderId] = useState(1);

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
      id: 11,
      title: "Серп",
    },
    {
      id: 7,
      title: "Виноград",
    },
    {
      id: 8,
      title: "Орехи",
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
          getRandomInt(goodData.maxStep + 1) * priceChangeSign;

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

  function sellGoods(goodId: number, qty: number, totalPrice: number) {
    const storagesNew = [...storages];

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

            setStorages(storagesNew);
            setMoney((prevState) => (prevState += totalPrice));
          }

          if (storagesNew[index].storage[goodIndex].qty === 0) {
            removeGood(storagesNew[index].storage[goodIndex].id);
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

  function removeGood(selectedGood: number) {
    const storagesNew = storages;

    const index = storagesNew.findIndex(
      (storage) => storage.cityId === currentCity,
    );

    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex(
        (good) => good.id === selectedGood,
      );

      if (goodIndex > -1) {
        storagesNew[index].storage.splice(goodIndex, 1);

        setStorages(storagesNew);
      }
    }
  }

  function createTransportOrder(targetCityId: number) {
    const newOrders = [...transportOrders];

    const storage = getStorageByCity();

    const goodIndex = storage.findIndex((item) => item.id === selectedGood);

    if (goodIndex > -1) {
      const order: TransportationOrderT = {
        id: orderId,
        fromCityId: currentCity,
        targetCityId,
        goodId: selectedGood,
        qty: storage[goodIndex].qty,
        days: 1,
      };

      newOrders.push(order);

      removeGood(selectedGood);
      setOrderId((prevState) => prevState + 1);
      setTransportOrders(newOrders);
    }
  }

  function acceptOrder(order: TransportationOrderT) {
    setTransportOrders((orders) => {
      const newOrders = [...orders];

      const index = newOrders.findIndex((o) => {
        return o.id === order.id;
      });

      if (index > -1) {
        newOrders.splice(index, 1);
      }

      return newOrders;
    });

    const storagesNew = [...storages];

    const index = storagesNew.findIndex(
      (storage) => storage.cityId === order.targetCityId,
    );

    console.log("111", order.targetCityId);
    if (index > -1) {
      const goodIndex = storagesNew[index].storage.findIndex(
        (good) => good.id === order.goodId,
      );

      if (goodIndex > -1) {
        storagesNew[index].storage[goodIndex].qty += order.qty;
      } else {
        storagesNew[index].storage.push({
          id: order.goodId,
          qty: order.qty,
        });
      }

      setStorages(storagesNew);
    }
  }

  function getSelectedGoodPrice() {
    const cityStorage = getCityStorage();

    const good = cityStorage.find((good) => good.id === selectedGood);

    if (good && good?.priceStats) {
      return good.priceStats[good.priceStats.length - 1];
    }

    return 0;
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
              selectedGoodPrice={getSelectedGoodPrice()}
              onSelectGood={(goodId) => {
                setSelectedGood(goodId);
              }}
              onSell={(goodId: number, qty: number, totalPrice) => {
                sellGoods(goodId, qty, totalPrice);
              }}
              onTransport={(targetCityId) => {
                createTransportOrder(targetCityId);
              }}
            />
          </div>
          <div className="transportations">
            <Transportations
              orders={transportOrders}
              goods={goods}
              onAcceptOrder={(order: TransportationOrderT) => {
                acceptOrder(order);
              }}
            />
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
