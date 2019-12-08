import React from "react";
import { List, Avatar, Row, Col, Icon } from "antd";
import "./styles.css";

export default function ListComponent({ items, handleArrayChange }) {
  const handleRemove = item => {
    items = items.filter(i => i !== item);
    handleArrayChange(items);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={item => (
        <List.Item>
          <Row type="flex" style={{ width: "100%" }}>
            <Col
              className="list-item-main"
              style={{
                width: item.imgUrls.length > 0 ? "80%" : "100%",
                padding: 15,
                position: "relative"
              }}
            >
              <List.Item.Meta
                title={<a href={`${item.userLink}`}>{item.username}</a>}
                avatar={
                  item.imgUrls[0] ? (
                    <Avatar size="large" src={item.avatar} />
                  ) : (
                    <Avatar shape="square" icon="user" />
                  )
                }
                description={item.message}
              />
              <Icon
                key="list-loadmore-edit"
                type="close"
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                  cursor: "hand",
                  zIndex: 10,
                  opacity: 0.8
                }}
                onClick={() => {
                  handleRemove(item);
                }}
              />
            </Col>

            {item.imgUrls.length > 0 ? (
              <Col style={{ width: "20%" }} className="img-container" sm={12}>
                <a
                  href={item.imgUrls[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    style={{ width: "100px" }}
                    src={item.imgUrls[0]}
                    alt={`pic for ${item.username}`}
                  />
                </a>
              </Col>
            ) : null}
          </Row>
        </List.Item>
      )}
    />
  );
}
