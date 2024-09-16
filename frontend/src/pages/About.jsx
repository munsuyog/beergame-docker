import heading from "../assets/about/heading.png";
import team1 from "../assets/about/team1.png";
import team2 from "../assets/about/team2.png";
import team3 from "../assets/about/team3.png";
import team4 from "../assets/about/team4.png";
import box from "../assets/about/box.png";

const About = () => {
  return (
    <main className="px-5 lg:px-14">
      {/* HEADER */}
      <header>
        <img
          src={heading}
          className="lg:w-[20%] md:w-[50%] mx-auto mt-10"
          alt=""
        />
        <div>
          <h1 className="text-center text-xl md:text-3xl lg:text-4xl md:w-[50%] lg:w-[35%] mx-auto font-bold">
            <span className="text-[#F53838]">Engage. Connect. Challenge.</span>{" "}
            Educate. Advance.{" "}
            <span className="text-[#34B3F1]">Play once more.</span>
          </h1>
          <p className="text-center text-[#666C89] md:text-lg lg:text-base md:w-[70%] lg:w-[50%] mx-auto font-semibold mt-5">
            Our digital games are designed for multiplayer experiences, both
            on-site and remote, to enhance education and training. These
            immersive simulations focus on supply chain management, lean
            manufacturing, and continuous improvement, with the goal of
            captivating and entertaining participants, sharpening individual
            business skills, and nurturing collaborative cultures.
          </p>
        </div>
      </header>

      {/* TEAM */}
      <section className="my-20">
        <h1 className="text-center text-xl md:text-2xl lg:text-4xl lg:w-[35%] mx-auto font-bold">
          Meet the Team
        </h1>
        <p className="text-center text-[#666C89] text-sm md:text-lg lg:text-base w-[35%] mx-auto font-semibold mt-5">
          Meet our team of professionals to serve you
        </p>
        <div className="w-[25%] md:w-[10%] lg:w-[5%] mx-auto">
          <p className="text-center text-[#0091D1] text-sm font-semibold mt-5 border border-[#0091D1] rounded-md p-1">
            Contact
          </p>
        </div>

        {/* CARDS  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-10 gap-5">
          <div className="max-w-sm bg-white border border-gray-200 rounded-3xl">
            <a href="#">
              <img
                className="rounded-t-lg w-full  object-cover"
                src={team1}
                alt=""
              />
            </a>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-xs text-[#C6BDBD]">Dog Trainer</h5>
              <p className="mb-3 text-sm font-semibold">Annette Black</p>
              <div className="flex justify-center items-center gap-2">
                <img src={box} alt="" />
                <img src={box} alt="" />
                <img src={box} alt="" />
              </div>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-3xl">
            <a href="#">
              <img
                className="rounded-t-lg w-full  object-cover"
                src={team2}
                alt=""
              />
            </a>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-xs text-[#C6BDBD]">Dog Trainer</h5>
              <p className="mb-3 text-sm font-semibold">Annette Black</p>
              <div className="flex justify-center items-center gap-2">
                <img src={box} alt="" />
                <img src={box} alt="" />
                <img src={box} alt="" />
              </div>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-3xl">
            <a href="#">
              <img
                className="rounded-t-lg w-full  object-cover"
                src={team3}
                alt=""
              />
            </a>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-xs text-[#C6BDBD]">Dog Trainer</h5>
              <p className="mb-3 text-sm font-semibold">Annette Black</p>
              <div className="flex justify-center items-center gap-2">
                <img src={box} alt="" />
                <img src={box} alt="" />
                <img src={box} alt="" />
              </div>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-3xl">
            <a href="#">
              <img
                className="rounded-t-lg w-full  object-cover"
                src={team4}
                alt=""
              />
            </a>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-xs text-[#C6BDBD]">Dog Trainer</h5>
              <p className="mb-3 text-sm font-semibold">Annette Black</p>
              <div className="flex justify-center items-center gap-2">
                <img src={box} alt="" />
                <img src={box} alt="" />
                <img src={box} alt="" />
              </div>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-3xl">
            <a href="#">
              <img
                className="rounded-t-lg w-full  object-cover"
                src={team1}
                alt=""
              />
            </a>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-xs text-[#C6BDBD]">Dog Trainer</h5>
              <p className="mb-3 text-sm font-semibold">Annette Black</p>
              <div className="flex justify-center items-center gap-2">
                <img src={box} alt="" />
                <img src={box} alt="" />
                <img src={box} alt="" />
              </div>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-3xl">
            <a href="#">
              <img
                className="rounded-t-lg w-full  object-cover"
                src={team2}
                alt=""
              />
            </a>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-xs text-[#C6BDBD]">Dog Trainer</h5>
              <p className="mb-3 text-sm font-semibold">Annette Black</p>
              <div className="flex justify-center items-center gap-2">
                <img src={box} alt="" />
                <img src={box} alt="" />
                <img src={box} alt="" />
              </div>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-3xl">
            <a href="#">
              <img
                className="rounded-t-lg w-full  object-cover"
                src={team3}
                alt=""
              />
            </a>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-xs text-[#C6BDBD]">Dog Trainer</h5>
              <p className="mb-3 text-sm font-semibold">Annette Black</p>
              <div className="flex justify-center items-center gap-2">
                <img src={box} alt="" />
                <img src={box} alt="" />
                <img src={box} alt="" />
              </div>
            </div>
          </div>

          <div className="max-w-sm bg-white border border-gray-200 rounded-3xl">
            <a href="#">
              <img
                className="rounded-t-lg w-full  object-cover"
                src={team4}
                alt=""
              />
            </a>
            <div className="p-5 text-center">
              <h5 className="mb-2 text-xs text-[#C6BDBD]">Dog Trainer</h5>
              <p className="mb-3 text-sm font-semibold">Annette Black</p>
              <div className="flex justify-center items-center gap-2">
                <img src={box} alt="" />
                <img src={box} alt="" />
                <img src={box} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
