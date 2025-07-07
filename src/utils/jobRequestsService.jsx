// src/utils/jobRequestsService.js

const JOB_REQUESTS_KEY = 'craftconnect_requests';

export const getJobRequests = () => {
  const data = JSON.parse(localStorage.getItem(JOB_REQUESTS_KEY));
  return data || [];
};

export const setJobRequests = (requests) => {
  localStorage.setItem(JOB_REQUESTS_KEY, JSON.stringify(requests));
};

export const createJobRequest = (request) => {
  const requests = getJobRequests();
  const newRequest = {
    ...request,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    artisanId: null,
    scheduledAt: null,
    completedAt: null,
    rating: null,
  };
  requests.push(newRequest);
  setJobRequests(requests);
  return newRequest;
};

export const acceptJobRequest = (jobId, artisanId) => {
  const requests = getJobRequests();
  const updated = requests.map(job =>
    job.id === jobId ? { ...job, status: 'accepted', artisanId } : job
  );
  setJobRequests(updated);
  return updated.find(job => job.id === jobId);
};

export const declineJobRequest = (jobId) => {
  const requests = getJobRequests();
  const updated = requests.map(job =>
    job.id === jobId ? { ...job, status: 'declined' } : job
  );
  setJobRequests(updated);
  return updated.find(job => job.id === jobId);
};

export const markJobAsCompleted = (jobId) => {
  const requests = getJobRequests();
  const updated = requests.map(job =>
    job.id === jobId ? { ...job, status: 'completed', completedAt: new Date().toISOString() } : job
  );
  setJobRequests(updated);
  return updated.find(job => job.id === jobId);
};

export const getJobsByHomeowner = (homeownerId) => {
  const requests = getJobRequests();
  return requests.filter(job => job.homeownerId === homeownerId);
};

export const getJobsByArtisan = (artisanId) => {
  const requests = getJobRequests();
  return requests.filter(job => job.artisanId === artisanId);
};