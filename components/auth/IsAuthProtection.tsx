import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../customHooks";

export const IsAuthProtection = (props: PropsWithChildren) => {
  const { isAuth } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuth) {
      router.push("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      router.push("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <React.Fragment>{props.children}</React.Fragment>;
};
