import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SidebarItems } from "./SidebarItems";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

export const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed flex-col border-r-2 px-4 top-0 left-0",
        className
      )}
    >
      <Link href={"/learn"}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItems href="/learn" iconSrc="/learn.svg" label="Learn" />
        <SidebarItems
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
          label="Leaderboard"
        />
        <SidebarItems href="/quests" iconSrc="/quests.svg" label="Quests" />
        <SidebarItems href="/shop" iconSrc="/shop.svg" label="Shop" />
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="animate-spin text-muted-foreground h-5 w-5" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
};
