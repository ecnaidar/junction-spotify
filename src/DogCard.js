// @flow
import * as React from 'react'
import {View} from 'react-native'
import {Body, Button, Card, CardItem, Icon, Left, Right, Text, Spinner, H1} from "native-base";
import {Image, StyleSheet} from "react-native";


type Props = {
    name: string,
    onPress: () => *,
    getImageUri: (string) => Promise<any>
}

type State = {
    imageLink?: string,
}

class DogCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            imageLink: undefined
        }
    }

    componentDidMount() {
        const {name, getImageUri} = this.props

        getImageUri(name).then(response => {
            this.setState({imageLink: response.data.message})
        })
    }

    render() {
        const {name, onPress} = this.props
        const {imageLink} = this.state
        return (
            <Card style={styles.cardStyle}>
                <CardItem button onPress={onPress} cardBody>
                    <View style={styles.viewStyle}>
                        {imageLink ? <Image source={{uri: imageLink}} style={StyleSheet.absoluteFill}/> :
                            <Spinner/>}
                        <View style={styles.textContainer}>
                            <H1 style={{color: "white"}}>{name}</H1>
                        </View>
                    </View>
                </CardItem>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {marginLeft: 8, marginRight: 8, marginBottom: 8},
    viewStyle: {height: 200, width: null, flex: 1},
    textContainer: {position: "absolute", left: 0, bottom: 0, width: "100%", backgroundColor: "rgba(31, 33, 39, 0.55)"}
})
export default DogCard