import {
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import styled from "styled-components/native";
import { useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Update from "expo-updates";

export default function NewToDoModal() {
  const [index, setIndex] = useState(0);
  const [activity, setActivity] = useState({});

  return (
    <View>
      {index === 0 ? (
        <First setIndex={setIndex} setActivity={setActivity} />
      ) : (
        <Second activity={activity} />
      )}
    </View>
  );
}

function First(props: { setIndex: any; setActivity: any }) {
  const [inputValue, setInputValue] = useState("");
  const [searched, setSearch] = useState([]);

  //디바운스 로직 적용, 유저가 타이핑을 1초간 멈출 때마다 API 요청을 실행합니다.
  const debouncedSave = useCallback(
    debounce(async (nextValue) => {
      if (nextValue === "") {
        return;
      }
      const res = await axios.get(
        `${process.env.EXPO_PUBLIC_API_URL}/api/record/find/${nextValue}`
      );
      setSearch(res.data.data);
      console.log(res.data.data);
    }, 1000),
    []
  );

  const handleChange = (value: string) => {
    setInputValue(value);
    debouncedSave(value);
  };

  return (
    <View>
      <NewToDoTitle>새로운 작업을 추가해요!</NewToDoTitle>
      <ToDoInput
        placeholder="작업을 입력하세요"
        value={inputValue}
        onChangeText={handleChange}
      />
      <ScrollView
        style={{
          marginTop: 20,
        }}
      >
        {searched.map(
          (
            activity: {
              id: number;
              title: string;
              amount: number;
              unit: string;
            },
            i
          ) => {
            return (
              <Searched
                key={i}
                title={`${activity.title}`}
                id={activity.id}
                onClick={() => {
                  props.setActivity(activity);
                  props.setIndex(2);
                }}
              />
            );
          }
        )}
      </ScrollView>
    </View>
  );
}

function Searched(props: { title: string; id: number; onClick: any }) {
  return (
    <ActivityBackground>
      <ActivityTitle>{props.title}</ActivityTitle>
      <ActivityButton onPress={props.onClick}>
        <Text>추가하기</Text>
      </ActivityButton>
    </ActivityBackground>
  );
}

const NewToDoTitle = styled.Text`
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  margin-top: 40px;
  font-size: 25px;
`;

const ToDoInput = styled.TextInput`
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px 20px;
  width: 90%;
  border-radius: 5px;
  margin: 10px auto;
`;

const ActivityBackground = styled.View`
  margin: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
`;

const ActivityTitle = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const ActivityButton = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px 20px;
  border-radius: 5px;
`;

function Second(props: { activity: any }) {
  const [amount, setAmount] = useState(0);

  async function HandleSubmit() {
    const apiKey = await AsyncStorage.getItem("api-key");

    console.log({
      apiKey: apiKey,
      title: props.activity.title,
      carbonId: props.activity.id,
      amount: amount,
    });
    let res;
    try {
      res = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/record/new`,
        {
          apiKey: apiKey,
          title: `${props.activity.title} ${amount}${props.activity.unit}`,
          carbonId: props.activity.id,
          amount,
        }
      );
    } catch (error) {
      console.log(error);
    }
    console.log(res);
    Update.reloadAsync();
  }

  return (
    <View>
      <SecondTitle>{props.activity.title}을(를)</SecondTitle>
      <AmountInput
        keyboardType="numeric"
        placeholder="숫자를 입력하세요"
        onChangeText={(text) => setAmount(Number(text))}
        value={amount}
      />
      <SecondSubTitle>{props.activity.unit} 만큼 했어요.</SecondSubTitle>
      <AddToDoButton onPress={HandleSubmit}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          추가하기
        </Text>
      </AddToDoButton>
    </View>
  );
}

const SecondTitle = styled.Text`
  text-align: center;
  margin-top: 80px;
  margin-bottom: 0;
  font-size: 30px;
  font-weight: bold;
  width: fit-content;
  white-space: nowrap;
  height: fit-content;
`;

const SecondSubTitle = styled.Text`
  text-align: center;
  margin-bottom: 0;
  font-size: 30px;
  margin-top: 10px;
  font-weight: bold;
`;

const AmountInput = styled.TextInput`
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px 20px;
  width: 90%;
  border-radius: 5px;
  margin: 10px auto;
`;

const AddToDoButton = styled.TouchableOpacity`
  width: 90%;
  background-color: ${(props) => props.theme.colors.subBackground};
  border-radius: 50px;
  margin: 20px auto;
  margin-bottom: 30px;
  margin-top: 30px;
  box-shadow: 5px 5px 10px #0000001e;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;
