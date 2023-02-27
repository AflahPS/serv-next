import {
  AccountBoxOutlined,
  AddTaskOutlined,
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
    mobile: true,
  },
  {
    title: "Services Nearby",
    icon: HomeRepairServiceOutlined,
    href: "/services",
    allowedRoles: ["user", "guest", "vendor", "admin"],
    mobile: true,
  },
  {
    title: "Profile",
    icon: AccountBoxOutlined,
    href: "/profile",
    allowedRoles: ["user", "vendor", "admin"],
    mobile: false,
  },
  {
    title: "Messages",
    icon: MailOutline,
    href: "/chat",
    allowedRoles: ["user", "vendor", "admin"],
    mobile: true,
  },
  {
    title: "Notifications",
    icon: NotificationsOutlined,
    href: "/notifications",
    allowedRoles: ["user", "vendor", "admin"],
    mobile: false,
  },
  // {
  //   title: "Calendar",
  //   icon: CalendarMonthOutlined,
  //   href: "/calendar",
  //   allowedRoles: ["vendor","admin"],
  // },
  {
    title: "My Activities",
    icon: AddTaskOutlined,
    href: "/dashboard/user",
    allowedRoles: ["user", "vendor"],
    mobile: true,
  },
  {
    title: "Vendor Panel",
    icon: DashboardCustomizeOutlined,
    href: "/dashboard/vendor",
    allowedRoles: ["vendor"],
    mobile: true,
  },
];
