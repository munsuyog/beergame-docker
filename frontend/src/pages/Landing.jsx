import { useState, useEffect, useContext } from "react";
import benifit from "../assets/landing/benifit.png";
import checkIcon from "../assets/landing/checkIcon.png";
import tracks from "../assets/landing/tracks.png";
import game from "../assets/landing/game.png";
import step1 from "../assets/landing/step1.png";
import step2 from "../assets/landing/step2.png";
import stepBack from "../assets/landing/step2back.png";
import icon8 from "../assets/landing/icon8.png";
import icon9 from "../assets/landing/icon9.png";
import icon10 from "../assets/landing/icon10.png";
import icon11 from "../assets/landing/icon11.png";
import icon12 from "../assets/landing/icon12.png";
import icon13 from "../assets/landing/icon13.png";
import icon14 from "../assets/landing/icon14.png";
import icon15 from "../assets/landing/icon15.png";
import icon16 from "../assets/landing/icon16.png";
import pointer1 from "../assets/landing/pointer1.png";
import pointer2 from "../assets/landing/pointers2.png";
import pointDown from "../assets/landing/pointDown.png";
import graph from "../assets/landing/graph.png";
import gaming from "../assets/landing/gaming.png";
import avatar1 from "../assets/landing/avatar1.png";
import avatar2 from "../assets/landing/avatar2.png";

import rating from "../assets/landing/rating.png";
// import pagination from "../assets/landing/pagination.png";
// import right from "../assets/landing/right.png";
// import left from "../assets/landing/left.png";
import Icon1 from "../assets/landing/Icon1.jsx";
import Icon2 from "../assets/landing/Icon2.jsx";
import Icon3 from "../assets/landing/Icon3.jsx";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createDemo } from "../store/reducers/gameSlice.js";
import { LoadingContext } from "../contexts/LoadingContext.jsx";
import Hero from "../components/Home/Landing/Hero.jsx";
import WhyChooseUs from "../components/Home/Landing/WhyChooseUs.jsx";
import {
  Benefits1,
  Benefits2,
  Benefits3,
} from "../components/Home/Landing/Benefits.jsx";
import HowItLooks from "../components/Home/Landing/HowItLooks.jsx";
import { Step2, Step3, Step1 } from "../components/Home/Landing/Steps.jsx";
import ReviewSection from "../components/Home/Landing/ReviewSection.jsx";
import CallToAction from "../components/Home/Landing/CallToAction.jsx";
import Chatbot from "../components/Home/Landing/Chatbot.jsx";

const Landing = () => {
  const dispatch = useDispatch();
  const { gameData, loading } = useSelector((state) => state.game);
  const { user } = useSelector((state) => state.user);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (loading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [loading]);

  const [isHovered, setIsHovered] = useState(0);
  const [demoData, setDemoData] = useState(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null); // 'left' or 'right'
  const [itemsPerView, setItemsPerView] = useState(3);
  const handlePlayDemo = async () => {
    if (!user) {
      navigate("/signin"); // Redirect to home if not logged in
      return;
    }

    try {
      await dispatch(createDemo()).unwrap();
      // You can navigate to the demo or handle post-demo creation logic here if needed
    } catch (error) {
      console.error("Failed to create demo:", error);
      // Handle any errors here
    }
  };

  useEffect(() => {
    if (gameData) {
      navigate(`/game/${gameData.team_name}/${gameData.selected_station}`);
    }
  }, [gameData]);

  const reviews = [
    {
      name: "Dr. Sarah Thompson",
      location: "University of Logistics",
      rating: 5,
      avatar: avatar1,
      review: "The beer distribution game is a transformative learning experience, vividly demonstrating the challenges of managing supply chains in a competitive environment.",
    },
    {
      name: "Professor Mark Chen",
      location: "Global University",
      rating: 5,
      avatar: avatar2,
      review: "This simulation brings theoretical concepts to life, allowing students to engage with real-world scenarios and understand the complexities of inventory management.",
    },
    {
      name: "Dr. Emily Carter",
      location: "National Institute of Business",
      rating: 5,
      avatar: avatar1,
      review: "An eye-opening experience! The beer game encourages students to think critically about their decisions and fosters collaborative problem-solving.",
    },
    {
      name: "Dr. James Ellison",
      location: "Tech University",
      rating: 5,
      avatar: avatar2,
      review: "A must for any operations management course. The game effectively illustrates the importance of communication and teamwork in navigating supply chain dynamics.",
    },
    {
      name: "John Miller",
      location: "Los Angeles, USA",
      rating: 4.5,
      avatar: avatar1,
      review: "Participating in the beer game helped me realize how easily miscommunication can lead to significant losses in supply chain operations.",
    },
    {
      name: "Maria Gonzales",
      location: "Madrid, Spain",
      rating: 4.5,
      avatar: avatar2,
      review: "The interactive nature of the beer distribution game makes it a fantastic tool for learning about supply chain management principles.",
    },
    {
      name: "David Smith",
      location: "Toronto, Canada",
      rating: 4.5,
      avatar: avatar1,
      review: "This game was not only educational but also a lot of fun! It opened my eyes to the complexities of supply chain logistics.",
    },
    {
      name: "Lisa Wong",
      location: "Beijing, China",
      rating: 4.5,
      avatar: avatar2,
      review: "The beer game is an excellent way to teach students about demand fluctuations and the impact of their decisions on the entire supply chain.",
    },
    // Add more reviews if needed
  ];
  

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerView < reviews.length) {
      setSlideDirection("right");
      setCurrentIndex(currentIndex + itemsPerView);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerView >= 0) {
      setSlideDirection("left");
      setCurrentIndex(currentIndex - itemsPerView);
    }
  };

  const displayReviews = reviews.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  return (
    <main>
      {/* HERO SECTION */}
      <Hero handlePlayDemo={handlePlayDemo} />
      <HowItLooks />

      <Step1 />

      {/* STEP 2 */}
      <Step2 />
      {/* STEP 3 */}
      <Step3 />

      <WhyChooseUs />
      {/* <Benefits1 /> */}
      <Benefits2 />
      <Benefits3 />

      {/* GAMING */}

      {/* REVIEW */}
      <ReviewSection
        currentIndex={currentIndex}
        itemsPerView={itemsPerView}
        setCurrentIndex={setCurrentIndex}
        reviews={reviews}
      />
      {/* LAST SECTION */}
      <CallToAction handlePlayDemo={handlePlayDemo} />
    </main>
  );
};

export default Landing;
