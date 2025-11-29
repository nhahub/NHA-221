import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillGithub } from "react-icons/ai";

const socialLinks = [
  {
    path: "https://github.com/mohamedEssamMo",
    icon: <AiFillGithub className="w-5 h-5" />,
    title: "Mohamed Essam",
    color: "bg-primaryColor",
  },
  {
    path: "https://github.com/constellationCoder",
    icon: <AiFillGithub className="w-5 h-5" />,
    title: "Abdelrhman Magdy",
    color: "bg-primaryColor",
  },
  {
    path: "https://github.com/Nouransaid",
    icon: <AiFillGithub className="w-5 h-5" />,
    title: "Nouran Said",
    color: "bg-primaryColor",
  },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About Us" },
  { path: "/services", display: "Services" },
  { path: "/blog", display: "Blog" },
];

const quickLinks02 = [
  { path: "/mentors", display: "Find a Mentor" },
  { path: "/login", display: "Login" },
  { path: "/register", display: "Register" },
];

const quickLinks03 = [
  { path: "/contact", display: "Suggestions" },
  { path: "/contact", display: "Contact Us" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primaryColor to-[#100192] text-white pt-12 md:pt-16 pb-6">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {/* Main Info Section */}
        <div className="md:col-span-2 lg:col-span-3 animate-fadeInUp">
          <img
            src={logo}
            alt="DEPI Logo"
            className="w-40 sm:w-48 md:w-52 mb-4 sm:mb-6 transition-transform duration-500 hover:scale-105"
          />
          <p className="text-sm sm:text-base leading-6 sm:leading-7 font-medium text-white animate-fadeIn delay-100">
            DEPI is a mentorship platform bridging learners with professionals.
            Gain guidance, confidence, and practical skills for a successful
            career.
          </p>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6 mt-5">
            {socialLinks.map((link, index) => (
              <div
                key={index}
                className="flex flex-col items-center animate-fadeIn delay-[200ms]"
              >
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.title}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white hover:scale-110 transition-transform duration-300 ${link.color} hover:text-yellowColor`}
                >
                  {link.icon}
                </a>
                <span className="mt-2 text-xs sm:text-sm text-white text-center animate-fadeIn delay-[300ms]">
                  {link.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="animate-fadeIn delay-[400ms]">
          <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-white animate-fadeIn delay-100">
            Quick Links
          </h2>
          <ul className="space-y-3">
            {quickLinks01.map((item, index) => (
              <li key={index} className="animate-fadeIn delay-[200ms]">
                <Link
                  to={item.path}
                  className="hover:text-yellow-400 transition-colors duration-300 text-[15px] sm:text-[16px] font-medium hover:translate-x-1"
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fadeIn delay-[500ms]">
          <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-white animate-fadeIn delay-100">
            I want to:
          </h2>
          <ul className="space-y-3">
            {quickLinks02.map((item, index) => (
              <li key={index} className="animate-fadeIn delay-[200ms]">
                <Link
                  to={item.path}
                  className="hover:text-yellow-400 transition-colors duration-300 text-[15px] sm:text-[16px] font-medium hover:translate-x-1"
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fadeIn delay-[600ms]">
          <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-white animate-fadeIn delay-100">
            Support
          </h2>
          <ul className="space-y-3">
            {quickLinks03.map((item, index) => (
              <li key={index} className="animate-fadeIn delay-[200ms]">
                <Link
                  to={item.path}
                  className="hover:text-yellow-400 transition-colors duration-300 text-[15px] sm:text-[16px] font-medium hover:translate-x-1"
                >
                  {item.display}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center mt-10 text-sm sm:text-base text-white animate-fadeIn delay-[700ms]">
        &copy; {year} DEPI. All rights reserved. Developed by{" "}
        <span className="font-semibold hover:text-yellow-400 transition-colors">
          DEPI Team 4
        </span>
      </p>
    </footer>
  );
};

export default Footer;
