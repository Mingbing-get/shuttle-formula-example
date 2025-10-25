import React, { useState } from 'react'
import { IconCaretDown } from '@arco-design/web-react/icon'

interface Props {
  title: React.ReactNode
  children?: React.ReactNode
}

export default function Group({ title, children }: Props) {
  const [open, setOpen] = useState(true)

  return (
    <div className="function-select-group">
      <div className="function-select-group-header">
        <IconCaretDown
          className="function-select-group-header-icon"
          onClick={() => setOpen(!open)}
          style={open ? undefined : { rotate: '-90deg' }}
        />
        <span className="function-select-group-title">{title}</span>
      </div>
      {open && <div className="function-select-group-options">{children}</div>}
    </div>
  )
}
