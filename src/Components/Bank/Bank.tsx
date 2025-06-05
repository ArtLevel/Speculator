import React from "react";

import "./Bank.scss";
import { DepositsT } from "../App/App";

type BankType = {
  deposits: DepositsT;
};

function Bank({ deposits }: BankType) {
  return (
    <div className="diposits">
      <h2 className="title">Банк</h2>

      <div className="panel">
        {deposits.map((deposit) => {
          return (
            <div className="good-item-wrapper" key={Math.random()}>
              <div className="good-item-description">
                <div className={"good-item " + "item-deposit"}></div>
              </div>

              <div className="good-item-deposit-info">
                <div>
                  <div className="header">Сумма: {deposit.amount}</div>
                </div>
                <div>
                  <div className="days">
                    Дней до получения процента: {deposit.days}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bank;
