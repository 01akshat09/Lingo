// import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
// import { redirect } from "next/navigation";
// import { Quiz } from "./quiz";

// const Lesson = async () => {
//   const lessonData = getLesson();
//   const userProgressData = getUserProgress();
//   const userSubscriptionData = getUserSubscription();

//   const [lesson, userProgress, userSubcription] = await Promise.all([
//     lessonData,
//     userProgressData,
//     userSubscriptionData,
//   ]);

//   if (!lesson || !userProgress) return redirect("/learn");

//   const initialPercentage =
//     (lesson.challenges.filter((challenge) => challenge.completed).length /
//       lesson.challenges.length) *
//     100;

//   return (
//     <Quiz
//       initialLessonId={lesson.id}
//       initialLessonChallenges={lesson.challenges}
//       initialHearts={userProgress.hearts}
//       initialPercentage={initialPercentage}
//       userSubscription={userSubcription}
//     />
//   );
// };

// export default Lesson;

import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";

import { Quiz } from "./quiz";
import { redirect } from "next/navigation";

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubcription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) return redirect("/learn");

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubcription}
    />
  );
};

export default LessonPage;
