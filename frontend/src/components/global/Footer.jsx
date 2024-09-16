import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FooterColumn = ({ title, links }) => (
  <div className="w-full sm:w-1/2 md:w-1/4 mb-8">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <ul>
      {links.map((link, index) => (
        <motion.li 
          key={index} 
          className="mb-2"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link to={link.url} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
            {link.text}
          </Link>
        </motion.li>
      ))}
    </ul>
  </div>
);

const SocialIcon = ({ Icon }) => (
  <motion.a
    href="#"
    className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center text-white hover:bg-red-600 transition-colors duration-200"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon size={20} />
  </motion.a>
);

const Footer = () => {
  const footerLinks = [
    {
      title: "Simulation",
      links: [
        { text: "Download", url: "#" },
        { text: "Price", url: "#" },
        { text: "Locations", url: "#" },
        { text: "Server", url: "#" },
        { text: "Countries", url: "#" },
        { text: "Blog", url: "#" },
      ]
    },
    {
      title: "Key Learnings",
      links: [
        { text: "LaslesVPN", url: "#" },
        { text: "FAQ", url: "#" },
        { text: "Tutorials", url: "#" },
        { text: "About Us", url: "#" },
        { text: "Privacy Policy", url: "#" },
        { text: "Terms of Service", url: "#" },
      ]
    },
    {
      title: "Earnings",
      links: [
        { text: "Affiliate", url: "#" },
        { text: "Become Partner", url: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">BeerGame</h2>
            <p className="text-gray-600 mb-6">
              The <strong>Beer Game</strong> is a supply chain simulation game
              that teaches players about the complexities and dynamics of supply
              chain management.
            </p>
            <div className="flex space-x-4 mb-6">
              <SocialIcon Icon={FaFacebookF} />
              <SocialIcon Icon={FaInstagram} />
              <SocialIcon Icon={FaTwitter} />
            </div>
            <p className="text-gray-500">©2024 BeerGame</p>
          </div>
          {footerLinks.map((column, index) => (
            <FooterColumn key={index} title={column.title} links={column.links} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;