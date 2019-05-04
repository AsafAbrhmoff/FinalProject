import React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = ({ goBack, Title }) => {
    return (
        <Appbar.Header style={{ backgroundColor: '#08B2FF' }}>
            <Appbar.BackAction
                onPress={goBack}
            />
            <Appbar.Content
                title={Title}
            />
        </Appbar.Header>
    );
};

export default AppBar;
