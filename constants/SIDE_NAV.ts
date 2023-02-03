import {
  AccountBoxOutlined,
  DashboardCustomizeOutlined,
  DynamicFeedOutlined,
  HomeRepairServiceOutlined,
  MailOutline,
  NotificationsOutlined,
} from "@mui/icons-material";

export const SIDE_NAV_LINKS = [
  {
    title: "Posts",
    icon: DynamicFeedOutlined,
    href: "/",
    allowedRoles: ["user", "guest", "vendor", "admin"],
  },
  {
    title: "Services Nearby",
    icon: HomeRepairServiceOutlined,
    href: "/services",
    allowedRoles: ["user", "guest", "vendor", "admin"],
  },
  {
    title: "Profile",
    icon: AccountBoxOutlined,
    href: "/profile",
    allowedRoles: ["user", "vendor", "admin"],
  },
  {
    title: "Messages",
    icon: MailOutline,
    href: "/chat",
    allowedRoles: ["user", "vendor", "admin"],
  },
  {
    title: "Notifications",
    icon: NotificationsOutlined,
    href: "/notifications",
    allowedRoles: ["user", "vendor", "admin"],
  },
  // {
  //   title: "Calendar",
  //   icon: CalendarMonthOutlined,
  //   href: "/calendar",
  //   allowedRoles: ["vendor","admin"],
  // },
  {
    title: "Dashboard",
    icon: DashboardCustomizeOutlined,
    href: "/dashboard/admin",
    allowedRoles: ["admin"],
  },
  {
    title: "Panel",
    icon: DashboardCustomizeOutlined,
    href: "/dashboard/vendor",
    allowedRoles: ["guest", "vendor"],
  },
];
