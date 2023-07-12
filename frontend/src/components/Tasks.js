import React from 'react';
import { useSelector } from 'react-redux';
import TreeCard from './TreeCard';

const TreeContainer = () => {
    // Получение данных из Redux
    const treeData = useSelector((state) => state.treeData);

    return (
        <div>
            {treeData.map((cardData) => (
                <TreeCard key={cardData.id} cardData={cardData} />
            ))}
        </div>
    );
};

export default TreeContainer;