import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Leave</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#F2F2ED",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    maxWidth: 320,
    borderWidth: 1,
    borderColor: "#0C1445",
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 22,
    color: "#0C1445",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "#4a5568",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#e2e8f0",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 14,
    color: "#4a5568",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#0C1445",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 14,
    color: "#F2F2ED",
  },
});

export default ConfirmModal;
