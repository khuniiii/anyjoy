"use client";

import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // 좌우 중앙 정렬
        alignItems: "center", // 상하 중앙 정렬
        height: "80vh", // 화면 높이 전체를 차지하도록 설정
      }}
    >
      <TailSpin color="#ff0000" height={100} width={100} />
    </div>
  );
};

export default Loading;
