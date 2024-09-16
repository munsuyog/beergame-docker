
import RoleHoarding from "../RoleHoarding/RoleHoarding";
import './Roles.css'
import manufacturer from "../../assets/Game/manufacturerCopy.png"

const DISTRIBUTOR_MAP = {
    position: {
        top: '1.3vw',
        left: '1.4vw'
    }
}

const Manufacturer = () => {

  return (
    <div>
      <img
        src={manufacturer}
        className="game-map-manufacturer"
        alt="manufacturer"
      />
      <RoleHoarding
        textStyle={{
          position: "absolute",
          left: "14px",
          top: "14px",
          color: "white",
          fontWeight: 700,
          fontSize: "0.7rem",
        }}
        hoardingProps={{ top: "20px", left: "100px", position: "absolute", zIndex:"99" }}
        role="Manufacturer"
      />
    </div>
  );
};

export default Manufacturer;
