import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TripVariant } from "../types";

type Props = {
  variant: TripVariant;
  index: number;
  onPress?: () => void;
  readonly?: boolean;
  customTitle?: string;
};

const TripCard = ({
  variant,
  index,
  onPress,
  readonly = false,
  customTitle,
}: Props) => {
  const formatPrice = (price: number) => `${price} €`;

  const title =
    customTitle || variant.title || `Trip suggestions - variant ${index + 1}`;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={readonly ? undefined : onPress}
      activeOpacity={readonly ? 1 : 0.7}
      disabled={readonly}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.activities}>Activities: {variant.activities}</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Direct flight</Text>
        <Text style={styles.value}>{formatPrice(variant.flight)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transportation</Text>
        <Text style={styles.value}>{formatPrice(variant.transportation)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Hospitality</Text>
        <Text style={styles.value}>
          {formatPrice(variant.hospitality)} in an apartment
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{variant.activity1_name}</Text>
        <Text style={styles.value}>{formatPrice(variant.activity1_cost)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{variant.activity2_name}</Text>
        <Text style={styles.value}>{formatPrice(variant.activity2_cost)}</Text>
      </View>

      <Text style={styles.total}>{formatPrice(variant.total)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F2F2ED",
    borderWidth: 1,
    borderColor: "#0C1445",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19,
    color: "#0C1445",
    marginBottom: 8,
  },
  activities: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
  },
  value: {
    fontFamily: "Inter",
    fontWeight: "200",
    fontSize: 12,
    lineHeight: 15,
    color: "#0C1445",
  },
  total: {
    fontFamily: "Inter",
    fontWeight: "300",
    fontSize: 20,
    lineHeight: 24,
    color: "#0C1445",
    marginTop: 12,
  },
});

export default TripCard;
