import axios from '../utils/axiosConfig';

const FormsEndpoint = {
  getAllForms: async () => {
    try {
      const response = await axios.get('/getForms');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  getFormById: async (id) => {
    try {
      const response = await axios.get(`/getForms/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createForm: async (formData) => {
    try {
      const response = await axios.post('/createForm', formData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  updateForm: async (id, formData) => {
    try {
      const response = await axios.put(`/editForm/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  deleteForm: async (id) => {
    try {
      const response = await axios.delete(`/deleteForm/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default FormsEndpoint;
