import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

const TabIcon = ({ label, icon, color, size = 30 }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <FontAwesome name={icon} size={size} color={color} />
      {label && <Text style={{ color: color }}>{label}</Text>}
    </View>
  );
};

export default TabIcon;
export { TabIcon };
