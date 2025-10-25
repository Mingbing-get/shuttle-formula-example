import type { VariableTipOption } from 'shuttle-formula/render'
import FormulaVariablePickerPanel, { VariablePickerPanelProps } from './formulaVariablePickerPanel'

export interface VariableSelectProps extends Omit<VariablePickerPanelProps, 'variablePath'> {
  option: VariableTipOption
}

export default function VariableSelect({ option, ...extra }: VariableSelectProps) {
  return <FormulaVariablePickerPanel variablePath={option.path} {...extra} />
}
