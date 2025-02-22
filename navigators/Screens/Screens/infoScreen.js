import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Image } from 'react-native';
import {  Container, Content, Card, Button, Body, Text, InputGroup, Input, Icon } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const axios = require("axios");

export class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.handlerButtom = this.handlerButtom.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.state = {
          isReady: false,
          response: [],
          consultoApi: false,
          results: {name: 'hodors'}
        };
      }

      async componentDidMount() {
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        this.setState({ isReady: true });
      }


      handlerChange = (text) => {
        console.log(text);
        var nombre = text;
        this.setState({ value: nombre });
      }


      handlerButtom = () => {
        console.log("handleado");

        var nombre = this.state.value;

        axios.get('https://www.anapioficeandfire.com/api' + nombre )
          .then( response =>{
            console.log(response);
            this.setState({consulteApi:true, results: response.data.results[0]});
          })
          .catch(error => {
            // handle error
            console.log(error);
          });
      }

      render() {
        if (!this.state.isReady) {
          return <AppLoading />;
        }
        if(this.state.consulteApi === true){
          return (
            <Container>
            <Content>
              <InputGroup borderType="rounded" >
                <Icon name="md-search" style={{color:'#384850'}}></Icon>
                <Input  onChangeText={this.handlerChange.bind(this)} style={{color: '#00c497'}} />
              </InputGroup>
              <Button onPress={this.handlerButtom.bind(this)} full info>
                <Text>Buscar</Text>
              </Button> 
              <Card style={{flex: 0}}>
                  <Body>
                    <Image source={{uri: this.state.results.image}} style={{height: 500, width: 310, flex: 1}}/>
                    <Text>Nombre: {this.state.results.name}</Text>
                    <Text>Estado: {this.state.results.status}</Text>
                  <Text>Nacio: {this.state.results.born}</Text>
                  <Text>Murio: {this.state.results.die}</Text>
                  <Text>Genero: {this.state.results.gender}</Text>
                  </Body>
               </Card>
            </Content>
          </Container>
        );
        }else{
          return(
            <Container>
            <Content>
              <InputGroup borderType="rounded" >
                <Icon name="md-search" style={{color:'#384850'}}></Icon>
                <Input  onChangeText={this.handlerChange.bind(this)} style={{color: '#00c497'}} />
              </InputGroup>
              <Button onPress={this.handlerButtom.bind(this)} full info>
                <Text>Buscar</Text>
              </Button> 
              <Card style={{flex: 0}}>
                  <Body>
                    <Text> The king in the north! ...</Text>
                  </Body>
               </Card>
            </Content>
          </Container>    
          ); 

      }
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }); 