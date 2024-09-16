import Blogs4 from "../../assets/Blogs/Blogs4.png"
import Blogs5 from "../../assets/Blogs/Blogs5.png"
import Blogs6 from "../../assets/Blogs/Blogs6.png"
import { FaArrowRight } from "react-icons/fa";

const CaseStudies = () => {
    const BlogData = [
        {
          id: 1,
          image: Blogs4,
          heading: 'Real-World Success',
          para: 'Dive into detailed analyses of how organizations have transformed their operations through our immersive...'
        },
        {
          id: 2,
          image: Blogs5,
          heading: 'Proven Results',
          para: 'Examine the impact of our digital games on supply chain efficiency and lean practices.Understand the tangible...'
        },
        {
          id: 3,
          image: Blogs6,
          heading: 'Transformative Training',
          para: 'Discover how businesses have enhanced their training programs using our multiplayer simulations.See the improvements...'
        },
        {
          id: 4,
          image: Blogs6,
           heading: 'Transformative Training',
          para: 'Discover how businesses have enhanced their training programs using our multiplayer simulations.See the improvements...'
        }
      ];
    
      return (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="xl:text-[1.6rem] lg:text-[1rem] md:text-[1rem] font-medium">
              <p>Case Studies</p>
            </div>
            <div className="bg-[#34B3F1] lg:p-3 md:p-2 p-2 rounded-3xl">
              <a href="#"
              className="text-white xl:text-[1.2rem] lg:text-[.7rem] md:text-[.8rem]">
                <FaArrowRight />
              </a>
            </div>
          </div>
    
          <div className=" xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 grid items-center w-full h-full xl:gap-12 lg:gap-8 md:gap-8 gap-4 ">
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


export default CaseStudies
