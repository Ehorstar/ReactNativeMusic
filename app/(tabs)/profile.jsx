import { StyleSheet } from "react-native";
import AuthProfile from "../(auth)/AuthProfile";
import { useAuth } from "../../contexts/Auth/AuthContext";
import NotAuthProfile from "../(auth)/NotAuthProfile";

const ProfileScreen = () => {
  const { user } = useAuth();

  if (user) {
    return <AuthProfile />;
  }
  if (!user) {
    return <NotAuthProfile />;
  }
};

const styles = StyleSheet.create({});

export default ProfileScreen;
