import ParallaxScrollView from "@/components/ParallaxScrollView";
import { dark, light } from "@/theme/theme";
import MainHeader from "@/components/main/main-header";
import { View } from "react-native";
import ToDo from "@/components/to-do/to-do";
import BannerContainer from "@/components/to-do/banner";
import AddToDoButton from "@/components/to-do/add-todo";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FeedbackButton from "@/components/to-do/feedback-button";

export default function HomeScreen() {
  const [total, setTotal] = useState(0);
  const [activities, setActivity] = useState([]);

  //서버에서 오늘 한 활동들을 요청합니다.
  useEffect(() => {
    const prepare = async () => {
      const apiKey = await AsyncStorage.getItem("api-key");
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/record/get/${apiKey}`
      );
      const activitiesData = res.data.data;
      setActivity(activitiesData);

      const totalCarbon = activitiesData.reduce(
        (
          acc: number,
          activity: { amount: number; carbonUsage: { amount: number } }
        ) => {
          return acc + activity.amount * activity.carbonUsage.amount;
        },
        0
      );

      setTotal(totalCarbon);
    };

    prepare();
  }, []);

  //light.colors.subBackground
  //"#d24532"

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: light.colors.subBackground,
        dark: light.colors.subBackground,
      }}
      headerImage={<MainHeader gram={total} />}
    >
      <BannerContainer />
      <View
        style={{
          minHeight: 500,
        }}
      >
        <AddToDoButton />
        {activities.map(
          (
            activity: {
              id: number;
              title: string;
              amount: number;
              carbonUsageId: number;
              createdAt: string;
              carbonUsage: {
                id: number;
                title: string;
                amount: number;
                unit: string;
              };
            },
            i: number
          ) => {
            return (
              <ToDo
                title={activity.title}
                amount={activity.amount.toString()}
                unit={activity.carbonUsage.unit}
                gram={(
                  activity.carbonUsage.amount * activity.amount
                ).toString()}
                key={i}
              />
            );
          }
        )}
        {activities.length !== 0 ? <FeedbackButton /> : null}
      </View>
    </ParallaxScrollView>
  );
}
