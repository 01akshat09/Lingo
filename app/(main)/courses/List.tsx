"use client";
import { courses, userProgress } from "@/db/schema";
import { Card } from "./Card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};
export const List = ({ courses, activeCourseId }: props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const onClick = (id: number) => {
    if (pending) return;
    if (id === activeCourseId) {
      return router.push("/learn");
    }
    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error("Something Went Wrong"));
    });
  };
  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => {
        return (
          <Card
            key={course.id}
            id={course.id}
            title={course.title}
            imageSrc={course.imgSrc}
            onclick={onClick}
            disabled={pending}
            active={course.id === activeCourseId}
          />
        );
      })}
    </div>
  );
};
