import React from "react";

import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from "./assets/pages/HomePage";
import PrivacyPage from "./assets/pages/PrivacyPage";
import TermsPage from "./assets/pages/TermsPage";
import ContactPage from "./assets/pages/ContactPage";

function App() {
  return (
    <section className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="privacypage" element={<PrivacyPage />} />
          <Route path="termspage" element={<TermsPage />} />
          <Route path="contactpage" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
