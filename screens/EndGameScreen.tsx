import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from "react-native"
import { NavigationProp, ParamListBase } from '@react-navigation/native';

type EndGameScreenProps = {
    navigation: NavigationProp<ParamListBase>;
}

export default function EndGameScreen({ navigation }: EndGameScreenProps ) {
   
    const handleNavigate = () => {
        navigation.navigate('RecapGame', { screen: 'RecapGame' });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.text}>
                <Text style={styles.title}>EndGame Screen</Text>
                <TouchableOpacity onPress={() => handleNavigate()} style={styles.button} activeOpacity={0.8}>
                    <Text>Go to RecapGame Screen</Text>
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
    },
});