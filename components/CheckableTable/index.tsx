import * as React from "react";
import { Table, Checkbox } from "antd";
import { TableProps } from "antd/lib/table/Table";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { ISN } from "../../Interface";
/**
 * columns：表格列配置，必须
 * dataSource: 数据数组，必须
 * value: form表单下的table数据参数
 * onChange: onChange事件
 * checkAllText: 全选checkbox自定义文字
 */
interface CheckTableProps extends TableProps<any> {
  columns: any[];
  dataSource: any[];
  value?: any[];
  onChange: (data: any) => void;
  checkAllText?: ISN;
}

interface State {
  data: any[];
  columns: any[];
  checkAllText: ISN;
}

export default class CheckTable extends React.Component<
  CheckTableProps,
  State
> {
  constructor(props: any) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      checkAllText: "全选"
    };
  }
  componentDidMount() {
    let data = this.props.dataSource || this.props.value || [];
    /* istanbul ignore else */
    if (this.props.columns && this.props.columns.length > 0) {
      this.setState({
        data: data,
        columns: [...this.props.columns, ...this.state.columns]
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextprops: any) {
    let oldData = this.props.dataSource || this.props.value || [];
    let newData = nextprops.dataSource || nextprops.value || [];
    /* istanbul ignore else */
    if (oldData !== newData) {
      this.setState({
        data: newData
      });
    }
  }

  onChange = (e: CheckboxChangeEvent, record: any) => {
    let checked = e.target.checked;
    for (let key in record) {
      const options = record[key].options;
      const valueName = record[key].valueName;
      if (record[key] && options && options.length > 0) {
        let valueList = options;
        // 处理option ['','',''] 和 [{label:'',value:''},{label:'',value:''}]两种情况，以及自定义valueName情况
        let arr = options
          .map((item: any) => (valueName ? item[valueName] : item.value))
          .filter((v: any) => v);
        if (arr.length > 0) {
          valueList = arr;
        }
        record[key].value = checked ? valueList : [];
      }
    }
    this.setState({
      data: this.state.data
    });
    this.props.onChange(this.state.data);
  };

  onChangeOptions = (
    e: CheckboxChangeEvent,
    record: any,
    dataIndex: number
  ) => {
    record[dataIndex].value = e;
    this.setState({
      data: this.state.data
    });
    this.props.onChange(this.state.data);
  };

  getNewOptions(row: any) {
    let newOptions = [];
    /* istanbul ignore else */
    if (row && row.options) {
      if (
        typeof row.options[0] === "object" &&
        (row.labelName || row.valueName)
      ) {
        row.options.forEach((item: any) => {
          newOptions.push({
            label: item[row.labelName],
            value: item[row.valueName]
          });
        });
      } else {
        newOptions = row.options;
      }
    }
    return newOptions;
  }

  render() {
    const { data, checkAllText } = this.state;
    /* istanbul ignore next */
    const columns = this.props.columns.map((col) => {
      if (col.key === "operation") {
        return {
          ...col,
          render: (text: ISN, record: any) =>
            col.showComponent(text, record) && (
              <Checkbox
                onChange={(e: CheckboxChangeEvent) => {
                  this.onChange(e, record);
                }}
              >
                {this.props.checkAllText || checkAllText}
              </Checkbox>
            )
        };
      }
      return {
        ...col,
        render: (text: ISN, record: any) => {
          let newOptions = this.getNewOptions(text);
          const dom = col.componentType
            ? React.createElement(
                col.componentType,
                {
                  onChange: (e: CheckboxChangeEvent) =>
                    this.onChangeOptions(e, record, col.dataIndex),
                  ...text,
                  // 处理自定义labelName 和 valueName 情况
                  ...{ options: newOptions }
                },
                ""
              )
            : text;
          return dom;
        }
      };
    });
    return <Table {...this.props} columns={columns} dataSource={data} />;
  }
}
