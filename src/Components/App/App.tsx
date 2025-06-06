import React, { useEffect, useState } from "react";

import "./App.scss";
import Citites from "../Cities/Citites";
import CityStorage from "../CityStorage/CityStorage";
import Storage from "../Storage/Storage";
import Transportations from "../Transportations/Transportations";
import Stats from "../Stats/Stats";
import Bank from "../Bank/Bank";
import { goods } from "../../config";
import { TransportationOrderT, useAppLogic } from "../hooks/useAppLogic";

function App() {
  const {
    deposits,
    setSelectedGood,
    transportOrders,
    getSelectedGoodPrice,
    setCurrentCity,
    days,
    createTransportOrder,
    buyGoods,
    sellGoods,
    money,
    liveProcess,
    acceptOrder,
    currentCity,
    getStorageByCity,
    selectedGood,
    getCityStorage,
  } = useAppLogic();

  useEffect(() => {
    liveProcess();
  }, []);

  return (
    <div className="app">
      <header className="app-name">Спекулянт</header>

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
          <div>
            <Bank deposits={deposits} />
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
