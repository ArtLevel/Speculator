import React, { useState } from "react";

import { GoodItemT } from "../../App/App";

type StorageItemType = {
  good: GoodItemT;
  onBuy: (qty: number, price: number, goodId: number) => void;
};

function CityStorage({ good, onBuy }: StorageItemType) {
  const [number, setNumber] = useState(0);

  return (
    <div className="good-item-description">
      <div className={"good-item item-" + good.id}></div>

      <input
        className="input-number"
        name="count"
        autoComplete="false"
        value={number}
        maxLength={3}
        onChange={(e) => {
          setNumber(Number(e.currentTarget.value) || 0);
        }}
      />

      <button
        className="button"
        onClick={() => {
          onBuy(number, good.priceStats[good.priceStats.length - 1], good.id);
          setNumber(0);
        }}
      >
        Купить
      </button>
      <p className="price-description">
        {good.priceStats[good.priceStats.length - 1]} за шт.
      </p>
    </div>
  );
}

export default CityStorage;
