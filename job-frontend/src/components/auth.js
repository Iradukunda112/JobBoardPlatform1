import api from './api.js';

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    
    register: (userData) => api.post('/auth/register', userData),
    
    logout: () => api.post('/auth/logout'),
    
    forgotPassword: (email) => api.post('/auth/forgotPassword', null, {
      params: {
          email: email
      }
  }),
    
    resetPassword: (token, newPassword) => 
        api.post(/auth/resetPassword/$,{token}, 
          { token: token,
            newPassword: newPassword,
            confirmNewPassword: newPassword}),
    
    getNotifications: () => api.get('/notifications/user/unread'),
    
    markNotificationsAsRead: () => 
        api.put('/notifications/user/mark-all-as-read')
};