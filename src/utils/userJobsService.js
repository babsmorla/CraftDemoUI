import dummyJobs from "../pages/data/dummyjobs";

let jobs = [...dummyJobs];

export const getJobsForUser = (userId) => {
  return jobs;
};

export const cancelJobRequest = (jobId) => {
  const index = jobs.findIndex((job) => job.id === jobId);
  if (index !== -1) {
    jobs[index].status = "cancelled";
  }
};

export default {
  getJobsForUser,
  cancelJobRequest,
};
