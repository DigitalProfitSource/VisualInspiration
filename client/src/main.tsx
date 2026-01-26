import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { Router } from 'wouter'
import { memoryLocation } from 'wouter/memory-location'
import App from "./App";
import "./index.css";

const isClient = typeof window !== 'undefined'

const staticRouter = memoryLocation({ path: '/', static: true })

const AppWrapper = () => {
  if (isClient) {
    return <App />
  }
  return (
    <Router hook={staticRouter.hook}>
      <App />
    </Router>
  )
}

export const createRoot = ViteReactSSG(<AppWrapper />)
