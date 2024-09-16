import Blogs7 from "../../assets/Blogs/Blogs7.png"
import Blogs8 from "../../assets/Blogs/Blogs8.png"
import Blogs9 from "../../assets/Blogs/Blogs9.png"
import { FaArrowRight } from "react-icons/fa";

const TeachingGuide = () => {
    const BlogData = [
        {
          id: 1,
          image: Blogs7,
          heading: 'Effective Game-Based Learning',
          para: 'Access comprehensive guides on integrating digital games into your curriculum. Get step-by-step instructions and best prac....'
        },
        {
          id: 2,
          image: Blogs8,
          heading: 'Simulation Implementation',
          para: 'Learn how to effectively deploy our simulations in educational and training settings. Gain insights on setup ,....'
        },
        {
          id: 3,
          image: Blogs9,
          heading: 'Continuous Improvement Journeys',
          para: 'Follow stories and tips on fostering a culture of continuous improvement. Gain practical advice and success stories from....'
        },
        {
          id: 4,
          image: Blogs9,
          heading: 'Curriculum Enhancement',
          para: 'Discover ways to enhance your teaching methods with immersive simulations. Find out how to create interactive and imp...'
        }
      ];
    
      return (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="xl:text-[1.6rem] lg:text-[1rem] md:text-[1rem] font-medium">
              <p>Teaching Guides</p>
            </div>
            <div className="bg-[#F15412] lg:p-3 md:p-2 p-2 rounded-3xl">
              <a href="#"
              className="text-white xl:text-[1.2rem] lg:text-[.7rem] md:text-[.8rem]">
                <FaArrowRight />
              </a>
            </div>
          </div>
    
          <div className=" xl:grid-cols-4 lg:grid-cols-3 md:grid grid-cols-2 grid items-center w-full h-full xl:gap-12 lg:gap-8 md:gap-8 gap-4 ">
            {
              BlogData.map((item) => (
                <div key={item.id} className="border w-full h-full rounded-lg p-2 flex flex-col gap-2 shadow-lg">
                  <div className="w-full h-[50%]">
                    <img src={item.image} alt="img" className="w-full h-full" />
                  </div>
                  <div className="w-full h-[50%]">
                    <p className="font-semibold xl:text-[1rem] lg:text-[.8rem] md:text-[.8rem] text-[.7rem]">{item.heading}</p>
                    <p className="text-[#4F5665] xl:text-[.8rem] lg:text-[.7rem] md:text-[.7rem] text-[.5rem]">{item.para}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      );
    }
export default TeachingGuide
