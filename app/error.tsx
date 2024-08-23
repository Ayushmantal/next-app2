"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log("Error", error);
  return (
    <>
      <div>Aliens gave invaded earth.</div>;
      <button className="btn btn-circle" onClick={() => reset()}>
        Retry
      </button>
    </>
  );
};

export default ErrorPage;
