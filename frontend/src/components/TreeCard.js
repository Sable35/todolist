import React from 'react';
import { Card } from 'antd';
import MyTree from './MyTree';

const TreeCard = ({ cardData }) => {
    const { name, description, tasks } = cardData;

    return (
        <Card title={name} style={{ width: 300 }}>
            <p>{description}</p>
            <MyTree items={tasks} />
        </Card>
    );
};

export default TreeCard;