import * as React from "react";
import { Steps } from "antd";
import StepProps, { defaultStepProps } from "../props";

const initialState = {
  currentIndex: 0,
  step: 1
};

type State = typeof initialState;

const ref: React.RefObject<any> = React.createRef();

export default class Step extends React.Component<StepProps, State> {
  static defaultProps = defaultStepProps;

  state: State = initialState;

  UNSAFE_componentWillMount() {
    const currentStepRoute = this.props.location.pathname.slice(1);

    let currentStepNum = 1;
    this.props.steps.forEach((v, index) => {
      if (currentStepRoute.indexOf(v.path) > -1) {
        currentStepNum = index + 1;
      }
    });

    this.setState({
      currentIndex: currentStepNum - 1,
      step: currentStepNum
    });
  }

  goRoutes = (route: number | string) => {
    const {
      props: { steps }
    } = this;
    let currentPath: string;
    let currentStep = 1;
    let currentIndex = 0;
    if (typeof route === "number") {
      currentPath = steps[route - 1].path;
      currentStep = route;
      currentIndex = currentStep - 1;
    } else {
      currentPath = route;
      steps.forEach((item: any, index: number) => {
        if (item.path === route) {
          currentStep = index + 1;
          currentIndex = index;
        }
      });
    }
    const ifNeedJump =
      steps.filter((item) => item.path === currentPath).length > 0;
    if (ifNeedJump) {
      this.props.history.push(currentPath);
      this.setState({
        currentIndex,
        step: currentStep
      });
    } else {
      console.log("请输入正确的地址！");
    }
  };

  getCurrentStep = () => {
    return this.state.step;
  };

  renderComp(Comp: any) {
    const goRoutes = this.goRoutes;
    const getCurrentStep = this.getCurrentStep;
    const props = {
      ...this.props,
      forwardRef: ref,
      goRoutes,
      getCurrentStep
    };
    if (!Comp.constructor) {
      let Component = Comp(props);
      return Component;
    }
    return React.createElement(Comp, props);
  }

  render() {
    const { steps } = this.props;
    const { currentIndex } = this.state;
    const renderDom = steps[currentIndex];
    return (
      <React.Fragment>
        <Steps current={currentIndex}>
          {steps.map((item: { text: string; description: string }) => (
            <Steps.Step
              key={item.text}
              title={item.text}
              description={item.description}
            />
          ))}
        </Steps>
        {this.renderComp(renderDom.component)}
      </React.Fragment>
    );
  }
}
