// Updated userJobsService for single-user simplicity

import dummyUserJobs from "../pages/data/dummyUserJobs";

let jobs = [...dummyUserJobs];

export const getJobsForUser = () => {
  return jobs;
};

export const cancelJobRequest = (jobId) => {
  const index = jobs.findIndex((job) => job.id === jobId);
  if (index !== -1 && jobs[index].status === "pending") {
    jobs[index].status = "cancelled";
  }
};

export default {
  getJobsForUser,
  cancelJobRequest,
};
