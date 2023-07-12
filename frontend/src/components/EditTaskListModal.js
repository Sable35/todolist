import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const EditTaskListModal = ({ taskList, isVisible, onCancel, onSave, statusOptions, categoryOptions, priorityOptions, regularityOptions }) => {
    const [editedTaskList, setEditedTaskList] = useState(taskList);

    const handleInputChange = (name, value) => {
        setEditedTaskList((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSaveClick = () => {
        onSave(editedTaskList);
    };

    return (
        <Modal title="Редактирование задачи" visible={isVisible} onCancel={onCancel} onOk={handleSaveClick}>
            <Form>
                <Form.Item label="Название">
                    <Input value={editedTaskList.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                </Form.Item>
                <Form.Item label="Описание">
                    <Input value={editedTaskList.description} onChange={(e) => handleInputChange('description', e.target.value)} />
                </Form.Item>
                <Form.Item label="Статус">
                    <Select value={editedTaskList.status} onChange={(value) => handleInputChange('status', value)}>
                        {statusOptions.map((option) => (
                            <Select.Option key={option} value={option.name}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Категория">
                    <Select value={editedTaskList.category} onChange={(value) => handleInputChange('category', value)}>
                        {categoryOptions.map((option) => (
                            <Select.Option key={option} value={option.name}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Приоритет">
                    <Select value={editedTaskList.priority} onChange={(value) => handleInputChange('priority', value)}>
                        {priorityOptions.map((option) => (
                            <Select.Option key={option} value={option.name}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Регулярность">
                    <Select value={editedTaskList.regularity} onChange={(value) => handleInputChange('regularity', value)}>
                        {regularityOptions.map((option) => (
                            <Select.Option key={option} value={option.name}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Регулярность">
                    <Select value={editedTaskList.regularity} onChange={(value) => handleInputChange('regularity', value)}>
                        {regularityOptions.map((option) => (
                            <Select.Option key={option} value={option.name}>
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