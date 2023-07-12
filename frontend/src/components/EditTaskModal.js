import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

const EditTaskModal = ({ Task, isVisible, onCancel, onSave }) => {
    const [editedTask, setEditedTask] = useState(Task);

    const handleInputChange = (name, value) => {
        setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSaveClick = () => {
        onSave(editedTask);
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