// @flow
import React from 'react'
import {StackNavigator} from 'react-navigation';
import {Header, Body, Title, Right} from 'native-base'

import BreedListScreen from './BreedListScreen'

import {getBreedList, getSubBreedList, getRandomByBreed, getRandomBySubBreed} from "./api";

const AllBreedsScreen = (props: { navigation: any }) => {
    return <BreedListScreen onSelect={(breedName) => props.navigation.navigate("SubBreed", {breedName})}
                            getBreedList={getBreedList}
                            getCardImageUri={getRandomByBreed}
    />
}

const SubBreedsScreen = (props: { navigation: any }) => {
    console.log(props)
    const {params} = props.navigation.state;
    return <BreedListScreen onSelect={() => undefined}
                            getBreedList={() => getSubBreedList(params.breedName)}
                            getCardImageUri={getRandomBySubBreed(params.breedName)}/>
}

AllBreedsScreen.title = "Doggo"

const NavigatorHeader = props => {
    return (
        <Header>
            <Body>
            <Title>Dogs</Title>
            </Body>
            <Right/>
        </Header>
    )
}

const defaultNavigationOptions = {
    navigationOptions: ({navigation}) => ({
        header: NavigatorHeader,
    }),
}
export default StackNavigator({
    Home: {
        screen: AllBreedsScreen
    },
    SubBreed: {
        screen: SubBreedsScreen
    }
}, defaultNavigationOptions);