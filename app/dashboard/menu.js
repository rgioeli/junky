import Link from "next/link";
import {
  BsEnvelope,
  BsFolder2,
  BsMessenger,
  BsPlusCircle,
  BsPlusCircleFill,
  BsSearch,
  BsShop,
} from "react-icons/bs";

const Menu = () => {
  return (
    <div className="h-full border-r-2 border-purple-700">
      <div>
        <nav>
          <ul>
            <li className="flex flex-1 w-60">
              <Link
                className="flex-1 text-center py-3 px-2 bg-white hover:bg-purple-700 hover:text-white"
                href="/dashboard/search"
              >
                <div className="flex justify-start items-center space-x-2">
                  <BsSearch />
                  <span>Search</span>
                </div>
              </Link>
            </li>
            <li className="flex flex-1">
              <Link
                className="flex-1 text-center py-3 px-2 bg-white hover:bg-purple-700 hover:text-white"
                href="/dashboard/shop"
              >
                <div className="flex justify-start items-center space-x-2">
                  <BsShop />
                  <span>Shop</span>
                </div>
              </Link>
            </li>
            <li className="flex flex-1">
              <Link
                className="flex-1 text-center py-3 px-2 bg-white hover:bg-purple-700 hover:text-white"
                href="/dashboard/create-listing"
              >
                <div className="flex justify-start items-center space-x-2">
                  <BsPlusCircle />
                  <span>Create Listing</span>
                </div>
              </Link>
            </li>
            <li className="flex flex-1">
              <Link
                className="flex-1 text-center py-3 px-2 bg-white hover:bg-purple-700 hover:text-white"
                href="/dashboard/my-listings"
              >
                <div className="flex justify-start items-center space-x-2">
                  <BsShop />
                  <span>My Listings</span>
                </div>
              </Link>
            </li>
            <li className="flex flex-1">
              <Link
                className="flex-1 text-center py-3 px-2 bg-white hover:bg-purple-700 hover:text-white"
                href="/dashboard/messages"
              >
                <div className="flex justify-start items-center space-x-2">
                  <BsEnvelope />
                  <span>Messages</span>
                </div>
              </Link>
            </li>
            <li className="flex flex-1">
              <Link
                className="flex-1 text-center py-3 px-2 bg-white hover:bg-purple-700 hover:text-white"
                href="/dashboard/settings"
              >
                <div className="flex justify-start items-center space-x-2">
                  <BsPlusCircle />
                  <span>Settings</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div></div>
    </div>
  );
};

export default Menu;
