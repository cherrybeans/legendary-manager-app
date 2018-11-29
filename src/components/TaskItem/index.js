import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FontAwesome } from 'react-native-vector-icons';

import { COLORS, FONTS, FONT_SIZE } from 'constants';

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
      onPress={toggleCompleted}
      onLongPress={onEdit}
      style={{
        backgroundColor: isCompleted ? '#e9e9e9' : '#f7f7f7',
        flexDirection: 'row',
        borderRadius: 5,
        borderColor: '#eeeeee',
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        marginVertical: 5,
      }}
    >
      {isCompleted ? (
        <FontAwesome name="check-square" size={25} color="#cdcdcd" />
      ) : (
        <FontAwesome name="square" size={25} color="#d7d7d7" />
      )}

      <Text
        style={{
          textDecorationLine: isCompleted ? 'line-through' : 'none',
          marginLeft: 10,
          fontFamily: isCompleted ? FONTS.ITALIC : FONTS.BODY,
          fontSize: FONT_SIZE.sm,
        }}
      >
        {description}
      </Text>

      {(dueTime || hasReminder) && (
        <View style={{}}>
          <View style={{}}>
            {dueTime && (
              <View style={{}}>
                <FontAwesome name="clock" />
                <View style={{}}>
                  <Text style={{}}>{dueTime}</Text>
                  <Text style={{}}>{dueDay}</Text>
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
