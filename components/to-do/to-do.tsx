import { View, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { useState } from "react";
import ToDoCheckbox from "./checkbox";

export default function ToDo(props: {
  title: string;
  amount: string;
  gram: string;
  unit: string;
}) {
  return (
    <TouchableOpacity
      style={{
        marginBottom: 20,
      }}
    >
      <ToDoContainer>
        <ToDoCheckbox value={false} />
        <View
          style={{
            flex: 1,
          }}
        >
          <ToDoBackground>
            <ToDoTitle>{props.title}</ToDoTitle>
            <ToDoAmount>{props.gram}g</ToDoAmount>
          </ToDoBackground>
        </View>
      </ToDoContainer>
    </TouchableOpacity>
  );
}

const ToDoContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const ToDoTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-weight: bold;
  font-size: 20px;
  word-break: none;
  width: 100%;
`;

const ToDoAmount = styled.Text`
  color: ${(props) => props.theme.colors.text};
`;

const ToDoBackground = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  padding: 30px;
  border-radius: 45px;
  margin-left: 10px;
  box-shadow: 1px 1px 5px #00000024;
`;
