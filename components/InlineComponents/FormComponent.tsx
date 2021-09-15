import React, { ReactNode } from "react";
import { Form, Button, Row, Col } from "antd";
import { ValidateErrorEntity } from "rc-field-form/es/interface";
import _ from "lodash";

const { Item } = Form;
interface InlineProps {
  data: object[];
  footer?: ReactNode;
  className?: string;
  inlineNumber?: number[] | number;
  defaultInlineNumber?: number;
  name: string;
}

interface InlineState {
  initialValues: any;
}

const MyDefaultInlineNumber = 2;

export default class InlineComponent extends React.Component<
  InlineProps,
  InlineState
> {
  constructor(props: Readonly<InlineProps>) {
    super(props);
    this.state = {
      initialValues: {}
    };
  }
  componentDidMount() {
    this.setState({
      initialValues: this.getInitialValues(this.props.data)
    });
  }

  // 方法

  // 转换获取initialValues
  getInitialValues(data: any[]) {
    let initialValues: any = {};
    const ItemData = data;
    ItemData.forEach((item: any) => {
      if (item.defaultValue) {
        initialValues[item.name] = item.defaultValue;
      }
    });

    return initialValues;
  }
  // 事件
  onFinish = (values: any) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };
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
    const { data, inlineNumber } = this.props;
    let itemBlock: any = [];
    let cloneData = _.cloneDeep(data);
    let count = 0;
    for (let i = 0; cloneData.length !== 0; i++) {
      const inlineItems = cloneData.slice(0, inlineNumber);
      const inlineNode = inlineItems.map((item: any, index: number) => {
        const { render, config, ...props } = item;
        let style = this.getInlineNodeStyle(config);
        return this.getInlineNode(
          index,
          props,
          item,
          config,
          style,
          inlineNumber as number
        );
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
      data,
      inlineNumber,
      defaultInlineNumber = MyDefaultInlineNumber
    } = this.props;
    let itemBlock: any = [];
    let cloneData = _.cloneDeep(data);
    let count = 0;
    let cloneInlineNumber = _.cloneDeep(inlineNumber);
    const totalCount = (inlineNumber as number[]).reduce(
      (a: number, b: number) => a + b
    );

    // [1,2]不足情况下补足inlineNumber数组，生成一个新数组
    // if (totalCount < data.length) {
    //   cloneInlineNumber.push(data.length - totalCount);
    // }

    // 当添加了新数组最后一项，同一行内放置太多个组件时
    // 1.自动换行

    // 2.默认每行最多放两个
    let leftCount = data.length - totalCount;
    while (leftCount >= defaultInlineNumber) {
      cloneInlineNumber.push(defaultInlineNumber);
      leftCount = leftCount - defaultInlineNumber;
    }

    console.log(cloneInlineNumber);

    for (
      let i = 0;
      cloneData.length !== 0 && count !== cloneInlineNumber.length;
      i++
    ) {
      const inlineItems = cloneData.slice(0, cloneInlineNumber[count]);
      const inlineNode = inlineItems.map((item: any, index: number) => {
        const { render, config, ...props } = item;
        let style = this.getInlineNodeStyle(config);
        return this.getInlineNode(
          index,
          props,
          item,
          config,
          style,
          cloneInlineNumber[count]
        );
      });
      const inlineNodes = this.getInlineNodes(count, inlineNode);

      cloneData.splice(0, cloneInlineNumber[count]);
      count++;
      itemBlock.push(inlineNodes);
    }

    return itemBlock.map((item: any) => item);
  };
  // 创建inlineNode
  getInlineNode(
    index: number,
    props: any,
    item: any,
    config: any,
    style: any,
    num: number
  ) {
    return (
      <Col key={index} span={Math.floor(24 / num)}>
        <Item {...props}>
          {React.createElement(item.render, {
            ...config,
            ...{
              style
            }
          })}
        </Item>
      </Col>
    );
  }
  // 如果有直接配置的width或者height，添加到style中
  getInlineNodeStyle(config: any) {
    let style: { width?: string; height?: string } = {};
    if (config.width || config.height) {
      style.width = config.width;
      style.height = config.height;
    }
    return style;
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
  renderFooter() {
    const { footer } = this.props;
    const defaultFooter = (
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    );
    return footer || defaultFooter;
  }
  render() {
    const { className, name } = this.props;
    const { initialValues } = this.state;
    return (
      <Form
        name={name}
        initialValues={initialValues}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        className={`inlineComponent ${className}`}
      >
        {this.renderBody()}
        {this.renderFooter()}
      </Form>
    );
  }
}
