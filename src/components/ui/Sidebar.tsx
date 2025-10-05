import { NavLink } from "react-router-dom";
import { LayoutDashboard, Briefcase, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  setJobFilter,
  setSearch,
  setStage,
  setPage,
} from "@/store/features/candidates/candidatesSlice";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Candidates", href: "/candidates", icon: Users },
];

export default function Sidebar() {
  const dispatch = useDispatch<any>();

  const resetCandidateFilters = () => {
    dispatch(setJobFilter(undefined));
    dispatch(setSearch(""));
    dispatch(setStage("" as any));
    dispatch(setPage(1));
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">talentFlow</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={item.name === "Candidates" ? resetCandidateFilters : undefined}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}