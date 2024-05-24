import { View, type ViewProps } from "react-native";
import styled from "styled-components/native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView = styled.View`
  background-color: ${(props) => props.theme.colors.background};
`;
