import beazerhomelogo from "../../assets/beazerhomelogo.png"
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SplitButton from "./Dropdown";
import { useSelector } from "react-redux";

const Navbar = () => {
    const user = useSelector((state) => state?.user?.username)
    return (
        <>
            <nav className="navbar bg-body-tertiary border border-black fixed-top">
                <div className="container-fluid">
                    <div>
                        {/* Beazer Home logo */}
                        <img src={beazerhomelogo} alt="beazerhomelogo" height={35} />
                    </div>
                    <h3 className="pt-1" style={{ color: "#A6192E", fontFamily: "Arial" }}><b>LAR</b></h3>
                    <div className="d-flex align-items-center">
                        {/* Render SplitButton component */}
                        <SplitButton />
                        {/* Conditionally render user data or login link */}
                        {user ? <><Link className="nav-link" to="#">
                            <SettingsOutlinedIcon fontSize="medium" className="me-2" />
                        </Link>
                            <p className="mb-0"><b>{user}</b></p> <PersonOutlineOutlinedIcon fontSize="medium" className="ms-2" /></>
                            : <Link className="nav-link" to="/login">
                            </Link>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
