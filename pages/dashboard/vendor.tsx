import React, { useEffect } from "react";
import { Layout, Panel, VendorProtection } from "../../components";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../store/layout-loading.slice";

const Vendor = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VendorProtection>
      <Layout>
        <Panel />
      </Layout>
    </VendorProtection>
  );
};

export default Vendor;
