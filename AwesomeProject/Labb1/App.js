import React, { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';

export default class HelloWorldApp extends Component {

  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sällis med Källis</Text>
        <Image source={pic} style={{width: 193, height: 110}}/>
          <View style={styles.grid}>
            <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => Alert.alert('Button with adjusted color pressed')}
            underlayColor='#fff'>
            <Text style={styles.loginText}>Button</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginScreenButton}
              onPress={() => Alert.alert('Button with adjusted color pressed')}
              underlayColor='#fff'>
              <Text style={styles.loginText}>Button</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            <TouchableOpacity
              style={styles.loginScreenButton}
              onPress={() => Alert.alert('Button with adjusted color pressed')}
              underlayColor='#fff'>
              <Text style={styles.loginText}>Button</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginScreenButton}
              onPress={() => Alert.alert('Button with adjusted color pressed')}
              underlayColor='#fff'>
              <Text style={styles.loginText}>Buttoff</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text>Email:</Text>
            <TextInput
              editable
              maxLength={80}
              style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
              textContentType = "emailAddress"
            />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    paddingBottom: 40,
    fontWeight: "bold"
    },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    marginTop: 150

  },
  grid: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15
   },
    loginScreenButton:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'grey',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
}
})
