export const StickyWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="hidden lg:block sticky self-end bottom-6 w-[368px]">
      <div className="flex flex-col top-6 sticky gap-y-4 min-h-[calc(100vh-48px)]">
        {children}
      </div>
    </div>
  );
};
