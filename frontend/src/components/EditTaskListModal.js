import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Select, DatePicker} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import TaskListService from "../services/TaskListService";
import CategoryService from "../services/CategoryService";
import moment from 'moment';

const EditTaskListModal = ({ taskList, isVisible, onCancel}) => {
    const [editedTaskList, setEditedTaskList] = useState(taskList);
    const { user: currentUser } = useSelector((state) => state.auth);
    const statuses = useSelector((state) => state.tasklists.statuses);
    const categories = useSelector((state) => state.categories.categories);
    const priorities = useSelector((state) => state.tasklists.priorities);
    const regularities = useSelector((state) => state.tasklists.regularities);
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser){
            TaskListService.getStatuses(dispatch);
            TaskListService.getPriorities(dispatch);
            TaskListService.getRegularities(dispatch);
            CategoryService.getCategories(dispatch);
        }
    }, [currentUser]);

    const handleInputChange = (name, value) => {
        setEditedTaskList((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleDateChange = (name, date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD HH:mm');
        setEditedTaskList((prevTask) => ({ ...prevTask, [name]: formattedDate }));
    };

    const handleSaveClick = () => {
        TaskListService.updateTaskList({
            "id": taskList.id,
            "name": editedTaskList.name,
            "description": editedTaskList.description,
            "status": editedTaskList.status,
            "category": editedTaskList.category,
            "priority": editedTaskList.priorities,
            "regularity": editedTaskList.regularity,
            "dateNotify": editedTaskList.dateNotify },
            dispatch)
    };

    return (
        <Modal title="Редактирование задачи" open={isVisible} onCancel={onCancel} onOk={handleSaveClick}>
            <Form>
                <Form.Item label="Название">
                    <Input defaultValue={editedTaskList.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                </Form.Item>
                <Form.Item label="Описание">
                    <Input.TextArea
                        defaultValue={editedTaskList.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={5}
                    />
                </Form.Item>
                <Form.Item label="Статус">
                    <Select
                        defaultValue={editedTaskList.status.id}
                        onChange={(value) => handleInputChange('status', value)}
                    >
                        {statuses.map((option) => (
                            <Select.Option
                                key={option.id}
                                value={option.id}
                            >
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Категория">
                    <Select defaultValue={editedTaskList.category.id} onChange={(value) => handleInputChange('category', value)}>
                        {categories.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Приоритет">
                    <Select defaultValue={editedTaskList.priority.id} onChange={(value) => handleInputChange('priority', value)}>
                        {priorities.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Регулярность">
                    <Select defaultValue={editedTaskList.regularity.id} onChange={(value) => handleInputChange('regularity', value)}>
                        {regularities.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Дата">
                    <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={moment(editedTaskList.datenotify, 'YYYY-MM-DD HH:mm:ss')}
                        onChange={(date) => handleDateChange('date', date)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTaskListModal;