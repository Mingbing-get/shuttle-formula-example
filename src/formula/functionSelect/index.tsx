import { useCallback, useMemo } from 'react'
import type { WithLabelFunction, FunctionGroup, FunctionTipOption } from 'shuttle-formula/render'

import { SelectGroup, SelectOption } from './selectPanel/type'
import SelectPanel from './selectPanel'

export interface FunctionSelectProps {
  functions?: Record<string, WithLabelFunction> | FunctionGroup[]
  option: FunctionTipOption
  onSelect?: (functionName: string) => void
}

export default function FunctionSelect({ option, functions, onSelect }: FunctionSelectProps) {
  const options = useMemo(() => {
    if (functions instanceof Array) {
      const group: SelectGroup[] = []

      functions.forEach((item) => {
        const inGroupFunctions = filterFunctionsToSelect(option.name, item.functions)
        if (inGroupFunctions.length > 0) {
          group.push({
            id: item.id,
            label: item.label,
            options: inGroupFunctions,
          })
        }
      })

      return group
    }

    return filterFunctionsToSelect(option.name, functions)
  }, [functions, option.name])

  const handleClickItem = useCallback(
    (option: SelectOption) => {
      onSelect?.(option.value)
    },
    [onSelect]
  )

  if (options.length === 0) {
    return <span>未匹配到函数</span>
  }

  return <SelectPanel options={options} onClickItem={handleClickItem} />
}

function filterFunctionsToSelect(functionName: string, functions?: Record<string, WithLabelFunction>) {
  const options: SelectOption[] = []

  for (const key in functions) {
    if (key.includes(functionName) || functions[key].label?.includes(functionName)) {
      options.push({
        value: key,
        label: functions[key].label ?? key,
        extraTip: functions[key].description,
      })
    }
  }

  return options
}
