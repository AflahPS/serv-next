import React, { useEffect } from "react";
import {
  AdminContainer,
  AdminRouteProtection,
  Layout,
  VendorTable,
} from "../../../components";
import { ADMIN_SIDE_NAV } from "../../../constants";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../../store/layout-loading.slice";
import { sideNavTabActions } from "../../../store/sidenav-tab.slice";
import { User } from "../../../types";
import { AdminTabHeader } from "../../../ui";

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Vendors"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminRouteProtection>
      <Layout SideNavLinks={ADMIN_SIDE_NAV}>
        <AdminContainer>
          <AdminTabHeader header="Vendors" />
          <VendorTable />
        </AdminContainer>
      </Layout>
    </AdminRouteProtection>
  );
};

export default Index;
