import React, { useEffect, useState } from "react";
import {
  AdminRouteProtection,
  Layout,
  ServiceTable,
} from "../../../components";
import { ADMIN_SIDE_NAV } from "../../../constants";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../../store/layout-loading.slice";
import { sideNavTabActions } from "../../../store/sidenav-tab.slice";
import { Service } from "../../../types";

const Index = () => {
  const dispatch = useDispatch();

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Services"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminRouteProtection>
      <Layout SideNavLinks={ADMIN_SIDE_NAV}>
        <ServiceTable />
      </Layout>
    </AdminRouteProtection>
  );
};

export default Index;
