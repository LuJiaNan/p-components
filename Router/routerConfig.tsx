import React from "react";
import Step from "../pages/MyStep";
import { UserOutlined } from "@ant-design/icons";
import EditableTable from "../pages/EditableTable";
import CheckableTable from "../pages/CheckableTable";
import Transfer from "../pages/MyTransfer";
import SuperSelect from "../pages/SuperSelect";
import InlineComponents from "../pages/InlineComponents";
import AntdTextMask from "../pages/AntdTextMask";
import WeChat from "../pages/WeChat";
export const router = [
  {
    icon: <UserOutlined />,
    path: "/step/:step",
    link: "/step/first",
    component: Step,
    text: "Step"
  },
  {
    icon: <UserOutlined />,
    path: "/superSelect",
    link: "/superSelect",
    component: SuperSelect,
    text: "SuperSelect"
  },
  {
    icon: <UserOutlined />,
    path: "/editableTable",
    component: EditableTable,
    link: "/editableTable",
    text: "EditableTable"
  },
  {
    icon: <UserOutlined />,
    path: "/transfer",
    component: Transfer,
    link: "/transfer",
    text: "Transfer"
  },
  {
    icon: <UserOutlined />,
    path: "/checkableTable",
    component: CheckableTable,
    link: "/checkableTable",
    text: "CheckableTable"
  },
  {
    icon: <UserOutlined />,
    path: "/InlineComponents",
    component: InlineComponents,
    link: "/InlineComponents",
    text: "InlineComponents"
  },
  {
    icon: <UserOutlined />,
    path: "/AntdTextMask",
    component: AntdTextMask,
    link: "/AntdTextMask",
    text: "AntdTextMask"
  },
  {
    icon: <UserOutlined />,
    path: "/WeChat",
    component: WeChat,
    link: "/WeChat",
    text: "WeChat"
  },
  {
    redirect: true,
    path: "/",
    to: "/step/first"
  }
];
