/**
 *
 * @flow
 */

'use strict';

import React from 'react';
import {Navigator} from 'react-native';

import TabsView from './tabs/TabsView';
import TaskView from './tabs/tasks/TaskView';
import SettingsListView from './settings/SettingsListView';
import AddTask from './tabs/tasks/AddTask';
import Login from './login/Login';
import Signup from './signup/Signup';

export default class EduChainNavigator extends React.Component {
    renderScene(route: Object, navigator: Navigator) {
        switch (route.id) {
            case 'signup':
                return (<Signup navigator={navigator} />);
            case 'login':
                return (<Login navigator={navigator} />);
            case 'settings':
                return (<SettingsListView navigator={navigator} />);
            case 'task':
                return (<TaskView task={route.task} navigator={navigator} />);
            case 'addTask':
                return (<AddTask navigator={navigator} />);

            case 'home':
            default:
                return (<TabsView navigator={navigator} />);
        }
    }

    render() {
        // const {user} = store.getState();
        // `{}` returns TabsView via the switch statement's `default` case
        // const initialRoute = user.isLoggedIn ? {} : {id: 'login'};

        return (
            <Navigator
                ref="navigator"
                initialRoute={{id: 'login'}}
                renderScene={this.renderScene}
            />
        );
    }

}
