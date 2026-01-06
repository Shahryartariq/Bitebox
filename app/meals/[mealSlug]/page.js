import Image from "next/image";
import { getMeal } from "@/lib/meals";
import classes from "@/app/meals/[mealSlug]/page.module.css";
import { notFound } from "next/navigation";
import AiCookingHelper from "@/components/ai/AiCookingHelper";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.mealSlug;
  const meal = await getMeal(slug);
  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

const MealDetailPage = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.mealSlug;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  const recipeText = `Recipe Title: ${meal.title}\n\nSummary:\n${meal.summary}\n\nInstructions:\n${meal.instructions}`;

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main className={classes.mainContainer}>
        <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal.instructions }}></p>
        <AiCookingHelper recipe={recipeText} />
      </main>
    </>
  );
};

export default MealDetailPage;
