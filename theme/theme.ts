import { DefaultTheme } from "styled-components";

//라이트 테마에 사용될 색들을 설정합니다.
export const light: DefaultTheme = {
  colors: {
    primary: "#97f09d",
    secondary: "#ff4081",
    background: "#FFFFFF",
    subBackground: "#2d3e2e",
    text: "#444444",
    subText: "#FFFFFF",
  },
};

//다크 테마에 사용될 색들을 설정합니다.
export const dark: DefaultTheme = {
  colors: {
    primary: "#97f09d",
    secondary: "#ff4081",
    background: "#111111",
    subBackground: "#3a5640",
    text: "#FFFFFF",
    subText: "#FFFFFF",
  },
};
