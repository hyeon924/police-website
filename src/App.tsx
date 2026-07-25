import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import HistoryPage from './pages/HistoryPage'
import HomePage from './pages/HomePage'

export default function App() {
  return <Layout><Routes><Route path="/" element={<HomePage />} /><Route path="/history" element={<HistoryPage />} /><Route path="*" element={<HomePage />} /></Routes></Layout>
}
