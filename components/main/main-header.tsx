import { SafeAreaView } from "react-native";
import styled from "styled-components/native";

export default function MainHeader(props: { gram: number }) {
  return (
    <SafeAreaView>
      <Header>
        <HeaderSubTitle>오늘의 탄소 배출량</HeaderSubTitle>
        <HeaderTitle>
          <HeaderTitleContainer>
            <HeaderTitle>
              {props.gram >= 1000
                ? `${(props.gram / 1000).toFixed(1)}kg`
                : `${props.gram}g`}
            </HeaderTitle>
          </HeaderTitleContainer>
        </HeaderTitle>
      </Header>
    </SafeAreaView>
  );
}

const Header = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderTitleContainer = styled.View`
  justify-content: center;
  align-items: end;
  flex-direction: row;
`;

const HeaderSubTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.subText};
`;

const HeaderTitle = styled.Text`
  font-size: 80px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.subText};
`;
