import { CiSearch } from "react-icons/ci"; 

const HeroSection = () => {
  return (
    <div className="bg-[#EFEDE0] w-full h-full flex flex-col xl:gap-6 md:gap-2 gap-2 items-center justify-center rounded-sm py-12 lg:py-0">
      <div>
        <p className="text-[#53686A] xl:text-[.7rem] lg:text-[.7rem] md:text-[.5rem] text-[.7rem]">FAQs</p>
      </div>
      <div>
        <p className="text-[#F53838] font-semibold xl:text-[2rem] lg:text-[1.5rem] md:text-[1.5rem] text-[1.5rem]">Ask us anything</p>
      </div>
      <div>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className="text-[#53686A] xl:text-[.9rem] lg:text-[.7rem] md:text-[.7rem] text-[.75rem]">Have any questions? We're here to assist you.</p>
      </div>
      <div className="xl:w-72 lg:w-64 md:w-56 w-56 rounded-md flex items-center bg-white px-2">
      <span className="text-gray-400 xl:text-[1rem] lg:text-[.75rem] md:text-[.7rem] text-[.8rem]">
        <CiSearch />
      </span>
        <input type="text" 
        className="w-full rounded-md py-1 px-2 outline-none xl:text-[1rem] lg:text-[.6rem] md:text-[.5rem] text-[.75rem]"
        placeholder="Search here"
        />
      </div>
    </div>
  )
}

export default HeroSection
