import React, { ReactNode } from "react";
import { Row, Col } from "antd";

import _ from "lodash";
import { NOA } from "../../Interface";

interface InlineProps {
  inlineNumber?: NOA;
  defaultInlineNumber?: number;
  children: ReactNode[];
}

// var a: string = "a";
// var b: String = "b";
// a = b; // error
// b = a;

const MyDefaultInlineNumber = 2;

export default class InlineComponent extends React.Component<InlineProps> {
  // 渲染
  renderBody() {
    const { inlineNumber } = this.props;
    let body =
      inlineNumber instanceof Array
        ? this.renderVariableInlineComponents()
        : this.renderSameInlineComponents();

    return body;
  }
  renderSameInlineComponents = () => {
    const { children, inlineNumber } = this.props;
    let itemBlock: any = [];
    let cloneData = _.cloneDeep(children);
    let count = 0;
    for (let i = 0; cloneData.length !== 0; i++) {
      const inlineItems = cloneData.slice(0, inlineNumber);
      const inlineNode = inlineItems.map((item: ReactNode, index: number) => {
        return this.getInlineNode(index, item, inlineNumber as number);
      });

      const inlineNodes = this.getInlineNodes(count, inlineNode);
      cloneData.splice(0, inlineNumber);
      count++;
      itemBlock.push(inlineNodes);
    }

    return itemBlock.map((item: any) => item);
  };
  renderVariableInlineComponents = () => {
    const {
      children,
      inlineNumber,
      defaultInlineNumber = MyDefaultInlineNumber
    } = this.props;
    let itemBlock: any = [];
    let cloneData = _.cloneDeep(children);
    let count = 0;
    let cloneInlineNumber = _.cloneDeep(inlineNumber);
    const totalCount = (inlineNumber as number[]).reduce(
      (a: number, b: number) => a + b
    );

    let leftCount = children.length - totalCount;
    while (leftCount >= defaultInlineNumber) {
      cloneInlineNumber.push(defaultInlineNumber);
      leftCount = leftCount - defaultInlineNumber;
    }

    for (
      let i = 0;
      cloneData.length !== 0 && count !== cloneInlineNumber.length;
      i++
    ) {
      const inlineItems = cloneData.slice(0, cloneInlineNumber[count]);
      const inlineNode = inlineItems.map((item: any, index: number) => {
        return this.getInlineNode(index, item, cloneInlineNumber[count]);
      });
      const inlineNodes = this.getInlineNodes(count, inlineNode);

      cloneData.splice(0, cloneInlineNumber[count]);
      count++;
      itemBlock.push(inlineNodes);
    }

    return itemBlock.map((item: any) => item);
  };
  // 创建inlineNode
  getInlineNode(index: number, item: any, num: number) {
    return (
      <Col key={index} span={Math.floor(24 / num)}>
        {item}
      </Col>
    );
  }

  // 组合inlineNode
  getInlineNodes(count: number, inlineNode: ReactNode) {
    return React.createElement(
      Row,
      {
        key: count
      },
      inlineNode
    );
  }

  render() {
    return this.renderBody();
  }
}
