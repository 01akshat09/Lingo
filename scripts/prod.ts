import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "French", imgSrc: "/fr.svg" },
        { title: "Hindi", imgSrc: "/in.svg" },
        { title: "Japanese", imgSrc: "/jp.svg" },
        { title: "Spanish", imgSrc: "/es.svg" },
        { title: "Italian", imgSrc: "/it.svg" },
        { title: "Croatian", imgSrc: "/hr.svg" },
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text:
                    course.title === "Spanish"
                      ? "el Hombre"
                      : course.title === "Hindi"
                      ? "आदमी"
                      : course.title === "French"
                      ? "un Homme"
                      : course.title === "Japanese"
                      ? "男"
                      : course.title === "Croatian"
                      ? "čovjek"
                      : "un uomo",
                  imageSrc: "man.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_man.mp3"
                      : course.title === "Hindi"
                      ? "in_man.mp3"
                      : course.title === "French"
                      ? "fr_man.mp3"
                      : course.title === "Japanese"
                      ? "jp_man.mp3"
                      : course.title === "Croatian"
                      ? "cr_man.mp3"
                      : "it_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "la mujer"
                      : course.title === "Hindi"
                      ? "औरत"
                      : course.title === "French"
                      ? "la femme"
                      : course.title === "Japanese"
                      ? "その女"
                      : course.title === "Croatian"
                      ? "žena"
                      : "la donna",
                  imageSrc: "woman.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_woman.mp3"
                      : course.title === "Hindi"
                      ? "in_woman.mp3"
                      : course.title === "French"
                      ? "fr_woman.mp3"
                      : course.title === "Japanese"
                      ? "jp_woman.mp3"
                      : course.title === "Croatian"
                      ? "cr_woman.mp3"
                      : "it_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el chico"
                      : course.title === "Hindi"
                      ? "लड़का"
                      : course.title === "French"
                      ? "le garçon"
                      : course.title === "Japanese"
                      ? "男の子"
                      : course.title === "Croatian"
                      ? "dječak"
                      : "il ragazzo",
                  imageSrc: "boy.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_boy.mp3"
                      : course.title === "Hindi"
                      ? "in_boy.mp3"
                      : course.title === "French"
                      ? "fr_boy.mp3"
                      : course.title === "Japanese"
                      ? "jp_boy.mp3"
                      : course.title === "Croatian"
                      ? "cr_boy.mp3"
                      : "it_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text:
                    course.title === "Spanish"
                      ? "la mujer"
                      : course.title === "Hindi"
                      ? "औरत"
                      : course.title === "French"
                      ? "la femme"
                      : course.title === "Japanese"
                      ? "その女"
                      : course.title === "Croatian"
                      ? "žena"
                      : "la donna",
                  imageSrc: "woman.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_woman.mp3"
                      : course.title === "Hindi"
                      ? "in_woman.mp3"
                      : course.title === "French"
                      ? "fr_woman.mp3"
                      : course.title === "Japanese"
                      ? "jp_woman.mp3"
                      : course.title === "Croatian"
                      ? "cr_woman.mp3"
                      : "it_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el chico"
                      : course.title === "Hindi"
                      ? "लड़का"
                      : course.title === "French"
                      ? "le garçon"
                      : course.title === "Japanese"
                      ? "男の子"
                      : course.title === "Croatian"
                      ? "dječak"
                      : "il ragazzo",
                  imageSrc: "boy.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_boy.mp3"
                      : course.title === "Hindi"
                      ? "in_boy.mp3"
                      : course.title === "French"
                      ? "fr_boy.mp3"
                      : course.title === "Japanese"
                      ? "jp_boy.mp3"
                      : course.title === "Croatian"
                      ? "cr_boy.mp3"
                      : "it_boy.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el Hombre"
                      : course.title === "Hindi"
                      ? "आदमी"
                      : course.title === "French"
                      ? "un Homme"
                      : course.title === "Japanese"
                      ? "男"
                      : course.title === "Croatian"
                      ? "čovjek"
                      : "un uomo",
                  imageSrc: "man.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_man.mp3"
                      : course.title === "Hindi"
                      ? "in_man.mp3"
                      : course.title === "French"
                      ? "fr_man.mp3"
                      : course.title === "Japanese"
                      ? "jp_man.mp3"
                      : course.title === "Croatian"
                      ? "cr_man.mp3"
                      : "it_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "la mujer"
                      : course.title === "Hindi"
                      ? "औरत"
                      : course.title === "French"
                      ? "la femme"
                      : course.title === "Japanese"
                      ? "その女"
                      : course.title === "Croatian"
                      ? "žena"
                      : "la donna",
                  imageSrc: "woman.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_woman.mp3"
                      : course.title === "Hindi"
                      ? "in_woman.mp3"
                      : course.title === "French"
                      ? "fr_woman.mp3"
                      : course.title === "Japanese"
                      ? "jp_woman.mp3"
                      : course.title === "Croatian"
                      ? "cr_woman.mp3"
                      : "it_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el Hombre"
                      : course.title === "Hindi"
                      ? "आदमी"
                      : course.title === "French"
                      ? "un Homme"
                      : course.title === "Japanese"
                      ? "男"
                      : course.title === "Croatian"
                      ? "čovjek"
                      : "un uomo",
                  imageSrc: "man.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_man.mp3"
                      : course.title === "Hindi"
                      ? "in_man.mp3"
                      : course.title === "French"
                      ? "fr_man.mp3"
                      : course.title === "Japanese"
                      ? "jp_man.mp3"
                      : course.title === "Croatian"
                      ? "cr_man.mp3"
                      : "it_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text:
                    course.title === "Spanish"
                      ? "el chico"
                      : course.title === "Hindi"
                      ? "लड़का"
                      : course.title === "French"
                      ? "le garçon"
                      : course.title === "Japanese"
                      ? "男の子"
                      : course.title === "Croatian"
                      ? "dječak"
                      : "il ragazzo",
                  imageSrc: "boy.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_boy.mp3"
                      : course.title === "Hindi"
                      ? "in_boy.mp3"
                      : course.title === "French"
                      ? "fr_boy.mp3"
                      : course.title === "Japanese"
                      ? "jp_boy.mp3"
                      : course.title === "Croatian"
                      ? "cr_boy.mp3"
                      : "it_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "la mujer"
                      : course.title === "Hindi"
                      ? "औरत"
                      : course.title === "French"
                      ? "la femme"
                      : course.title === "Japanese"
                      ? "その女"
                      : course.title === "Croatian"
                      ? "žena"
                      : "la donna",
                  // imageSrc: "woman.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_woman.mp3"
                      : course.title === "Hindi"
                      ? "in_woman.mp3"
                      : course.title === "French"
                      ? "fr_woman.mp3"
                      : course.title === "Japanese"
                      ? "jp_woman.mp3"
                      : course.title === "Croatian"
                      ? "cr_woman.mp3"
                      : "it_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text:
                    course.title === "Spanish"
                      ? "el Hombre"
                      : course.title === "Hindi"
                      ? "आदमी"
                      : course.title === "French"
                      ? "un Homme"
                      : course.title === "Japanese"
                      ? "男"
                      : course.title === "Croatian"
                      ? "čovjek"
                      : "un uomo",
                  // imageSrc: "man.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_man.mp3"
                      : course.title === "Hindi"
                      ? "in_man.mp3"
                      : course.title === "French"
                      ? "fr_man.mp3"
                      : course.title === "Japanese"
                      ? "jp_man.mp3"
                      : course.title === "Croatian"
                      ? "cr_man.mp3"
                      : "it_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el chico"
                      : course.title === "Hindi"
                      ? "लड़का"
                      : course.title === "French"
                      ? "le garçon"
                      : course.title === "Japanese"
                      ? "男の子"
                      : course.title === "Croatian"
                      ? "dječak"
                      : "il ragazzo",
                  // imageSrc: "boy.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_boy.mp3"
                      : course.title === "Hindi"
                      ? "in_boy.mp3"
                      : course.title === "French"
                      ? "fr_boy.mp3"
                      : course.title === "Japanese"
                      ? "jp_boy.mp3"
                      : course.title === "Croatian"
                      ? "cr_boy.mp3"
                      : "it_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el Hombre"
                      : course.title === "Hindi"
                      ? "आदमी"
                      : course.title === "French"
                      ? "un Homme"
                      : course.title === "Japanese"
                      ? "男"
                      : course.title === "Croatian"
                      ? "čovjek"
                      : "un uomo",
                  imageSrc: "man.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_man.mp3"
                      : course.title === "Hindi"
                      ? "in_man.mp3"
                      : course.title === "French"
                      ? "fr_man.mp3"
                      : course.title === "Japanese"
                      ? "jp_man.mp3"
                      : course.title === "Croatian"
                      ? "cr_man.mp3"
                      : "it_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "la mujer"
                      : course.title === "Hindi"
                      ? "औरत"
                      : course.title === "French"
                      ? "la femme"
                      : course.title === "Japanese"
                      ? "その女"
                      : course.title === "Croatian"
                      ? "žena"
                      : "la donna",
                  imageSrc: "woman.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_woman.mp3"
                      : course.title === "Hindi"
                      ? "in_woman.mp3"
                      : course.title === "French"
                      ? "fr_woman.mp3"
                      : course.title === "Japanese"
                      ? "jp_woman.mp3"
                      : course.title === "Croatian"
                      ? "cr_woman.mp3"
                      : "it_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text:
                    course.title === "Spanish"
                      ? "el zombie"
                      : course.title === "Hindi"
                      ? "ज़ोंबी"
                      : course.title === "French"
                      ? "le zombie"
                      : course.title === "Japanese"
                      ? "ゾンビ"
                      : course.title === "Croatian"
                      ? "zombi"
                      : "lo zombi",
                  imageSrc: "zombie.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_zombie.mp3"
                      : course.title === "Hindi"
                      ? "in_zombie.mp3"
                      : course.title === "French"
                      ? "fr_zombie.mp3"
                      : course.title === "Japanese"
                      ? "jp_zombie.mp3"
                      : course.title === "Croatian"
                      ? "cr_zombie.mp3"
                      : "it_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text:
                    course.title === "Spanish"
                      ? "el robot"
                      : course.title === "Hindi"
                      ? "रोबोट"
                      : course.title === "French"
                      ? "le robot"
                      : course.title === "Japanese"
                      ? "ロボット"
                      : course.title === "Croatian"
                      ? "robot"
                      : "Il robot",
                  imageSrc: "robot.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_robot.mp3"
                      : course.title === "Hindi"
                      ? "in_robot.mp3"
                      : course.title === "French"
                      ? "fr_robot.mp3"
                      : course.title === "Japanese"
                      ? "jp_robot.mp3"
                      : course.title === "Croatian"
                      ? "cr_robot.mp3"
                      : "it_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el zombie"
                      : course.title === "Hindi"
                      ? "ज़ोंबी"
                      : course.title === "French"
                      ? "le zombie"
                      : course.title === "Japanese"
                      ? "ゾンビ"
                      : course.title === "Croatian"
                      ? "zombi"
                      : "lo zombi",
                  imageSrc: "zombie.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_zombie.mp3"
                      : course.title === "Hindi"
                      ? "in_zombie.mp3"
                      : course.title === "French"
                      ? "fr_zombie.mp3"
                      : course.title === "Japanese"
                      ? "jp_zombie.mp3"
                      : course.title === "Croatian"
                      ? "cr_zombie.mp3"
                      : "it_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el chico"
                      : course.title === "Hindi"
                      ? "लड़का"
                      : course.title === "French"
                      ? "le garçon"
                      : course.title === "Japanese"
                      ? "男の子"
                      : course.title === "Croatian"
                      ? "dječak"
                      : "il ragazzo",
                  imageSrc: "boy.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_boy.mp3"
                      : course.title === "Hindi"
                      ? "in_boy.mp3"
                      : course.title === "French"
                      ? "fr_boy.mp3"
                      : course.title === "Japanese"
                      ? "jp_boy.mp3"
                      : course.title === "Croatian"
                      ? "cr_boy.mp3"
                      : "it_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text:
                    course.title === "Spanish"
                      ? "la nina"
                      : course.title === "Hindi"
                      ? "लड़की"
                      : course.title === "French"
                      ? "la fille"
                      : course.title === "Japanese"
                      ? "女の子"
                      : course.title === "Croatian"
                      ? "djevojka"
                      : "la ragazza",
                  imageSrc: "girl.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_girl.mp3"
                      : course.title === "Hindi"
                      ? "in_girl.mp3"
                      : course.title === "French"
                      ? "fr_girl.mp3"
                      : course.title === "Japanese"
                      ? "jp_girl.mp3"
                      : course.title === "Croatian"
                      ? "cr_girl.mp3"
                      : "it_girl.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el zombie"
                      : course.title === "Hindi"
                      ? "ज़ोंबी"
                      : course.title === "French"
                      ? "le zombie"
                      : course.title === "Japanese"
                      ? "ゾンビ"
                      : course.title === "Croatian"
                      ? "zombi"
                      : "lo zombi",
                  imageSrc: "zombie.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_zombie.mp3"
                      : course.title === "Hindi"
                      ? "in_zombie.mp3"
                      : course.title === "French"
                      ? "fr_zombie.mp3"
                      : course.title === "Japanese"
                      ? "jp_zombie.mp3"
                      : course.title === "Croatian"
                      ? "cr_zombie.mp3"
                      : "it_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el Hombre"
                      : course.title === "Hindi"
                      ? "आदमी"
                      : course.title === "French"
                      ? "un Homme"
                      : course.title === "Japanese"
                      ? "男"
                      : course.title === "Croatian"
                      ? "čovjek"
                      : "un uomo",
                  imageSrc: "man.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_man.mp3"
                      : course.title === "Hindi"
                      ? "in_man.mp3"
                      : course.title === "French"
                      ? "fr_man.mp3"
                      : course.title === "Japanese"
                      ? "jp_man.mp3"
                      : course.title === "Croatian"
                      ? "cr_man.mp3"
                      : "it_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "la mujer"
                      : course.title === "Hindi"
                      ? "औरत"
                      : course.title === "French"
                      ? "la femme"
                      : course.title === "Japanese"
                      ? "その女"
                      : course.title === "Croatian"
                      ? "žena"
                      : "la donna",
                  // imageSrc: "woman.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_woman.mp3"
                      : course.title === "Hindi"
                      ? "in_woman.mp3"
                      : course.title === "French"
                      ? "fr_woman.mp3"
                      : course.title === "Japanese"
                      ? "jp_woman.mp3"
                      : course.title === "Croatian"
                      ? "cr_woman.mp3"
                      : "it_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text:
                    course.title === "Spanish"
                      ? "el zombie"
                      : course.title === "Hindi"
                      ? "ज़ोंबी"
                      : course.title === "French"
                      ? "le zombie"
                      : course.title === "Japanese"
                      ? "ゾンビ"
                      : course.title === "Croatian"
                      ? "zombi"
                      : "lo zombi",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_zombie.mp3"
                      : course.title === "Hindi"
                      ? "in_zombie.mp3"
                      : course.title === "French"
                      ? "fr_zombie.mp3"
                      : course.title === "Japanese"
                      ? "jp_zombie.mp3"
                      : course.title === "Croatian"
                      ? "cr_zombie.mp3"
                      : "it_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text:
                    course.title === "Spanish"
                      ? "el chico"
                      : course.title === "Hindi"
                      ? "लड़का"
                      : course.title === "French"
                      ? "le garçon"
                      : course.title === "Japanese"
                      ? "男の子"
                      : course.title === "Croatian"
                      ? "dječak"
                      : "il ragazzo",
                  // imageSrc: "boy.svg",
                  audioSrc:
                    course.title === "Spanish"
                      ? "es_boy.mp3"
                      : course.title === "Hindi"
                      ? "in_boy.mp3"
                      : course.title === "French"
                      ? "fr_boy.mp3"
                      : course.title === "Japanese"
                      ? "jp_boy.mp3"
                      : course.title === "Croatian"
                      ? "cr_boy.mp3"
                      : "it_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

void main();
