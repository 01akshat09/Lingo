import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });
const main = async () => {
  try {
    console.log("Seeding Database");
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.challenges);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Hindi",
        imgSrc: "/in.svg",
      },
      {
        id: 2,
        title: "Italian",
        imgSrc: "/it.svg",
      },
      {
        id: 3,
        title: "Japanese",
        imgSrc: "/jp.svg",
      },
      {
        id: 4,
        title: "French",
        imgSrc: "/fr.svg",
      },
      {
        id: 5,
        title: "Croatian",
        imgSrc: "/hr.svg",
      },
      {
        id: 6,
        title: "Spanish",
        imgSrc: "/es.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, //hindi
        title: "Unit 1",
        description: "Learn the basics of Hindi",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 4,
        title: "Verbs",
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 5,
        title: "Verbs",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: 'Which one of this "a dog"?',
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: '"A dog"',
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: 'Which one of this "a cat"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: "dog.svg",
        correct: true,
        text: "कुत्ता",
        audioSrc: "/in_dog.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "monkey.svg",
        correct: false,
        text: "बंदर",
        audioSrc: "/in_monkey.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "cat.svg",
        correct: false,
        text: "बिल्ली",
        audioSrc: "/in_cat.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        // imageSrc: "dog.svg",
        correct: true,
        text: "कुत्ता",
        audioSrc: "/in_dog.mp3",
      },
      {
        challengeId: 2,
        // imageSrc: "monkey.svg",
        correct: false,
        text: "बंदर",
        audioSrc: "/in_monkey.mp3",
      },
      {
        challengeId: 2,
        // imageSrc: "cat.svg",
        correct: false,
        text: "बिल्ली",
        audioSrc: "/in_cat.mp3",
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: "dog.svg",
        correct: false,
        text: "कुत्ता",
        audioSrc: "/in_dog.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "monkey.svg",
        correct: false,
        text: "बंदर",
        audioSrc: "/in_monkey.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "cat.svg",
        correct: true,
        text: "बिल्ली",
        audioSrc: "/in_cat.mp3",
      },
    ]);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to seed the Database");
  }
};

main();
