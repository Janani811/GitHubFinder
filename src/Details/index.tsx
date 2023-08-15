import { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AxiosResponse } from "axios";

import { fetchUser } from "../../api";
import Header from "./Header";
import Main from "./Main";
import { RootStackParamList } from "../../App";
import { colors } from "../../utils/colors";
import { ThemeContext } from "../../contexts/ThemeProvider";

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

export default function DetailsScreen({ route }: Props) {
  const { username } = route.params;

  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const styles = makeStyles(activeColors);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchUser(username)
      .then(({ data }: AxiosResponse) => {
        setUser(data);
      })
      .catch((error: any) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color={theme.subText} />
        </View>
      ) : user ? (
        <View style={{ flex: 1 }}>
          <Header user={user} />

          <Main user={user} />
        </View>
      ) : null}
    </View>
  );
}
const makeStyles = (theme: { bg: string }) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.bg,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
  });
