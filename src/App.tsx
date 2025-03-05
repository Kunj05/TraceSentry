import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Base64Tool from './pages/tools/Base64Tool';
import HexTool from './pages/tools/HexTool';
import JwtTool from './pages/tools/JwtTool';
import ScrollToTop from './components/ScrollToTop';
import WhoisLookup from './pages/tools/WhoisLookup';
import DnsLookup from './pages/tools/DnsLookup';
import PortScanner from './pages/tools/PortScanner';
import SubdomainFinder from './pages/tools/SubdomainFinder';
import IpLookup from './pages/tools/IpLookup'
import EmailValidator from './pages/tools/EmailValidator'
import SatelliteStreetView from './pages/tools/SatelliteStreetView'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            <Route path="/tools/base64" element={<Base64Tool />} />
            <Route path="/tools/hex" element={<HexTool />} />
            <Route path="/tools/jwt" element={<JwtTool />} />
            <Route path="/tools/domain-whois" element={<WhoisLookup />} />
            <Route path="/tools/dns-lookup" element={<DnsLookup />} />
            <Route path="/tools/port-scanner" element={<PortScanner />} />
            <Route path="/tools/subdomain-finder" element={<SubdomainFinder />} />
            <Route path="/tools/ip-lookup" element={<IpLookup />} />
            <Route path="/tools/email-validator" element={<EmailValidator />} />
            <Route path="/tools/satellite-view" element={<SatelliteStreetView />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;