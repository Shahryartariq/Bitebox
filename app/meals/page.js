import classes from '@/app/meals/page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import Link from 'next/link';
import { getMeals } from '@/lib/meals';

const MealsPage = async () => {
  const meals = await getMeals();
  return (
    <>
    <header className={classes.header}>
      <h1>
        Delicious Meals, Created{' '}
        <span className={classes.highlight}>by you</span> 
      </h1>
      <p>Choose your favorite recipe and cook it yourself. Its easy and fun!</p>
      <p className={classes.cta}>
        <Link href="/meals/share">
          Share Your Favourite Recipe
        </Link>
      </p>
    </header>

    <main className={classes.main}>
      <MealsGrid meals={meals} />
    </main>
    
  

    </>
  )
}

export default MealsPage