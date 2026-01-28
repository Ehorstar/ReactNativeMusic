import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useContext } from "react";
import { FavouritesContext } from "../contexts/Favourites/FavouritesContext";
import { HOST } from "../config/api";
import { useRouter } from "expo-router";
import { usePlayingStore } from "../store/playingStore";

const toAbsolute = (url) => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${HOST}${url}`;
};

const TrackCard = ({ track }) => {
  const { inFavourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const router = useRouter();
  const playTrack = usePlayingStore((s) => s.playTrack);

  const isFav = inFavourites(track.id);
  const fullCoverUrl = toAbsolute(track.coverUrl);
  const fullAudioUrl = toAbsolute(track.audioUrl);

  const currentTrack = usePlayingStore((s) => s.currentTrack);

  const onToggleFav = () => {
    if (isFav) removeFromFavourites(track.id);
    else addToFavourites(track);
  };

  return (
    <Pressable style={styles.card}>
      <Pressable onPress={() => router.push(`/track/${track.id}`)}>
        <Image source={{ uri: fullCoverUrl }} style={styles.cover} />
      </Pressable>

      <View style={styles.right}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Pressable onPress={() => playTrack(track, fullAudioUrl)}>
              <Text
                style={
                  currentTrack?.id === track.id
                    ? styles.titleActive
                    : styles.title
                }
                numberOfLines={1}
              >
                {track.title}
              </Text>
            </Pressable>

            {!!track.artist && (
              <Text style={styles.artist} numberOfLines={1}>
                {track.artist}
              </Text>
            )}
          </View>

          <Pressable onPress={onToggleFav} hitSlop={10} style={styles.heartBtn}>
            <Fontisto
              name={isFav ? "heart" : "heart-alt"}
              size={18}
              color={isFav ? "#1DB954" : "rgba(255,255,255,0.9)"}
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#1A1F1C",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginBottom: 12,
  },

  cover: {
    width: 84,
    height: 84,
    borderRadius: 12,
    backgroundColor: "#0F0F14",
  },

  right: { flex: 1 },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  title: {
    color: "#EDEDED",
    fontSize: 18,
    fontWeight: "800",
  },

  artist: {
    marginTop: 3,
    color: "rgba(237,237,237,0.65)",
    fontSize: 15,
    fontWeight: "600",
  },

  heartBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  titleActive: {
    color: "#1DB954",
    fontSize: 19,
    fontWeight: "800",
  },
});

export default TrackCard;
