import { GoodsT } from "./Components/hooks/useAppLogic";

export const defaultStoragesData = [
  {
    cityId: 1,
    storage: [
      {
        id: 2,
        qty: 20,
      },
      {
        id: 3,
        qty: 30,
      },
      {
        id: 4,
        qty: 35,
      },
      {
        id: 5,
        qty: 10,
      },
    ],
  },
  {
    cityId: 2,
    storage: [],
  },
  {
    cityId: 3,
    storage: [],
  },
];
export const defaultCityStoragesData = [
  {
    cityId: 1,
    storage: [
      {
        id: 1,
        priceStats: [12, 13, 14, 15, 14, 13, 14],
        maxStep: 1,
        minPrice: 10,
        maxPrice: 18,
      },

      {
        id: 2,
        priceStats: [15, 16, 16, 15, 14, 13, 12],
        maxStep: 1,
        minPrice: 12,
        maxPrice: 20,
      },
      {
        id: 3,
        priceStats: [8, 9, 10, 11, 12, 11, 10, 9],
        maxStep: 1,
        minPrice: 8,
        maxPrice: 15,
      },
      {
        id: 8,
        priceStats: [40, 47, 49, 55, 53, 55, 58],
        maxStep: 7,
        minPrice: 40,
        maxPrice: 120,
      },
      {
        id: 4,
        priceStats: [15, 17, 15, 16, 18, 20, 21],
        maxStep: 2,
        minPrice: 15,
        maxPrice: 22,
      },
    ],
  },
  {
    cityId: 2,
    storage: [
      {
        id: 5,
        priceStats: [20, 22, 25, 29, 33, 30, 29],
        maxStep: 4,
        minPrice: 20,
        maxPrice: 40,
      },
      {
        id: 3,
        priceStats: [8, 9, 10, 11, 12, 11, 10, 9],
        maxStep: 2,
        minPrice: 6,
        maxPrice: 20,
      },
      {
        id: 11,
        priceStats: [45, 50, 48, 51, 53, 55, 60],
        maxStep: 5,
        minPrice: 45,
        maxPrice: 60,
      },
      {
        id: 1,
        priceStats: [15, 16, 17, 18, 19, 20, 21],
        maxStep: 2,
        minPrice: 15,
        maxPrice: 25,
      },
      {
        id: 7,
        priceStats: [25, 26, 27, 28, 30, 33, 39],
        maxStep: 6,
        minPrice: 25,
        maxPrice: 55,
      },
      {
        id: 4,
        priceStats: [15, 17, 15, 16, 18, 20, 21],
        maxStep: 4,
        minPrice: 15,
        maxPrice: 25,
      },
    ],
  },
  {
    cityId: 3,
    storage: [
      {
        id: 7,
        priceStats: [30, 31, 30, 32, 33, 34, 33],
        maxStep: 5,
        minPrice: 30,
        maxPrice: 50,
      },
      {
        id: 8,
        priceStats: [60, 65, 66, 67, 62, 61, 60],
        maxStep: 10,
        minPrice: 60,
        maxPrice: 100,
      },
      {
        id: 3,
        priceStats: [15, 17, 19, 21, 19, 22, 25],
        maxStep: 3,
        minPrice: 15,
        maxPrice: 30,
      },

      {
        id: 5,
        priceStats: [15, 20, 27, 33, 36, 40, 41],
        maxStep: 9,
        minPrice: 15,
        maxPrice: 70,
      },
      {
        id: 2,
        priceStats: [15, 16, 16, 15, 14, 13, 12],
        maxStep: 3,
        minPrice: 10,
        maxPrice: 25,
      },
    ],
  },
];
export const defaultDepositsData = [
  {
    id: 1,
    amount: 100,
    days: 10,
  },
];
export const goods: GoodsT = [
  {
    id: 1,
    title: "Квас",
  },
  {
    id: 2,
    title: "Молоко",
  },
  {
    id: 3,
    title: "Пшеница",
  },
  {
    id: 4,
    title: "Грибы",
  },
  {
    id: 5,
    title: "Клевер",
  },
  {
    id: 11,
    title: "Серп",
  },
  {
    id: 7,
    title: "Виноград",
  },
  {
    id: 8,
    title: "Орехи",
  },
];
