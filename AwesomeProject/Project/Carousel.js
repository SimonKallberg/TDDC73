
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
import {StarButton} from "./StarButton.js";

export class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      carouselModalIsOpen: false,
      selectedItemData: {},
    };
    this.loadData = this.loadData.bind(this);
    this.toggleCarouselModal = this.toggleCarouselModal.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
  }

  loadData(index) {
    let data =[];

    if(this.props.data.length >= this.props.displayNumber + index) {
      for(let i = index; i < this.props.displayNumber + index; i++) {
        data.push(this.props.data[i]);
      }
      return data;
    }
  }

  changeIndexBackwards(){
    var newIndex = this.state.index - this.props.displayNumber;
      this.setState({index: newIndex})
  }

  changeIndexForward(){
    this.refs.touch.setOpacityTo(0.8, 1);
    var newIndex = this.state.index + this.props.displayNumber;
      this.setState({index: newIndex})
  }

  toggleCarouselModal() {
    this.setState({isOpen: !this.state.isOpen});
  }

  selectedItem(data) {

    if(Object.entries(this.state.selectedItemData).length === 0) {
      this.setState({selectedItemData: data});
      this.toggleCarouselModal();
    }
    else if(this.state.selectedItemData === data) {
      this.toggleCarouselModal();
      this.setState({selectedItemData: {}});
    }
    else {
      this.setState({selectedItemData: data});
    }
  }

  render() {
    var numberOfElements = this.props.displayNumber;  //To make sure elements won't appear too small
    var selectedItem = this.selectedItem;
    var displayData = (numberOfElements > 8 || numberOfElements < 3) ?
    <Text style = {CarouselStyle.text}>Use a display number between 3 and 8! Your display number was: {numberOfElements}</Text>
    : this.loadData(this.state.index).map(function(item) {
      return <CarouselItem data = {item} displayNumber = {numberOfElements} selectedItem = {selectedItem}/>
      });
    return (
        <View style={CarouselStyle.carouselContainer}>
          <View style={CarouselStyle.carousel} >
            <TouchableOpacity
             style={this.state.index == 0 ? CarouselStyle.disabledButton : CarouselStyle.buttonStyle}
             onPress={() => this.changeIndexBackwards()}
             disabled = {this.state.index == 0 ? true : false}
             activeOpacity={1.0}
             ref="touch"
             >
             <Text style = {CarouselStyle.buttonArrow}> ◀ </Text>
           </TouchableOpacity>
            <View style={CarouselStyle.allItems}>
               {displayData}
            </View>
            <TouchableOpacity
             style={this.state.index > this.props.data.length - this.props.displayNumber ? CarouselStyle.disabledButton : CarouselStyle.buttonStyle}
             onPress={() => this.changeIndexForward()}
             disabled = {this.state.index > this.props.data.length - this.props.displayNumber ? true : false}
             activeOpacity={1.0}
             ref="touch"
             >
             <Text style = {CarouselStyle.buttonArrow}> ▶ </Text>
           </TouchableOpacity>
         </View>
         <CarouselModal show={this.state.isOpen}
           onClose={this.toggleCarouselModal}
           data = {this.state.selectedItemData}
           selectedData = {this.props.selectedData}
           star = {this.props.star}
          />
       </View>
    );
  }
}

class CarouselModal extends Carousel {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    return (
        <ScrollView style={CarouselStyle.carouselModalStyle}>
          <View style={CarouselStyle.titleBar}>
            <Text style={CarouselStyle.title}>
            {this.props.data.title}
            </Text>
            { this.props.star ?
            <StarButton onPressFunction={() => this.props.selectedData(this.props.data)} isPressed={this.props.data.isStarred} />
            : null }
          </View>

          <Text style={CarouselStyle.subheading}>
          {this.props.data.subheading}
          </Text>
          <Text style={CarouselStyle.text}>
          {this.props.data.description}
          </Text>
        </ScrollView>
    );
  }
}

class CarouselItem extends Carousel {

  render () {
    return (
      <TouchableOpacity onPress={() => this.props.selectedItem(this.props.data)} style={[CarouselStyle.item, {width: 100/this.props.displayNumber+'%'}]}>
      <Image source={{uri: this.props.data.image}} style={CarouselStyle.itemImage}/>
        <Text style={CarouselStyle.previewTitle}>
        {this.props.data.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const CarouselStyle = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  carousel: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  allItems: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  previewTitle: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    flexWrap: 'wrap',
    padding: 5,
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    borderRadius: 4,
    opacity: 0.8,
    height: '100%',
  },
  buttonArrow: {
   color: 'white',
  },
  disabledButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'red',
    borderRadius: 4,
    opacity: 0.2,
    height: '100%',
  },
  item: {
    width: '100%',
    height: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImage: {
    width: '100%',
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    resizeMode: 'contain',
  },
  carouselModalStyle: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  title: {
    flex:1,
    fontSize: 40,
    color: 'white',
    flexWrap: 'wrap',
  },
  subheading: {
   paddingTop: 10,
   paddingBottom: 10,
   fontSize: 20,
   color: 'white',
  },
  titleBar: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
