import React from 'react';
import JobRequestForm from '../../components/forms/JobRequestForm';

 function RequestJobPage() {
  const handleRequestSubmit = async (data) => {
    console.log('Job Request Data:', data);

    // Example:
    // await axios.post('/api/job-requests', data);
    // toast.success("Request submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <JobRequestForm onSubmit={handleRequestSubmit} />
    </div>
  );
}
export default RequestJobPage