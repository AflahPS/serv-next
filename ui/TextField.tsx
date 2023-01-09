import React from "react";

export const TextField = (props: { className: string }) => {
  return (
    <>
      <input
        type="text"
        className={`bg-H1d-ui-secondary rounded ${props.className}`}
      />
    </>
  );
};
