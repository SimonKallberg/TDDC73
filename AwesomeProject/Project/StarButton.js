
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  Modal
} from 'react-native';

export class StarButton extends Component {
 render() {
  return (
   <View style={StarButtonStyle.wishListIcon}>
   <TouchableOpacity
    onPress={this.props.onPressFunction}
    activeOpacity={0.6}
    ref="star"
    >
     <Text style={this.props.isPressed ? StarButtonStyle.starPressed : StarButtonStyle.star}>★</Text>
    </TouchableOpacity>
   </View>
  );
 }
}

const StarButtonStyle = StyleSheet.create({
 wishListIcon: {
   width: 50,
   height: 50,
   margin: 20,
   justifyContent: 'center',
   alignItems: 'center',
 },
 star: {
   fontSize: 40,
   color: 'white',
   opacity: 0.8,
 },
 starPressed: {
   fontSize: 40,
   color: 'red',
   opacity: 0.8,
 },
});
