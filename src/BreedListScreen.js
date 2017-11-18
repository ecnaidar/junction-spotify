// @flow
import React, {Component} from 'react';
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    List,
    ListItem
} from 'native-base';


import DogCard from "./DogCard"

type State = {
    list?: Array<string>,
}

type Props = {
    getBreedList: (?string) => Promise<any>,
    onSelect: (?string) => void,
    getCardImageUri: (string) => Promise<any>
}

export default class BreedListScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            list: undefined
        }
    }

    componentDidMount() {
        const {getBreedList} = this.props
        getBreedList().then(response => {
            this.setState({list: response.data.message})
        })
    }

    render() {
        const {list} = this.state
        const { onSelect, getCardImageUri } = this.props
        console.log(list)
        return (
            <Container>
                <Content>
                    {
                        list &&
                        <List dataArray={list}
                              renderRow={(item) => {
                                  console.log(item)
                                  return (
                                      <DogCard onPress={() => onSelect(item)} getImageUri={getCardImageUri} name={item}/>
                                  )
                              }

                              }>
                        </List>
                    }
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Random Dog</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
