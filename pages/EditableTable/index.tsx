import * as React from "react";
import { Button, Input, Select, InputNumber } from "antd";
import EditTable from "../../components/EditableTable";

const ButtonGroup = Button.Group;
const Option = Select.Option;

const tableConf = {
  mode: "full",
  onChange: (data: any) => {
    console.log("onchange", data);
  },
  data: [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      sex: "1",
      address: "西湖区湖底公园1号"
    },
    {
      key: "2",
      name: "胡彦祖",
      age: 42,
      sex: "1",
      address: "西湖区湖底公园1号"
    },
    {
      key: "3",
      name: "胡彦黑",
      age: 92,
      sex: "1",
      address: "西湖区湖底公园1号"
    },
    {
      key: "4",
      name: "胡彦哈",
      age: 22,
      sex: "1",
      address: "西湖区湖底公园1号"
    },
    {
      key: "5",
      name: "胡彦额",
      age: 45,
      sex: "1",
      address: "西湖区湖底公园1号"
    }
  ],
  columns: [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      editComponent: () => <Input />,
      editConfig: {
        rules: [
          {
            required: true
          }
        ]
      }
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      editComponent: () => (
        <Select>
          <Option value="1">男</Option>
          <Option value="2">女</Option>
        </Select>
      ),
      render: (text: any, row: any) => {
        if (text === "1") {
          return "男";
        } else if (text === "2") {
          return "女";
        }
      }
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      editComponent: (text: any, row: any, instance: any, form: any) => {
        if (form.getFieldValue("sex") === "2") {
          return <InputNumber />;
        } else {
          return <Input />;
        }
      },
      editConfig: {}
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "操作",
      dataIndex: "操作",
      editComponent: (text: any, row: any, instance: any, form: any) => {
        return (
          <ButtonGroup>
            <Button onClick={() => instance.save(form, row.key)}>save</Button>
            <Button onClick={() => instance.cancel(form, row.key)}>
              cancel
            </Button>
          </ButtonGroup>
        );
      },
      render: (text: any, row: any, instance: any, form: any) => {
        return (
          <ButtonGroup>
            <Button onClick={() => instance.edit(row.key)}>edit</Button>
            <Button onClick={() => instance.delete(row.key)}>delete</Button>
          </ButtonGroup>
        );
      }
    }
  ]
};

export default class EditableTable extends React.Component {
  render() {
    return <EditTable {...tableConf} />;
  }
}
