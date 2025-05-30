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
};

function Storage({
  storage,
  currentCity,
  goods,
  selectedGood,
  onSelectGood,
  onSell,
}: StorageType) {
  const [qty, setQty] = useState(0);

  function findGoodById(id: number) {
    return goods.find((item) => item.id === id)?.title;
  }

  function getEmtpyCells() {
    if (storage.length < 8) {
      return Array(8 - storage.length)
        .fill(8)
        .map((_, index) => {
          return <li className="good-item no-item" key={index}></li>;
        });
    }
  }

  return (
    <div>
      <h2 className="title">Мой склад</h2>
      <div className="panel">
        <ul className="goods">
          {storage.map((item) => {
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
                key={item.id}
              >
                <span className="good-description">{item.qty} шт.</span>
              </li>
            );
          })}

          {getEmtpyCells()}
        </ul>

        {selectedGood ? (
          <div className="sell-panel">
            <div>{findGoodById(selectedGood)}</div>
            <div className="controls">
              <input
                type="text"
                className="input"
                value={qty}
                onChange={(event) => setQty(parseInt(event.target.value, 10))}
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Storage;
