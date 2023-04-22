import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

export default function ConfirmModal({
  isModalVisible,
  handleDeleteBookmark,
  onClose,
}) {
  return (
    <Modal animationType="fade" transparent visible={isModalVisible}>
      <TouchableOpacity
        style={styles.modalCenteredView}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>책갈피를 삭제하시겠습니까?</Text>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleDeleteBookmark}
            >
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.modalButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  handleDeleteBookmark: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
