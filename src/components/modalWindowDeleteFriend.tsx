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
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",

          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingVertical: 80,
        }}
      >
        <View style={{ width: "100%", gap: 10 }}>
          <TouchableOpacity
            style={{ width: "100%", paddingHorizontal: 34 }}
            onPress={() => {
              props.onDelete(props.currentUserId);
            }}
          >
            <Text
              style={{
                textAlign: "center",
                padding: 20,
                backgroundColor: "#CED5DB",
                borderRadius: 15,
                overflow: "hidden",
                fontFamily: "Nunito-Medium",
                fontSize: 20,
                color: "red",
              }}
            >
              Убрать из друзей
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "100%", paddingHorizontal: 34 }}
            onPress={() => props.setModalVisible}
          >
            <Text
              style={{
                padding: 15,
                backgroundColor: "#CED5DB",
                borderRadius: 15,
                overflow: "hidden",
                fontFamily: "Nunito-Regular",
                fontSize: 20,
                color: "#1D1F25",
                textAlign: "center",
              }}
            >
              Отмена
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({});
