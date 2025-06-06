import React, { useState } from "react";

import "./Bank.scss";
import { DepositsT } from "../hooks/useAppLogic";

type BankType = {
  money: number;
  deposits: DepositsT;
  onOpenDeposit: (amount: number) => void;
};

function Bank({ deposits, onOpenDeposit, money }: BankType) {
  const [amount, setAmount] = useState(0);

  return (
    <div className="diposits">
      <h2 className="title">Банк</h2>

      <div className="panel">
        <div className="sell-panel">
          <div className="sell-panel-content">
            <span>Сумма</span>
            <div className="controls">
              <input
                type="text"
                className="input"
                value={amount}
                maxLength={3}
                onChange={(event) =>
                  setAmount(parseInt(event.target.value, 10) || 0)
                }
              />
              шт.
              <button
                className="button"
                disabled={
                  !amount || amount < 0 || amount > money || amount < 100
                }
                onClick={() => onOpenDeposit(amount)}
              >
                Открыть
              </button>
            </div>
          </div>
        </div>

        {deposits.map((deposit, index) => {
          return (
            <div className="good-item-wrapper" key={"deposit-" + index}>
              <div className="good-item-description">
                <div className={"good-item " + "item-deposit"}></div>
              </div>

              <div className="good-item-deposit-info">
                <div>
                  <div className="header">
                    <b>Сумма: {deposit.amount}</b>
                  </div>
                </div>
                <div>
                  <div className="days">
                    Дней до получения процента (10%): {deposit.days}
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
