import React, { useEffect , useState} from 'react';
import { View, StyleSheet, SafeAreaView , ScrollView,TouchableOpacity,Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as SQLite from 'expo-sqlite';
import Task from '../components/Task';
import FormModal from '../components/FormModal'

const db = SQLite.openDatabase("TaskManager.db");

function Items({onPressDelete,onPressDone}){
    const [tasks, setTasks] = useState(null);

    useEffect(()=>{
        db.transaction(tx=>{
            tx.executeSql(`select * from taskManager where status = 0;`,
            [],
            (_, { rows: { _array } }) => {
                setTasks(_array);
            },
            (transact,err) => console.log('We have encounter an Error', err));
        });
    },[tasks])

    if(tasks===null || tasks.length===0){
        return null;
    }

    return(
        <View>
            {tasks.map((t)=> (
                <Task 
                key         = {t.id}
                id          = {t.id}
                title       = {t.title}
                description = {t.description}
                status      = {t.status}
                doneClick={()=> onPressDone && onPressDone(t.id)}
                deleteClick={()=> onPressDelete && onPressDelete(t.id)}
                btnTitle={"Done"}
                />
            ))}
        </View>
    );
}

const HomeScreen = ({navigation}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [titleText, setTitleText]       = useState('');
    const [descText, setDescText]         = useState('');
    const [forceUpdate, forceUpdateId]    = useForceUpdate()

    useEffect(()=>{
        db.transaction(tx=>{
          tx.executeSql(
            `create table if not exists taskManager (id INTEGER PRIMARY KEY NOT NULL, title TEXT, description TEXT, status INT);`,
          [],
          console.log("Success creating table"),
          (e,ee)=>{console.log("Error creating table"+ee);});
        });
      },[]);

      const addTask = (title,desc) =>{
        db.transaction(tx=>{
    
          tx.executeSql(
            `insert into taskManager(title,description,status) values(?,?,0);`,
            [title,desc],);
      },null,forceUpdate);
    }

      return (
      <SafeAreaView style = {styles.container}>
      <ScrollView   style = {styles.containerBody}>
      <Items        key   = {`forceupdate-done-${forceUpdateId}`}
          onPressDelete={id=>{ 
              db.transaction(
              tx =>{
                tx.executeSql(`delete from taskManager where id = ?;`,[id]);
              },null,forceUpdate
          )}}
          onPressDone={id=>db.transaction(
              tx=>{
                tx.executeSql(`update taskManager set status = 1 where id = ?;`,[id]);
              },null,forceUpdate
          )}
      />
      </ScrollView>
      <View style = {styles.footer}>
      <FormModal 
                modalVisible = {modalVisible}
                
                placeholderTitle  = {'Title'}
                onChangeTextTitle = {(titleText)=>setTitleText((titleText))}
                valueTitle        = {titleText}
                multilineTitle    = {false}

                placeholderDesc   = {'Description'}
                onChangeTextDesc  = {(descText)=>setDescText(descText)}
                valueDesc         = {descText}
                multilineDesc     = {true}
                numberOfLinesDesc = {10}

                cancelClick = {()=>setModalVisible(false)}
                addClick    = {()=>{
                    addTask(titleText,descText); setDescText("");
                    setTitleText("");
                    setModalVisible(false);}}
                />
      <Ionicons name    = "ios-add-circle" size = {70}
                color   = "black"
                onPress = {() => {setModalVisible(true);}}
                style   = {styles.addBtn}
              />
      <TouchableOpacity 
                              style = {styles.doneTasksBtn}
                              onPress={()=>navigation.navigate('DoneTasksScreen')}>
                        <Text style = {{ fontSize: 14, color: '#fff' }}>See done tasks</Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
      );
}

export default HomeScreen;

function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
  }

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        flexDirection  : 'column',
        backgroundColor: '#fff'
      },
    containerBody: {
        flex           : 0.8,
        width          : '100%',
        height         : '100%',
        backgroundColor: 'white',
        flexDirection  : 'column',
    },
    conainerFooter: {
        flex           : 0.2,
        backgroundColor: 'black',
        width          : '100%',
        height         : '100%',
        flexDirection  : 'row',
        alignItems     : 'center',
        justifyContent : 'center',
      },
      doneTasksBtn: {
        backgroundColor: 'green',
        alignItems     : 'center',
        justifyContent : 'center',
        alignContent   : 'center',
        alignSelf      : 'center',
        borderRadius   : 5,
        borderWidth    : 1,
        borderColor    : 'green',
        margin         : 10,
        width          : 150,
        height         : 40
    },
    addBtn:{
        backgroundColor: 'white',
        alignSelf      : 'center'
    },
});