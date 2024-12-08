import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentColor: '#03C9D7',
  currentMode: 'Light',
  themeSettings: false,
  activeMenu: true,
  isClicked: {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  },
  screenSize: undefined,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.currentMode = action.payload;
      localStorage.setItem('themeMode', action.payload);
    },
    setColor: (state, action) => {
      state.currentColor = action.payload;
      localStorage.setItem('colorMode', action.payload);
    },
    setThemeSettings: (state, action) => {
      state.themeSettings = action.payload;
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
    setIsClicked: (state, action) => {
      state.isClicked = { ...state.isClicked, ...action.payload };
    },
  },
});

export const {
  setMode,
  setColor,
  setThemeSettings,
  setActiveMenu,
  setScreenSize,
  setIsClicked,
} = themeSlice.actions;

export default themeSlice.reducer;
