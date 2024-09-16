import HeroSection from "../components/Help/HeroSection"
import List from "../components/Help/List"

const Help = () => {
  return (
    <div className="w-full h-fit lg:h-screen px-8 md:px-20 lg:px-28 py-4 md:py-8 flex flex-col lg:gap-8 md:gap-4 gap-4">
  <div className="w-full h-[25%] md:h-[35%] lg:h-[40%]">
  <HeroSection/>
  </div>
     <div className="w-full h-[75%] md:h-[65%] lg:h-[60%]">
      <List/>
     </div>
      </div>
  )
}

export default Help