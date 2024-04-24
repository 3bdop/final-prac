import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Button } from '@rneui/themed';
import { doc, setDoc, getDocs, collection, deleteDoc, query, onSnapshot } from "firebase/firestore";
import { db } from './config'
import { AntDesign } from 'react-native-vector-icons'


const AdminScreen = ({ navigation }) => {

    // const [resturants,setResturants] = useState([
    //     {resId:1,resName:'Burj Al Hamam',address:'The Pearl',
    //     menu:[{menuItem:'Lentil Soup',price:30},{menuItem:'Mushroom Soup',price:30},{menuItem:'Shrimp Cocktail',price:40}]},

    //     {resId:2,resName:'Meat Moot',address:'Lusail',
    //     menu:[{menuItem:'Lamb Shank',price:550},{menuItem:'Beef Rips',price:550},{menuItem:'Lamb Neck',price:550}]},

    //     {resId:3,resName:'Al Nahham',address:'Banana Island',
    //     menu:[{menuItem:'Cheese Roll',price:40},{menuItem:'Lobster',price:300},{menuItem:'Shripms',price:190}]}
    // ])
    const [id, setId] = useState()
    const [name, setName] = useState()
    const [location, setLocation] = useState()
    const [menu, setMenu] = useState([])
    const [item, setItem] = useState()
    const [price, setPrice] = useState()
    const [data, setData] = useState([])
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const scrollViewHeight = screenHeight * 0.4;
    useEffect(() =>
        navigation.setOptions(
            {
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.replace('Login')}
                        style={{
                            width: screenWidth * 0.08,
                            height: screenWidth * 0.08,
                            borderRadius: 5,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <AntDesign name="logout" size={25} color={'blue'} />
                    </TouchableOpacity>
                ),
            },
            []
        )
    );
    useEffect(() => {
        const q = query(collection(db, 'resturants'))
        const unsub = onSnapshot(q, (querySnapshot) => {
            const temp = []
            querySnapshot.forEach((doc) => {
                temp.push({ id: doc.id, name: doc.data().name, location: doc.data().address, menu: doc.data().restMenu })
            })
            setData(temp)
        })
    }, []
    )



    const set = async () => {


    }

    const store = async () => {
        const docRef = doc(db, 'resturants', id)
        await setDoc(docRef, { name: name, address: location, restMenu: menu })
            .then(() => {
                clear();
                console.log("data submitted");
            })
            .catch((error) => {
                console.log(error.message);
            });
    }



    const readAll = async () => {
        const docs = query(collection(db, 'resturants'))
        const querySnapshot = await getDocs(docs);
        const allData = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                name: doc.data().name,
                location: doc.data().address,
            };
        });
        setData(allData)
    }

    const addToMenu = (item, price) => {
        menu.push({ name: item, price: price })
        setItem()
        setPrice()
    }

    const deleteRes = async (id) => {
        const restDoc = doc(db, 'resturants', id)
        await deleteDoc(restDoc)
    }

    const clear = () => {
        setId()
        setName()
        setLocation()
        setMenu([])
        setItem()
        setPrice()
    }

    return (
        <View style={styles.container}>

            <Card width={"90%"}>
                <Card.Title>ADD RESTURANT</Card.Title>
                <Card.Divider />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                    }}
                >
                    <TextInput
                        placeholder="ID"
                        style={styles.input}
                        value={id}
                        autoCorrect={false}
                        onChangeText={(text) => setId(text)}
                        keyboardType="numbers-and-punctuation"
                    />
                    <TextInput
                        placeholder="Name"
                        style={styles.input}
                        value={name}
                        autoCorrect={false}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <Card.Divider />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                    }}
                >
                    <TextInput
                        placeholder="Address"
                        style={styles.input}
                        value={location}
                        autoCorrect={false}
                        onChangeText={(text) => setLocation(text)}
                    />
                </View>
                <Card.Divider />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        padding: 10,
                    }}
                >
                    <TextInput
                        placeholder="Menu Item"
                        style={styles.input}
                        value={item}
                        autoCorrect={false}
                        onChangeText={(text) => setItem(text)}
                    />
                    <TextInput
                        placeholder="Price"
                        style={styles.pinput}
                        value={price}
                        autoCorrect={false}
                        onChangeText={(text) => setPrice(text)}
                    />
                    <Button
                        color={"secondary"}
                        style={{ width: 100, }}
                        onPress={() => addToMenu(item, price)}
                    >
                        Add
                    </Button>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        color={"success"}
                        style={{ width: 300, }}
                        onPress={store}
                    >
                        Store
                    </Button>
                </View>
            </Card>


            <Card width={'90%'} height={'45%'}>
                <Card.Title>RESTURANT LIST</Card.Title>
                <Card.Divider />
                <ScrollView width={'100%'} height={'85%'}>
                    {data.map((item, index) => (
                        <View key={index} style={{ justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                                <TouchableOpacity style={{ backgroundColor: 'lightblue', width: '25%', height: 20 }}
                                    onPress={() => navigation.navigate("Menu", { item })} >
                                    <Text style={{ alignSelf: 'center' }}>{item.name}</Text>
                                </TouchableOpacity>
                                <Text>{item.location}</Text>
                                <AntDesign name='delete' size={24} color={'red'} onPress={() => deleteRes(item.id)} />
                            </View>
                            <Card.Divider />
                        </View>
                    ))}
                </ScrollView>


            </Card>


        </View>
    )
}

export default AdminScreen

const styles = StyleSheet.create({
    container: {
        //  justifyContent:'space-around',
        alignItems: 'center',
        flex: 1
    },
    input: {
        marginBottom: 10,
        fontSize: 18,
        padding: 1,
        width: 150
    },
    pinput: {
        marginBottom: 10,
        fontSize: 18,
        padding: 1,
        width: 90
    },
    out: {
        fontSize: 18,
        shadowColor: 'blue',
        shadowRadius: 6,
        shadowOpacity: 10,
        width: 120
    }
})