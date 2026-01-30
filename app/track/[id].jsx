import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { getTrackById } from "../../services/tracks.services";
import { useQuery } from "@tanstack/react-query";
import { HOST } from "../../config/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { usePlayingStore } from "../../store/playingStore";

const toAbsolute = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${HOST}${url}`;
};

const TrackScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: track, isLoading: loading } = useQuery({
    queryKey: ["track", id],
    queryFn: () => getTrackById(id),
    enabled: !!id,
  });

  const toggle = usePlayingStore((s) => s.toggle);
  const pause = usePlayingStore((s) => s.pause);
  const resume = usePlayingStore((s) => s.resume);

  const currentTrack = usePlayingStore((s) => s.currentTrack);
  const isPlaying = usePlayingStore((s) => s.isPlaying);
  const position = usePlayingStore((s) => s.positionMillis);
  const duration = usePlayingStore((s) => s.durationMillis);
  const seekTo = usePlayingStore((s) => s.seekTo);
  const timeLabel = usePlayingStore((s) => s.timeLabel());

  const fullCoverUrl = toAbsolute(track.coverUrl);
  const fullAudioUrl = toAbsolute(track.audioUrl);

  const isThisTrack = currentTrack?.id === track?.id;
  const progress = duration ? position / duration : 0;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Loading...</Text>
      </View>
    );
  }

  if (!track) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Пісню не знайдено</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={styles.iconBtn}
        >
          <Ionicons name="chevron-down" size={26} color="#EDEDED" />
        </Pressable>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.nowPlaying}>
            {isThisTrack ? "NOW PLAYING" : ""}
          </Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.body}>
        <View style={styles.coverWrap}>
          <Image source={{ uri: fullCoverUrl }} style={styles.cover} />
        </View>

        <View style={styles.metaRow}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.title} numberOfLines={2}>
              {track.title}
            </Text>
            {!!track.artist && (
              <Text style={styles.artist} numberOfLines={1}>
                {track.artist}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.sliderWrap}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={isThisTrack ? progress : 0}
            minimumTrackTintColor="#EDEDED"
            maximumTrackTintColor="rgba(255,255,255,0.25)"
            thumbTintColor="transparent"
            onSlidingComplete={(v) => {
              if (!isThisTrack || !duration) return;
              seekTo(v * duration);
            }}
          />
        </View>
        <View>
          <Text style={styles.sub}>{timeLabel}</Text>
        </View>
        <View style={styles.controls}>
          <Pressable
            style={styles.playBtn}
            onPress={() => {
              if (!fullAudioUrl) return;
              if (!isThisTrack) {
                toggle(track, fullAudioUrl);
                return;
              }
              isPlaying ? pause() : resume();
            }}
          >
            <Ionicons
              name={isThisTrack && isPlaying ? "pause" : "play"}
              size={34}
              color="#0B0B0D"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B0B0D",
  },
  muted: { color: "rgba(237,237,237,0.7)" },

  container: { flex: 1, backgroundColor: "#0B0B0D", paddingTop: 30 },

  topBar: {
    paddingTop: 14,
    paddingHorizontal: 14,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nowPlaying: {
    color: "rgba(237,237,237,0.7)",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },

  body: { flex: 1, paddingHorizontal: 18, paddingTop: 10 },

  coverWrap: {
    alignItems: "center",
    marginTop: 10,
  },
  cover: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 18,
    backgroundColor: "#14141A",
  },

  metaRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  title: { color: "#EDEDED", fontSize: 22, fontWeight: "900" },
  artist: {
    marginTop: 6,
    color: "rgba(237,237,237,0.65)",
    fontSize: 14,
    fontWeight: "700",
  },

  sliderWrap: { marginTop: 18 },
  slider: { width: "100%", height: 12 },

  controls: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
  },

  sub: {
    marginTop: 5,
    color: "rgba(237,237,237,0.7)",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "right",
    marginRight: 13,
  },
});

export default TrackScreen;
