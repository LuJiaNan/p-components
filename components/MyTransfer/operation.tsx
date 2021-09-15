import * as React from "react";
import { Button } from "antd";
import { Icon as LegacyIcon } from "@ant-design/compatible";

export function noop() {}

/**
 * moveToLeftï¼æ°æ®ç§»åå·¦ä¾§äºä»¶ï¼å¿é¡»
 * moveToRightï¼æ°æ®ç§»åå³ä¾§äºä»¶ï¼å¿é¡»
 * leftArrowTextï¼å·¦ç®­å¤´textï¼éå¿é¡»
 * rightArrowTextï¼å³ç®­å¤´textï¼éå¿é¡»
 * leftActiveï¼å·¦ç®­å¤´æ¯å¦disabledï¼éå¿é¡»
 * rightActiveï¼å³ç®­å¤´æ¯å¦disabledï¼éå¿é¡»
 * classNameï¼æ´ä¸ªæä½æ¨¡åclassName åç¼ï¼éå¿é¡»
 */

interface OperateProps {
  moveToLeft: () => void;
  moveToRight: () => void;
  leftArrowText?: string;
  rightArrowText?: string;
  leftActive?: boolean;
  rightActive?: boolean;
  className?: string;
}

export const Operation: React.FC<OperateProps> = (props: OperateProps) => {
  const {
    leftActive,
    rightActive,
    moveToLeft,
    moveToRight,
    leftArrowText,
    rightArrowText,
    className
  } = props;
  const moveToLeftButton = (
    <Button
      type="primary"
      size="small"
      disabled={!leftActive}
      onClick={moveToLeft}
    >
      {
        <span>
          <LegacyIcon type="left" />
          {leftArrowText}
        </span>
      }
    </Button>
  );
  const moveToRightButton = (
    <Button
      type="primary"
      size="small"
      disabled={!rightActive}
      onClick={moveToRight}
    >
      {
        <span>
          {rightArrowText}
          <LegacyIcon type="right" />
        </span>
      }
    </Button>
  );
  return (
    <div className={className}>
      {moveToRightButton}
      {moveToLeftButton}
    </div>
  );
};
