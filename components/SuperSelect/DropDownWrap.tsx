import * as React from "react";

const initialState = {
  allHeight: "",
  startIndex: 0,
  endIndex: 0
};

interface Props {
  allHeight: any;
  startIndex: number;
  endIndex: number;
  itemHeight: any;
  menu: any;
}

type State = typeof initialState;

export default class DropDownWrap extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    const { allHeight, startIndex, endIndex } = props;

    this.state = {
      allHeight,
      startIndex,
      endIndex
    };
  }

  getItemStyle = (i: any) => {
    const { itemHeight } = this.props;
    return {
      position: "absolute",
      top: itemHeight * i,
      height: itemHeight,
      width: "100%"
    };
  };

  reactList = (allHeight: any, startIndex: any, endIndex: any) =>
    this.setState({ allHeight, startIndex, endIndex });

  render() {
    const { menu } = this.props;
    const { startIndex, endIndex, allHeight } = this.state;
    // 截取 Select 下拉列表中需要显示的部分
    const cloneMenu = React.cloneElement(menu, {
      menuItems:
        menu.props.menuItems &&
        menu.props.menuItems
          .slice(startIndex, endIndex)
          .map((item: any, i: any) => {
            const realIndex = (startIndex || 0) + Number(i);
            const style = this.getItemStyle(realIndex);

            // 未搜到数据提示高度使用默认高度
            if (item.key === "NOT_FOUND") {
              delete style.height;
            }
            return React.cloneElement(item, {
              style: { ...item.style, ...style }
            });
          }),
      dropdownMenuStyle: {
        ...menu.props.dropdownMenuStyle,
        height: allHeight,
        maxHeight: allHeight,
        overflow: "hidden"
      }
    });

    return cloneMenu;
  }
}
