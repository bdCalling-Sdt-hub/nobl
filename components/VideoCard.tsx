import { IconPlayButton, IconPlayButtonSmall } from "@/icons/Icon";
import { Image, Text, View } from "react-native";

import IButton from "@/lib/buttons/IButton";
import IwtButton from "@/lib/buttons/IwtButton";
import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";

const VideoCard = ({ tutorial }: { tutorial: any }) => {
  const router = useRouter();
  return (
    <View style={tw`bg-deepBlue50 shadow-md rounded-md `}>
      <View>
        <Image
          source={{
            uri: tutorial?.image,
          }}
          resizeMode="cover"
          style={tw`w-full h-40 rounded-md`}
        />
        <View
          style={tw`absolute bottom-0 h-full justify-center items-center left-0 right-0 bg-black/10 p-2`}
        >
          <IButton
            onPress={() => router.push(`/details/video/${tutorial?.id}`)}
            svg={IconPlayButton}
            containerStyle={tw`bg-transparent rounded-full p-2`}
          />
        </View>
      </View>
      <View
        style={tw`flex-row justify-between items-center mt-3 px-4 pb-4 gap-2`}
      >
        <View style={tw`gap-1.5 flex-1`}>
          <Text style={tw`font-PoppinsSemiBold text-base flex-1`}>
            {tutorial?.title}
          </Text>
          <Text
            style={tw`bg-primary text-white text-center text-xs py-1 self-start px-2 rounded-md font-PoppinsMedium `}
          >
            {tutorial?.category}
          </Text>
        </View>
        <IwtButton
          svg={IconPlayButtonSmall}
          title={tutorial?.duration}
          onPress={() => router.push(`/details/video/${tutorial?.id}`)}
          containerStyle={tw`px-4 rounded-md h-8`}
          titleStyle={tw`text-xs`}
        />
      </View>
    </View>
  );
};

export default VideoCard;
