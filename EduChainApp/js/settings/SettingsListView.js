/**
 * Created by BK on 28/06/16.
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    Text,
    View,
    ListView,
    StyleSheet,
} from 'react-native';
import GenericListRow from '../common/GenericListRow';
import GlobalStyles from '../common/GlobalStyles';
import Header from '../common/Header';

const settingsItems = [
    {title: 'General', subtitle: 'Adjust general settings related to the app'},
    {title: 'Profile', subtitle: 'Modify the details of your profile or upload a new profile picture'},
    {title: 'Team', subtitle: 'Adjust your team\'s settings & preferences'},
    {title: 'Tasks', subtitle: 'Adjust how tasks are represented and managed'},
    {title: 'Send Feedback', subtitle: 'Let us know about your suggestions or bugs you\'ve found!'},
    {title: 'Log out', subtitle: 'Log out of the app'}
]

type State = {
    dataSource: Object
};

export default class SettingsListView extends React.Component {
    state: State;

    constructor() {
        super();
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            loaded: false,
        }
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(settingsItems)
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    title="Settings"
                    leftItem={{
                        title: "Back",
                        layout: "icon",
                        icon: "ios-arrow-back",
                        onPress: () => this.props.navigator.pop()
                    }}
                />
                <ListView
                    scrollEnabled={false}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <GenericListRow
                            style={styles}
                            rowData={rowData}
                            onPress={() => {/* TODO */}}
                        />
                    }
                    renderSeparator={(sectionId, rowId) =>
                        <View key={rowId} style={GlobalStyles.separator} />
                    }
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
