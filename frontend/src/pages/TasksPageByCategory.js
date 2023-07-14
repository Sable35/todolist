import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Tree, Input, Select, DatePicker, Button} from 'antd';
import TreeCard from '../components/TreeCard';
import TaskListService from "../services/TaskListService";

const { Option } = Select;

const TasksPageByCategory = ({IdCategory}) => {
    // Получение данных из Redux
    const treeData = useSelector((state) => state.tasklists.tasklists);
    const statuses = useSelector((state) => state.tasklists.statuses);
    const priorities = useSelector((state) => state.tasklists.priorities);
    const categories = useSelector((state) => state.categories.categories);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [filteredData, setFilteredData] = useState(treeData);
    const [searchName, setSearchName] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const dispatch = useDispatch()

    const category = categories.find((category) => category.id === IdCategory);

    // Применяем фильтры
    useEffect(() => {
        let filtered = treeData;

        if (searchName) {
            filtered = filtered.filter(cardData => cardData.name.toLowerCase().includes(searchName.toLowerCase()));
        }

        if (selectedStatus) {
            filtered = filtered.filter(cardData => cardData.status.id === selectedStatus);
        }

        if (selectedPriority) {
            filtered = filtered.filter(cardData => cardData.priority.id === selectedPriority);
        }

        if (selectedDate) {
            filtered = filtered.filter(cardData => {
                const cardDate = new Date(cardData.date);
                const selectedDateTime = new Date(selectedDate);
                return cardDate >= selectedDateTime;
            });
        }

        if (IdCategory) {
            filtered = filtered.filter(cardData => parseInt(cardData.category.id) === parseInt(IdCategory));
        }

        setFilteredData(filtered);
    }, [treeData, searchName, selectedStatus, selectedPriority, selectedDate]);

    useEffect(() => {
        if (currentUser) {
            TaskListService.getTaskListsByCategory(dispatch, IdCategory);
            TaskListService.getStatuses(dispatch);
            TaskListService.getPriorities(dispatch);
        }
    }, [currentUser, IdCategory]);

    const handleNewTaskClick = () => {
        TaskListService.createTaskList({"name": "Новая задача", "description": "описание", "category": {"id": IdCategory}, "status":{"id": 1}, "priority":{"id": 1}, "regularity":{"id": 1}}, dispatch)
    };

    return (
        <>
            <div><h1  style={{fontSize:"25px"}}>{category}</h1></div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input style={{ minWidth: 200, marginRight: 10 }} placeholder="Поиск по имени" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                <Select style={{ minWidth: 150, marginRight: 10 }} placeholder="Выбор статуса" value={selectedStatus} onChange={(value) => setSelectedStatus(value)}>
                    {statuses.map((status) => (
                        <Option key={status.id} value={status.id}>{status.name}</Option>
                    ))}
                </Select>
                <Select style={{ minWidth: 150, marginRight: 10 }} placeholder="Выбор приоритета" value={selectedPriority} onChange={(value) => setSelectedPriority(value)}>
                    {priorities.map((priority) => (
                        <Option key={priority.id} value={priority.id}>{priority.name}</Option>
                    ))}
                </Select>
                <DatePicker style={{ minWidth: 150 }} placeholder="Выбор даты" showTime value={selectedDate} onChange={(date, dateString) => setSelectedDate(dateString)} />
            </div>
            <div style={{ margin: "15px 0" }}>
                <Button type="primary" onClick={handleNewTaskClick}>Новая задача</Button>
            </div>
            <div style={{ display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                margin: "20px 0"}}>
                {filteredData.map((cardData) => (
                    <TreeCard key={cardData.id} cardData={cardData} />
                ))}
            </div>
        </>
    );
};

export default TasksPageByCategory;