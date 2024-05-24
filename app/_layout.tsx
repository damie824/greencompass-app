import { dark, light } from "@/theme/theme";
import { Stack } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "styled-components";
import * as Update from "expo-updates";
import axios from "axios";

export default function RootLayout() {
  // 다크모드는 색이 완전히 구현되지 않았으므로 임시로 막아두었습니다.
  // const isDark = useColorScheme() === "dark";
  useEffect(() => {
    const prepare = async () => {
      const apiKey = await AsyncStorage.getItem("api-key");
      console.log(apiKey);
      if (!apiKey) {
        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/api/key/new`
        );
        const newKey = res.data.data;
        await AsyncStorage.setItem("api-key", newKey);
        Update.reloadAsync();
      }
    };

    prepare().catch((error: any) => {
      console.warn(error.message);
    });
  }, []);

  return (
    <ThemeProvider theme={light}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="new-todo"
          options={{
            title: "새로운 작업 추가하기",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="get-feedback"
          options={{
            title: "오늘 하루 피드백 받기",
            presentation: "modal",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
