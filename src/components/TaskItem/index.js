import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { COLORS } from 'constants';

const TaskItem = ({
  description,
  dueTime,
  dueDay,
  hasReminder,
  isCompleted,
  toggleCompleted,
  onEdit,
}) => {
  return (
    <TouchableOpacity
      onLongPress={onEdit}
      style={[
        styles.wrapper,
        {
          backgroundColor: isCompleted ? 'gray' : 'white',
        },
      ]}
    >
      <CheckBox
        onPress={toggleCompleted}
        checked={isCompleted}
        uncheckedIcon="square"
        checkedIcon="check-square"
        containerStyle={styles.checkBoxContainer}
      />
      <Text
        style={[
          styles.taskText,
          {
            textDecorationLine: isCompleted ? 'line-through' : 'none',
            fontStyle: isCompleted ? 'italic' : 'normal',
          },
        ]}
      >
        {description}
      </Text>

      {(dueTime || hasReminder) && (
        <View style={styles.iconsContainer}>
          <View style={styles.iconsWrapper}>
            {dueTime && (
              <View style={styles.dueDateWrapper}>
                <FontAwesome name="clock" />
                <View style={styles.dueDateTimeWrapper}>
                  <Text style={styles.timeClock}>{dueTime}</Text>
                  <Text style={styles.timeDate}>{dueDay}</Text>
                </View>
              </View>
            )}
            {hasReminder && <FontAwesome name="bell" />}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default TaskItem;
export { TaskItem };

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 10,
    paddingRight: 15,
    paddingVertical: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  checkBoxContainer: {
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  taskText: {
    color: 'black',
    flex: 1,
  },
  iconsContainer: {
    width: 90,
    marginLeft: 6,
  },
  iconsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateTimeWrapper: {
    flex: 1,
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  timeClock: { fontWeight: 'bold', fontSize: 17, color: 'black' },
  timeDate: { fontSize: 13, color: 'black' },
});
