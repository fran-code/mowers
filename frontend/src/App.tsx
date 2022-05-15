import Home from './pages/home/Home'
import { ErrorBoundary } from 'react-error-boundary'
import { IErrorValues } from './utils/interfaces'
import 'bootstrap/dist/css/bootstrap.min.css';

function FullPageErrorFallback({ error }: IErrorValues) {
  return (
    <div
      role="alert"
      style={{
        color: 'red',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Home />
    </ErrorBoundary>
  )
}

export default App
