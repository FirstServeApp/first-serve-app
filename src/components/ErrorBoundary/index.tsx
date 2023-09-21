import { ErrorBoundary } from 'react-error-boundary'

const ErrorBoundaryComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      onError={(error: Error, info: { componentStack: string }) => console.log(info)} fallback={null}>
      {children}
    </ErrorBoundary>
  )
}

export default ErrorBoundaryComponent
