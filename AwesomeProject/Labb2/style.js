import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
    top: 50,
  },
  card: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  textInput: {
     height: 40,
     width: '100%',
     borderColor: 'gray',
     borderRadius: 10,
     borderWidth: 1 ,
  },
  textCVV: {
    height: 40,
    width: 60,
    borderColor: 'gray',
    borderWidth: 1,
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
  },
  overlayText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    flexDirection: 'column',
  },
  cardText: {
    color: 'white',
    fontSize: 22,
  },
  imageContainer: {
    width: '75%',
    height: '30%',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
  },
  chip: {
    width: '20%',
    height: '50%',
    resizeMode: 'contain',
  },
  cardRow: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '33%',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textOnCard: {
    color: 'lightgrey',
  },
  inputFields: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textFields: {
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  pickerStyle: {
    width: 120,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 15,
    borderColor: 'black',
  },
  textRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '82%',
    flexDirection: 'row',
  },

  inputColumn: {
    width: '80%',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },

  inputRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flipCard: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
 },
 flipCardBack: {
   position: 'absolute',
   top: 0,
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 10,
 },
 magneticReader: {
   height: '20%',
   width: '100%',
   backgroundColor: 'black',
   position: 'absolute',
   top: 20,
   opacity: 0.85,
 },
backsideCVV: {
  height: '15%',
  width: '90%',
  position: 'absolute',
  top: '50%',
  backgroundColor: 'white',
  borderRadius: 4,
},
backsideText: {
  color: 'lightgrey',
  alignSelf: 'flex-end',
  position: 'absolute',
  top: -20,
},
CVVtext: {
  color: 'black',
  alignSelf: 'flex-end',
  position: 'absolute',
  top: 0,
},
backBankContainer: {
  width: '80%',
  height: '20%',
  position: 'absolute',
  top: '70%',

},
backBankImage: {
  width: '25%',
  height: '100%',
  resizeMode: 'contain',
  alignSelf: 'flex-end',
}

})
