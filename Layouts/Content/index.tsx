import * as React from "react";
import { Layout } from "antd";
import RouterDom from "../../Router/router";

const { Content } = Layout;

export default class MainBody extends React.Component {
  render() {
    return (
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          marginTop: "4px",
          background: "#fff",
          minHeight: 280
        }}
      >
        <RouterDom />
      </Content>
    );
  }
}
