import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, SafeAreaView, ScrollView } from "react-native";
import * as Update from "expo-updates";
import styled from "styled-components/native";
import * as Clipboard from "expo-clipboard";
import * as WebBrowser from "expo-web-browser";

export default function Settings() {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
      <SettingTitle>설정 </SettingTitle>
      <ScrollView>
        <SettingContainer>
          <SettingSubtitle>개발자 메뉴</SettingSubtitle>

          <SettingButton
            onPress={async () => {
              const newApiKey = await new Promise((resolve) => {
                Alert.prompt(
                  "새 API 키 입력",
                  "새 API 키를 입력하세요:",
                  [
                    {
                      text: "취소",
                      onPress: () => resolve(null),
                      style: "cancel",
                    },
                    {
                      text: "확인",
                      onPress: (apiKey) => resolve(apiKey),
                    },
                  ],
                  "plain-text"
                );
              });
              if (newApiKey) {
                Alert.alert(
                  "API 키 저장",
                  "API 키가 성공적으로 저장되었습니다."
                );
              }
            }}
          >
            <SettingButtonText>데이터 불러오기</SettingButtonText>
          </SettingButton>
          <SettingButton
            onPress={async () => {
              const apiKey = await AsyncStorage.getItem("api-key");
              await Clipboard.setStringAsync(apiKey || "");
              alert("API 키가 복사되었습니다.");
            }}
          >
            <SettingButtonText>내 API 키 복사</SettingButtonText>
          </SettingButton>
          <SettingButton
            onPress={async () => {
              await AsyncStorage.clear();
              Update.reloadAsync();
            }}
          >
            <SettingButtonText>초기화</SettingButtonText>
          </SettingButton>
        </SettingContainer>
        <SettingContainer>
          <SettingSubtitle>앱 정보</SettingSubtitle>
          <SettingButton
            onPress={async () => {
              Alert.alert(
                "Application Info",
                "Current Version is : 1.0-alpha (Nightly)"
              );
            }}
          >
            <SettingButtonText>버전 확인</SettingButtonText>
          </SettingButton>
          <SettingButton
            onPress={async () => {
              WebBrowser.openBrowserAsync("https://github.com/damie824");
            }}
          >
            <SettingButtonText>개발자 정보 확인</SettingButtonText>
          </SettingButton>
        </SettingContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const SettingTitle = styled.Text`
  font-size: 40px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-left: 15px;
`;

const SettingContainer = styled.View`
  border-radius: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const SettingSubtitle = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SettingButton = styled.TouchableOpacity`
  padding: 10px 10px;
`;

const SettingButtonText = styled.Text`
  font-size: 20px;
  margin-left: 5px;
`;
