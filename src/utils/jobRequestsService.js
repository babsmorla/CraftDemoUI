import { jobs as userJobs } from "../pages/data/dummyData";

let jobs = [...userJobs];

export const getJobsByArtisan = (artisanId) => {
  return jobs.filter(job => job.artisanId === artisanId || !job.artisanId);
};

export const acceptJobRequest = (jobId, artisanId) => {
  const jobIndex = jobs.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
    jobs[jobIndex].status = 'accepted';
    jobs[jobIndex].artisanId = artisanId;
  }
  return jobs[jobIndex];
};

// src/utils/jobRequestsService.js
export const declineJobRequest = (jobId, artisanId, reason) => {
  const jobIndex = jobs.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
    jobs[jobIndex].status = 'declined';
    jobs[jobIndex].artisanId = artisanId;
    jobs[jobIndex].declineReason = reason; // Add decline reason
  }
  return jobs[jobIndex];
};

export const cancelJobRequest = (jobId, reason) => {
  const jobIndex = jobs.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
    jobs[jobIndex].status = 'cancelled';
    jobs[jobIndex].cancellationReason = reason; // Add cancellation reason
  }
  return jobs[jobIndex];
};

export const markJobAsCompleted = (jobId) => {
  const jobIndex = jobs.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
    jobs[jobIndex].status = 'completed';
    jobs[jobIndex].completedAt = new Date().toISOString();
  }
  return jobs[jobIndex];
};



// export const declineJobRequest = async (jobId, artisanId, reason) => {
//   const response = await fetch(`/api/jobs/${jobId}/decline`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ 
//       artisanId, 
//       reason 
//     })
//   });
//   return response.json();
// };