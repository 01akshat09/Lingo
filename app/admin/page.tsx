import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = () => {
  const isAdmin = getIsAdmin();
  if (!isAdmin) redirect("/");
  return (
    <div>
      <App />
    </div>
  );
};

export default AdminPage;
