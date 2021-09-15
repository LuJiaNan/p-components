import React from "react";
import FormComponent from "./FormComponent";
import Component from "./Component";
import "./index.less";
const Index = (props: any) => {
  return props.children ? (
    <Component {...props} />
  ) : (
    <FormComponent {...props} />
  );
};

export default Index;
