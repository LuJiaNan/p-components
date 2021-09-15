import * as React from "react";
import { Checkbox } from "antd";
import PureRenderMixin from "rc-util/lib/PureRenderMixin";
import classNames from "classnames";

//é»è®¤listæ ·å¼
const defaultListStyle = {
  width: 300,
  height: 300
};

export declare type ItemType = "left" | "right";
export declare type ModeType = "normal" | "table";

/**
 * itemï¼åæ¡æ°æ®ï¼å¿é¡»
 * style: è¡æ ·å¼ï¼éå¿é¡»
 * renderedTextï¼hover titleï¼éå¿é¡»
 * renderedElï¼render domç»ä»¶ï¼éå¿é¡»
 * checkedï¼æ¯å¦éä¸­ï¼éå¿é¡»
 * onClickï¼åè¡ç¹å»äºä»¶ï¼éå¿é¡»
 * prefixClsï¼className åç¼ï¼éå¿é¡»
 * header: tableæ¨¡å¼ä¸çcolumnæ°æ®ï¼tableæ¨¡å¼ä¸å¿é¡»
 * type: åºåå·¦å³æ¨¡åçç±»åï¼åé¨ä½¿ç¨
 * mode: åºåæ®étransferåtableæ¨¡å¼ï¼éå¿é¡»ï¼é»è®¤normal
 * disabled: æ¯å¦disabledï¼éå¿é¡»
 */

interface ItemProps {
  item: any;
  style?: any;
  renderedText?: string;
  renderedEl: React.ReactNode;
  checked?: boolean;
  onClick: (item: any) => void;
  prefixCls?: string;
  header?: any[];
  type: ItemType;
  mode: ModeType;
  disabled: boolean;
}

const initialState = {};

type State = typeof initialState;

export default class Item extends React.Component<ItemProps, State> {
  shouldComponentUpdate(...args: any[]) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
  }

  //é»æ­¢selectåæ³¡
  stopPop = (e: React.MouseEvent) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  };

  render() {
    const {
      item,
      renderedText,
      renderedEl,
      style,
      checked,
      onClick,
      prefixCls,
      header,
      type,
      mode
    } = this.props;

    const className = classNames({
      [`${prefixCls}-content-item`]: true,
      [`${prefixCls}-content-item-disabled`]: item["disabled"]
    });

    // console.log(header);

    let node =
      header &&
      header.map((value, i) => {
        let ifNode = typeof item[value.dataIndex] === "object";
        return (
          <div className="custom-item-block" key={`${value.dataIndex}${i}`}>
            <div
              onClick={ifNode ? this.stopPop : () => {}}
              className="custom-item-content"
              title={
                typeof item[value.dataIndex] === "string"
                  ? item[value.dataIndex]
                  : ""
              }
            >
              {item[value.dataIndex]}
            </div>
          </div>
        );
      });

    let width =
      (this.props.style && this.props.style["width"]) || defaultListStyle.width;

    return (
      <li
        className={className}
        style={style}
        title={renderedText}
        onClick={item["disabled"] ? undefined : () => onClick(item)}
      >
        <Checkbox checked={checked} disabled={item["disabled"]} />
        {/* <span>{renderedEl}</span> */}
        {type === "left" || mode !== "table" ? (
          <span>{renderedEl}</span>
        ) : (
          <div className="custom-item" style={{ width: width - 60 + "px" }}>
            {node}
          </div>
        )}
      </li>
    );
  }
}
