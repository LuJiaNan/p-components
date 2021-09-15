import "react-virtualized/styles.css";
import * as React from "react";
import PureRenderMixin from "rc-util/lib/PureRenderMixin";
import classNames from "classnames";
import SelectList from "./selectList";
import { Operation } from "./operation";
import { ModeType } from "./item";

import prefixCls from "./constants";
export function noop() {}

/**
 * dataSource: 数据，必须
 * render: 自定义渲染方法，必须
 * targetKeys: 已选项，非必须
 * selectedKeys: 选中项，非必须
 * onChange: onChange方法
 * onSelectChange: 选中，取消选中方法
 * listStyle: 自定义样式，非必须
 * className: 自定义className
 * titles: title数组，非必须
 * operations: 包含左右箭头text的两个长度的数组，非必须
 * showSearch: 是否显示搜索栏，非必须
 * filterOption: 过滤方法，非必须
 * rowHeight: 行高，非必须
 * footer: footer渲染方法，非必须
 * rowKey: 获取key方法，必须
 * hideLeftSearch: 是否隐藏左列表的搜索框
 * hideRightSearch: 是否隐藏右列表的搜索框
 * locale: 文字配置信息
 * searchPlaceholder: 搜索栏input提示语，非必须
 * notFoundContent: 数据为空时显示文字，非必须
 * searchRender: 搜索框的渲染方法，非必须
 * mode: 区分普通transfer和table模式，非必须，默认normal
 * leftStyle: 左列表样式信息
 * rightStyle: 右列表样式信息
 * header: table模式下的column数据，table模式下必须
 */

interface TransferProps {
  dataSource: any[];
  render: () => void;
  targetKeys: any[];
  selectedKeys: any[];
  onChange: (
    newTargetKeys: any,
    newTargetData: any,
    direction: any,
    newMoveKeys: any
  ) => void;
  onSelectChange: (leftKeys: any, rightKeys: any) => void;
  listStyle: {
    height: number;
    width: string | number;
  };
  className?: string;
  titles: any[];
  operations: any[];
  showSearch?: boolean;
  filterOption: () => void;
  rowHeight?: number;
  footer: () => React.ReactNode;
  rowKey: () => void;
  hideLeftSearch?: boolean;
  hideRightSearch?: boolean;
  locale: {
    itemUnit: string;
    itemsUnit: string;
    notFoundContent: string;
    searchPlaceholder: string;
  };
  searchRender: () => void;
  mode: ModeType;
  leftStyle?: object;
  rightStyle?: object;
  header: any[];
}
interface State {
  [propName: string]: any;
  leftSource: any[];
  rightSrouce: any[];
  sourceSelectedKeys: any[];
  targetSelectedKeys: any[];
}

export default class Item extends React.Component<TransferProps, State> {
  static defaultProps = {
    dataSource: [],
    selectedKeys: undefined,
    targetKeys: [],
    onSelectChange: undefined,
    titles: ["", ""],
    className: undefined,
    filterOption: undefined,
    listStyle: {
      width: 200,
      height: 300
    },
    operations: ["", ""],
    showSearch: false,
    footer: noop,
    notFoundContent: "Not Found",
    searchPlaceholder: "Search here",
    rowKey: undefined,
    onChange: undefined,
    hideLeftSearch: false,
    hideRightSearch: false,
    rowHeight: 32,
    header: undefined,
    mode: "normal"
  };

  state = {
    leftSource: [],
    rightSrouce: [],
    sourceSelectedKeys: [],
    targetSelectedKeys: []
  };

  UNSAFE_componentWillMount() {
    this.initStateByProps(this.props);
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    /* istanbul ignore else */
    if (
      nextProps.dataSource.toString() !== this.props.dataSource.toString() ||
      nextProps.targetKeys.toString() !== this.props.targetKeys.toString() ||
      nextProps.selectedKeys.toString() !== this.props.selectedKeys.toString()
    ) {
      this.initStateByProps(nextProps, true);
    }
  }

