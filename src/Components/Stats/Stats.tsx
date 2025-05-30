import React from "react";

import "./Stats.scss";

type StatsT = {
  money: number;
  days: number;
};

function Stats({ days, money }: StatsT) {
  return (
    <div>
      <h2 className="title">Статистика</h2>
      <div className="panel stats-panel">
        <div className="money">{money}</div>
        <div className="days">{days} дней</div>
      </div>
    </div>
  );
}

export default Stats;
