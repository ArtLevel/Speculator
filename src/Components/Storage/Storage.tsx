import React, { useState } from "react";

import "./Storage.scss";
import { GoodsT, StorageT } from "../App/App";

type StorageType = {
  currentCity: number;
  storage: StorageT;
  goods: GoodsT;
  selectedGood: number | null;
  onSelectGood: (goodId: number) => void;
  onSell: (goodId: number, qty: number) => void;
  onTransport: (targetCityId: number) => void;
};

function Storage({
  storage,
  currentCity,
  goods,
  selectedGood,
  onSelectGood,
  onSell,
  onTransport,
}: StorageType) {
  const [qty, setQty] = useState(0);
  const [targetCityId, setTargetCityId] = useState(1);

  function findGoodById(id: number) {
    return goods.find((item) => item.id === id)?.title;
  }

  return (
    <div>
      <h2 className="title">Мой склад</h2>
      <div className="panel">
        <ul className="goods">
          {Array(8)
            .fill(8)
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
              <div>{findGoodById(selectedGood)}</div>
              <div className="controls">
                <input
                  type="text"
                  className="input"
                  value={qty}
                  maxLength={3}
                  onChange={(event) =>
                    setQty(parseInt(event.target.value, 10) || 0)
                  }
                />
                шт.
                <button
                  className="button"
                  onClick={() => onSell(selectedGood, qty)}
                >
                  Продать
                </button>
              </div>
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
                  <option value={1}>Москва</option>
                  <option value={2}>Пекин</option>
                  <option value={3}>Берлин</option>
                </select>
              </div>
              <div className="controls">
                <button
                  className="button"
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
