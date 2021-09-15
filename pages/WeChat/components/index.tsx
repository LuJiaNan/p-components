import * as React from "react";
import { MessageTypesProps } from "../../../Interface";

const Text = ({content}:{content:any}) => content;

const WeErrorText = ({content}:{content:any}) => <span style={{ color: "red" }}>{content}</span>;
const WeImage = ({content}:{content:any}) => (
  <img alt="" src={content} style={{ width: "100px", height: "100px" }} />
);

const SystemMessage = ({content}:{content:any}) => (
  <div
    style={{
      width: "100%",
      margin: "20px 0",
      color: "#dfdfdf",
      textAlign: "center"
    }}
  >
    {content}
  </div>
);

const MyMessage = (MyComponent: any) => {
  const Hoc = (props: any) => {
    return <div style={{ textAlign: "right" }}>{MyComponent(props)}</div>;
  };
  return Hoc;
};

const MessageTypes: MessageTypesProps = {
  text: Text,
  errorText: WeErrorText,
  image: WeImage,
  system: SystemMessage,
  myself: MyMessage
};

const getMessageTypes = (type: string, me?: string) => {
  return me ? MyMessage(MessageTypes[type]) : MessageTypes[type];
};

export default getMessageTypes;
