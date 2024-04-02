import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

type props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
  type: (typeof challenges.$inferInsert)["type"];
};

export const Card = ({
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
  type,
}: props) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });
  const handleClick = useCallback(() => {
    if (disabled) return;
    controls.play();
    onClick();
  }, [onClick, disabled, controls]);
  useKey(shortcut, handleClick, {}, [handleClick]);
  return (
    <div
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-sky-300 hover:bg-sky-100",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100",
        selected &&
          status === "wrong" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100"
      )}
    >
      {audio}
    </div>
  );
};
