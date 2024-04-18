import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { QUESTS } from "@/constants";
import Image from "next/image";
import { Progress } from "./ui/progress";

export const Quests = ({ points }: { points: number }) => {
  return (
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="flex w-full items-center justify-between space-y-2">
        <h3 className="text-lg font-bold">Quests</h3>
        <Link href="/quests">
          <Button size={"sm"} variant={"primaryOutline"}>
            View All
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        {QUESTS.map((quest) => {
          const progress = (points / quest.value) * 100;
          return (
            <div
              className="flex w-full items-center gap-x-3 pb-4"
              key={quest.title}
            >
              <Image src="/points.svg" alt="Points" width={40} height={40} />
              <div className="flex w-full flex-col gap-y-2">
                <p className="text-sm font-bold text-neutral-700">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
