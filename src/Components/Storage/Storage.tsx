import React from "react";

import "./Storage.css";
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

  return (
    <>
      {storage.map((item) => {
        return (
          <span>
            {item.id}. {findGoodById(item.id)} - {item.qty} шт.
            <br />
          </span>
        );
      })}
    </>
  );
}

export default Storage;
