import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar";
import { KanbanPage } from "../kanban";
import { NotesPage } from "../notes";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {

    const { status } = useAuthStore();

    return (
        <>
            <Routes>
                {
                    (status !== "authenticated")
                        ? (
                            <>
                                <Route path="/auth/login" element={ <LoginPage /> } />

                                <Route path="/*" element={ <Navigate to="/auth/login" /> } />
                            </>
                        ) : (
                            <>
                                <Route path="/calendar" element={ <CalendarPage /> } />
                                <Route path="/notes" element={ <NotesPage /> } />
                                <Route path="/kanban" element={ <KanbanPage /> } />

                                <Route path="/*" element={ <Navigate to="/calendar" /> } />
                            </>
                        )
                }
            </Routes>
        </>
    )
}
