import useSWRImmutable from 'swr/immutable'

export const useCMSQuery = (query: any | null = null) => {
  const fetcher = () =>
    fetch(process.env.NEXT_PUBLIC_CMS_URL || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_TOKEN || ''}`,
      },
      body: JSON.stringify({
        query: query,
      }),
    }).then((res) => res.json())

  return useSWRImmutable(query, fetcher)
}

const fetchMultiple = async (urls: string[]): Promise<any[]> => {
  const responses = await Promise.all(urls.map((url) => fetch(url)))
  const data = await Promise.all(responses.map((res) => res.json()))
  return data
}

export const useMultiFetch = (urls: string[] | null, config?: any) => {
  const fetcher = (): Promise<any[]> => fetchMultiple(urls ?? [])
  return useSWRImmutable(urls ? urls.join() : null, fetcher, config)
}
