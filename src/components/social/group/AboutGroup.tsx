import { IoHome } from "react-icons/io5";
import { IoIosPin } from "react-icons/io";
import { IoPeopleOutline } from "react-icons/io5";
import { FaBuildingUser } from "react-icons/fa6";
import { Group } from "@/models/Group";
type AboutGroupProps = {
    group?: Group
};
const AboutGroup: React.FC<AboutGroupProps> = ({group}) => {
    return (
        <div className="p-4 mt-4 shadow rounded-lg bg-white w-full dark:bg-gray-800">
            <div className="text-xl font-bold">About</div>
            <div className="mt-4 flex items-center">
                <IoPeopleOutline />
                <span className="ml-2">abc</span>
            </div>
            <div className="mt-4 flex items-center">
                <FaBuildingUser />
                <span className="ml-2">TLC Modular</span>
            </div>
            <div className="mt-4 flex items-center">
                <IoHome />
                <span className="ml-2">
                Lives in <b>abc</b>{" "}
                </span>
            </div>
            <div className="mt-4 flex items-center">
                <IoIosPin />
                <span className="ml-2">
                From <b>abc</b>{" "}
                </span>
            </div>
        </div>
    );
};
export default AboutGroup;