
import RoleHoarding from '../RoleHoarding/RoleHoarding'
import './Roles.css'
import retailer from "../../assets/Game/retailer.png"
const Retailer = () => {
  return (
    <div>
        <img
        src={retailer}
        className="game-map-retailer"
        alt="retailer"
      />
            <RoleHoarding
        textStyle={{
          position: "absolute",
          color: "white",
          top: '10px',
          left: '20px',
          fontWeight: 700,
          fontSize: "1rem",
        }}
        hoardingProps={{ bottom: "450px", left: "100px", position: "absolute",  }}
        role="Retailer"
      />
    </div>
  )
}

export default Retailer