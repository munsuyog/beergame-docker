
import './Roles.css'
import RoleHoarding from '../RoleHoarding/RoleHoarding'
import wholesaler  from "../../assets/Game/wholesaler.png"
const Wholesaler = () => {
  return (
    <div>
              <img
        src={wholesaler}
        className="game-map-wholesaler"
        alt="wholesaler"
      />
            <RoleHoarding
        textStyle={{
          position: "absolute",
          left: "18px",
          top: "14px",
          color: "white",
          fontWeight: 700,
          fontSize: "0.8rem",
        }}
        hoardingProps={{ bottom: "400px", right: "200px", position: "absolute", zIndex: 0 }}
        role="Wholesaler"
      />
    </div>
  )
}

export default Wholesaler