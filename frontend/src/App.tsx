import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { BayMaxPage } from './pages/BayMaxPage'

export function App() {
  return <Routes><Route element={<AppLayout />}>
    <Route path="/" element={<BayMaxPage key="home" page="home" />} />
    <Route path="/conversations" element={<BayMaxPage key="conversations" page="conversations" />} />
    <Route path="/memories" element={<BayMaxPage key="memories" page="memories" />} />
    <Route path="/canvas" element={<BayMaxPage key="canvas" page="canvas" />} />
    <Route path="/review" element={<BayMaxPage key="review" page="review" />} />
    <Route path="/actions" element={<BayMaxPage key="actions" page="actions" />} />
    <Route path="/archive" element={<BayMaxPage key="archive" page="archive" />} />
    <Route path="/legacy" element={<BayMaxPage key="legacy" page="legacy" />} />
    <Route path="/settings" element={<BayMaxPage key="settings" page="settings" />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route></Routes>
}
