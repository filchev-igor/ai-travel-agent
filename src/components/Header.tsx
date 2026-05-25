import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import AppLogo from "./AppLogo";

type Props = {
  showBack?: boolean;
  onBackPress?: () => void;
};

const Header = ({ showBack = false, onBackPress }: Props) => {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBack ? (
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <ChevronLeft size={24} color="#F2F2ED" />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButtonPlaceholder} />
        )}
      </View>

      <AppLogo width={132} height={60} />

      {/* Avatar removed - just an empty spacer */}
      <View style={styles.rightPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0C1445",
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
  },
  leftSection: {
    width: 50,
    alignItems: "flex-start",
  },
  backButton: {
    padding: 8,
  },
  backButtonPlaceholder: {
    width: 40,
  },
  rightPlaceholder: {
    width: 70,
  },
});

export default Header;
