import heroImg01 from "../assets/images/MentorHero.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import faqImg from "../assets/images/faq-img.png";

import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About.jsx";
import ServiceList from "../components/Services/ServiceList";
import MentorList from "../components/Mentors/MentorList3.jsx";
import GSessionList from "../components/GroupSession/GSessionList3.jsx";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";
import Features from "../components/Features.jsx";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero__section py-20 bg-[#f9fafb] mt-20">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 px-6 lg:px-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-headingColor leading-tight mb-6">
              Empower your learning with expert mentors
              <span className="text-blue-600">Online Courses</span> For All
            </h1>

            <p className="text__para mb-8 text-gray-600 text-lg leading-relaxed">
              Learn with top educators and mentors across various fields. Build
              your skills, connect with professionals, and grow your potential
              anytime, anywhere. Own your future learning new skills online with
              expert mentors and top educators.
            </p>

            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <h2 className="text-3xl font-bold text-headingColor">50+</h2>
                <span className="block w-16 h-1 bg-yellow-400 mx-auto lg:mx-0 mt-1 rounded-full"></span>
                <p className="text__para mt-2">Professional Mentors</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-headingColor">20+</h2>
                <span className="block w-16 h-1 bg-purple-500 mx-auto lg:mx-0 mt-1 rounded-full"></span>
                <p className="text__para mt-2">Subjects & Fields</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-headingColor">100%</h2>
                <span className="block w-16 h-1 bg-cyan-500 mx-auto lg:mx-0 mt-1 rounded-full"></span>
                <p className="text__para mt-2">Student Satisfaction</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src={heroImg01}
              alt="Online learning illustration"
              className="w-full max-w-[500px] drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto text-center">
            <h2 className="heading">Explore Our Mentorship Services</h2>
            <p className="text__para">
              Get access to personalized learning, professional coaching, and
              practical skill-building with our expert mentors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5 text-center">
              <img src={icon01} alt="" className="mx-auto" />
              <h2 className="text-[26px] font-[700] text-headingColor mt-[30px]">
                Find Your Mentor
              </h2>
              <p className="text-[16px] text-textColor mt-4">
                Browse hundreds of professional mentors ready to help you in
                your educational or career journey.
              </p>
              <Link
                to="/mentors"
                className="w-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>

            <div className="py-[30px] px-5 text-center translate-y-12">
              <img src={icon02} alt="" className="mx-auto" />
              <h2 className="text-[26px] font-[700] text-headingColor mt-[30px]">
                Join a Session
              </h2>
              <p className="text-[16px] text-textColor mt-4">
                Participate in live sessions or recorded classes designed to
                boost your knowledge and confidence.
              </p>
              <Link
                to="/sessions"
                className="w-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>

            <div className="py-[30px] px-5 text-center">
              <img src={icon03} alt="" className="mx-auto" />
              <h2 className="text-[26px] font-[700] text-headingColor mt-[30px]">
                Book a Session
              </h2>
              <p className="text-[16px] text-textColor mt-4">
                Choose your time, book your mentor, and start improving your
                skills today.
              </p>
              <Link
                to="/book"
                className="w-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
              >
                <BsArrowRight className="group-hover:text-white w-6 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Learning Paths */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center">
            <h2 className="heading">Popular Learning Paths</h2>
            <p className="text__para">
              Choose the learning track that suits your goals — from web
              development to design, business, and more.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* Virtual Mentorship Feature */}
      <Features />

      {/* Mentors Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="container relative z-10">
          {/* Header */}
          <div className="xl:w-[470px] mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Meet Our Mentors
            </h2>
            <p className="text-base text-gray-900 dark:text-gray-300 leading-7 font-semibold">
              Learn from top educators and experienced professionals ready to
              guide you toward your career goals.
            </p>
          </div>

          {/* Mentor List */}
          <div className="relative z-10">
            <MentorList />
          </div>

          {/* Call-to-Action Button */}
          <div className="flex justify-center mt-12">
            <Link to="/mentors">
              <button className="btn bg-gray-500 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
                Explore Mentors
              </button>
            </Link>
          </div>

          {/* overlay: full-size gradient behind content */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none
                  bg-primaryColor
                  dark:to-gray-900
                  w-[98%] h-[90%] mx-auto top-[10%]
                  rounded-s skew-y-3"
          ></div>
        </div>
      </section>

      {/* GSession Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="container relative z-10">
          {/* Header */}
          <div className="xl:w-[470px] mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Join Our Group Sessions
            </h2>
            <p className="text-base text-gray-900 dark:text-gray-300 leading-7 font-semibold">
              Participate in live, mentor-led group sessions — interactive
              workshops and Q&amp;A that help you learn faster and collaborate
              with peers.
            </p>
          </div>

          {/* Group Session List */}
          <div className="relative z-10">
            <GSessionList />
          </div>

          {/* Call-to-Action Button */}
          <div className="flex justify-center mt-12">
            <Link to="/Group_Session">
              <button className="btn bg-gray-500 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
                Explore Group Sessions
              </button>
            </Link>
          </div>

          {/* overlay: full-size gradient behind content */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none
                  bg-primaryColor
                  dark:to-gray-900
                  w-[98%] h-[90%] mx-auto top-[10%]
                  rounded-s skew-y-3"
          ></div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 lg:gap-16">
            {/* Left Image */}
            <div className="w-full md:w-1/2 hidden md:block">
              <img
                src={faqImg}
                alt="Students asking mentorship questions"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>

            {/* Right FAQ Content */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6 leading-snug">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We’ve compiled some of the most common questions learners ask
                about mentorship sessions, scheduling, and becoming part of our
                community.
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
                <FaqList />
              </div>
            </div>
          </div>

          {/* Optional soft gradient overlay for style */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-900 opacity-70 -z-10"></div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center">
            <h2 className="heading">What our students say</h2>
            <p className="text__para">
              Hear stories from learners who grew their skills with mentorship.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Home;
