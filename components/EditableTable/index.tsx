import * as React from "react";
import { Table, Button, message } from "antd";
import { Form } from "@ant-design/compatible";
import "./index.less";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { ISN } from "../../Interface";

const FormItem = Form.Item;
const EditableContext = React.createContext({});

const EditableRow = ({
  form,
  index,
  ...props
}: {
  form: WrappedFormUtils;
  index: number;
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >;
}) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

declare type EditTableMode = "full" | "row"; // 全表格编辑 | 单行编辑

/**
 * columns：表格列配置，必须
 * data: 数据数组，必须
 * mode: 编辑模式，非必须，默认为单行编辑
 */
interface EditTableProps {
  columns: any[];
  data: any[];
  mode: EditTableMode;
  onChange(data: any): void;
}

interface State {
  data: any[];
  editingKey: string;
  keyList: string[];
  columns: any[];
}

export default class EditTable extends React.Component<EditTableProps, State> {
  static defaultProps = {
    mode: "row"
  };
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      editingKey: "",
      keyList: [],
      columns: []
    };
  }
  componentDidMount() {
    /* istanbul ignore else */
    if (this.props.columns && this.props.columns.length > 0) {
      this.setState(
        {
          data: this.props.data === undefined ? [] : this.props.data,
          columns: [...this.props.columns, ...this.state.columns]
        },
        () => {
          let keyList = this.state.columns.map((c: any) => c.dataIndex);
          this.setState({
            keyList
          });
        }
      );
    }
  }
  UNSAFE_componentWillReceiveProps(nextprops: { data: any }) {
    /* istanbul ignore else */
    if (this.props.data !== nextprops.data) {
      this.setState({
        data: nextprops.data
      });
    }
  }
  isEditing = (record: { key: string }) => {
    return record.key === this.state.editingKey;
  };

  edit = (key: string) => {
    if (this.state.editingKey !== "") {
      message.error("请先保存编辑项再进行其他编辑操作！");
      return false;
    }
    this.setState({ editingKey: key });
    this.activeStatus();
  };

  // 双击td事件
  editColumn = (key: string) => {
    if (this.state.editingKey !== "") {
      message.error("请先保存编辑项再进行其他编辑操作！");
      return false;
    }
    this.setState({ editingKey: key });
  };

  changeColumnEditStatus = (record: any, tdObject: any) => {
    this.editColumn(record.key);
    this.state.columns.forEach((item: any) => {
      /* istanbul ignore else */
      if (item.dataIndex === tdObject.dataIndex) {
        item.editingStatus = true;
      }
    });
  };

  revertStatus() {
    // 恢复每一列的编辑状态，去除所有editingStatus
    this.state.columns.map((item: any) => (item.editingStatus = false));
  }

  activeStatus() {
    // 激活每一列的编辑状态，所有列editingStatus设为true
    this.state.columns.map((item: any) => (item.editingStatus = true));
  }

  delete(key: string) {
    let newData = [...this.state.data];
    this.setState(
      {
        data: newData.filter((c: any) => c.key !== key),
        editingKey: ""
      },
      () => {
        this.props.onChange(this.state.data);
      }
    );
  }
  save(form: WrappedFormUtils, key: string) {
    form.validateFields((error: any, row: any) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex((item: any) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
          key: item.key
        });
      } else {
        newData.push(row);
      }
      this.setState({ data: newData, editingKey: "" }, () => {
        this.props.onChange(newData);
      });
    });
  }

  cancel = (form: WrappedFormUtils, key: string) => {
    let obj = this.state.data.filter((d: any) => d.key === key)[0];
    let Bdelete = false;
    for (let b in obj) {
      if (obj[b] === "") {
        Bdelete = true;
        break;
      }
    }
    if (Bdelete) {
      this.delete(key);
    }
    this.setState({ editingKey: "" });

    this.revertStatus();
  };

  addNew = () => {
    if (this.state.editingKey !== "") {
      message.error("请先保存编辑项再进行添加操作！");
      return false;
    }
    let key = new Date().valueOf() + "" + Math.floor(Math.random() * 10 + 1);
    let obj = {
      [key]: key
    };
    let keyList = [...this.state.keyList];
    /* istanbul ignore else */
    if (keyList.length > 1) {
      keyList.length = keyList.length - 1;
    }
    keyList.forEach((d: string) => {
      obj[d] = "";
    });
    let data = [...this.state.data];
    data.push(obj);
    this.setState({
      data,
      editingKey: key
    });

    this.activeStatus();
  };

  renderCell(text: ISN, record: any, cellConfig: any) {
    const { dataIndex, editComponent, editConfig } = cellConfig;
    const instance = this;
    const { mode } = this.props;
    return (
      <EditableContext.Consumer>
        {(form: any) => {
          const { getFieldDecorator, setFieldsValue } = form;
          const component = editComponent(text, record, instance, form);
          return (
            <FormItem style={{ margin: 0 }}>
              {getFieldDecorator(dataIndex, {
                ...editConfig,
                initialValue:
                  record[dataIndex] === ""
                    ? editConfig && editConfig.initialValue
                    : record[dataIndex]
              })(
                React.createElement(component.type, {
                  ...component.props,
                  ...(mode !== "row"
                    ? {
                        onChange: function (e: any) {
                          // e is event
                          if (e.target) {
                            setFieldsValue({ [dataIndex]: e.target.value });
                          } else {
                            setFieldsValue({ [dataIndex]: e });
                          }
                          instance.save(form, record.key);
                        }
                      }
                    : {})
                })
              )}
            </FormItem>
          );
        }}
      </EditableContext.Consumer>
    );
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow
        // cell: EditableCell
      }
    };
    const { mode } = this.props;
    const instance = this;

    const columns = this.state.columns.map((col: any) => {
      if (!col.editComponent) {
        return col;
      }
      /* istanbul ignore next */
      return {
        ...col,
        // onCellClick: (record,index)=>{
        //   console.log(record,index)
        // },
        render: (text: any, row: any) => {
          return mode === "full" || this.isEditing(row)
            ? this.renderCell(text, row, col)
            : col.render
            ? col.render(text, row, instance)
            : text;
        }
      };
    });

    return (
      <Table
        // @ts-ignore
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName={(record: object, index: number) => "editable-row"}
        footer={() => (
          <Button icon="plus" onClick={this.addNew} style={{ width: "100%" }}>
            新增
          </Button>
        )}
      />
    );
  }
}
