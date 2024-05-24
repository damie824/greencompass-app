import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export default function AddToDoButton() {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push("/new-todo");
      }}
    >
      <AddToDoBackground>
        <AntDesign
          name="pluscircle"
          size={35}
          style={{
            color: "white",
          }}
        />
      </AddToDoBackground>
    </TouchableOpacity>
  );
}

const AddToDoBackground = styled.View`
  width: 100%;
  height: 80px;
  background-color: ${(props) => props.theme.colors.subBackground};
  border-radius: 50px;
  margin: 20px 0;
  margin-bottom: 30px;
  box-shadow: 5px 5px 10px #0000001e;
  justify-content: center;
  align-items: center;
`;
