import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  // Early return pattern
  if (!isMenuOpen) return null;
  return (
    <div className=" p-4 shadow-lg w-48 ">
      <ul className="m-4">
        <li>Home</li>
        <li>Shorts</li>
        <li>Subscription</li>
      </ul>
      <ul className="m-4">
        <li className="font font-bold">Your channel</li>
        <li>History</li>
        <li>Your videos</li>
        <li>Watch later</li>
        <li>Your clips</li>
      </ul>
      <ul className="m-4">
        <li className="font font-bold">T-series</li>
        <li>shreyan's coading</li>
        <li>Gate smashers</li>
        <li>Roast and Toast</li>
        <li>Monika's Kitchen</li>
      </ul>
    </div>
  );
};

export default Sidebar;
