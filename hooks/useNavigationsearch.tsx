import { colors } from '@/constants/tokens';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { SearchBarProps } from 'react-native-screens';

const defaultSearchOptions: SearchBarProps = {
    tintColor: colors.primary,
    hideWhenScrolling: false,
    barTintColor: colors.bg1,
    textColor: colors.text,
    headerIconColor: colors.text,
};

export const useNavigationsearch = ({ searchBarOptions }: { searchBarOptions?: SearchBarProps }) => {
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false); // Track if the search bar is focused
    const navigation = useNavigation();

    const handleOnChangeText: SearchBarProps['onChangeText'] = ({ nativeEvent: { text } }) => {
        setSearch(text);
    };

    const handleOnFocus = () => {
        setIsFocused(true); // Set focus state to true when search bar is clicked
    };

    const handleOnBlur = () => {
        setIsFocused(false); // Reset focus state when search bar loses focus
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                ...defaultSearchOptions,
                ...searchBarOptions,
                onChangeText: handleOnChangeText,
                onFocus: handleOnFocus, // Trigger when search bar is clicked
                onBlur: handleOnBlur, // Reset when search bar loses focus
            },
            headerStyle: {
                backgroundColor: colors.bg,
            },
        });
    }, [navigation, searchBarOptions]);

    return { search, isFocused }; // Return the `isFocused` state
};
