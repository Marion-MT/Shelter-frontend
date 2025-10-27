import { StyleSheet, Image, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { ImageSourcePropType } from 'react-native';

type GaugeProps = {
  icon: ImageSourcePropType;
  color: string;
  percent: number;
  indicator: number;
};

export default function Gauge({ icon, color, percent, indicator } : GaugeProps) {
 
  return (
    <View style={styles.container}>
        <View style={styles.indicatorContainer}>
        {indicator > 0 && <FontAwesome name={'circle' as any} size={indicator} color='#ae9273' />}
        </View>

        <View style={styles.gaugeGlobalContent}>                               
            <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: `${percent}%`, backgroundColor: color, borderTopLeftRadius: percent <= 95 ? 0 : 10, borderTopRightRadius: percent <= 95 ? 0 : 10, }]} >

                </View>
            </View>
            <Image source={icon} style={styles.icon} />
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
container: {

    justifyContent: 'center',
    alignItems: 'center',
    gap : 5

},
indicatorContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
},
gaugeGlobalContent:{
    width: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

},
icon:{
    width: 35,
    height: 35,
    marginTop: -20,

},
barContainer: {
    width: 18,
    height: 70,
    borderRadius: 9,
    backgroundColor: '#554946',

    borderColor: '#242120',
    borderWidth: 4,
    justifyContent: 'flex-end'

},
barFill: {
    width: '100%',
    height: '90%',
    borderRadius: 10,
    backgroundColor: '#8378b7'
}
});
