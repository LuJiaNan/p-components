import * as React from "react";
import { Layout } from "antd";
import "./styles.css";
import "antd/dist/antd.css";
import MainBody from "../Layouts/Content";
import SiderBar from "../Layouts/SiderBar";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export default function App() {
  return (
    <Router history={history}>
      <Layout>
        <SiderBar />
        <Layout>
          <MainBody />
        </Layout>
      </Layout>
    </Router>
  );
}
