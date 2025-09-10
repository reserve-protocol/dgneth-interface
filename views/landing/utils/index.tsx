import useSWRImmutable from 'swr/immutable'

const fetchMultiple = async (urls: string[]): Promise<any[]> => {
  const responses = await Promise.all(urls.map((url) => fetch(url)))
  const data = await Promise.all(responses.map((res) => res.json()))
  return data
}

export const useMultiFetch = (urls: string[] | null, config?: any) => {
  const fetcher = (): Promise<any[]> => fetchMultiple(urls ?? [])
  return useSWRImmutable(urls ? urls.join() : null, fetcher, config)
}
