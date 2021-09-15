import * as React from "react";
import { Checkbox } from "antd";
import CheckableTable from "../../components/CheckableTable";

const CheckboxGroup = Checkbox.Group;

export default class Demo extends React.Component {
  tableConf = {
    rowKey: "id",
    // checkAllText: "quanbu",
    dataSource: [
      {
        a: 1,
        id: "45",
        children: [
          {
            a: 11,
            id: "451",
            ip: { ipName: "192.168.1.1", ipLength: 11 },
            ipRange: ["192.168.1.1", "192.168.1.10"],
            checkData: {
              // options: [{label:'苹果', value:'Apple'}, {label:'梨',value:'Pear'}, {label:'橘子',value:'Orange'}],
              options: [
                { name1: "苹果", text1: "Apple" },
                { name1: "梨", text1: "Pear" },
                { name1: "橘子", text1: "Orange" }
              ],
              defaultValue: ["Apple", "Pear", "Orange"],
              labelName: "name1",
              valueName: "text1"
            },
            checkData1: { options: ["Apple"], value: ["Apple"] },
            checkData2: { options: ["Orange"], value: [] },
            children: [
              {
                a: 111,
                id: "45166",
                ip: { ipName: "192.168.1.1", ipLength: 11 },
                ipRange: ["192.168.1.1", "192.168.1.10"],
                checkData: {
                  options: ["Apple", "Pear", "Orange"],
                  value: ["Apple", "Orange"]
                },
                checkData1: { options: ["Apple"], value: ["Apple"] },
                checkData2: { options: ["Orange"], value: [] }
              }
            ]
          }
        ]
      },
      {
        a: 2,
        id: "46",
        ip: { ipName: "192.168.2.10", ipLength: 12 },
        checkData: {
          // options: ['Apple', 'Pear', 'Orange'],
          options: [
            { name: "苹果", text: "Apple" },
            { name: "梨zzzz", text: "Pear" },
            { name: "橘子", text: "Orange" }
          ],
          value: ["Apple", "Pear"],
          labelName: "name",
          valueName: "text"
        },
        ipRange: ["192.168.2.1", "192.168.2.10"]
      }
    ],
    onChange: this.onChange,
    columns: [
      {
        title: "艾迪",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "地址",
        dataIndex: "checkData",
        key: "checkData",
        componentType: CheckboxGroup
      },
      {
        title: "地址1",
        dataIndex: "checkData1",
        key: "checkData1",
        componentType: CheckboxGroup
      },
      {
        title: "地址2",
        dataIndex: "checkData2",
        key: "checkData2",
        componentType: CheckboxGroup
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        showComponent: (text: any, record: any) => record.id !== "45"
      }
    ]
  };
  onChange(data: any[]) {
    console.log(data);
  }
  render() {
    return <CheckableTable {...this.tableConf} />;
  }
}
