// import dummyJobs from "../pages/data/dummyjobs";

//  let jobs = [...dummyJobs];

// export const getJobsByArtisan = (artisanId) => {
//   return jobs;
// };

// export const acceptJobRequest = (jobId, artisanId) => {
//   const jobIndex = jobs.findIndex(job => job.id === jobId);
//   if (jobIndex !== -1) {
//     jobs[jobIndex].status = 'accepted';
//   }
//   return jobs[jobIndex];
// };

// export const declineJobRequest = (jobId) => {
//   const jobIndex = jobs.findIndex(job => job.id === jobId);
//   if (jobIndex !== -1) {
//     jobs.splice(jobIndex, 1);
//   }
//   return null;
// };

// export const markJobAsCompleted = (jobId) => {
//   const jobIndex = jobs.findIndex(job => job.id === jobId);
//   if (jobIndex !== -1) {
//     jobs[jobIndex].status = 'completed';
//     jobs[jobIndex].completedAt = new Date().toISOString();
//   }
//   return jobs[jobIndex];
// };


import dummyJobs from "../pages/data/dummyjobs";

let jobs = [...dummyJobs];

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

export const declineJobRequest = (jobId, artisanId) => {
  const jobIndex = jobs.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
    jobs[jobIndex].status = 'declined';
    jobs[jobIndex].artisanId = artisanId;
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