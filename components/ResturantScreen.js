import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card } from '@rneui/themed';
import { Ionicons } from 'react-native-vector-icons'
import { AntDesign } from 'react-native-vector-icons'



const ResturantScreen = ({ navigation, route }) => {
  const [menu, setMenu] = useState([])
  const { item } = route.params
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  useEffect(() =>
    navigation.setOptions(
      {
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: screenWidth * 0.08,
              height: screenWidth * 0.08,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="arrow-back-circle" size={35} color={'blue'} />
          </TouchableOpacity>
        ),
      },
      []
    )
  );
  return (
    <SafeAreaView style={styles.container}>
      <Card width={"90%"}>
        <Card.Title style={{ fontWeight: 'bold', color: 'red', fontSize: 23 }}>{item.name}</Card.Title>
        <Card.Divider />
        {item.menu.map((item, index) => (
          <View key={index}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text>{item.name}</Text>
              <Text>{item.price} QR</Text>
            </View>
          </View>
        ))}


      </Card>

    </SafeAreaView>
  )
}

export default ResturantScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  out: {
    fontSize: 18,
    shadowColor: 'blue',
    shadowRadius: 6,
    shadowOpacity: 10,

  }
})