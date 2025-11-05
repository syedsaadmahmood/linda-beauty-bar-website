import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Router } from './components/Router';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Router
          routes={[
            { path: '/', component: <HomePage /> },
            { path: '/services', component: <ServicesPage /> },
            { path: '/service/:id', component: <ServiceDetailPage /> },
          ]}
          defaultPath="/"
        />
      </main>
      <Footer />
    </div>
  );
}
