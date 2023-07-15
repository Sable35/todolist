import React, {useEffect, useState} from 'react';
import {Modal, Form, Input, Select, DatePicker} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import TaskListService from "../services/TaskListService";
import CategoryService from "../services/CategoryService";
import moment from 'moment';
import dayjs from "dayjs";

const EditTaskListModal = ({ taskList, isVisible, onCancel}) => {
    const [editedTaskList, setEditedTaskList] = useState(taskList);
    const { user: currentUser } = useSelector((state) => state.auth);
    const statuses = useSelector((state) => state.tasklists.statuses);
    const categories = useSelector((state) => state.categories.categories);
    const priorities = useSelector((state) => state.tasklists.priorities);
    const regularities = useSelector((state) => state.tasklists.regularities);
    const dateFormat = "YYYY-MM-DD HH:mm:ss";
    const disabledDate = (current) => {
        const yesterday = dayjs().subtract(1, 'day').endOf('day');
        return current && current < yesterday;
    };
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser){
            TaskListService.getStatuses(dispatch);
            TaskListService.getPriorities(dispatch);
            TaskListService.getRegularities(dispatch);
            CategoryService.getCategories(dispatch);
        }
    }, [currentUser]);

    useEffect(() => {
        setEditedTaskList({
            ...taskList,
            status: taskList.status.id,
            category: taskList.category.id,
            priority: taskList.priority.id,
            regularity: taskList.regularity.id
        });
    }, [taskList]);

    const handleInputChange = (field, value) => {
        setEditedTaskList(prevState => ({
            ...prevState,
            [field]: value
        }));
    };


    const handleDateChange = (date) => {
        if (date){
            setEditedTaskList((prevTask) => ({ ...prevTask, "dateNotify": date.format("YYYY-MM-DD HH:mm:ss")}));
        } else {
            setEditedTaskList((prevTask) => ({ ...prevTask, "dateNotify": null}));
        }
    };

    const handleSaveClick = () => {
        TaskListService.updateTaskList({
                "id": taskList.id,
                "name": editedTaskList.name,
                "description": editedTaskList.description,
                "status": {"id": editedTaskList.status},
                "category": {"id":editedTaskList.category},
                "priority": {"id":editedTaskList.priority},
                "regularity": {"id": editedTaskList.regularity},
                "dateNotify": editedTaskList.dateNotify},
            dispatch)
    };
    return (
        <Modal title="Редактирование задачи" open={isVisible} onCancel={onCancel} onOk={handleSaveClick}>
            <Form>
                <Form.Item label="Название">
                    <Input value={editedTaskList.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                </Form.Item>
                <Form.Item label="Описание">
                    <Input.TextArea value={editedTaskList.description} onChange={(e) => handleInputChange('description', e.target.value)} rows={5}/>
                </Form.Item>
                <Form.Item label="Статус">
                    <Select value={editedTaskList.status} onChange={(value) => handleInputChange('status', value)}>
                        {statuses.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Категория">
                    <Select value={editedTaskList.category} onChange={(value) => handleInputChange('category', value)}>
                        {categories.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Приоритет">
                    <Select value={editedTaskList.priority} onChange={(value) => handleInputChange('priority', value)}>
                        {priorities.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Регулярность">
                    <Select value={editedTaskList.regularity} onChange={(value) => handleInputChange('regularity', value)}>
                        {regularities.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Дата">
                    {editedTaskList.dateNotify ? (
                        <DatePicker
                            format={dateFormat}
                            defaultValue={dayjs(editedTaskList.dateNotify, dateFormat)}
                            disabledDate={disabledDate}
                            onChange={handleDateChange}
                            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                        />
                    ) : (
                        <DatePicker
                            format={dateFormat}
                            disabledDate={disabledDate}
                            onChange={handleDateChange}
                            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                        />
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTaskListModal;