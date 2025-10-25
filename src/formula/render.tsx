import { VariableDefine } from 'shuttle-formula/core'
import { Provider, VariableTip, FunctionTip } from 'shuttle-formula/render-react'
import { GetDynamicObjectByPath, WithDynamicVariable } from 'shuttle-formula/render'

import { functionWithGroups } from './functionDefine'

import FunctionSelect from './functionSelect'
import VariableSelect from './variableSelect'
import OnChange, { OnChangeProps } from './onChange'
import RenderEditor from './renderEditor'

import 'shuttle-formula/render/index.css'

interface Props extends OnChangeProps {
  className?: string
  style?: React.CSSProperties
  code?: string
  getDynamicObjectByPath?: GetDynamicObjectByPath
  needAccept?: VariableDefine.Desc | VariableDefine.Desc[]
  variables?: Record<string, WithDynamicVariable>
  disabled?: boolean
}

export default function RenderFormula({
  className,
  style,
  code,
  needAccept,
  variables,
  disabled,
  onAstChange,
  onTokenChange,
  getDynamicObjectByPath,
}: Props) {
  return (
    <Provider
      disabled={disabled}
      code={code}
      variables={variables}
      functions={functionWithGroups}
      getDynamicObjectByPath={getDynamicObjectByPath}
    >
      <RenderEditor style={style} className={className} needAccept={needAccept} disabled={disabled} />
      <VariableTip VariableSelect={VariableSelect} />
      <FunctionTip FunctionSelect={FunctionSelect} />
      <OnChange onAstChange={onAstChange} onTokenChange={onTokenChange} />
    </Provider>
  )
}
