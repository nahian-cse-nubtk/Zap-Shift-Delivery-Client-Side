import React, { Suspense } from "react";
import { NavLink } from "react-router";
import Banner from "../Banner/Banner";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
const reviewsPromise = fetch('/reviews.json').then(res=>res.json())
const Home = () => {

  return (
    <div>
        <Banner></Banner>
        <Brands></Brands>
        <Suspense fallback={<p>Loading...</p>}>
            <Reviews reviewsPromise={reviewsPromise}></Reviews>
        </Suspense>

    </div>
  );
};

export default Home;
