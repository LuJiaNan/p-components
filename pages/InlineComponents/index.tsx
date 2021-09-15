import * as React from "react";
import InlineComponent from "../../components/InlineComponents";
import { ValidateErrorEntity } from "rc-field-form/es/interface";
import {
  Form,
  Input,
  Button,
  Select
  // Checkbox
} from "antd";

// const layout1 = {
//   labelCol: { span: 4 },
// };
// const layout2 = {
//   labelCol: { span: 8 },
// };
const Item = Form.Item;
// class Index extends React.Component {
//   render() {
//     let config = {
//       type: "normal",
//       // inlineNumber: 2,
//       // inlineNumber: [1,2,2], // 正常情况
//       // inlineNumber: [1,2,5], // 超长情况
//       inlineNumber: [1, 1], // 不足情况
//       name: "form1",
//       className: "",
//       // footer: (
//       //   <Button type="danger" htmlType="submit">
//       //     提交
//       //   </Button>
//       // ),
//       data: [
//         {
//           label: "input1",
//           name: "name1",
//           render: Input,
//           ...layout1,
//           rules: [{ required: true, message: "Please input input1!" }],
//           config: {
//             placeholder: "i am input 1",
//           },
//         },
//         {
//           label: "input2",
//           name: "name2",
//           render: Input,
//           ...layout1,
//           defaultValue: "input",
//           rules: [{ required: true, message: "Please input input2!" }],
//           config: {
//             placeholder: "i am input 2",
//             size: "small",
//           },
//         },
//         {
//           label: "select1ssss",
//           name: "name3",
//           render: Select,
//           ...layout2,
//           rules: [{ required: true, message: "Please select select1!" }],
//           config: {
//             placeholder: "i am select 1",
//             width: "150px",
//             options: [
//               {
//                 label: "option1",
//                 value: "option1",
//               },
//               {
//                 label: "option2",
//                 value: "option2",
//               },
//               {
//                 label: "option3",
//                 value: "option3",
//               },
//             ],
//           },
//         },
//         {
//           label: "input4",
//           name: "name4",
//           render: Input,
//           ...layout2,
//           defaultValue: "input",
//           rules: [{ required: true, message: "Please input input4!" }],
//           config: {
//             placeholder: "i am input 4",
//             size: "small",
//           },
//         },
//         {
//           label: "input5",
//           name: "name5",
//           render: Input,
//           ...layout2,
//           defaultValue: "input",
//           rules: [{ required: true, message: "Please input input5!" }],
//           config: {
//             placeholder: "i am input 5",
//           },
//         },
//         {
//           label: "checkbox6",
//           name: "checkbox6",
//           render: Checkbox,
//           ...layout2,
//           config: {
//             checked: "true",
//             onChange: (e:any) => console.log(e)
//           }
//         },
//       ],
//     };
//     return <InlineComponent {...config} />;
//   }
// }

interface InlineProps {
  data: object[];
  footer?: React.ReactNode;
  className?: string;
  inlineNumber?: any;
  name: string;
}

interface InlineState {
  initialValues: any;
}

class Index extends React.Component<InlineProps, InlineState> {
  // 事件
  onFinish = (values: any) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };

  renderBody() {
    const config = {
      // inlineNumber: 3
      inlineNumber: [1, 2, 3]
      // inlineNumber: [5]
    };
    return (
      <InlineComponent {...config}>
        <Item
          label={"input1"}
          name={"input1"}
          rules={[{ required: true, message: "Please input input1!" }]}
        >
          <Input />
        </Item>
        <Item
          label={"input2"}
          name={"input2"}
          rules={[{ required: true, message: "Please input input2!" }]}
        >
          <Input />
        </Item>
        <Item
          label={"input3"}
          name={"input3"}
          rules={[{ required: true, message: "Please input input3!" }]}
        >
          <Input />
        </Item>
        <Item
          label={"input4"}
          name={"input4"}
          rules={[{ required: true, message: "Please input input4!" }]}
        >
          <Input />
        </Item>
        <Item
          label={"input5"}
          name={"input5"}
          rules={[{ required: true, message: "Please input input5!" }]}
        >
          <Input />
        </Item>
        <Item
          label={"select6"}
          name={"select6"}
          rules={[{ required: true, message: "Please select6!" }]}
        >
          <Select
            allowClear={true}
            // mode="tags"
            // menuItemSelectedIcon={<span>aaa</span>}
            // clearIcon={<div>bbb</div>}
            // removeIcon={<div>ccc</div>}
          >
            <Select.Option value="option1">option1</Select.Option>
            <Select.Option value="option2">option2</Select.Option>
            <Select.Option value="option3">option3</Select.Option>
          </Select>
        </Item>
      </InlineComponent>
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
    return (
      <Form
        name="myform"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        className={`inlineComponent`}
        initialValues={{
          input1: "i am input1",
          input3: "i am input3",
          input5: "i am input5",
          select6: "option3"
        }}
      >
        {this.renderBody()}
        {this.renderFooter()}
      </Form>
    );
  }
}

export default Index;
