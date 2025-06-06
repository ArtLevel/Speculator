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
import StorageItem from "./Components/StorageItem";
import { StorageOfCityStoragesT } from "../hooks/useAppLogic";

type CityStorageType = {
  storage: StorageOfCityStoragesT;
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

  function getGoodData(priceStats: number[]) {
    return {
      labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
      datasets: [
        {
          label: "Цена за штуку",
          data: priceStats,
          fill: false,
          backgroundColor: "#8d6048",
          borderColor: "#d6ba7a40",
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
              <div
                className="good-item-wrapper"
                key={"storage-item-" + good.id}
              >
                <StorageItem good={good} onBuy={onBuy} />
                <div className="good-item-stats">
                  <Line
                    datasetIdKey="id"
                    data={getGoodData(good.priceStats)}
                    options={{
                      maintainAspectRatio: false,

                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          mode: "index",
                          intersect: false,
                          caretSize: 20,

                          backgroundColor: "#8d6048",
                          bodyColor: "#d6ba7a",
                          borderColor: "#8d6048",
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
                          ticks: {
                            stepSize: 1,
                            color: "#d6ba7a",
                            font: { size: 12 },
                            display: false,
                          },
                          type: "linear",
                        },
                        y: {
                          ticks: {
                            stepSize: 1,
                            color: "#d6ba7a",
                            font: { size: 12 },
                          },
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
