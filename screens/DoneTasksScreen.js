import React, { useEffect , useState} from 'react';
import {StyleSheet , View, SafeAreaView,ScrollView} from 'react-native';

import * as SQLite from 'expo-sqlite';
import Task from '../components/Task';

const db = SQLite.openDatabase("TaskManager.db");
let i=0;
function Items({onPressDelete,onPressDone}){
    const [tasks, setTasks] = useState(null);

    useEffect(()=>{
        db.transaction(tx=>{
            tx.executeSql(`select * from taskManager where status = 1;`,
            [],
            (_, { rows: { _array } }) => {
                setTasks(_array);
            },
            (transact,err) => console.log('We have encounter an Error', err));
        });
    },[])

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
                doneClick   = {()=> onPressDone && onPressDone(t.id)}
                deleteClick = {()=> onPressDelete && onPressDelete(t.id)}
                btnTitle={"Undone"}
                />
            ))}
        </View>
    );
}

const DoneTasksScreen = ({navigation}) =>{
    const [forceUpdate, forceUpdateId]    = useForceUpdate()

    return(
        <SafeAreaView style         = {styles.container}>
        <ScrollView   style         = {styles.containerBody}>
        <Items        key   = {`forceupdate-done-${forceUpdateId}`}
                      onPressDelete = {id=>{ 
              db.transaction(
              tx =>{
                tx.executeSql(`delete from taskManager where id = ?;`,[id]);
              },null,forceUpdate
          )}}
          onPressDone={id=>db.transaction(
              tx=>{
                tx.executeSql(`update taskManager set status = 0 where id = ?;`,[id]);
              },null,forceUpdate
          )}
      />
      </ScrollView>
      </SafeAreaView>
    );
}

export default DoneTasksScreen;

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
        flex           : 1,
        width          : '100%',
        height         : '100%',
        backgroundColor: 'white',
        flexDirection  : 'column',
    },
});