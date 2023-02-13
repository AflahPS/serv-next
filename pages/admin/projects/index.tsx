import React, { useEffect } from "react";
import {
  AdminContainer,
  AdminRouteProtection,
  Layout,
  ProjectTable,
} from "../../../components";
import { ADMIN_SIDE_NAV } from "../../../constants";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../../store/layout-loading.slice";
import { sideNavTabActions } from "../../../store/sidenav-tab.slice";
import { AdminTabHeader } from "../../../ui";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Projects"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminRouteProtection>
      <Layout SideNavLinks={ADMIN_SIDE_NAV}>
        <AdminContainer>
          <AdminTabHeader header="Projects" />
          <ProjectTable />
        </AdminContainer>
      </Layout>
    </AdminRouteProtection>
  );
};

export default Index;
