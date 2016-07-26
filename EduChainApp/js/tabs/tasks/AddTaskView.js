/**
 *
 * @flow
 */

'use strict';

import React from 'react';
import {
    View,
    StyleSheet,
    Navigator
} from 'react-native';
import t from 'tcomb-form-native';
import Button from 'react-native-button';
import GlobalStyles from '../../common/GlobalStyles';
import Header from '../../common/Header';
import ENV from '../../common/Environment';
import type {Task} from '../../reducers/tasks';

type Props = {
    navigator: Navigator
}

export default class AddTaskView extends React.Component {
    constructor(props: Props) {
        super(props);
    }

    async addTask(task: Task): Promise {
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task)
        };

        try {
            let response = await fetch(ENV.__API_BRIDGE+'/tasks', request);
            let isOverwrite = await response.text();
            console.info("addTask() -> isOverwrite?: ", isOverwrite);
        } catch (err) {
            console.error("addTask() -> Error: ", err);
        }
    }

    onPress() {
        const task = this.refs.form.getValue();
        if (!task) {
            console.info("Form returned null, mandatory fields missing.");
            return null;
        }
        // temporary hardcoded fill
        let testTask = {
            ...task,
            id: "formTask0",
            complete: "IMPLEMENT ME",
            reward: "200"
        };
        console.log("Submitted a task: ", testTask);
        this.addTask(testTask);
    }

    render() {
        return (
            <View>
                <Header
                    title="Add Task"
                    leftItem={{
                        title: "Back",
                        layout: "icon",
                        icon: "ios-arrow-back",
                        onPress: () => this.props.navigator.pop()
                    }}
                 />
                <View style={[GlobalStyles.contentWrapper, styles.container]}>
                     <Form
                         ref="form"
                         type={TaskForm}
                         options={options}
                         value={defaultValues}
                     />
                     <Button
                         containerStyle={GlobalStyles.buttonContainer}
                         style={styles.button}
                         onPress={this.onPress.bind(this)}
                     >
                         Add Task
                     </Button>
                 </View>
            </View>
        );
    }
} // END CLASS

const Form = t.form.Form;
const Status = t.enums({
    "To Do": "To Do",
    "Completed": "Completed"
});
const TaskForm = t.struct({
    title: t.String,
    desc: t.String,
    status: Status
    // participants: t.maybe(t.String) // TODO GH #41
});

const defaultValues = {
    title: '',
    desc: '',
    status: "To Do"
};

const options = {
    fields: {
        title: {
            placeholder: 'Add a title...'
        },
        desc: {
            label: 'Description',
            placeholder: 'Let people know what this task is about'
        },
        status: {
            nullOption: false
        },
        participants: {
            placeholder: 'Add others to this task with "@name"'
        }
    }
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
});