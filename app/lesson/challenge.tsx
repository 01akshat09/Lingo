import { challengeOptions, challenges } from "@/db/schema";

type props = {
  options: (typeof challengeOptions.$inferInsert)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferInsert)["type"];
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: props) => {
  return <div>Challenge</div>;
};