  shouldComponentUpdate(...args: any[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  getSelectedKeysName(direction: any) {
    return direction === "left" ? "sourceSelectedKeys" : "targetSelectedKeys";
  }

  initStateByProps = (props: any, update?: any) => {
    const leftSource: any[] = [];
    const rightSrouce = new Array(props.targetKeys.length);
    const sourceSelectedKeys: any[] = [];
    const targetSelectedKeys: any[] = [];
    const oldSourceSelectedKeys = this.state.sourceSelectedKeys;
    const oldTargetSelectedKeys = this.state.targetSelectedKeys;

    props.dataSource.forEach((item: any) => {
      /* istanbul ignore else */
      if (props.rowKey) {
        item.key = props.rowKey(item); // eslint-disable-line
      }
      // rightSource should be ordered by targetKeys
      // leftSource should be ordered by dataSource
      const indexOfKey = props.targetKeys.indexOf(item.key);
      if (indexOfKey !== -1) {
        rightSrouce[indexOfKey] = item;
      } else {
        leftSource.push(item);
      }
      /* istanbul ignore else */
      if (!props.selectedKeys && update) {
        // fitler not exist keys
        /* istanbul ignore else */
        if (
          oldSourceSelectedKeys.includes(item.key) &&
          !props.targetKeys.includes(item.key)
        ) {
          sourceSelectedKeys.push(item.key);
        }
        /* istanbul ignore else */
        if (
          oldTargetSelectedKeys.includes(item.key) &&
          props.targetKeys.includes(item.key)
        ) {
          targetSelectedKeys.push(item.key);
        }
      }
    });

    /* istanbul ignore else */
    if (props.selectedKeys) {
      props.selectedKeys.forEach((key: any) => {
        if (props.targetKeys.includes(key)) {
          targetSelectedKeys.push(key);
        } else {
          sourceSelectedKeys.push(key);
        }
      });
    }

    this.setState({
      leftSource,
      rightSrouce,
      sourceSelectedKeys,
      targetSelectedKeys
    });
  };

  handleSelect = (direction: any, selectedKeys: any) => {
    const leftKeys =
      direction === "left" ? selectedKeys : this.state.sourceSelectedKeys;
    const rightKeys =
      direction === "right" ? selectedKeys : this.state.targetSelectedKeys;
    const onSelectChange = this.props.onSelectChange;
    /* istanbul ignore else */
    if (onSelectChange) {
      onSelectChange(leftKeys, rightKeys);
    }
    /* istanbul ignore else */
    if (!this.props.selectedKeys) {
      this.setState({
        sourceSelectedKeys: leftKeys,
        targetSelectedKeys: rightKeys
      });
    }
  };

  moveTo = (direction: any) => {
    /* istanbul ignore next */
    const { targetKeys = [], dataSource = [], onChange } = this.props;
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const moveKeys =
      direction === "right" ? sourceSelectedKeys : targetSelectedKeys;

    const newMoveKeys: any[] = [];
    // disable key can be selected in props, so there should fitler disabled keys
    dataSource.forEach(item => {
      /* istanbul ignore else */
      if (!item.disabled && moveKeys && moveKeys.includes(item.key)) {
        newMoveKeys.push(item.key);
      }
    });
    // move items to target box
    const newTargetKeys =
      direction === "right"
        ? newMoveKeys.concat(targetKeys)
        : targetKeys.filter(targetKey => newMoveKeys.indexOf(targetKey) === -1);
    const newTargetData = dataSource.filter(
      item => newTargetKeys.indexOf(item.key) > -1
    );
    // empty checked keys
    const oppositeDirection = direction === "right" ? "left" : "right";
    this.setState({
      [this.getSelectedKeysName(oppositeDirection)]: []
    });
    this.handleSelect(oppositeDirection, []);
    /* istanbul ignore else */
    if (onChange) {
      onChange(newTargetKeys, newTargetData, direction, newMoveKeys);
    }
  };

  moveToLeft = () => {
    this.moveTo("left");
  };
  moveToRight = () => {
    this.moveTo("right");
  };

  render() {
    const { sourceSelectedKeys, targetSelectedKeys } = this.state;
    const {
      render,
      titles,
      className,
      filterOption,
      showSearch,
      footer,
      locale,
      searchRender,
      hideLeftSearch,
      hideRightSearch,
      mode,
      rowHeight,
      leftStyle,
      rightStyle,
      listStyle,
      header,
      operations
    } = this.props;
    const leftActive = targetSelectedKeys.length > 0;
    const rightActive = sourceSelectedKeys.length > 0;

    const cls = classNames(
      {
        [`${prefixCls}`]: true
      },
      className
    );

    return (
      <div className="mc-transfer">
        <div className={cls}>
          <SelectList
            searchRender={searchRender}
            dataSource={this.state.leftSource}
            render={render}
            selectedKeys={this.state.sourceSelectedKeys}
            handleSelect={selectedKeys =>
              this.handleSelect("left", selectedKeys)
            }
            showSearch={showSearch ? showSearch && !hideLeftSearch : false}
            filterOption={filterOption}
            itemsUnit={locale.itemsUnit}
            itemUnit={locale.itemUnit}
            titleText={titles[0]}
            rowHeight={rowHeight}
            style={leftStyle || listStyle}
            footer={footer}
            notFoundContent={locale.notFoundContent}
            searchPlaceholder={locale.searchPlaceholder}
            header={header}
            type="left"
            mode={mode}
          />
          <Operation
            className={`${prefixCls}-operation`}
            leftActive={leftActive}
            rightActive={rightActive}
            moveToLeft={this.moveToLeft}
            moveToRight={this.moveToRight}
            leftArrowText={operations[0]}
            rightArrowText={operations[1]}
          />
          <SelectList
            searchRender={searchRender}
            dataSource={this.state.rightSrouce}
            render={render}
            selectedKeys={this.state.targetSelectedKeys}
            handleSelect={selectedKeys =>
              this.handleSelect("right", selectedKeys)
            }
            showSearch={showSearch ? showSearch && !hideRightSearch : false}
            filterOption={filterOption}
            itemsUnit={locale.itemsUnit}
            itemUnit={locale.itemUnit}
            titleText={titles[1]}
            rowHeight={rowHeight}
            style={rightStyle || listStyle}
            footer={footer}
            notFoundContent={locale.notFoundContent}
            searchPlaceholder={locale.searchPlaceholder}
            header={header}
            type="right"
            mode={mode}
          />
        </div>
      </div>
    );
  }
}
