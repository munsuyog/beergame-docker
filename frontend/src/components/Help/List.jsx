import Logo1 from "../../assets/Help/Logo1.png"
import Logo2 from "../../assets/Help/Logo2.png"
import Logo3 from "../../assets/Help/Logo3.png"
import Logo4 from "../../assets/Help/Logo4.png"
import Logo5 from "../../assets/Help/Logo5.png"
import Logo6 from "../../assets/Help/Logo6.png"

const List = () => {

    let dataArray = [
        {
            id: 1,
            image: Logo1 ,
            heading: 'What is beer game ?',
            text: 'Experience the complexities of supply chain management through the interactive Beer Game simulation.'
        },
        {
            id: 2,
            image: Logo2 ,
            heading: 'Limit number of participants',
            text: 'Recommended for a minimum of four participants to simulate various roles in the supply chain effectively.'
        },
        {
            id: 3,
            image: Logo3,
            heading: 'Pricing Plans',
            text: 'Pricing plans are flexible and depend on the scale and duration of the simulation, tailored to meet educational or organizational needs.'
        },
        {
            id: 4,
            image: Logo4 ,
            heading: 'Template',
            text: 'Utilize the Beer Game template to structure roles, timelines, and order flows for a streamlined simulation of supply chain dynamics.'
        },
        {
            id: 5,
            image: Logo5 ,
            heading: 'Tips and Tricks for beer game',
            text: 'Explore strategies such as effective communication, proactive inventory management, and collaborative decision-making to optimize performance in the Beer Game.'
        },
        {
            id: 6,
            image: Logo6 ,
            heading: 'The rules for beer game',
            text: 'Follow rules governing order quantities, lead times, and inventory management to simulate realistic supply chain dynamics in the Beer Game.'
        }
    ];



  return (
    <div className="grid md:grid-cols-3 2xl:gap-8 xl:gap-8 lg:gap-8 md:gap-4 gap-4 w-full h-full 2xl:p-8 xl:p-4 lg:p-2 md:p-2">
    {dataArray.map((item)=>(
    <div key={item.id}
    className="flex flex-col gap-2 p-2 w-full h-full">
      <div>
        <img src={item.image} alt="logo" className="xl:w-6 lg:w-4 md:w-4 w-6"/>
      </div>
      <div className=" text-[#53686A] 2xl:text-[1.2rem] xl:text-[.9rem] lg:text-[.8rem] md:text-[.7rem] text-[.9rem]">
        <p>{item.heading}</p>
      </div>
      <div className="text-[#53686A] 2xl:text-[.9rem] xl:text-[.7rem] lg:text-[.6rem] md:text-[.55rem] text-[.8rem]">
        <p>{item.text}</p>
      </div>
    </div>
    ))}
    </div>
  )
}

export default List
