import React from "react";
import { Typography } from "antd";

export default function About() {
  return (
    <div className="about">
      <Typography>
        <Typography.Title level={3}>About</Typography.Title>
        <Typography.Paragraph>
          A site for scrapping twitter posts with imgs
        </Typography.Paragraph>

        <Typography.Title level={4}>Examples</Typography.Title>
        <Typography.Text code>
          #dog pug, dog husky, something else, as many as you want
        </Typography.Text>
      </Typography>
    </div>
  );
}
