import React, { useState } from 'react';
import {Modal, Form, Input, Button, Select} from 'antd';
import TaskListService from "../services/TaskListService";
import {useDispatch, useSelector} from "react-redux";
import CategoryService from "../services/CategoryService";

const EditCategoryModal = ({categories, currentUser, isVisible, onCancel}) => {
    const [editedCategory, setEditedCategory] = useState(categories);
    const dispatch = useDispatch()

    const handleInputChange = (name, value) => {
        setEditedCategory((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSaveClick = () => {
        CategoryService.updateCategory({"id":editedCategory.id, "name": editedCategory.name}, dispatch)
    };

    const handleDeleteClick = () => {
        CategoryService.deleteCategory(editedCategory.id, dispatch)
    };

    return (
        <Modal title="Редактирование Категории" open={isVisible} onCancel={onCancel} onOk={handleSaveClick}>
            <Form>
                <Form.Item label="Выберите категорию">
                    <Select value={editedCategory.id} onChange={(value) => handleInputChange('id', value)}>
                        {categories.map((option) => (
                            <Select.Option key={option.id} value={option.id}>
                                {option.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Название категории">
                    <Input value={editedCategory.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                </Form.Item>
                <Button danger onClick={handleDeleteClick}>
                    Удалить выбранную категорию
                </Button>
            </Form>
        </Modal>
    );
};

export default EditCategoryModal;