import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { usePlayingStore } from "../store/playingStore";
import { HOST } from "../config/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";

const toAbsolute = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${HOST}${url}`;
};

const PlayingLayout = () => {
  const currentTrack = usePlayingStore((s) => s.currentTrack);
  const isPlaying = usePlayingStore((s) => s.isPlaying);
  const pause = usePlayingStore((s) => s.pause);
  const resume = usePlayingStore((s) => s.resume);

  const router = useRouter();

  const position = usePlayingStore((s) => s.positionMillis);
  const duration = usePlayingStore((s) => s.durationMillis);
  const seekTo = usePlayingStore((s) => s.seekTo);

  if (!currentTrack) return null;

  const progress = duration ? position / duration : 0;
  const fullCoverUrl = toAbsolute(currentTrack?.coverUrl);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable
          style={styles.start}
          onPress={() => router.push(`/track/${currentTrack.id}`)}
        >
          <Image source={{ uri: fullCoverUrl }} style={styles.image} />
        </Pressable>

        <View style={styles.center}>
          <Text numberOfLines={1} style={styles.text}>
            {currentTrack.title ?? "Unknown track"}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {currentTrack.artist ?? "Unknown artist"}
          </Text>
        </View>

        <View style={styles.end}>
          <Pressable onPress={() => (isPlaying ? pause() : resume())}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={28}
              color="#ffffff"
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.sliderWrap}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={progress}
          minimumTrackTintColor="#EDEDED"
          maximumTrackTintColor="rgba(255,255,255,0.25)"
          thumbTintColor="transparent"
          onSlidingComplete={(value) => {
            if (!duration) return;
            seekTo(value * duration);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121714",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 6,
    marginBottom: 74,
    borderRadius: 12,
    paddingTop: 6,
    paddingBottom: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  start: {
    width: 44,
    justifyContent: "center",
  },

  center: {
    flex: 1,
    paddingHorizontal: 6,
    justifyContent: "center",
  },

  end: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  image: {
    width: 42,
    height: 42,
    borderRadius: 6,
  },

  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },

  artist: {
    marginTop: 1,
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },

  sliderWrap: {
    width: "100%",
    marginTop: 6,
    paddingLeft: 12 + 44,
    paddingRight: 12 + 40,
  },

  slider: {
    width: "100%",
    height: 20,
  },
});



export default PlayingLayout;
