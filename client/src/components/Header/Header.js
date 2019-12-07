import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const selected = location.pathname === "/" ? "home" : location.pathname;
  return (
    <>
      <Menu
        mode="horizontal"
        style={{ lineHeight: "64px" }}
        defaultSelectedKeys={[selected]}
      >
        <Menu.Item key="home" style={{ float: "left" }}>
          <Link to="/">
            <Icon type="home" />
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="/about" style={{ float: "right" }}>
          <Link to="/about" rel="noopener noreferrer">
            About
          </Link>
        </Menu.Item>
        {/* <SubMenu
          title={<span className="submenu-title-wrapper">Dropdown</span>}
          style={{ float: "right" }}
        >
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu> */}
      </Menu>
    </>
  );
}
