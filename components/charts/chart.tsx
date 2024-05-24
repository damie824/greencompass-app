import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import styled from "styled-components/native";

export default function ChartsMain() {
  const data = [
    { value: 1563 },
    { value: 1032 },
    { value: 847 },
    { value: 1942 },
    { value: 1032 },
    { value: 1942 },
    { value: 2112 },
  ];
  return (
    <>
      <ChartContainer>
        <LineChart
          areaChart
          data={data}
          startFillColor="rgb(85, 233, 146)"
          endFillColor1="#ffffff"
          startOpacity={0.8}
          endOpacity={0}
          hideDataPoints
          hideYAxisText
          hideRules
          hideOrigin
          hideAxesAndRules
        />
      </ChartContainer>
      <ChartTitle>지난 1주간의 탄소 사용률 변화를 알려드릴게요!</ChartTitle>
    </>
  );
}

const ChartTitle = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-weight: bold;
  font-size: 15px;
  text-align: center;
`;

const ChartContainer = styled.View`
  width: fit-content;
  margin: 40px auto;
  margin-bottom: 0px;
  align-items: center;
  justify-content: center;
  margin-right: -5px;
  padding: 10px;
`;
