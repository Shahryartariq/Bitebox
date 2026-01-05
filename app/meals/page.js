import classes from "@/app/meals/page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import Link from "next/link";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";


export const metadata = {
  title: 'All Meals',
  description: 'Discover and Share Delicious Recipes from Around the World',
};


async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

const MealsPage = async () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals, Created
          <span className={classes.highlight}> by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself. easy and fun!</p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favourite Recipe</Link>
        </p>
      </header>

      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;
