import React from "react";

import "./Stats.scss";
import { settings } from "../../config";

type StatsT = {
  money: number;
  days: number;
};

function Stats({ days, money }: StatsT) {
  return (
    <div>
      <h2 className="title">Статистика</h2>
      <div className="panel stats-panel">
        <div className="money">
          {money} / {settings.goalMoney}
        </div>
        <div className="days">
          {days} дней / {settings.goalDays}
        </div>
      </div>
    </div>
  );
}

export default Stats;
