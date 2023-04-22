import { useEffect } from "react";
import { useNoteStore } from "../../hooks";
import { SideBar } from "../components/SideBar";

export const NotesLayout = ({ children }) => {

    const {activeNote} = useNoteStore()
    
    useEffect(() => {
        if(!activeNote?.id) {
            document.querySelectorAll("li").forEach((li) => {
                li.classList.remove("active");
            });
        } else {
            document.querySelectorAll("li").forEach((li) => {
                if (li.id !== activeNote.id) {
                    li.classList.remove("active");
                } else {
                    li.classList.add("active");
                }
            });
        }
    }, [activeNote])
    

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