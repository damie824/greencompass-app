import { router } from "expo-router";
import styled from "styled-components/native";

export default function FeedbackButton() {
  return (
    <Button
      onPress={() => {
        router.push("get-feedback");
      }}
    >
      <ButtonText>오늘 하루 피드백 받기</ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 20px;
  border: 2px solid ${(props) => props.theme.colors.subBackground};
  border-radius: 50px;
  margin: 0 auto;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.subBackground};
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;
