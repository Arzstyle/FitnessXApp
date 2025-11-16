import axios from 'axios';

const MOCKAPI_BASE_URL = 'https://6901223aff8d792314bca44f.mockapi.io'; 

// Tipe data untuk user baru (sesuai form SignUp)
interface NewUserPayload {
  firstName: string; 
  lastName: string;  
  email: string;     
  password: string;
}

// (Tipe 'UserResponse' sekarang akan mewarisi 'firstName' dari NewUserPayload)
export interface UserResponse extends NewUserPayload {
  id: string;
  createdAt: string; // <-- Sebaiknya tambahkan ini
  
  // Field dari complete profile
  gender?: string | null;
  dateOfBirth?: string;
  weight?: string;
  height?: string;
  
  // Field opsional lain
  phone?: string;
  avatar?: string;
  bio?: string;
}

// 1. Buat 'instance' axios
const apiClient = axios.create({
  baseURL: MOCKAPI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (
  payload: NewUserPayload
): Promise<{ data: UserResponse }> => {
  try {
    console.log(`API CALL (registerUser): Mengirim payload ke /users`, payload);
    const response = await apiClient.post<UserResponse>('/users', payload);
    console.log('API SUCCESS (registerUser):', response.data);
    return { data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message = `API Error (Status ${status}): ${JSON.stringify(data)}`;
      console.error('API Error (registerUser):', message);
      throw new Error(message);
    } else {
      console.error('Network Error (registerUser):', error.message);
      throw new Error('Network error or unknown failure: ' + error.message);
    }
  }
};

// Fungsi untuk memvalidasi login user.

export const loginUser = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  try {
    // 1. Panggil API (GET) dengan parameter filter
    console.log(`API CALL (loginUser): Mencari user dengan email: ${email}`);
    const response = await apiClient.get<UserResponse[]>('/users', {
      params: {
        email: email,
        // (Catatan: MockAPI akan mem-filter password juga)
        password: password, 
      },
    });

    // 2. Cek hasil filter
    if (response.data && response.data.length > 0) {
      const user = response.data[0];
      console.log('API SUCCESS (loginUser): User ditemukan', user);
      return user; // Kembalikan data user
    } else {
      console.log('API FAILED (loginUser): Email atau password salah');
      // Lempar error agar ditangkap oleh 'catch' di SignInScreen
      throw new Error('Invalid email or password');
    }

  } catch (error: any) {
    // 3. (PENTING) Gunakan error handling yang SAMA persis dengan registerUser
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      const message =
        `API Error (Status ${status}): ${JSON.stringify(data)}`;
      
      console.error('API Error (loginUser):', message);
      throw new Error(message);
    } else {
      console.error('Login Error (loginUser):', error.message);
      throw error; // Teruskan error (e.g., "Invalid email or password")
    }
  }
};