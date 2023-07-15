import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import TaskListService from "../services/TaskListService";
import {useDispatch} from "react-redux";

const EditTaskModal = ({ Task, isVisible, onCancel}) => {
    const [editedTask, setEditedTask] = useState(Task);
    const dispatch = useDispatch()

    const handleInputChange = (name, value) => {
        setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSaveClick = () => {
        if (Task.parentTaskId === null){
            TaskListService.updateTask({"id": Task.id, "name": editedTask.name, "taskList":{"id":Task.listTaskId},"parentTask": null},dispatch)
        }else TaskListService.updateTask({"id": Task.id, "name": editedTask.name, "taskList":{"id":Task.listTaskId},"parentTask":{"id":Task.parentTaskId}},dispatch)
    };

    return (
        <Modal title="Редактирование подзадачи" open={isVisible} onCancel={onCancel} onOk={handleSaveClick}>
            <Form>
                <Form.Item label="Подзадача">
                    <Input value={editedTask.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTaskModal;