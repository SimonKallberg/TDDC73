import React, { Component } from 'react';
import { Text, View, Image, Button, StyleSheet, Alert, TouchableOpacity, TextInput, Picker, Animated } from 'react-native';
import styles from './style.js'

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    const amex = require('./images/amex.png');
    const visa = require('./images/visa.png');
    const mastercard = require('./images/mastercard.png');
    const discover = require('./images/discover.png');
    this.state = {
      myNumber: "#### #### #### ####",
      cardHolder: "Name Surname",
      cardId: 'visa',
      //Fixed so each image has a name and also two textfields that will only be allowed nr/letters
      imgList: {amex: amex, visa: visa, mastercard: mastercard, discover: discover},
      cardName: '',
      cardNr: '',
      selectedMonth: 'MM',
      selectedYear: 'YY',
      cardCVV: '',
      cardLength: 16,
    };




    this.animatedValue = new Animated.Value(0);

    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
  }

checkImage(id){
  //Fixed so american express works and also sets cardId to a name rather than a number
  firstNr = id.substring(0,1);
  amexcard = id.substring(1);

    switch(firstNr) {
      case '3':   //American Express
        if(amexcard == '7' || amexcard == '4'){
          this.setState({cardId: 'amex', cardLength: 15});
        }
      break;
      case '4': //Visa
        this.setState({cardId: 'visa',  cardLength: 16});
      break;
      case '5': //Mastercard
        this.setState({cardId: 'mastercard', cardLength: 16});
      break;
      case '6':  //Discover
        this.setState({cardId: 'discover', cardLength: 16});
      break;
    }
  }

numberValid(text)
{
    let newText = '';
    let numbers = '0123456789';
    let newNr = '0';
    let allowedCardNr = '';

    for (var i=0; i < this.state.cardLength; i++) {
      if(i%4 == 0)
      newText = newText + " ";

        if(i < text.length && numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
            allowedCardNr = allowedCardNr + text[i];    //Numbers that will be in input field without "#### #### #### ####"
        }
        else {
          newText = newText + '#';
        }
    }

    if(text.length > 0) {
      var nr = text[0];

      if(nr == 3 && text.length > 1) {
        var nextNr = text[1];
        console.log(nextNr);
        nr = nr + nextNr;
      }

      this.checkImage(nr);
    }
    else {    //defaults to visa whenever goes back to blank
      this.setState({cardId: 'visa'});
    }

    this.setState({ myNumber: newText, cardNr: allowedCardNr });
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
  let letters = ' abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';

  for(let i = 0; i < text.length; i++) {
    if(letters.indexOf(text[i]) > -1 ) {
        newName = newName + text[i];
    }
  }

  this.setState({ cardHolder: newName, cardName: newName });  //cardName is what will be written inside the textinput field
}

monthList = () =>{
    var items = [];

    for(var i = 1; i <= 12; i++) {
        if(i < 10) {
            items.push("0" + i.toString());
        }
        else
       items.push(i.toString());
    }

    return( items.map((x,i) => {
      return( <Picker.Item label={x} key={i} value={x}  />)} ));
}

yearList = () =>{
    var items = [];
    var year = new Date().getFullYear();

    for(var i = 0; i <= 10; i++) {
            items.push((year + i).toString());
    }
    return( items.map((x,i) => {
      return( <Picker.Item label={x} key={i} value={x.substring(2)}  />)} ));
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
             maxLength={this.state.cardLength}  //setting limit of input
             value = {this.state.cardNr}
          />
          <Text>Card holder:</Text>
          <TextInput
             style={styles.textInput}
             onChangeText={(text)=> this.nameValid(text)}
             maxLength={50}  //setting limit of input
             value = {this.state.cardName}
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
              { this.monthList() }

            </Picker>

            <Picker selectedValue={this.state.selectedYear}
              style = {styles.pickerStyle}
              itemStyle = {styles.pickerItems}
              onValueChange={(itemValue, itemIndex) =>  this.setState({selectedYear: itemValue})}
              mode={'dropdown'}>
               { this.yearList() }
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
          onPress={() => Alert.alert('We now have your credit card credentials hehe')}
          underlayColor='#fff'>
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
