import React from "react";
import Search from "../Search/Search";
import { Typography } from "antd";

export default function Home() {
  return (
    <div className="home">
      <Typography>
        <Typography.Title level={2}>Twitter Scrapper</Typography.Title>
      </Typography>
      <Search />
    </div>
  );
}
