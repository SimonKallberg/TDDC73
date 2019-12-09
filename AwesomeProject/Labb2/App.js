import React, { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity, TextInput, Picker, Animated } from 'react-native';
import styles from './style.js'

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    const img0 = require('./images/amex.png');
    const img1 = require('./images/dinersclub.png');
    const img2 = require('./images/visa.png');
    const img3 = require('./images/mastercard.png');
    const img4 = require('./images/discover.png');
    this.state = {
      myNumber: "#### #### #### ####",
      cardHolder: "Name Surname",
      cardId: '0',
      imgList: [img0, img1, img2, img3, img4],
      selectedMonth: 'MM',
      selectedYear: 'YY',
      cardCVV: '',
    };

    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
  }

checkImage(id){
    switch(id) {
      case '3':
        this.setState({cardId: '0'});
      break;
      case '4':
        this.setState({cardId: '1'});
      break;
      case '5':
        this.setState({cardId: '2'});

      break;
      case '6':
        this.setState({cardId: '3'});
      break;
    }
  }

numberValid(text)
{
    let newText = '';
    let numbers = '0123456789';
    let newNr = '0';

    for (var i=0; i < 16; i++) {
      if(i%4 == 0)
      newText = newText + " ";

        if(i < text.length && numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
          newText = newText + '#';
        }
    }

    if(text.length > 0) {
      var nr = text[0];
      this.checkImage(nr);
    }

    this.setState({ myNumber: newText });
}

componentWillMount() {
  this.animatedValue = new Animated.Value(0);
  this.value = 0;
  this.animatedValue.addListener(({ value }) => {
    this.value = value;
  })
  this.frontInterpolate = this.animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })
  this.backInterpolate = this.animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg']
  })
}

flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }

  }

nameValid(text){
  let newName = '';
  let letters = ' abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for(let i = 0; i < text.length; i++) {
    if(letters.indexOf(text[i]) > -1 ) {
        newName = newName + text[i];
    }
  }

  this.setState({ cardHolder: newName });
}




  render() {
   const frontAnimatedStyle = {
     transform: [
       { rotateY: this.frontInterpolate}
     ]
   }
   const backAnimatedStyle = {
     transform: [
       { rotateY: this.backInterpolate }
     ]
   }

    return (
      <View style={styles.container}>



        <Animated.View style={[styles.imageContainer, frontAnimatedStyle]}>
          <Image source={require("./images/22.jpeg")} style={styles.card}/>

            <View style = { styles.overlayText}>

              <View style = {styles.cardRow}>
                <Image source={require("./images/chip.png")} style={styles.chip} />
                <Image source={this.state.imgList[this.state.cardId]} style={styles.chip}/>
              </View>

              <View style = {styles.cardRow}>
              <Text style={styles.cardText}>{this.state.myNumber}</Text>
              </View>
              <View style = {styles.cardRow}>
                <View style = {styles.leftCardColumn}>
                  <Text style = {styles.textOnCard}>Card Holder</Text>
                  <Text style = {styles.textOnCard}>{this.state.cardHolder}</Text>
                </View>
                <View style = {styles.rightCardColumn}>
                  <Text style = {styles.textOnCard}>Expires</Text>
                  <Text style = {styles.textOnCard}>{this.state.selectedMonth} / {this.state.selectedYear}</Text>
                </View>
              </View>

            </View>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.imageContainer, styles.flipCardBack ]}>

                      <Image source={require("./images/21.jpeg")} style={styles.card}/>
                      <View style = {styles.magneticReader}></View>
                      <View style = {styles.backsideCVV}>
                        <Text style = {styles.backsideText}>CVV</Text>
                        <Text style = {styles.CVVtext}>{this.state.cardCVV}</Text>

                      </View>
                      <View style = {styles.backBankContainer}>
                        <Image source={this.state.imgList[this.state.cardId]} style={styles.backBankImage}/>
                      </View>
         </Animated.View>

        <View style={styles.textFields}>
          <Text>Card nr:</Text>
          <TextInput
             style={styles.textInput}
             keyboardType='numeric'
             onChangeText={(text)=> this.numberValid(text)}
             maxLength={16}  //setting limit of input
          />
          <Text>Card holder:</Text>
          <TextInput
             style={styles.textInput}
             onChangeText={(text)=> this.nameValid(text)}
             maxLength={50}  //setting limit of input
          />
        </View>



          <View style = {styles.inputColumn}>
            <View style = {styles.textRow}>
            <Text>Expration Date:</Text>
            <Text>CVV:</Text>
            </View>
            <View style = {styles.inputRow}>
            <Picker selectedValue={this.state.selectedMonth}
              style = {styles.pickerStyle}
              onValueChange={(itemValue, itemIndex) =>  this.setState({selectedMonth: itemValue})}
              mode={'dropdown'}>
              <Picker.Item label="01" value="01" />
              <Picker.Item label="02" value="02" />
              <Picker.Item label="03" value="03" />
              <Picker.Item label="04" value="04" />
              <Picker.Item label="05" value="05" />
              <Picker.Item label="06" value="06" />
              <Picker.Item label="07" value="07" />
              <Picker.Item label="08" value="08" />
              <Picker.Item label="09" value="09" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
            </Picker>

            <Picker selectedValue={this.state.selectedYear}
              style = {styles.pickerStyle}
              itemStyle = {styles.pickerItems}
              onValueChange={(itemValue, itemIndex) =>  this.setState({selectedYear: itemValue})}
              mode={'dropdown'}>
              <Picker.Item label="2019" value="19" />
              <Picker.Item label="2020" value="20" />
              <Picker.Item label="2021" value="21" />
              <Picker.Item label="2022" value="22" />
              <Picker.Item label="2023" value="23" />
              <Picker.Item label="2024" value="24" />
              <Picker.Item label="2025" value="25" />
              <Picker.Item label="2026" value="26" />
            </Picker>


            <View style = {styles.inputColumn}>
              <TextInput
                editable
                keyboardType='numeric'
                onChangeText={(text)=> this.setState({cardCVV: text})}
                maxLength={3}
                onFocus ={() => this.flipCard()}
                onBlur ={() => this.flipCard()}
                style={styles.textCVV}/>
            </View>
              </View>
        </View>
        <TouchableOpacity
          style={styles.loginScreenButton}
          onPress={() => Alert.alert('Button with adjusted color pressed')}
          underlayColor='#fff'>
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
