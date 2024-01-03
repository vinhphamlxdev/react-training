import Header from "./Header";
import Sidebar from "./Sidebar";
const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <>{children}</>
    </div>
  );
};
export default DefaultLayout;
