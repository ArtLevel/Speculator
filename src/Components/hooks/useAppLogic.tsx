import { useEffect, useState } from "react";
import {
  defaultCityStoragesData,
  defaultDepositsData,
  defaultStoragesData,
  settings,
  gameStatuses,
} from "../../config";

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
export type DepositsT = DepositT[];
type DepositT = {
  id: number;
  amount: number;
  days: number;
};

export const useAppLogic = () => {
  const [currentCity, setCurrentCity] = useState(1);

  const [selectedGood, setSelectedGood] = useState(1);
  const [storages, setStorages] = useState<StoragesT>(defaultStoragesData);
  const [money, setMoney] = useState(settings.startMoney);
  const [days, setDays] = useState(1);
  const [cityStorages, setCityStorages] = useState<CityStoragesT>(
    defaultCityStoragesData,
  );
  const [transportOrders, setTransportOrders] = useState<TransportOrdersT>([]);
  const [orderId, setOrderId] = useState(1);
  const [deposits, setDeposits] = useState<DepositsT>(defaultDepositsData);
  const [gameStatus, setGameStatus] = useState(gameStatuses.new);

  function getStorageByCity(): StorageT {
    const store = storages.find((storage) => storage.cityId === currentCity);

    if (store) {
      return store.storage;
    } else {
      return [];
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

  function updateDeposits() {
    setDeposits((prevState) => {
      const newDeposits = [...prevState];

      newDeposits.forEach((deposit, index) => {
        if (deposit.days >= 1) {
          deposit.days -= 1;
        }

        if (deposit.days === 0) {
          newDeposits.splice(index, 1);

          setMoney((oldMoney) => {
            return Math.floor(oldMoney + deposit.amount * 1.1);
          });
        }
      });

      return newDeposits;
    });
  }

  function liveProcess() {
    setTimeout(() => {
      updateCityStorages();
      setDays((prevState) => prevState + 1);
      updateTransportOrders();
      updateDeposits();
      checkGameStatus(days + 1);
    }, 5000);
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
        days: 7,
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

  function openDeposit(amount: number) {
    if (amount > 0 && money >= amount && amount >= 100) {
      setDeposits((prevState) => {
        const newDeposits = [...prevState];

        newDeposits.push({
          days: 30,
          amount,
          id: Math.random(),
        });

        setMoney((prevState) => prevState - amount);

        return newDeposits;
      });
    }
  }

  function checkGameStatus(days: number) {
    if (days > settings.goalDays && money < settings.goalMoney) {
      setGameStatus(gameStatuses.fail);
    }

    if (money >= settings.goalMoney) {
      setGameStatus(gameStatuses.win);
    }
  }

  useEffect(() => {
    if (gameStatus === gameStatuses.new) {
      liveProcess();
    }
  }, [days]);

  return {
    sellGoods,
    buyGoods,
    createTransportOrder,
    acceptOrder,
    getSelectedGoodPrice,
    transportOrders,
    days,
    money,
    deposits,
    setSelectedGood,
    setCurrentCity,
    currentCity,
    getStorageByCity,
    selectedGood,
    getCityStorage,
    openDeposit,
    gameStatus,
  };
};
