import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Alert, Modal, TextInput  } from 'react-native';

const FormModal = (props) => {
    
    return(
    <View style = {styles.centeredView}>
    <Modal
        animationType  = "slide"
        transparent    = {true}
        visible        = {props.modalVisible}
        onRequestClose = {() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style = {styles.centeredView}>
        <View style = {styles.modalView}>
        <View style = {styles.form}>
        <Text style = {{fontSize  : 20}}>Add Task</Text>
        <TextInput
        style        = {styles.titleStyle}
        underlineColorAndroid="transparent"
        placeholder={props.placeholderTitle}
        onChangeText={props.onChangeTextTitle}
        numberOfLines={props.numberOfLinesTitle}
        multiline={props.multilineTitle}
        onSubmitEditing={props.onSubmitEditingTitle}
        blurOnSubmit={false}
        value={props.valueTitle}
      />
      <TextInput
        style         = {styles.descStyle}
        underlineColorAndroid="transparent"
        placeholder={props.placeholderDesc}
        onChangeText={props.onChangeTextDesc}
        numberOfLines={props.numberOfLinesDesc}
        multiline={props.multilineDesc}
        onSubmitEditing={props.onSubmitEditingDesc}
        blurOnSubmit={false}
        value={props.valueDesc}
      />
        </View>
        <View             style   = {styles.modalButtons}>
        <TouchableOpacity onPress = {props.cancelClick}
                          style   = {styles.cancelBtn}>
        <Text             style   = {{ fontSize: 16, color: 'green' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {props.addClick}
                              style   = {styles.addTask}>
            <Text             style   = {{ fontSize: 16, color: 'green' }}>Add Task</Text>
            </TouchableOpacity>
        </View>
          </View>
        </View>
      </Modal>
    </View>
    );
}

export default FormModal;

const styles = StyleSheet.create({
    centeredView: {
      flex          : 1,
      justifyContent: "center",
      alignItems    : "center",
      marginTop     : 10,
    },
    modalView: {
      margin         : 20,
      backgroundColor: "white",
      borderRadius   : 5,
      padding        : 0,
      alignItems     : "flex-start",
      shadowColor    : "#000",
      shadowOffset   : {
        width : 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius : 3.84,
      elevation    : 5
    },
    modalText: {
      marginBottom: 15,
      textAlign   : "center"
    },
    modalButtons:{
      flexDirection: 'row',
      //justifyContent : 'flex-start',
      paddingTop     : 10,
      backgroundColor: 'white'
    },
    cancelBtn:{
      flex      : 0.5,
      margin:10,
      alignItems: 'flex-start'
    },
    addTask:{
      flex      : 0.5,
      alignItems: 'flex-end',
      marginLeft: 140,
      margin:10,
    },
    form:{
      flexDirection : 'column',
      justifyContent: 'center',
      alignItems    : 'center',
      width         : 320,
      padding       : 10
    },
    titleStyle:{
      margin     : 20,
      borderWidth: 1,
      padding    : 10,
      width      : 270,
      height     : 40,
      borderColor: 'black'
    },
    descStyle:{
      padding    : 10,
      borderWidth: 1,
      width      : 270,
      height     : 100,
      borderColor: 'black',
      justifyContent:'flex-start',
      alignItems : 'baseline'
    }
});
