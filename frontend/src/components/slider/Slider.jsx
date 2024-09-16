import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, HashNavigation } from 'swiper/modules';

export default function Slider({ avatar1, avatar2, avatar3, rating }) {
  return (
    <>
      <Swiper
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        spaceBetween={30}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="mySwiper mt-20"
      >
        <SwiperSlide className="border-2 border-[#34B3F1] p-5 rounded-lg lg:h-64">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={avatar1}
                className="h-14 w-14 mx-auto border-0 rounded-full bg-white"
                alt=""
              />
              <div>
                <h2 className="font-bold">Viezh Robert</h2>
                <p className="text-sm">Warsaw, Poland</p>
              </div>
            </div>
            <div className="flex gap-2">
              <p>4.5</p>
              <img src={rating} className="" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            <p className="mt-3 text-base font-semibold text-center overflow-hidden text-ellipsis h-32">
              “Wow... I am very happy to use this VPN, it turned out to be more
              than my expectations and so far there have been no problems.
              LaslesVPN always the best”.
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="border-2 border-gray-200 hover:border-[#34B3F1] p-5 rounded-lg transition-colors duration-300 group lg:h-64">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={avatar2}
                className="h-14 w-14 mx-auto border-0 rounded-full bg-white"
                alt=""
              />
              <div>
                <h2 className="font-bold">Yessica Christy</h2>
                <p className="text-sm">Shanxi, China</p>
              </div>
            </div>
            <div className="flex gap-2">
              <p>4.5</p>
              <img src={rating} className="" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            <p className="mt-3 text-base font-semibold text-center overflow-hidden text-ellipsis h-32">
              “I like it because I like to travel far and still can connect with
              high speed.”..
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="border-2 border-gray-200 hover:border-[#34B3F1] p-5 rounded-lg transition-colors duration-300 group lg:h-64">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={avatar2}
                className="h-14 w-14 mx-auto border-0 rounded-full bg-white"
                alt=""
              />
              <div>
                <h2 className="font-bold">Yessica Christy</h2>
                <p className="text-sm">Shanxi, China</p>
              </div>
            </div>
            <div className="flex gap-2">
              <p>4.5</p>
              <img src={rating} className="" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            <p className="mt-3 text-base font-semibold text-center overflow-hidden text-ellipsis h-32">
              “I like it because I like to travel far and still can connect with
              high speed.”..
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide className="border-2 border-gray-200 hover:border-[#34B3F1] p-5 rounded-lg transition-colors duration-300 group lg:h-64">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={avatar3}
                className="h-14 w-14 mx-auto border-0 rounded-full bg-white"
                alt=""
              />
              <div>
                <h2 className="font-bold">Kim Young Jou</h2>
                <p className="text-sm">Seoul, South Korea</p>
              </div>
            </div>
            <div className="flex gap-2">
              <p>4.5</p>
              <img src={rating} className="" alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            <p className="mt-3 text-base font-semibold text-center overflow-hidden text-ellipsis h-32">
              “This is very unusual for my business that currently requires a
              virtual private network that has high security.”.
            </p>
          </div>
        </SwiperSlide>
        
      
      </Swiper>

     
    </>
  );
}

Slider.propTypes = {
  avatar1: PropTypes.string.isRequired,
  avatar2: PropTypes.string.isRequired,
  avatar3: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};
