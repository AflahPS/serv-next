/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Layout } from "../../components/common";
import { ProfileComplete } from "../../components/profile";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store";
import { layoutLoadingActions } from "../../store/layout-loading.slice";
import { useRouter } from "next/router";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: StoreState) => state.user.data);

  useEffect(() => {
    dispatch(layoutLoadingActions.finishedLoading());
    return () => {
      dispatch(layoutLoadingActions.finishedLoading());
    };
  }, []);

  useEffect(() => {
    if (!user.name) {
      router.push("/");
    }
  }, []);

  return (
    <Layout>
      <ProfileComplete user={user} />
    </Layout>
  );
};

export default Profile;
