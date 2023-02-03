import React, { useEffect } from "react";
import { Layout, WorkingOn } from "../../components";
import { useDispatch } from "react-redux";
import { layoutLoadingActions } from "../../store/layout-loading.slice";

const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <WorkingOn />
    </Layout>
  );
};

export default Admin;
