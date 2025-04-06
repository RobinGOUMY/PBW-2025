import React, { useState } from 'react';
import { createProject } from '../services/apiService';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [valuation, setValuation] = useState('');
  const [equityOffered, setEquityOffered] = useState('');
  const [durationDays, setDurationDays] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = { name, fundingGoal, valuation, equityOffered, durationDays, founderAddress: '0xYourAddress' };
    await createProject(projectData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" value={fundingGoal} onChange={(e) => setFundingGoal(e.target.value)} />
      <input type="number" value={valuation} onChange={(e) => setValuation(e.target.value)} />
      <input type="number" value={equityOffered} onChange={(e) => setEquityOffered(e.target.value)} />
      <input type="number" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default CreateProject;
