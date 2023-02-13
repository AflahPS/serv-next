import React, { useEffect, useState } from "react";
import {
  AdminContainer,
  AdminRouteProtection,
  AdminTable,
  Layout,
} from "../../../components";
import { useDispatch } from "react-redux";
import { ADMIN_SIDE_NAV } from "../../../constants";
import { layoutLoadingActions } from "../../../store/layout-loading.slice";
import { sideNavTabActions } from "../../../store/sidenav-tab.slice";
import { AdminTabHeader } from "../../../ui";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Admins"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminRouteProtection>
      <Layout SideNavLinks={ADMIN_SIDE_NAV}>
        <AdminContainer>
          <AdminTabHeader header="Admins" />
          <AdminTable />
        </AdminContainer>
      </Layout>
    </AdminRouteProtection>
  );
};

export default Index;
