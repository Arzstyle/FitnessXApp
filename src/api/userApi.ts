import axios from 'axios';

const MOCKAPI_BASE_URL = 'https://6901223aff8d792314bca44f.mockapi.io';

export interface UpdateUserPayload {
  gender: 'male' | 'female' | null;
  dateOfBirth: string;
  weight: string;
  height: string;
}

// Tipe data lengkap untuk user
export interface UserResponse {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  
  // Field dari complete profile
  gender?: string | null;
  dateOfBirth?: string;
  weight?: string;
  height?: string;
  
  // Field opsional 
  phone?: string;
  avatar?: string;
  bio?: string;
  program?: string; 
}
const apiClient = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const updateUserProfile = async (
  userId: string,
  payload: UpdateUserPayload
): Promise<{ data: UserResponse }> => {
  try {
    // 1. Kirim data (payload) ke endpoint '/users/:id' dengan method PUT
    // Method PUT akan mengganti seluruh data user dengan data baru
    console.log(`API CALL (updateUser): Mengirim payload ke /users/${userId}`, payload);
    const response = await apiClient.put<UserResponse>(`/users/${userId}`, payload);

    // 2. Kembalikan data user yang baru di-update
    console.log('API SUCCESS (updateUser):', response.data);
    return { data: response.data };

  } catch (error: any) {
    // 3. Gunakan error handling yang SAMA persis dengan registerUser
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message =
        `API Error (Status ${status}): ${JSON.stringify(data)}`;
      
      console.error('API Error (updateUser):', message);
      throw new Error(message); 

    } else {
      console.error('Network Error (updateUser):', error.message);
      throw new Error('Network error or unknown failure: ' + error.message);
    }
  }
};


export const getUserProfile = async (
  userId: string
): Promise<{ data: UserResponse }> => {
  try {
    // 1. Panggil API (GET) ke endpoint '/users/:id'
    console.log(`API CALL (getUser): Mengambil data untuk /users/${userId}`);
    const response = await apiClient.get<UserResponse>(`/users/${userId}`);

    // 2. Kembalikan data user
    console.log('API SUCCESS (getUser):', response.data);
    return { data: response.data };

  } catch (error: any) {
    // 3. (PENTING) Gunakan error handling yang SAMA persis
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message =
        `API Error (Status ${status}): ${JSON.stringify(data)}`;
      
      console.error('API Error (getUser):', message);
      throw new Error(message);

    } else {
      console.error('Network Error (getUser):', error.message);
      throw new Error('Network error or unknown failure: ' + error.message);
    }
  }
};