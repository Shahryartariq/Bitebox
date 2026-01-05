import sql from "@/lib/db";
import slugify from "slugify";
import xss from "xss";
import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

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
  // Sanitize
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // Handle image
  const file = meal.image;
  const extension = file.name.split(".").pop();
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  const filename = `${meal.slug}-${randomSuffix}.${extension}`;

  // Convert file to buffer
  const bufferImage = Buffer.from(await file.arrayBuffer());

  // Upload to R2
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: filename,
      Body: bufferImage,
      ContentType: file.type,
    })
  );

  // Save R2 public URL in DB (or just filename)
  meal.image = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${filename}`;

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
