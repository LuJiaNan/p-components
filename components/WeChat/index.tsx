import * as React from "react";
import { IWeChatProps } from "../../Interface";

class WeChat extends React.Component<IWeChatProps> {
  renderContent(item: any) {
    const { type, content, component } = item;
    if (component) {
      return component(item);
    } else {
      return content;
    }
  }

  render() {
    const { data } = this.props;
    return (
      <ul style={{ border: "1px solid green", margin: "30px" }}>
        {data.map((item: any, index: number) => (
          <li key={index}>{this.renderContent(item)}</li>
        ))}
      </ul>
    );
  }
}

export default WeChat;
