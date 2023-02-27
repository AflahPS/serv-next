import React, { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { useStore } from "../../customHooks";

export const VendorProtection = (props: PropsWithChildren) => {
  const { role } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (role !== "vendor") {
      router.push("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  useEffect(() => {
    if (role !== "vendor") {
      router.push("/");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <React.Fragment>{props.children}</React.Fragment>;
};
