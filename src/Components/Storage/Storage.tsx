import React from "react";

import "./Storage.scss";
import { GoodsT, StorageT } from "../App/App";

type StorageType = {
  currentCity: number;
  storage: StorageT;
  goods: GoodsT;
};

function Storage({ storage, currentCity, goods }: StorageType) {
  function findGoodById(id: number) {
    return goods.find((item) => item.id === id)?.title;
  }

  function getEmtpyCells() {
    if (storage.length < 8) {
      return Array(8 - storage.length)
        .fill(8)
        .map(() => {
          return <li className="good-item"></li>;
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
              <li className="good-item" key={item.id}>
                {findGoodById(item.id)}, {item.qty} шт.
              </li>
            );
          })}

          {getEmtpyCells()}
        </ul>
      </div>
    </div>
  );
}

export default Storage;
