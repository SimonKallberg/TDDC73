
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
import {WishList} from "./WishList.js";
import {Carousel} from "./Carousel.js";

function getData() {
  const data = require('./moviesdetails.json');

  function getSelectedData(item) {
    if(item.poster == "na") return; //Remove empty images
    var movieItem = ({title: item.title, image: item.poster, subheading: item.directed_by, description: item.description});
    return movieItem;
  }
  var movieData = data.map(getSelectedData);
  //Remove empty data
  movieData = movieData.filter(function( item ) {
     return item !== undefined;
  });
  //Add index
  movieData = movieData.map((currElement, index) => {
    currElement["index"] = index;
    currElement["isStarred"] = false;
    return currElement;
  });
  //console.log(movieData.length);
  return movieData;
}

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: getData(),
      starred: [],
    };
    this.selectedData = this.selectedData.bind(this);
  }

  selectedData(selectedElement) {
    var i = selectedElement.index;
    //Remove element from starred & double check that the array contains i
    if (this.state.data[i].isStarred && this.state.starred.indexOf(selectedElement) !== -1) {
      this.setState({starred: this.state.starred.filter((j) => j.index !== selectedElement.index)}) //Remove the index that is equals to i
    }
    else {  //Add element to starred
     this.setState({starred: [...this.state.starred, selectedElement]});
    }
    this.state.data[i].isStarred = !this.state.data[i].isStarred;
    //console.log(i);
  }

  render() {

    const logo = require('./images/netflix.png');

    return (
        <SafeAreaView style={AppStyle.container}>
          <View style={AppStyle.header}>
           <Image source={logo} style={AppStyle.logo}/>
           <WishList starred={this.state.starred} selectedData={this.selectedData}/>
          </View>
          <Carousel data = {this.state.data} displayNumber={4} star={true} selectedData={this.selectedData}/>
        </SafeAreaView>

    );
  }
};

const AppStyle = StyleSheet.create({
 container: {
   width: '100%',
   height: '100%',
   backgroundColor: 'black',
   flex: 1,
 },
 header: {
   width: '100%',
   height: '20%',
   flexDirection: 'row',
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 logo: {
   width: '80%',
   height: '100%',
   resizeMode: 'contain',
 },
});
