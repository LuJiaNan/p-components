import * as React from "react";
import WeChat from "../../components/WeChat";
import { IWeChatProps } from "../../Interface";
import { transformData } from "./transformData";
import Data from "./data";

export default class WeChatPage extends React.Component<IWeChatProps> {
  render() {
    return <WeChat data={transformData(Data)} />;
  }
}
