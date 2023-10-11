import React, { Suspense } from "react";
import MainList from "@/components/organisms/MainList";
import Header from "@/components/organisms/Header";

const List = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading feed...</p>}>
        <MainList />
      </Suspense>
    </>
  );
};

export default List;
