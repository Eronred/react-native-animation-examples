import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming
}
    from 'react-native-reanimated';

const CarouselItem = ({ title }) => (
    <View style={styles.item}>
        <Text>{title}</Text>
    </View>
);

const Carousel = () => {

    const translateX1 = useSharedValue(0);
    const translateX2 = useSharedValue(0);
    const translateX3 = useSharedValue(0);

    const data = [
        'Item 1', 'Item 2',
        'Item 3', 'Item 4',
        'Item 5'];

    const dataDouble =
        [...data,
        ...data,
        ...data
        ]; // Duplicate the data

    useEffect(() => {

        
        translateX1.value = withRepeat(
            withTiming(
                -500,
                {
                    duration: 5000,
                    easing: Easing.linear
                }),
            -1,
            true
        );

        translateX2.value = withRepeat(
            withTiming(500, { duration: 5000, easing: Easing.linear }),
            -1,
            true
        );

        translateX3.value = withRepeat(
            withTiming(-500, { duration: 5000, easing: Easing.linear }),
            -1,
            true
        );
    }, []);

    const animatedStyle1 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX1.value }],
        };
    });

    const animatedStyle2 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX2.value }],
        };
    });

    const animatedStyle3 = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX3.value }],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.row, animatedStyle1]}>
                {dataDouble.map((item, index) => (
                    <CarouselItem key={index} title={item} />
                ))}
            </Animated.View>

            <Animated.View style={[styles.row, animatedStyle2]}>
                {dataDouble.map((item, index) => (
                    <CarouselItem key={index} title={item} />
                ))}
            </Animated.View>

            <Animated.View style={[styles.row, animatedStyle3]}>
                {dataDouble.map((item, index) => (
                    <CarouselItem key={index} title={item} />
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        height: 110,
    },
    item: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        margin: 5,
    },
});

export default Carousel;
