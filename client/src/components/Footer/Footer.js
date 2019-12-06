import React from "react";
import { Layout, Typography, Icon, Row } from "antd";

export default function Footer(props) {
  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0
      }}
    >
      <Typography>
        <Row>
          <Typography.Text>{props.text}</Typography.Text>
        </Row>
        <Row>
          <Typography.Text>
            Made with{" "}
            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> by{" "}
            <a
              href="https://github.com/theeko"
              target="_blank"
              rel="noopener noreferrer"
            >
              theeko
            </a>
          </Typography.Text>
        </Row>
      </Typography>
    </Layout.Footer>
  );
}
