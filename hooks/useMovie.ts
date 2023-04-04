import useSWR from 'swr'
import fetcher from '@/libs/fetcher'

const useMovies = (id?: string) => {
  const {data, error, isLoading } = useSWR(id ? `/api/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  })
  return { data, error, isLoading }
}

export default useMovies;