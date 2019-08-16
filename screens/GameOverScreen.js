import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <TitleText style={styles.title}>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image} 
                    // source={require('../assets/images/success.png')} 
                    source={{uri: 'https://c402277.ssl.cf1.rackcdn.com/photos/2325/images/hero_small/mountains-hero.jpg?1345838509'}}
                    resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> round to guess the number</BodyText>
                <BodyText style={styles.resultText}>Your number was: {props.userNumber}</BodyText>
            </View>

            <MainButton onPress={props.onRestart}>New Game</MainButton>
        </View>
    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: "hidden",
        marginVertical: 50
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    title: {
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
})

export default GameOverScreen;