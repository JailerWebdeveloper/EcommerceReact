import { Link } from 'react-router-dom';
import '../../css/Parrotcss.css'

const ParrotButton = () => {
  return (
      <Link to="/Search" className="item button-parrot parrotbutton mt-10 hover:bg-white transition-colors hover:text-black bg-[#2c3e50]">
        <button>
          Tienda!
          <div className="parrot"></div>
          <div className="parrot"></div>
          <div className="parrot"></div>
          <div className="parrot"></div>
          <div className="parrot"></div>
          <div className="parrot"></div>
        </button>
      </Link>
  );
};

export default ParrotButton;
