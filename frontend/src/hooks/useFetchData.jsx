import { useEffect, useState } from 'react'
import { token } from '../config'
import { toast } from 'react-toastify'

const useFetchData = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const result = await res.json()

        if (!res.ok) {
          throw new Error('Please, Ensure from your internet connection 😕')
        }

        setData(result.data)
      } catch (err) {
        setError(err.message)
        toast.error('Please, Ensure from your internet connection 😕')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetchData
