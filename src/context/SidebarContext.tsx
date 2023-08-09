import { ReactNode, createContext, useState, useContext } from "react";

interface SidebarContextObject {
    visibility: boolean,
    toggleVisibility: Function
}

const SidebarContext = createContext<SidebarContextObject>({
    visibility: false,
    toggleVisibility: () => null
});

interface Props {
    children?: ReactNode
}

export function useSidebar() {
    return useContext(SidebarContext);
}

export function SidebarContextProvider({ children }: Props) {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    function toggleVisibility() {
        setSidebarVisible(prevVisibility => !prevVisibility)
    }

    return (
        <SidebarContext.Provider value={{ visibility: sidebarVisible, toggleVisibility }}>
            { children }
        </SidebarContext.Provider>
    )
}