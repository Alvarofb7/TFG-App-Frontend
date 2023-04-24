import { useEffect, useState } from "react";
import { useNoteStore } from "../../hooks";
import { SideBar } from "../components/SideBar";

export const NotesLayout = ({ children }) => {

    const { activeNote } = useNoteStore();

    const [display, setDisplay] = useState("");
    const [iconButton, setIconButton] = useState("fa-arrow-left");

    useEffect(() => {
        if (!activeNote?.id) {
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
    }, [activeNote]);


    const collapseList = () => {
        if (display === "") {
            setDisplay("none");
            setIconButton("fa-arrow-right");
        } else {
            setDisplay("");
            setIconButton("fa-arrow-left");
        }
    }

    return (
        <div className="container-note-layout">
            <div className={ (display === "none") ? "left" : "left-open" }>
                <SideBar show={ display } />
                <button className="btn btn-outline-primary btn-collapse-sidebar-note" role="button" onClick={ collapseList }>
                    <i className={ `fa ${iconButton}` } data-bs-toggle="offcanvas" data-bs-target="#offcanvas"></i>
                </button>
            </div>
            <div className={ (display === "none") ? "right-without-list" : "right" }>
                { children }
            </div>
        </div>
    )
}