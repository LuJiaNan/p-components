export default interface StepProps {
  steps: any[];
  history?: any;
  location?: any;
}

export const defaultStepProps = {
  steps: [],
  location: {
    pathname: ""
  },
  history: {
    push() {}
  },
}