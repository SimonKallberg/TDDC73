
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
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';



export default class App extends Component {

  render() {
    const data = require('./moviesdetails.json');
    const logo = require('./images/netflix.png');

    function getTitleAndPoster(item) {
      if(!item.poster) return;
      var movieItem = {title: item.title, poster: item.poster};
      return movieItem;
    }
    var movieData = data.map(getTitleAndPoster);
    movieData = movieData.filter(function( item ) {
       return item !== undefined;
    });

    return (
        <SafeAreaView style={styles.container}>
          <Image source={logo} style={styles.logo}/>
          <View style={styles.carouselContainer}>
            <Carousel MovieData = {movieData} DisplayNumber = {4}/>
          </View>
        </SafeAreaView>

    );
  }
};

class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,

    };
    this.loadData = this.loadData.bind(this);
  }

  loadData(index) {
    let data =[];

    if(this.props.MovieData.length >= this.props.DisplayNumber + index) {
      for(let i = index; i < this.props.DisplayNumber + index; i++) {
        data.push(this.props.MovieData[i]);

      }
      return data;
    }
  }

  changeIndexBackwards(){
    var newIndex = this.state.index - this.props.DisplayNumber;
      this.setState({index: newIndex})
  }

  changeIndexForward(){
    this.refs.touch.setOpacityTo(0.8, 1);
    var newIndex = this.state.index + this.props.DisplayNumber;
      this.setState({index: newIndex})
  }

  render() {
    var numberOfElements = this.props.DisplayNumber;  //To make sure elements wont appear too small
    var displayData = (numberOfElements > 8 || numberOfElements < 3) ?
    <Text style = {styles.title}>Use a display number between 3 and 8! Your display number was: {numberOfElements}</Text>
    : this.loadData(this.state.index).map(function(item) {
      return <MovieItem MovieData = {item} DisplayNumber = {numberOfElements} />
      });
    return (

        <View style={styles.carousel} >
          <TouchableOpacity
           style={this.state.index == 0 ? styles.disabledButton : styles.buttonStyle}
           onPress={() => this.changeIndexBackwards()}
           disabled = {this.state.index == 0 ? true : false}
           activeOpacity={1.0}
           ref="touch"
           >
           <Text style = {styles.title}> ◀ </Text>
         </TouchableOpacity>
          <View style={styles.allItems}>
             {displayData}
          </View>
          <TouchableOpacity
           style={this.state.index > this.props.MovieData.length - this.props.DisplayNumber ? styles.disabledButton : styles.buttonStyle}
           onPress={() => this.changeIndexForward()}
           disabled = {this.state.index > this.props.MovieData.length - this.props.DisplayNumber ? true : false}
           activeOpacity={1.0}
           ref="touch"
           >
           <Text style = {styles.title}> ▶ </Text>
         </TouchableOpacity>
       </View>
    );
  }
}

class MovieItem extends Carousel {
  render () {

    return (

      <TouchableOpacity onPress={()=>this.moveToAddNewCustomer() style={[styles.item, {width: 100/this.props.DisplayNumber+'%'}]}>
      <Image source={{uri: this.props.MovieData.poster}} style={styles.itemImage}/>
        <Text style={styles.title}>
        {this.props.MovieData.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  carouselContainer: {
    width: '100%',
    height: '15%',
  },
  carousel: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  allItems: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  title: {
    color: 'white',
    justifyContent: 'center',

  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    borderRadius: 4,
    opacity: 0.8,
  },
  disabledButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    borderRadius: 4,
      opacity: 0.2,
  },
  logo: {
    width: '100%',
    height: '30%',
  },
  item: {
    width: '25%',
    height: '100%',
    padding: 5,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }

});
