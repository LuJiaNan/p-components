import React from "react";
import { Form } from "antd";
import TextMask from "../../components/AntdTextMask";

const FormItem = Form.Item;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
};

const App = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} {...layout}>
      <FormItem name="phone" label="phone">
        <TextMask
          maskType="phone"
          // defaultValue={18868832053}
          onChange={(e) => console.log(e.target.value)}
          placeholder={"请输入"}
        />
      </FormItem>
      <FormItem name="email" label="email">
        <TextMask maskType="email" />
      </FormItem>
      <FormItem name="date" label="date">
        <TextMask maskType="date" />
      </FormItem>
    </Form>
  );
};

export default App;
