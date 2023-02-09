import React, { useEffect, useState } from "react";
import { AdminRouteProtection, Layout, UserTable } from "../../../components";
import { ADMIN_SIDE_NAV, COLUMNS, ROWS } from "../../../constants";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../../store/layout-loading.slice";
import { sideNavTabActions } from "../../../store/sidenav-tab.slice";
import { User } from "../../../types";

const Index = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Users"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminRouteProtection>
      <Layout SideNavLinks={ADMIN_SIDE_NAV}>
        <UserTable />
      </Layout>
    </AdminRouteProtection>
  );
};

export default Index;
