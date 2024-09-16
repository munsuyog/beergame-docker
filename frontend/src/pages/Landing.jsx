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
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { createDemo } from "../store/reducers/gameSlice.js";
import { LoadingContext } from "../contexts/LoadingContext.jsx";
import Hero from "../components/Home/Landing/Hero.jsx";
import WhyChooseUs from "../components/Home/Landing/WhyChooseUs.jsx";
import { Benefits1, Benefits2, Benefits3 } from "../components/Home/Landing/Benefits.jsx";
import HowItLooks from "../components/Home/Landing/HowItLooks.jsx";
import { Step2, Step3, Step1 } from "../components/Home/Landing/Steps.jsx";
import ReviewSection from "../components/Home/Landing/ReviewSection.jsx";
import CallToAction from "../components/Home/Landing/CallToAction.jsx";

const Landing = () => {
  const dispatch = useDispatch();
  const {gameData, loading} = useSelector((state) => state.game)
  const {user} = useSelector((state) => state.user)
  const {startLoading, stopLoading}  = useContext(LoadingContext)

  useEffect(() => {
    if(loading) {
      startLoading();
    } else {
      stopLoading();
    }
  },[loading])

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
      console.error('Failed to create demo:', error);
      // Handle any errors here
    }
  };

  useEffect(() => {
    if(gameData) {
      navigate(`/game/${gameData.team_name}/${gameData.selected_station}`)
    }
  }, [gameData]);

  const reviews = [
    {
      name: "Viezh Robert",
      location: "Warsaw, Poland",
      rating: 4.5,
      avatar: avatar1,
      review:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best.",
    },
    {
      name: "Yessica Christy",
      location: "Shanxi, China",
      rating: 4.5,
      avatar: avatar2,
      review:
        "I like it because I like to travel far and still can connect with high speed.",
    },
    {
      name: "Kim  Jou",
      location: "Seoul, South Korea",
      rating: 4.5,
      avatar: avatar1,
      review:
        "This is very unusual for my business that currently requires a virtual private network that has high security.",
    },
    {
      name: "Viezh doe",
      location: "Warsaw, Poland",
      rating: 4.5,
      avatar: avatar1,
      review:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best.",
    },
    {
      name: "Yessica rob",
      location: "Shanxi, China",
      rating: 4.5,
      avatar: avatar2,
      review:
        "I like it because I like to travel far and still can connect with high speed.",
    },
    {
      name: "Kim  Jou",
      location: "Seoul, South Korea",
      rating: 4.5,
      avatar: avatar1,
      review:
        "This is very unusual for my business that currently requires a virtual private network that has high security.",
    },
    {
      name: "Viezh Robert",
      location: "Warsaw, Poland",
      rating: 4.5,
      avatar: avatar1,
      review:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best.",
    },
    {
      name: "Yessica Christy",
      location: "Shanxi, China",
      rating: 4.5,
      avatar: avatar2,
      review:
        "I like it because I like to travel far and still can connect with high speed.",
    },
    {
      name: "Kim  Jou",
      location: "Seoul, South Korea",
      rating: 4.5,
      avatar: avatar1,
      review:
        "This is very unusual for my business that currently requires a virtual private network that has high security.",
    },

    // Add more reviews here
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
      <WhyChooseUs />
      <Benefits1 />
      <Benefits2 />
      <Benefits3 />

      {/* GAMING */}
      <HowItLooks />

      <Step1 />

      {/* STEP 2 */}
    <Step2 />
      {/* STEP 3 */}
    <Step3 />

      {/* REVIEW */} 
      <ReviewSection currentIndex={currentIndex} itemsPerView={itemsPerView} setCurrentIndex={setCurrentIndex} reviews={reviews} />
      {/* LAST SECTION */}
      <CallToAction handlePlayDemo={handlePlayDemo} />
    </main>
  );
};

export default Landing;
