import React from 'react';
import { View,StyleSheet, TouchableOpacity, Dimensions,Text } from 'react-native';

var {width} = Dimensions.get('window');

const Task = (props) => {
    return(
        <View style = {styles.task} >
        <View style = {styles.task__left}>
        <Text style = {styles.task__number}>{props.id}</Text>
            </View>
            <View style = {styles.task__middel}>
            <Text style = {styles.task__title}>{props.title}</Text>
            <Text style = {styles.task__description}>{props.description}</Text>
            </View>
            <View   style = {styles.task__right}>
            <TouchableOpacity onPress={props.doneClick}
            style={styles.task__doneBtn}
            >
              <Text style={{ fontSize: 16, color: '#fff' }}>{props.btnTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.deleteClick}
            style={styles.task__deleteBtn}>
              <Text style={{ fontSize: 16, color: '#fff' }}>Delete</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

export default Task;

const styles = StyleSheet.create({
    task: {
        flex           : 1,
        flexDirection  : 'row',
        alignItems     : 'center',
        backgroundColor: '#eceff1',
        width          : width * 1,
        height         : 140,
        borderRadius   : 10,
        borderWidth    : 1,
        borderColor    : '#eceff1',
        overflow       : 'hidden',
        margin:5
      },
      task__middel:{
        flex         : 0.5,
        flexDirection: 'column',
        //alignItems   : 'center',
        height       : 140
      },
      task__left:{
        flex          : 0.2,
        flexDirection : 'column',
        justifyContent: 'center',
        alignItems    : 'center',
      },
      task__title:{
        fontSize  : 20,
        paddingTop: 5,
        alignSelf:'center'
    },
      task__number:{
        fontSize  : 50,
        fontWeight: 'bold',
        alignContent:"center"
      },
      task__right:{
        flex          : 0.3,
        flexDirection : 'column',
        justifyContent: 'center',
        height        : 140,
        margin:10
      },
      task__description:{
          fontSize  : 13,
          paddingTop: 10,
          justifyContent:'flex-start',
          alignContent:"flex-start"
        },
      task__doneBtn:{
          flex          : 0.6,
          justifyContent: 'center',
          alignItems:'center',
          backgroundColor:'#64dd17',
    },
      task__deleteBtn:{
          flex          : 0.4,
          justifyContent: 'center',
          alignItems:'center',
          backgroundColor:'red'
         }
});