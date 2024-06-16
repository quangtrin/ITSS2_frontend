export const server = "https://itss2-backend-i5g7.onrender.com"; 

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  detailJob: (id) => `${server}/api/job/${id}`,
  chats: `${server}/api/chats`,
  appliedJobs: `${server}/api/appliedJobs`,
  sendChat: `${server}/api/chat`,
};

export default apiList;
