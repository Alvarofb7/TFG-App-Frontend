import { SideBar } from "../components/SideBar";

export const NotesLayout = ({ children }) => {
    
    return (
        <div className="container-note-layout">
            <div className="left">
                <SideBar />
            </div>
            <div className="right">
                { children }
            </div>
        </div>
    )
}