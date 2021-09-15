import React from "react";
import MaskedInput from "react-text-mask";
import createAutoCorrectedDatePipe from "text-mask-addons/dist/createAutoCorrectedDatePipe";
import { Input } from "antd";
import masks from "./mask";

type MaskTypes = "phone" | "email" | "date";

interface IMaskedInput {
  props: any;
  setRef: Function;
  onBlur: Function;
  onChange: Function;
}

const autoCorrectedDatePipe = createAutoCorrectedDatePipe("mm/dd/yyyy HH:MM");

const maskRender = (ref: any, props: any) => {
  const {
    defaultValue,
    onChange,
    onChangeField,
    mask,
    maskType,
    pipe,
    ...others
  } = props;
  return (
    <Input
      defaultValue={props.defaultValue}
      ref={(input) => ref(input && input.input)}
      onChange={(event) => {
        props.onChangeField && props.onChangeField(event);
      }}
      {...others}
    />
  );
};

class NewMaskedInput extends MaskedInput {
  render(this: IMaskedInput) {
    const { render, ...props } = this.props;
    return maskRender(this.setRef, {
      onBlur: this.onBlur,
      onChangeField: this.onChange,
      defaultValue: this.props.value,
      ...props
    });
  }
}

const MaskInput = ({ maskType, ...others }: { maskType: MaskTypes }) => {
  return (
    <NewMaskedInput
      mask={masks[maskType || "phone"]}
      {...Object.assign(
        others,
        maskType === "date" ? { pipe: autoCorrectedDatePipe } : {}
      )}
    />
  );
};

export default MaskInput;
