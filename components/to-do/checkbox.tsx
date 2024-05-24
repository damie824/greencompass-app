import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default function ToDoCheckbox(props: { value: boolean }) {
  return (
    <TouchableOpacity>
      <Check
        style={{
          backgroundColor: "#749f67",
        }}
      ></Check>
    </TouchableOpacity>
  );
}

const Check = styled.View`
  border-radius: 100%;
  width: 20px;
  height: 20px;
  margin: auto 5px;
`;
