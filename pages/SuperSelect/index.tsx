import * as React from "react";
// import MySuperSelect from "../../components/SuperSelect";
import { Select } from "antd";
import { Icon as LegacyIcon } from "@ant-design/compatible";

import "./index.less";
const Option = Select.Option;

const children: any[] = [];

for (let i = 0; i < 10000; i++) {
  children.push(
    <Option value={i + "aa"} key={i}>
      {i}
    </Option>
  );
}

export default class SuperSelect extends React.Component {
  onChange = (e: any) => {
    console.log(e);
  };
  onSearch = (e: any) => {
    console.log(e);
  };
  render() {
    return (
      <>
        <h1>
          SuperSelect
          <LegacyIcon type="delete" />
        </h1>
        <Select
          showSearch={true}
          allowClear={true}
          mode="multiple"
          onChange={this.onChange}
          onSearch={this.onSearch}
          style={{ width: "300px" }}
        >
          {children}
        </Select>
      </>
    );
  }
}
