import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
          {/* About image */}
          <div className="relative w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
            <img
              src={aboutImg}
              alt="Mentorship connection"
              className="rounded-2xl shadow-2xl w-[80%] lg:w-[85%]"
            />
            <div className="absolute bottom-6 right-6 lg:right-[20%] w-[180px] md:w-[280px] drop-shadow-lg">
              <img
                src={aboutCardImg}
                alt="Mentorship card"
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>

          {/* About content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-snug text-gray-800 dark:text-white">
              Empowering Growth Through Meaningful Mentorship
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
              <strong>Mentorship Connect</strong> is a platform designed to
              bridge the gap between learners and industry professionals.
              Whether you’re a student, a career starter, or a professional
              seeking growth, we make it simple to connect with the right mentor
              for your goals.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
              Through one-on-one sessions, group events, and shared educational
              content, our mentors offer tailored guidance that inspires
              learning and real-world skill development. From coding to
              communication, we believe growth happens best when guided by
              experience.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our vision is to create a vibrant learning community — where
              curiosity meets opportunity, and every learner finds a mentor who
              truly understands their journey.
            </p>
            <Link to="/mentors">
              <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-all">
                Explore Mentors
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
