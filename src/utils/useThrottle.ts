/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'
import { DebouncedFunc } from 'lodash'
import { throttle } from 'lodash/fp'

type Throttle = (
  timeout?: number
) => DebouncedFunc<(fn: (args: string) => void, args: string) => void>

export const useThrottle: Throttle = (timeout = 3000) =>
  useCallback(
    throttle(timeout, (fn, ...args) => fn(...args)),
    []
  )
