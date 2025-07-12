import { House } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { ListCheck } from "lucide-react";
import { MessageSquareMore } from "lucide-react";

import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <div className="flex flex-col border-r border-gray-200 min-h-full pt-6 dark:border-gray-600">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center  gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive &&
            "bg-primary/10 dark:bg-emerald-300/10 border-r-4 border-primary dark:border-emerald-500 text-primary dark:text-gray-50"
          }`
        }
      >
        <House className="min-w-4 w-5 dark:text-gray-100" />
        <p className="hidden md:inline-block dark:text-gray-100">Dashboard</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive &&
            "bg-primary/10 border-r-4  dark:bg-emerald-300/10 border-primary dark:border-emerald-500 text-primary dark:text-gray-50"
          }`
        }
      >
        <SquarePlus className="min-w-4 w-5 dark:text-gray-100" />
        <p className="hidden md:inline-block dark:text-gray-50">Add Blog</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/listBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive &&
            "bg-primary/10 border-r-4 dark:bg-emerald-300/10 border-primary dark:border-emerald-500 text-primary dark:text-gray-50"
          }`
        }
      >
        <ListCheck className="min-w-4 w-5 dark:text-gray-100" />
        <p className="hidden md:inline-block dark:text-gray-50">Blog lists</p>
      </NavLink>
      <NavLink
        end={true}
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive &&
            "bg-primary/10 border-r-4 dark:bg-emerald-300/10 border-primary dark:border-emerald-500 text-primary dark:text-gray-50"
          }`
        }
      >
        <MessageSquareMore className="min-w-4 w-5 dark:text-gray-100" />
        <p className="hidden md:inline-block dark:text-gray-50">Comments</p>
      </NavLink>
    </div>
  );
}

export default SideBar;
