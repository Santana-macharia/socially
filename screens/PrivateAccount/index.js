import { FontAwesome5 } from '@expo/vector-icons';
import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button } from 'react-native-elements';
import { Switch } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import { selectUser, selectUserInfo, setUserInfo } from '../../redux/features/userSlice';

const PrivateAccount = ({navigation}) => {
    const user = useSelector(selectUser);   
    const userInfo = useSelector(selectUserInfo);
    const dispatch = useDispatch();
    const [privateAccount, setPrivateAccount] = useState(userInfo?.privacy === "private");



    useLayoutEffect(() =>{
        navigation.setOptions({
            headerTitle: "Private Account",
            headerTitleAlign:"center"
        })
    },[navigation])
    console.log('userinfo-->',userInfo);

    const onPress = () =>{
        
        db.collection("users").doc(user?.uid).collection("info").doc(user?.uid).set({
            bio: userInfo?.bio,
            location: userInfo?.location,
            privacy: privateAccount ?  "private" : "public",
            website: userInfo?.website
        })

        dispatch(setUserInfo({
            bio: userInfo?.bio,
            location: userInfo?.location,
            privacy: privateAccount ?  "private" : "public",
            website: userInfo?.website
        }))
        navigation.navigate("Profile");

    }
    const toggleSwitch = () => setPrivateAccount(!privateAccount);

    return (
        <View style={{flex:1, alignItems:"center",backgroundColor:"white"}}>
            {/* <Text></Text> */}
            <View style={styles.heading}>
				<FontAwesome5 name="user-lock" size={24} color="black" />
                <Text style={styles.headingText}>Account Privacy</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.headingText}>
                    Private Account
                </Text>
                <Text style={{fontSize:17, margin: 5}}>Make your profile private, only followers can access.</Text>
                <Switch
                    trackColor={{ false: "#767577", true: '#49cbe9' }}
                    thumbColor={privateAccount ? "lightgray" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={privateAccount}
                    style={{alignSelf: "flex-start", marginVertical: 10}}
                />
            </View>
            <Button buttonStyle={{borderRadius: 10, padding: 15, backgroundColor: '#49cbe9'}} onPress={onPress} title="Save changes" />
        </View>
    )
}

export default PrivateAccount

const styles = StyleSheet.create({
    heading:{
        flexDirection: "column",
        alignItems:"center",
        margin: 15,
        borderBottomWidth: 0.6,
        width: "100%",
        padding: 10
    },
    headingText:{
        fontSize: 20,
        fontWeight:"bold"
    },
    content:{
        flexDirection: "column",
        padding: 10,
        margin: 15
    }
})
