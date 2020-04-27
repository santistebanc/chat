import React, { useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import Bugout from "bugout";
import { GiftedChat } from "react-native-gifted-chat";

var b = Bugout("lalaland");

const App = () => {
  const [messages, setMessages] = useState([]);

  const onReceive = (newMsg) => {
    setMessages((messages) => [...messages, ...newMsg]);
  };

  useEffect(() => {
    b.on("seen", function (address) {
      console.log(address + " [ seen ]");
    });

    b.on("message", function (address, newMsg) {
      onReceive(newMsg);
    });
  }, []);

  const onSend = (newMsg) => {
    b.send(newMsg);
  };

  const user = { _id: b.address(), name: b.address() };
  const inverted = false;
  const { width, height } = Dimensions.get("window");
  return (
    <View style={{ width, height }}>
      <GiftedChat {...{ messages, onSend, user, inverted }} />
    </View>
  );
};

export default App;
