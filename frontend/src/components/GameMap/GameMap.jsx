// src/pages/Map.jsx
import "./GameMap.css";

import Mountain from "../SVGs/Mountain";
import Stone from "../../assets/Game/stone.png";
import Trees from "../SVGs/Trees";
import LightHouse from "../SVGs/LightHouse";
// import GameOrderBoat from "../GameOrderBoat/GameOrderBoat";
import Manufacturer from "../Roles/Manufacturer";
import Retailer from "../Roles/Retailer";
import Wholesaler from "../Roles/Wholesaler";
import Distributor from "../Roles/Distributor";

const Map = () => {
  return (
    <div id="game-map" className="w-full">
      <Manufacturer />
      <Retailer />
      <Wholesaler />
      <Distributor />
      <Mountain
        style={{
          position: "absolute",
          left: "288px",
          top: "96px",
          width: "160px",
          zIndex: 2,
        }}
      />
      <Mountain
        style={{
          position: "absolute",
          left: "224px",
          top: "256px",
          width: "160px",
          zIndex: 2,
        }}
      />
      <Trees
        style={{ position: "absolute", left: "192px", top: "240px", zIndex: 2 }}
      />
      <Trees
        style={{
          position: "absolute",
          left: "224px",
          top: "160px",
          zIndex: 2,
        }}
      />
      <Trees
        style={{ position: "absolute", right: "448px", top: "160px", zIndex: 2 }}
      />
      <Trees
        style={{
          position: "absolute",
          left: "20vw",
          bottom: "4vw",
          zIndex: 2,
        }}
      />
      <LightHouse
        style={{ position: "absolute", left: "-5vw", bottom: "10vw", zIndex: 2 }}
      />
      <LightHouse
        style={{ position: "absolute", right: "-2vw", top: "5vw", zIndex: 2 }}
      />
      <LightHouse
        style={{ position: "absolute", right: "2vw", bottom: "5vw", zIndex: 2 }}
      />

      {/* <GameOrderBoat
        orders={10000}
        className="game-order-manufacturer-distributor"
        style={{
          position: "absolute",
          left: "10vw",
          top: "1vw",
          zIndex: 1,
        }}
      /> */}

      <img
        src={Stone}
        style={{
          position: "absolute",
          left: "9vw",
          top: "20vw",
          width: "4vw",
          zIndex: 2,
        }}
      />
      <img
        src={Stone}
        style={{
          position: "absolute",
          right: "24vw",
          top: "10vw",
          width: "4vw",
          zIndex: 2,
        }}
      />
      <img
        src={Stone}
        style={{
          position: "absolute",
          left: "20vw",
          bottom: "13vw",
          width: "3vw",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default Map;
