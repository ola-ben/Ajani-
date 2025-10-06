import React from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import PriceInsightsDashboard from "./components/PriceInsightsDashboard";
import AiTopPicks from "./components/AiTopPicks";
import SponsoredBanner from "./components/SponsoredBanner";
import FeaturedBanner from "./components/FeaturedBanner";
import Directory from "./components/Directory";
import VendorForm from "./components/VendorForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans antialiased">
      <Header />
      <main>
        <Hero />
        <PriceInsightsDashboard />
        <FeaturedBanner />
        <VendorForm />

        {/* <SponsoredBanner /> */}
        <AiTopPicks />
        <Directory />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
