import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { Popover } from '@arco-design/web-react'

import { SelectOption } from './type'

interface Props extends SelectOption {
  className?: string
  style?: React.CSSProperties
  onClick?: (value: string) => void
  onMouseEnter?: (value: string) => void
}

export default function Option({ className, style, value, label, extraTip, onClick, onMouseEnter }: Props) {
  const [visible, setVisible] = useState(false)

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      onClick?.(value)
      setVisible(false)
    },
    [onClick, value]
  )

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      onMouseEnter?.(value)
    },
    [onMouseEnter, value]
  )

  return (
    <Popover
      popupVisible={visible}
      onVisibleChange={setVisible}
      disabled={!extraTip}
      content={extraTip}
      position="left"
      trigger="hover"
      triggerProps={{
        style: { zIndex: 10000 },
      }}
      getPopupContainer={() => document.body}>
      <div
        className={classNames('function-select-option', className)}
        style={style}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}>
        <span>{label || value}</span>
      </div>
    </Popover>
  )
}
