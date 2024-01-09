import React from "react";
import MenuItem from "../Navbar/MenuItem";

export default function Header() {
  return (
    <div className="header mb-10 w-full flex justify-center gap-x-5 items-center py-3 px-10">
      <MenuItem to={"/"} title="Call Api" />
      <MenuItem to={"/signup"} title="React Hook Form" />
      <MenuItem to={"/todo"} title="State Management" />
    </div>
  );
}
