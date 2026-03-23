import type { UseFetchOptions } from '#app'

export type SafeFetchOptions<T> = UseFetchOptions<T> & {
  defaultValue?: T
}

export const useSafeFetch = <T>(
  request: Parameters<typeof useFetch<T>>[0],
  options: SafeFetchOptions<T> = {}
) => {
  const { defaultValue, ...rest } = options

  return useFetch<T>(request, {
    ...rest,
    default: () => (defaultValue ?? (null as T))
  })
}
