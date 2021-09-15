import React from "react";
import { withRouter } from "react-router-dom";
import Step from "../../components/MyStep/ClassStep";
// import Step from "../components/MyStep/HookStep";
import FirstStep from "./firstStep";
import SecondStep from "./secondStep";
import ThirdStep from "./thirdStep";
const Index = (props: any) => {
  const steps = [
    {
      text: "第一步",
      description: "我是第一步",
      path: "first",
      component: (compProps: any) => (
        <FirstStep content={"i am firststep"} {...compProps} />
      )
    },
    {
      text: "第二步",
      description: "我是第二步",
      path: "second",
      component: SecondStep
    },
    {
      text: "第三步",
      description: "我是第三步",
      path: "third",
      component: ThirdStep
    }
  ];
  return (
    <Step steps={steps} {...props} />

    // 函数式调用函数组件提高性能 /components/Step
    // Step({
    //   steps,
    //   ...props
    // })
  );
};

export default withRouter(Index);
