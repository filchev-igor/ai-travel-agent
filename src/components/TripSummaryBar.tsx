import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Users, Edit2 } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import ConfirmModal from "./ConfirmModal";

type Props = {
  start: string;
  end: string;
  startDate: string;
  endDate: string;
  group: string;
  budget: string;
  showEdit?: boolean;
  onEdit?: () => void;
  tripData?: any; // Full trip data for editing
};

const formatShortDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};

const TripSummaryBar = ({
  start,
  end,
  startDate,
  endDate,
  group,
  budget,
  showEdit = false,
  onEdit,
  tripData,
}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleEdit = () => {
    if (onEdit) {
      onEdit();
    } else if (tripData) {
      // Navigate to Home with pre-filled data
      setShowConfirmModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmReset = () => {
    setShowConfirmModal(false);
    navigation.navigate("Home", { initialData: tripData });
  };

  const handleCancelReset = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <View style={styles.tripBar}>
        <View>
          <Text style={styles.tripRoute}>
            {start} → {end}
          </Text>
          <Text style={styles.tripDates}>
            {formatShortDate(startDate)} – {formatShortDate(endDate)}
          </Text>
        </View>
        <View style={styles.tripDetails}>
          <View style={styles.tripDetailItem}>
            <Users size={12} color="#0C1445" strokeWidth={2} />
            <Text style={styles.tripDetailText}>{group}</Text>
          </View>
          <View style={styles.tripDetailItem}>
            <Text style={styles.tripDetailText}>{budget} €</Text>
          </View>
          {showEdit && (
            <TouchableOpacity onPress={handleEdit}>
              <Edit2 size={14} color="#0C1445" strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ConfirmModal
        visible={showConfirmModal}
        title="Change Trip Details"
        message="This will take you back to the home screen with your current trip details pre-filled. You can modify them and search again. Are you sure?"
        onConfirm={handleConfirmReset}
        onCancel={handleCancelReset}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tripBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F2ED",
    borderWidth: 1,
    borderColor: "#0C1445",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
  },
  tripRoute: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
    marginBottom: 2,
  },
  tripDates: {
    fontFamily: "Inter",
    fontWeight: "100",
    fontSize: 10,
    lineHeight: 12,
    color: "#0C1445",
  },
  tripDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  tripDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tripDetailText: {
    fontFamily: "Inter",
    fontWeight: "200",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
  },
});

export default TripSummaryBar;
