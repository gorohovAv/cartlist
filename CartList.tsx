/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CartItem from "@/components/CartItem/CartItem";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import type { CartItem as Item } from "@/types/BasicTypes";
import { useState, useEffect } from "react";
import "@/styles/cartList/cartList.scss";
import "@/styles/row/row.scss";
import { initialize } from "@/redux/slices/cartSlice";
import Link from "next/link";

const CartList = () => {
  const cartList: Item[] = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const [itemString, setItemString] = useState("товар");

  const getWord = (amount: number) => {
    const str = amount.toString();
    if (amount === 1) {
      return "товар";
    }
    if (amount < 5 && amount > 1) {
      return "товара";
    }
    if (amount > 5 && amount < 21) {
      return "товаров";
    }
    if (amount === 21) {
      return "товар";
    }
    if (amount > 21) {
      if (str[str.length - 2] === "1") {
        return "товаров";
      }
      if (str[str.length - 1] === "0") {
        return "товаров";
      }
      if (str[str.length - 1] === "1") {
        return "товар";
      }
      if (
        str[str.length - 1] === "2" ||
        str[str.length - 1] === "3" ||
        str[str.length - 1] === "4"
      ) {
        return "товара";
      } else {
        return "товаров";
      }
    }
    return "товаров";
  };
  useEffect(() => {
    dispatch(initialize());
  });

  useEffect(() => {
    setItemString(
      getWord(
        cartList
          .map((element) => element.amount)
          .reduce((acc, item) => acc + item)
      )
    );
  }, cartList);
  return (
    <div className="cartList">
      <div className="cartList cartList-column">
        {cartList.map((item, i) => {
          if (i === cartList.length - 1) {
            return (
              <article key={i}>
                <CartItem amount={item.amount} item={item.item}></CartItem>
              </article>
            );
          } else {
            return (
              <article key={i}>
                <CartItem amount={item.amount} item={item.item}></CartItem>
                <hr className="cartList cartList-divider" />
              </article>
            );
          }
        })}
      </div>
      <div className="cartList cartList-summary">
        <h2>
          {cartList
            .map((element) => element.amount)
            .reduce((acc, item) => acc + item)}{" "}
          {itemString} на сумму{" "}
          {cartList
            .map((element) => element.item.price * element.amount)
            .reduce((acc, price) => acc + price) + "₽"}
        </h2>
        <div className="cartList cartList-summary-row">
          <p>Скидка</p>
          <p>0</p>
        </div>
        <div />
        <div className="cartList cartList-summary-score">
          <p>Ваши баллы</p>
          <p>0</p>
        </div>
        <div />
        <div className="cartList cartList-summary-row">
          <p>Итог</p>
          <p>
            {cartList
              .map((element) => element.item.price * element.amount)
              .reduce((acc, price) => acc + price) + "₽"}
          </p>
        </div>
        <Link href={`/cart/pay`}>
          <button className="cartList cartList-summary-pay">
            Перейти к оплате
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartList;
