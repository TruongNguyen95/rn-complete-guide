import React, { useState } from 'react';
import { StyleSheet, Button, FlatList, SafeAreaView } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals =>  [
      ...currentGoals, 
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id != goalId);
    });
  }

  const cancelGoalHandler = () => {
    setIsAddMode(false)
  }

  return (
    <SafeAreaView style={styles.container}>
    <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancelGoal={cancelGoalHandler}/>
      <FlatList
      keyExtractor={(item, index) => item.id}
      data={courseGoals}
      renderItem={itemData => (
        <GoalItem 
          onDelete={() => removeGoalHandler(itemData.item.id)} 
          title={itemData.item.value}/>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70
  },
});
