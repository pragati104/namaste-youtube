import { useDispatch, useSelector } from "react-redux";
import { HUMBURGER_URL, YOUTUBE_SEARCH_API } from "../utils/config";
import { YOUTUBE_LOGO_URL } from "../utils/config";
import { toggleMenu } from "../utils/appSlice";
import { useState } from "react";
import { useEffect } from "react";
import { cacheResults } from "../utils/searchSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowsuggetions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggetions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggetions = async () => {
    console.log(searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data?.json();
    setSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="flex justify-between m-4">
      <div className="flex">
        <img
          onClick={() => toggleMenuHandler()}
          className="w-20 h-14 rounded-full cursor-pointer"
          alt="humburger-icon"
          src={HUMBURGER_URL}
        />
        <img
          className="w-44 h-10 m-2"
          alt="youtube-logo"
          src={YOUTUBE_LOGO_URL}
        />
      </div>
      <div className="w-1/2 m-2">
        <input
          className="w-10/12 p-3  px-4 rounded-l-full border border-gray-400"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowsuggetions(true)}
          onBlur={() => setShowsuggetions(false)}
        />
        <button className="p-3  bg-gray-100 rounded-r-full border border-gray-400">
          search
        </button>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-5 w-[43.1rem] rounded-lg shadow-lg">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="px-5 py-2 hover:bg-gray-100">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mx-4 my-4">
        <ul className="flex gap-4 ">
          <li>home</li>
          <li>About</li>
          <li>Log In</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
