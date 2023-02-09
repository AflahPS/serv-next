import React, { useEffect } from "react";
import { AdminRouteProtection, Layout } from "../../components";
import { ADMIN_SIDE_NAV } from "../../constants";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../store/layout-loading.slice";
import { sideNavTabActions } from "../../store/sidenav-tab.slice";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Dashboard"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminRouteProtection>
      <Layout SideNavLinks={ADMIN_SIDE_NAV}></Layout>
    </AdminRouteProtection>
  );
};

export default Index;
