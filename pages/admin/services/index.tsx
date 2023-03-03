import React, { useEffect, useState } from "react";
import {
  AdminContainer,
  AdminRouteProtection,
  Layout,
  ServiceTable,
} from "../../../components";
import { ADMIN_SIDE_NAV } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { layoutLoadingActions } from "../../../store/layout-loading.slice";
import { sideNavTabActions } from "../../../store/sidenav-tab.slice";
import { AdminTabHeader, NewService } from "../../../ui";
import { getAllServices, getVendorCountByService } from "../../../APIs";
import { StoreState } from "../../../store";
import { Service } from "../../../types";
import { Box } from "@mui/system";

const countInitial = [
  {
    _id: "serviceId",
    count: 0,
  },
];

const Index = () => {
  const dispatch = useDispatch();

  // Setting the current tab
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    dispatch(sideNavTabActions.push("Services"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [services, setServices] = useState<Service[]>([]);
  const [vendorCount, setVendorCount] = useState(countInitial);
  const token = useSelector((state: StoreState) => state.jwt.token);

  const getAndSetServices = async () => {
    try {
      const serviceData = await getAllServices();
      if (serviceData) setServices(serviceData?.services);
    } catch (err) {
      console.error(err);
    }
  };
  const getAndSetVendorCount = async () => {
    try {
      const count = await getVendorCountByService(token);
      if (count) setVendorCount(count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAndSetServices();
    getAndSetVendorCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminRouteProtection>
      <Layout SideNavLinks={ADMIN_SIDE_NAV}>
        <AdminContainer>
          <AdminTabHeader header="Services" />
          <NewService setServices={setServices} />
          <ServiceTable
            services={services}
            setServices={setServices}
            vendorCount={vendorCount}
          />
        </AdminContainer>
      </Layout>
    </AdminRouteProtection>
  );
};

export default Index;
