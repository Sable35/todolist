import React, { useState } from 'react';
import {Button, Tree} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TreeNode } = Tree;

const MyTree = ({ items = [] }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleButtonClick = (task) => {
        // Выполните здесь нужные действия при нажатии на кнопку
        console.log(`Вы нажали на кнопку элемента с id: ${task.id}`);
    };

    const handleNodeMouseEnter = (itemId) => {
        setSelectedItemId(itemId);
    };

    const handleNodeMouseLeave = () => {
        setSelectedItemId(null);
    };
    const renderTreeNodes = (data, parentId = null) => {
        return data
            .filter((task) => task.parentTaskId === parentId)
            .map((task) => (
                <TreeNode
                    title={
                        <span>
                {task.name}
                <Button onClick={() => handleButtonClick(task)} type="link" size="small" icon={<PlusOutlined />} />
          </span>
                    }
                    key={task.id}
                    dataRef={task}
                >
                    {renderTreeNodes(data, task.id)}
                </TreeNode>
            ));
    };


    return <Tree defaultExpandAll>{renderTreeNodes(items)}</Tree>;
};

export default MyTree;