import { useEffect, useState } from 'react'

// Runs an async loader and exposes { data, error, loading, reload }. reload() re-runs it with { force: true }
// so Retry bypasses the service cache. `deps` re-run the loader (e.g. a route id).
export function useAsync(load, deps = []) {
  const [state, setState] = useState({ data: null, error: null, loading: true })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let live = true
    setState({ data: null, error: null, loading: true })
    load({ force: tick > 0 })
      .then((data) => live && setState({ data, error: null, loading: false }))
      .catch((error) => live && setState({ data: null, error, loading: false }))
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, ...deps])

  return { ...state, reload: () => setTick((t) => t + 1) }
}
