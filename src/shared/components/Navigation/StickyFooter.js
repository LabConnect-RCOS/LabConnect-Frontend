import { Link } from "react-router-dom";
import logo from "../../../images/LabConnect_Logo.webp"; 

const StickyFooter = () => {
    return (
        <section className="stickyfooter-general">
            <p className="stickyfooter-header">
                Made by <Link to="https://new.rcos.io" className="no-underline text-red-600 hover:text-red-800">RCOS</Link>
            </p>
            <div className="stickyfooter-info">
                <div className="pb-3">
                    <img src={logo} alt="LabConnect" width="160" height="160 / (319/289)"></img>
                </div>

                <div className="w-40 text-base">
                    <p>
                        <b>Contact Us</b>
                        <p className="text-base">
                            <Link to="https://discord.gg/tsaxCKjYHT" className="hover-link hover:text-neutral-950">Discord</Link><br/>
                            <Link to="https://github.com/LabConnect-RCOS" className="hover-link hover:text-neutral-950">GitHub</Link><br/>
                        </p>
                    </p>
                </div>
                <div className="w-40 text-base">
                    <b>Student Pages</b>
                    <p>
                        <Link to="/jobs" className="hover-link hover:text-neutral-950">Jobs</Link><br/>
                        <Link to="/staff" className="hover-link hover:text-neutral-950">Staff</Link><br/>
                        <Link to="/signIn" className="hover-link hover:text-neutral-950">Sign In</Link><br/>
                    </p>
                </div>
                <div className="w-40 text-base">
                    <b>Staff Pages</b>
                    <p>
                        <Link to="/profile" className="hover-link hover:text-neutral-950">Profile</Link><br/>
                        <Link to="/createPost" className="hover-link hover:text-neutral-950">Create</Link><br/>
                        <Link to="/jobs" className="hover-link hover:text-neutral-950">Jobs</Link><br/>
                        <Link to="/signIn" className="hover-link hover:text-neutral-950">Sign In</Link><br/>
                    </p>
                </div>
            </div>
        </section>
    )
};

export default StickyFooter;
