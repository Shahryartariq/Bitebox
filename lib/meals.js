import sql from "@/lib/db";

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const meals = await sql`
    SELECT * FROM meals
  `;

  return meals;
}
