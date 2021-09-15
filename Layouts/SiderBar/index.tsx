import * as React from "react";
import { Layout, Menu } from "antd";
import { RouteComponentProps, withRouter, NavLink } from "react-router-dom";
import { router } from "../../Router/routerConfig";
import "./index.css";

const { Sider } = Layout;

interface Props {}

class SiderBar extends React.Component<RouteComponentProps & Props> {
  state = {
    collapsed: false,
    selectedKeys: []
  };

  getOpenKey = (location: any) => {
    var d = location.pathname.split("/");
    d = d.join("/");
    return [d];
  };

  componentDidMount() {
    const { location } = this.props;
    this.setState({
      selectedKeys: this.getOpenKey(location)
    });
  }

  UNSAFE_componentWillReceiveProps(next: any) {
    this.setState({
      selectedKeys: this.getOpenKey(next.location)
    });
    debugger;
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  goRoute = (path: string) => {
    console.log(path);
    this.props.history.push(path);
  };

  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <Menu theme="dark" mode="inline" selectedKeys={this.state.selectedKeys}>
          {router.map(
            (item: any) =>
              !item.redirect && (
                <Menu.Item key={item.link}>
                  <NavLink
                    to={{ pathname: item.link, state: { refresh: true } }}
                  >
                    {item.icon}
                    {item.text}
                  </NavLink>
                </Menu.Item>
              )
          )}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SiderBar);
