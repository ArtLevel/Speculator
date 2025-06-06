import React from "react";
import { cities } from "../../cities";

import "./Transportations.scss";
import {
  GoodsT,
  TransportationOrderT,
  TransportOrdersT,
} from "../hooks/useAppLogic";

type TransportationsType = {
  orders: TransportOrdersT;
  goods: GoodsT;
  onAcceptOrder: (order: TransportationOrderT) => void;
};

function Transportations({
  orders,
  goods,
  onAcceptOrder,
}: TransportationsType) {
  function getGoodTitle(id: number) {
    return goods.find((item) => item.id === id)?.title;
  }

  function getCityNameById(cityId: number) {
    return cities.find((city) => city.id === cityId)?.title;
  }

  return (
    <div className="transportations">
      <h2 className="title">Активные перевозки</h2>

      <div className="panel">
        {orders.map((order) => {
          return (
            <div className="good-item-wrapper" key={Math.random()}>
              <div className="good-item-description">
                <div className={"good-item " + "item-" + order.goodId}></div>
              </div>

              <div className="good-item-transport-info">
                <div>
                  <div className="header">
                    {getGoodTitle(order.goodId)}, {order.qty} шт.
                  </div>
                  <div className="path">
                    <>
                      {getCityNameById(order.fromCityId)} -{" "}
                      {getCityNameById(order.targetCityId)}
                    </>
                  </div>
                </div>
                <div>
                  <div className="days">Дни: {order.days}</div>
                  <button
                    className=""
                    disabled={!!order.days}
                    onClick={() => {
                      onAcceptOrder(order);
                    }}
                  >
                    Получить
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Transportations;
