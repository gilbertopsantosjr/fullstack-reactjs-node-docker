import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'

export const PageLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-5 mt-5">
        <Outlet />
      </main>
      <footer className="text-center">power by @Gilberto Santos</footer>
    </div>
  )
}
