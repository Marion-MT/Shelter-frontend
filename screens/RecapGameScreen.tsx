import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from "react-native"
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type RecapGameScreenProps = {
    navigation: NavigationProp<ParamListBase>;
}

export default function RecapGameScreen({ navigation }: RecapGameScreenProps ) {
   
    const handleNavigateHome = () => {
        navigation.navigate('Home', { screen: 'Home' });
    };

    const handleNavigateGame = () => {
        navigation.navigate('Game', { screen: 'Game' });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.text}>
                <Text style={styles.title}>RecapGame Screen</Text>
                <TouchableOpacity onPress={() => handleNavigateHome()} style={styles.button} activeOpacity={0.8}>
                    <Text>Go to Home Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleNavigateGame()} style={styles.button} activeOpacity={0.8}>
                    <Text>Go to Game Screen</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: '600',
        fontFamily: 'Futura',
        paddingBottom: 30,      
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#95979A',
        width: 200,
        height: 40,
        borderRadius: 20,
        margin: 15,
    },
});