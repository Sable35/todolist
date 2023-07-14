import { Tree, Tooltip } from 'antd';
import {PlusOutlined, MinusOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import './Tree.css';
import TaskListService from "../services/TaskListService";
import {useDispatch} from "react-redux";
import {useState} from "react";
import EditTaskModal from "./EditTaskModal";

const { TreeNode } = Tree;

const MyTree = ({ data }) => {
    const dispatch = useDispatch()
    const [isVisible, setIsVisible] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);

    const handleEdit = (node) => {
        setSelectedNode(node);
        setIsVisible(true);
    };

    const handleCloseModal = () => {
        setIsVisible(false);
    };
    const generateTreeNodes = (nodes, parentId = 0) => {
        if (!nodes || !Array.isArray(nodes)) {
            return null;
        }

        return nodes
            .filter(node => node.parentTaskId === parentId)
            .map(node => (
                <TreeNode key={node.id} title={renderTreeNodeTitle(node)} className="tree-node">
                    {generateTreeNodes(nodes, node.id)}
                </TreeNode>
            ));
    };

    const renderTreeNodeTitle = (node) => (
        <div className="tree-node-title">
            <span className="node-name">{node.name}</span>
            <div className="btn-group">
                <Tooltip title="Редактировать">
                    <EditOutlined onClick={() => handleEdit(node)} className="btn-icon" />
                </Tooltip>
                <Tooltip title="Добавить">
                    <PlusOutlined onClick={() => handleAdd(node)} className="btn-icon" />
                </Tooltip>
                <Tooltip title="Удалить">
                    <DeleteOutlined onClick={() => handleDelete(node)} className="btn-icon" />
                </Tooltip>
            </div>

        </div>
    );

    const handleAdd = (node) => {
        TaskListService.createTask({"name":"Новая подзадача","parentTask":{"id":node.id}, "taskList":{"id":node.listTaskId}},dispatch)
        console.log('Добавление элемента:', node);
    };

    const handleDelete = (node) => {
        TaskListService.deleteTask(node.id,dispatch)
        console.log('Удаление элемента:', node);
    };

    return (
        <div>
            <Tree showIcon>
                {generateTreeNodes(data)}
            </Tree>
            {selectedNode && (
                <EditTaskModal isVisible={isVisible} Task={selectedNode} onCancel={handleCloseModal} />
            )}
        </div>
    );
};

export default MyTree;