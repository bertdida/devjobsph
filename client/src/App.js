import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Loader } from 'components/Loader';
import { ThemeProvider } from './common/Theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Routes } from './Routes';
import './App.scss';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        <Container as="main" className="app">
          <div className="main">
            <Suspense fallback={<Loader message="Lazy loading..." />}>
              <Routes />
            </Suspense>
          </div>
        </Container>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
}
