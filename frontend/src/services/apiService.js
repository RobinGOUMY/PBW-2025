import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createProject = async (projectData) => {
  try {
    await api.post('/create-project', projectData);
  } catch (error) {
    console.error('Error creating project:', error);
  }
};

export const invest = async (investmentData) => {
  try {
    await api.post('/invest', investmentData);
  } catch (error) {
    console.error('Error investing:', error);
  }
};

export const withdrawFunds = async (withdrawalData) => {
  try {
    await api.post('/withdraw-funds', withdrawalData);
  } catch (error) {
    console.error('Error withdrawing funds:', error);
  }
};
