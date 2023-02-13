import React, { useEffect, useState } from "react";
import {
  AdminContainer,
  AdminRouteProtection,
  Layout,
  PostTable,
} from "../../../components";
import { ADMIN_SIDE_NAV, COLUMNS, ROWS } from "../../../constants";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../../store/layout-loading.slice";
import { sideNavTabActions } from "../../../store/sidenav-tab.slice";
import { AdminTabHeader, DataTable } from "../../../ui";
import { Post } from "../../../types";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Posts"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminRouteProtection>
      <Layout SideNavLinks={ADMIN_SIDE_NAV}>
        <AdminContainer>
          <AdminTabHeader header="Posts" />
          <PostTable />
        </AdminContainer>
      </Layout>
    </AdminRouteProtection>
  );
};

export default Index;
