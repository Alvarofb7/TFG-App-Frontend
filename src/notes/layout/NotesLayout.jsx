import { Navbar } from "../../ui/components/Navbar";
import { SideBar } from "../components/SideBar";

export const NotesLayout = ({ children }) => {
    return (
        <>
            <Navbar />

            <div className="container note-layout">
                <div className="row">
                    <div className="col-4">
                        <SideBar />
                    </div>
                    <div className="col-8">
                        { children }
                    </div>
                </div>
            </div>

        </>
    )
}