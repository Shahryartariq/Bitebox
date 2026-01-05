import sql from "@/lib/db";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error('Database connection failed');
  const meals = await sql`
    SELECT * FROM meals
  `;

  return meals;
}

export async function getMeal(slug) {
  const [meal] = await sql`
    SELECT * FROM meals WHERE slug = ${slug}
  `;

  if (!meal) {
    return null; // or throw an error
  }

  return meal;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const filename = `${meal.slug}-${randomSuffix}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferImage = await meal.image.arrayBuffer();

  stream.write(
    Buffer.from(bufferImage, (error) => {
      if (error) {
        throw new Error("Saving Image Failed!!!");
      }
    })
  );

  meal.image = `/images/${filename}`;

  const [createdMeal] = await sql`
    INSERT INTO meals (
      title,
      slug,
      summary,
      image,
      instructions,
      creator,
      creator_email
    )
    VALUES (
      ${meal.title},
      ${meal.slug},
      ${meal.summary},
      ${meal.image},
      ${meal.instructions},
      ${meal.creator},
      ${meal.creator_email}
    )
    RETURNING *
  `;

  return createdMeal;
}
