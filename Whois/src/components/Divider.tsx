import React from 'react';
import { View } from 'react-native';


const Divider: React.FC<{height?: number}> = ({height=10}) => {
  return (
    <View style={{height:height}}></View>
  )
}

export default Divider