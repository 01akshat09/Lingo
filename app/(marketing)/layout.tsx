import { Footer } from "./Footer";
import { Header } from "./Header";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col flex-1 justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};
export default MarketingLayout;
