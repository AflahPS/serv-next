import React, { PropsWithChildren } from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { StoreState } from "../../store";

const checkIsAdmin = (role: string) => {
  // if (!role) return false;
  if (role == "admin") return true;
  if (role == "super-admin") return true;
  return false;
};

export const AdminRouteProtection = (props: PropsWithChildren) => {
  // const [isAdmin, setIsAdmin] = React.useState(false);
  const role = useSelector((state: StoreState) => state.role.currentUser);

  React.useEffect(() => {
    if (!checkIsAdmin(role)) {
      Router.push("/admin/auth/signin");
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <React.Fragment>{props.children}</React.Fragment>;
};
