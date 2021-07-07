import React, { useEffect } from 'react';
import Head from 'next/head'
import { GetServerSideProps } from "next";
import client from '../lib/apollo/apollo-client';
import { apiProductGql, apiCurrencyGql } from "../lib/query";
import { currencyType } from '../lib/currencyEnum';
import { NavBar } from '../components/nav/nav';
import { Filter } from '../components/filter/filter';
import { Products } from '../components/products/products';
import cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import {
  productAction,
  activeProduct,
  currencyAction,
} from "../redux/actions/productAction";
import { getCookieCurrency } from '../helpers/currency';
import { defaultCurrency } from '../redux/actions/currencyAction';

export default function Home({ products, currencies }: any) {
  
  const dispatch = useDispatch();
  let productObj: any = {};

  useEffect(() => {
    
    const currency: any = cookie.get("currency");
    if (!currency) {
      cookie.set("currency", "NGN", {
        expires: 7,
        sameSite: "None",
        secure: true,
      });
    }
    productObj[currency] = products.products;
    
    Promise.all([
      dispatch(activeProduct(products.products)),
      dispatch(productAction(productObj)),
      dispatch(currencyAction(currencies)),
      dispatch(defaultCurrency(getCookieCurrency())),
    ]);
    
  }, []);

  return (
    <div className="">
      <Head>
        <title>Products | Lumin</title>
        <meta name="description" content="Lumin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <NavBar currencies={currencies.currency} />
        <Filter />
        <Products />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  
  const cookiCurr = req.cookies.currency || 'NGN';  // parseCookies(req);

  const [productsRes, currencyRes] = await Promise.all([
    client.query({
      query: apiProductGql(
        currencyType[cookiCurr as keyof typeof currencyType], 
      ), fetchPolicy: 'network-only'
    },),
    client.query({
      query: apiCurrencyGql,
    }),
  ]);
  const [products, currencies] = await Promise.all([productsRes.data, currencyRes.data]);
  

  return {
    props: { products, currencies, cookiCurr },
  };
};
