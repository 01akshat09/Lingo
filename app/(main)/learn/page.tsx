import { FeedWrapper } from "@/components/FeedWrapper";
import { StickyWrapper } from "@/components/StickyWrapper";
import { UserProgress } from "@/components/UserProgress";
import { Header } from "./header";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
} from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";
import { lessons, units as unitsSchema } from "@/db/schema";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const courseProgressData = getCourseProgress();
  const percentageData = getLessonPercentage();
  const [userProgress, units, courseProgress, percentage] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    percentageData,
  ]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  if (!courseProgress) {
    redirect("/courses");
  }
  return (
    <div className="flex gap-[48px] px-6 flex-row-reverse">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={
                courseProgress?.activeLesson as
                  | (typeof lessons.$inferInsert & {
                      unit: typeof unitsSchema.$inferInsert;
                    })
                  | undefined
              }
              activeLessonPercentage={percentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};
export default LearnPage;
