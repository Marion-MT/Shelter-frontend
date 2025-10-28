import { View, Text, StyleSheet, ImageBackground, Image, Pressable } from "react-native"
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { useState } from "react";
import SwitchToggle from "react-native-switch-toggle";

type ParametreScreenProps = {
    navigation: NavigationProp<ParamListBase>;
}

export default function ParametreScreen({ navigation }: ParametreScreenProps ) {
    const [volume, setVolume] = useState(50);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const toggleSound = () => {
        setSoundEnabled(!soundEnabled);
    }
   
    const handleNavigate = () => {
        navigation.navigate('Home', { screen: 'Home' });
    };


    return (
        <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.container}>
            <View style={styles.main}>
                <Pressable onPress={() => handleNavigate()}>
                    <Image source={require('../assets/icon-arrow.png')} style={styles.arrow}/>
                </Pressable>
                <View style={styles.darkBackground}>
                    <View style={styles.cardContainer}>
                        <View style={styles.setupContainer}>
                            <Text style={styles.text}>Volume</Text>
                            <Slider
                                style={styles.volumeSlider}
                                value={volume}
                                minimumValue={0}
                                maximumValue={100}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                                onValueChange={(value) => setVolume(value)}
                            />
                        </View>
                        <View style={styles.setupContainer}>
                            <Text style={styles.text}>Son</Text>
                            <SwitchToggle
                                switchOn={soundEnabled}
                                onPress={toggleSound}
                                circleColorOff="#FFE8BF"
                                circleColorOn="#FFE8BF"
                                backgroundColorOn="#74954E"
                                backgroundColorOff="#D05A34"
                                // backTextRight="off"
                                // backTextLeft="on"
                                containerStyle={{
                                    width: 80,
                                    height: 40,
                                    borderRadius: 25,
                                    padding: 5,
                                    marginTop: 10,
                                }}
                                circleStyle={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>    
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        width: '100%',
        paddingHorizontal: 36,
        paddingVertical: 30,
    },
    arrow: {
        width: 75,
        height: 75,
        marginBottom: 30,
    },
    darkBackground:{
        backgroundColor : '#242120',
        width: '100%',
        height: 600,
        borderRadius: 20,
        padding: 12,
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor : '#342c29',
        width: '100%',
        height: '100%',
        borderRadius: 16,
        borderColor: '#554946',
        borderWidth: 5
    },
    setupContainer: {
        marginTop: 50,
        width: '80%',
    },
    volumeSlider: {
        width: '100%',
        height: 40,
        marginTop: 10,
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});