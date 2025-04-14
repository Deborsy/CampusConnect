import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        sidebarExpanded: false,
        isAddTeamModalOpen: false,
        activeNavItem: "Courses", //initial active item
    },
    reducers: {
        toggleSidebar: (state)=>{
            state.sidebarExpanded = !state.sidebarExpanded;
        },
        setActiveNavItem: (state, action)=>{
            state.activeNavItem = action.payload;
        },
        openAddTeamModal: (state) => {
            state.isAddTeamModalOpen = true;
        },
        closeAddTeamModal: (state) => {
            state.isAddTeamModalOpen = false;
        },
    },
});

export const { toggleSidebar, setActiveNavItem, openAddTeamModal, closeAddTeamModal} = uiSlice.actions;
export default uiSlice.reducer;