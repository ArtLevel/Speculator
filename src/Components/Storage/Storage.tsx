import React, { useState } from "react";

import { cities } from "../../cities";
import "./Storage.scss";
import { GoodsT, StorageT } from "../hooks/useAppLogic";
type StorageType = {
  currentCity: number;
  storage: StorageT;
  goods: GoodsT;
  selectedGoodPrice: number;
  selectedGood: number | null;
  onSelectGood: (goodId: number) => void;
  onSell: (goodId: number, qty: number, totalPrice: number) => void;
  onTransport: (targetCityId: number) => void;
};

function Storage({
  storage,
  currentCity,
  goods,
  selectedGood,
  onSelectGood,
  onSell,
  selectedGoodPrice,
  onTransport,
}: StorageType) {
  const [qty, setQty] = useState(0);
  const [targetCityId, setTargetCityId] = useState(2);

  function findGoodById(id: number) {
    return goods.find((item) => item.id === id)?.title;
  }

  function getTotalPrice() {
    return parseInt(String(selectedGoodPrice * qty * 0.9), 10);
  }

  return (
    <div>
      <h2 className="title">Мой склад</h2>
      <div className="panel">
        <ul className="goods">
          {Array(10)
            .fill(10)
            .map((i, index) => {
              if (storage[index]) {
                const item = storage[index];

                return (
                  <li
                    className={
                      "good-item " +
                      "item-" +
                      item.id +
                      " " +
                      (selectedGood === item.id ? "selected" : "")
                    }
                    onClick={() => {
                      onSelectGood(item.id);
                    }}
                    key={"storage-item-" + item.id}
                  >
                    <span className="good-description">{item.qty} шт.</span>
                  </li>
                );
              } else {
                return (
                  <li
                    className="good-item no-item"
                    key={"empty-storage-item-" + index}
                  ></li>
                );
              }
            })}
        </ul>

        {selectedGood ? (
          <>
            <div className="sell-panel">
              <div className="sell-panel-content">
                <span>{findGoodById(selectedGood)}</span>
                <div className="controls">
                  <input
                    type="text"
                    className="input"
                    value={qty}
                    maxLength={3}
                    disabled={!selectedGoodPrice}
                    onChange={(event) =>
                      setQty(parseInt(event.target.value, 10) || 0)
                    }
                  />
                  шт.
                  <button
                    className="button"
                    disabled={!selectedGoodPrice}
                    onClick={() => onSell(selectedGood, qty, getTotalPrice())}
                  >
                    Продать
                  </button>
                </div>
              </div>
              {(selectedGoodPrice && qty && (
                <div className="sell-panel-info">
                  По цене {selectedGoodPrice} x {qty} шт, налог: 10% Итого:
                  {getTotalPrice()}
                </div>
              )) ||
                ""}
            </div>

            <div className="order-panel">
              <div>
                <select
                  className="select-city"
                  value={targetCityId}
                  onChange={(e) => {
                    setTargetCityId(parseInt(e.currentTarget.value, 10));
                  }}
                >
                  {cities.map((city) => {
                    return (
                      <option
                        disabled={city.id === currentCity}
                        value={city.id}
                        key={"city-option-id" + city.id}
                      >
                        {city.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="controls">
                <button
                  className="button"
                  disabled={targetCityId === currentCity}
                  onClick={() => {
                    onTransport(targetCityId);
                  }}
                >
                  Перевезти
                </button>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Storage;
