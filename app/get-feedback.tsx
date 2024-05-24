import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import styled from "styled-components/native";
import * as Updates from "expo-updates";
import { ActivityIndicator } from "react-native";
import { light } from "@/theme/theme";

export default function GetFeedback() {
  const [activities, setActivity] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prepare = async () => {
      setIsLoading(true);
      const apiKey = await AsyncStorage.getItem("api-key");
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/record/get/${apiKey}`
      );
      const activitiesData = res.data.data;

      if (res.status !== 200) {
        Alert.alert("Error", res.data.message, [
          { text: "확인", onPress: () => Updates.reloadAsync() },
        ]);
        setIsLoading(false);
        return;
      }

      const totalData = activitiesData
        .map((activity: { title: string }) => activity.title)
        .join(", ");
      console.log(totalData);
      setActivity(totalData);
      const aiRes = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/ai/feedback`,
        {
          contents: totalData,
        }
      );

      if (aiRes.status === 200) {
        setFeedback(aiRes.data.data.contents);
        console.log(aiRes.data.data);
      }
      setIsLoading(false);
    };

    prepare();
  }, []);

  return (
    <FeedbackContainer>
      {isLoading ? (
        <ActivityIndicator size="large" color={light.colors.subBackground} />
      ) : (
        <FeedbackText>{feedback}</FeedbackText>
      )}
    </FeedbackContainer>
  );
}

const FeedbackContainer = styled.View`
  width: 90%;
  padding: 20px;
  margin: 10px auto;
  margin-top: 40px;
  background-color: #f2f2f2;
  border-radius: 10px;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const FeedbackText = styled.Text`
  color: #333;
  font-size: 16px;
  text-align: center;
`;
