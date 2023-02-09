import {
  DashboardCustomizeOutlined,
  DynamicFeedOutlined,
  EngineeringOutlined,
  GroupOutlined,
  LocalPoliceOutlined,
  SettingsSuggestOutlined,
  TaskOutlined,
} from "@mui/icons-material";

const baseUrl = "/admin";

export const ADMIN_SIDE_NAV = [
  {
    title: "Dashboard",
    icon: DashboardCustomizeOutlined,
    href: baseUrl,
    allowedRoles: ["admin", "super-admin"],
  },
  {
    title: "Users",
    icon: GroupOutlined,
    href: baseUrl + "/users",
    allowedRoles: ["admin", "super-admin"],
  },
  {
    title: "Vendors",
    icon: EngineeringOutlined,
    href: baseUrl + "/vendors",
    allowedRoles: ["admin", "super-admin"],
  },
  {
    title: "Admins",
    icon: LocalPoliceOutlined,
    href: baseUrl + "/admins",
    allowedRoles: ["super-admin"],
  },
  {
    title: "Services",
    icon: SettingsSuggestOutlined,
    href: baseUrl + "/services",
    allowedRoles: ["admin", "super-admin"],
  },
  {
    title: "Projects",
    icon: TaskOutlined,
    href: baseUrl + "/projects",
    allowedRoles: ["admin", "super-admin"],
  },
  {
    title: "Posts",
    icon: DynamicFeedOutlined,
    href: baseUrl + "/posts",
    allowedRoles: ["admin", "super-admin"],
  },
];
