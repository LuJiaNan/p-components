import * as React from "react";

/**
 * placeholderï¼inputæç¤ºè¯­ï¼éå¿é¡»
 * value: åå§å¼ï¼éå¿é¡»
 * prefixClsï¼className åç¼ï¼éå¿é¡»
 * onChangeï¼changeäºä»¶ï¼éå¿é¡»
 * handleClearï¼clearäºä»¶ï¼éå¿é¡»
 * searchRenderï¼renderæ¹æ³ï¼å¿é¡»
 */
interface SearchProps {
  placeholder?: string;
  value?: any;
  prefixCls?: string;
  onChange: (e: any) => void;
  handleClear: () => void;
  searchRender: any;
}

const initialState = {};

type State = typeof initialState;

export default class Search extends React.Component<SearchProps, State> {
  static defaultprops = {
    placeholder: ""
  };
  handleChange = (e: any) => {
    const onChange = this.props.onChange;
    /* istanbul ignore else */
    if (onChange) {
      onChange(e);
    }
  };

  render() {
    const { placeholder, value, prefixCls, searchRender } = this.props;

    return (
      <div className={`${prefixCls}-wapper`}>
        {React.cloneElement(searchRender, {
          placeholder: placeholder,
          className: prefixCls,
          value: value,
          onChange: this.handleChange
        })}
      </div>
    );
  }
}
