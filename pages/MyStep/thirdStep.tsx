import * as React from "react";
import { Button } from "antd";

interface ISettingProps {
  goRoutes?: any;
  getCurrentStep?: any;
  history?: any;
}

class Index extends React.Component<ISettingProps> {
  onSubmit = () => {
    console.log("当前是第" + this.props.getCurrentStep() + "步");
  };
  goLast = () => {
    this.props.goRoutes(2);
  };
  // goNext = () => {
  //   this.props.goRoutes(3)
  // }
  goBack = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div>我是step2</div>
        <Button onClick={this.goLast}>上一步</Button>
        {/* <Button onClick={this.goNext}>下一步</Button> */}
        <Button onClick={this.goBack}>关闭</Button>
        <Button onClick={this.onSubmit}>提交</Button>
      </div>
    );
  }
}

export default Index;
