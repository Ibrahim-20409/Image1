import { Outlet } from "react-router";
import SideBar from "./SideBar.jsx";

const MenuLayout = () => {
  return (
    <div>
      <SideBar />
      <div className="sm:ml-14 sm:mt-14">
        <Outlet />
      </div>
    </div>
  );
};

export default MenuLayout;
