import React, {useState} from 'react';
import { Card, Button, Tooltip } from 'antd';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import MyTree from './MyTree';
import TaskListService from "../services/TaskListService";
import {useDispatch} from "react-redux";
import EditTaskListModal from "./EditTaskListModal";

const TreeCard = ({ cardData }) => {
    const { name, description, tasks } = cardData;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()

    const handleEditClick = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddTask = () => {
        TaskListService.createTask({"name": "новая подзадача", "taskList": cardData, "parenTask": null},dispatch)
    };

    const handleDeleteCard = () => {
      TaskListService.deleteTaskList(cardData.id,dispatch)
    };

    return (
        <>{console.log(tasks)}
            <Card
                title={
                    <>
                        {name}
                        <div style={{ float: 'right' }}>
                            <Tooltip title="Редактировать карточку">
                                <Button style={{marginRight: "10px"}} shape="circle" icon={<EditOutlined />} onClick={handleEditClick} />
                            </Tooltip>
                            <Tooltip title="Добавить подзадачу">
                                <Button style={{marginRight: "10px"}} shape="circle" icon={<PlusOutlined />} onClick={handleAddTask} />
                            </Tooltip>
                            <Tooltip title="Удалить карточку">
                                <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDeleteCard} />
                            </Tooltip>
                        </div>
                    </>
                }
                style={{ width: 300, marginRight: "20px", marginBottom: "20px"}}
            >
                <p>{description}</p>
                <MyTree data={tasks} />
            </Card>
            <EditTaskListModal taskList={cardData} isVisible={isModalVisible} onCancel={handleCancel}/>
        </>

    );
};

export default TreeCard;