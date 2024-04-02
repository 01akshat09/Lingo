import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between border-b-2 mb-5 text-neutral-400 lg:z-50 lg:mt-[-28px] lg:pt-[28px] bg-white pb-3 sticky top-0">
      <Link href={"/courses"}>
        <Button variant={"ghost"} size={"sm"}>
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400"></ArrowLeft>
        </Button>
      </Link>
      <h1 className="font-bold text-lg">{title}</h1>
      <div />
    </div>
  );
};
