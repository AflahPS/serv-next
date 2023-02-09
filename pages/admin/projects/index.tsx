import React, { useEffect, useState } from "react";
import {
  AdminRouteProtection,
  Layout,
  ProjectTable,
} from "../../../components";
import { ADMIN_SIDE_NAV } from "../../../constants";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../../store/layout-loading.slice";
import { sideNavTabActions } from "../../../store/sidenav-tab.slice";

const Index = () => {
  const dispatch = useDispatch();

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Projects"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminRouteProtection>
      <Layout SideNavLinks={ADMIN_SIDE_NAV}>
        <ProjectTable />
      </Layout>
    </AdminRouteProtection>
  );
};

export default Index;
