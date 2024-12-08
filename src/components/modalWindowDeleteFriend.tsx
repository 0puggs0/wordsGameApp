import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
interface Props {
  modalVisible: boolean;
  currentUserId: string;
  onDelete: (id: string) => void;
  setModalVisible: (boolean: boolean) => void;
}

export default function ModalWindowDeleteFriend(props: Props) {
  return (
    <Modal visible={props.modalVisible} transparent={true} animationType="fade">
      <Pressable
        onPress={() => props.setModalVisible(!props.modalVisible)}
        style={styles.container}
      >
        <View style={{ width: "100%", gap: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.onDelete(props.currentUserId);
            }}
          >
            <Text
              style={[
                styles.textButton,
                {
                  color: "red",
                  padding: 15,
                  fontFamily: "Nunito-Medium",
                },
              ]}
            >
              Убрать из друзей
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.setModalVisible(false)}
          >
            <Text
              style={[
                styles.textButton,
                {
                  color: "#1D1F25",
                  padding: 15,
                  fontFamily: "Nunito-Regular",
                },
              ]}
            >
              Отмена
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    paddingVertical: 80,
  },
  button: { width: "100%", paddingHorizontal: 34 },
  textButton: {
    textAlign: "center",
    backgroundColor: "#CED5DB",
    borderRadius: 15,
    overflow: "hidden",
    fontSize: 20,
  },
});
