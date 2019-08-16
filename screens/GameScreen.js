import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import Card from '../components/Card'
import MainButton from '../components/MainButton'

import DefaultStyles from '../constants/default-styles/';

const renderListItem = (listLength, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    )
}

const GameScreen = props => {
    // React will not reset the useStates on subsequent rerenders of the component
    const initialGuess = generateRandomBetween(1, 100, props.userChoice )
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect( () => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        } 
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ( (direction === 'lower' && currentGuess < props.userChoice) ||
             (direction === 'higher' && currentGuess > props.userChoice) ) {
                //  Change this if you decide to commit to github
            Alert.alert('Wow', 'Are you fucking stupid?',
                [{text: 'Sorry!', style: 'cancel'}]
            )
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess+1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
        // setRounds(currentRound => currentRound + 1);
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponents Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color='white'/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                    <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map(( guess, i ) => renderListItem(guess, pastGuesses.length - i))}
                </ScrollView> */}
                <FlatList
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    keyExtractor={item => item}
                    contentContainerStyle={styles.list}/>
            </View>
        </View>
    )

} 
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor( Math.random() * (max - min) + min );
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'space-around',
        width: '100%',
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    listContainer: {
        width: '60%',
        flex: 1,
    }
})

export default GameScreen;