import React from "react";
import { useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 text-slate-600 text-sm py-8 font-rubik">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© {year} Ajani • Ibadan Price Insights</div>
          <div className="flex gap-4">
            <p
              className="hover:text-blue-600"
              onClick={() => navigate("/privacypage")}
            >
              Privacy
            </p>
            <p
              className="hover:text-blue-600"
              onClick={() => navigate("/termspage")}
            >
              Terms
            </p>
            <p
              className="hover:text-blue-600"
              onClick={() => navigate("/contactpage")}
            >
              Contact
            </p>
          </div>
          <a
            href="https://wa.me/2348123456789?text=Hi%20Ajani%20👋"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            <i className="fab fa-whatsapp"></i> Chat with Ajani
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
