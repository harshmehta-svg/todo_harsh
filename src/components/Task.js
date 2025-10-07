// src/components/Task.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import { useCompanyContext } from './context/CompanyContext';
import { useRegionContext } from './context/RegionContext';
import { useAnalytics } from '../hooks/useAnalytics';

const Task = ({ task, onDelete }) => {
    const { setUser } = useUserContext();
    const { setCompany } = useCompanyContext();
    const { setRegion } = useRegionContext();
    const navigate = useNavigate();
    const { trackEvent } = useAnalytics();

    const handleDelete = () => {
        trackEvent('task_deleted', {
            task_id: task.id,
        });
        onDelete(task.id);
    };

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <button onClick={handleDelete}>Delete Task</button>
        </div>
    );
};

const handleComplete = ({ task }) => {
    trackEvent('task_completed', {
        task_id: task.id,
        user_id: task.user_id,
        company_id: task.company_id,
        region_id: task.region_id,
    });
};

export default Task;