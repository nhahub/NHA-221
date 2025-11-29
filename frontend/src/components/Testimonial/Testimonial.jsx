import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import studentAvatar from "../../assets/images/avatar-icon.png";
import { HiStar } from "react-icons/hi";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Frontend Developer",
    text: "Joining Mentorship boosted my coding confidence. My mentor guided me patiently, and now I can tackle complex projects with ease!",
    rating: 5,
  },
  {
    name: "Mohamed Youssef",
    role: "UX Designer",
    text: "The mentorship sessions provided practical feedback that transformed my design. I now create user-centered designs with confidence.",
    rating: 5,
  },
  {
    name: "Amina Salah",
    role: "Data Analyst Intern",
    text: "I learned data analysis step by step. My mentor was supportive throughout, which helped me land an internship afterward!",
    rating: 5,
  },
  {
    name: "Karim Hassan",
    role: "Full Stack Developer",
    text: "Mentorship gave me a fresh perspective on learning — it's more than lessons, it's about growth and real-world experience!",
    rating: 5,
  },
];

const Testimonial = () => {
  return (
    <div className="mt-[40px] lg:mt-[60px] container relative z-10 py-14">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {testimonials.map((student, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03]">
              {/* Avatar and Info */}
              <div className="flex items-center gap-5">
                <div className="w-[70px] h-[70px] flex-shrink-0 relative">
                  <img
                    src={studentAvatar}
                    alt={student.name}
                    className="w-full h-full rounded-full object-cover ring-4 ring-primaryColor ring-opacity-20 p-[2px] transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <h4 className="text-[19px] font-extrabold text-headingColor">
                    {student.name}
                  </h4>
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    {student.role}
                  </p>
                  <div className="flex items-center gap-[2px] mt-2">
                    {[...Array(student.rating)].map((_, i) => (
                      <HiStar key={i} className="text-yellow-500 w-5 h-5" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 font-medium italic text-[17px] leading-relaxed mt-6 relative pl-6 pr-6">
                <FaQuoteLeft className="absolute left-0 top-0 text-primaryColor text-2xl opacity-70" />
                {student.text}
                <FaQuoteRight className="absolute right-0 bottom-0 text-primaryColor text-2xl opacity-70" />
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="absolute inset-0 -z-10 pointer-events-none
                  bg-primaryColor
                  dark:to-gray-900
                  w-full h-full mx-auto
                  rounded-s skew-y-3"
      ></div>
    </div>
  );
};

export default Testimonial;
