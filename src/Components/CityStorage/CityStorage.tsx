import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

import "./CityStorage.scss";
import { CityStoragesT, StorageOfCityStorages } from "../App/App";

type CityStorageType = {
  storage: StorageOfCityStorages;
  onBuy: (qty: number, price: number, goodId: number) => void;
};

function CityStorage({ storage, onBuy }: CityStorageType) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const [number, setNumber] = useState(0);

  function getGoodData(priceStats: number[]) {
    return {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      datasets: [
        {
          label: "Цена за штуку",
          data: priceStats,
          fill: false,
          backgroundColor: "#a68156",
          borderColor: "rgb(166, 129, 86, 0.2)",
        },
      ],
    };
  }

  return (
    <div>
      <h2 className="title">Городской склад</h2>
      <div className="panel">
        <div className="city-goods">
          {storage.map((good) => {
            return (
              <div className="good-item-wrapper">
                <div className="good-item-description">
                  <div className={"good-item item-" + good.id}></div>

                  <input
                    className="input-number"
                    name="count"
                    autoComplete="false"
                    value={number}
                    maxLength={3}
                    onChange={(e) => {
                      setNumber(Number(e.currentTarget.value));
                    }}
                  />

                  <button
                    className="button"
                    onClick={() => {
                      onBuy(
                        number,
                        good.priceStats[good.priceStats.length - 1],
                        good.id,
                      );
                      setNumber(0);
                    }}
                  >
                    Купить
                  </button>
                  <p className="price-description">
                    {good.priceStats[good.priceStats.length - 1]} за шт.
                  </p>
                </div>
                <div className="good-item-stats">
                  <Line
                    datasetIdKey="id"
                    data={getGoodData(good.priceStats)}
                    options={{
                      maintainAspectRatio: false,

                      plugins: {
                        tooltip: {
                          mode: "index",
                          intersect: false,
                          caretSize: 20,

                          backgroundColor: "#44200c",
                          borderColor: "#877f72",
                          borderWidth: 1,
                          displayColors: false,

                          callbacks: {
                            title() {
                              return "";
                            },
                          },
                        },
                      },

                      scales: {
                        x: {
                          type: "linear",
                        },
                        y: {
                          type: "linear",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CityStorage;
