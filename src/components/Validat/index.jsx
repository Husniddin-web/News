import React, { useEffect } from "react";

const index = ({ error, name }) => {
  return (
    <>
      {error.map((e) => {
        return (
          <p className="text-center   text-danger m-0" key={e}>
            *{e}
          </p>
        );
      })}
    </>
  );
};

export default index;
