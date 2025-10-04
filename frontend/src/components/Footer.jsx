// components/Footer.jsx
// ----------------------------------------------------
// Simple footer
// ----------------------------------------------------

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center mt-8">
      <p>© {new Date().getFullYear()} Booker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
