import { Text, TouchableOpacity, View } from "react-native";
import PagerView from "react-native-pager-view";
import styled from "styled-components/native";

export default function BannerContainer() {
  return (
    <PagerView initialPage={0}>
      <View key={0}>
        <Banner key={0} />
      </View>
    </PagerView>
  );
}

function Banner() {
  return (
    <TouchableOpacity>
      <BannerBackground>
        <Text>하이</Text>
      </BannerBackground>
    </TouchableOpacity>
  );
}

const BannerBackground = styled.View``;
