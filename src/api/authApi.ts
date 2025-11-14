import apiClient from './apiClient';
import { AuthStackParamList } from '../navigation/types'; // (Kita mungkin butuh tipe data form)

/**
 * Mendaftarkan pengguna baru (dipanggil dari SignUpScreen)
 * Kita mengirim data form (firstName, lastName, email, pass)
 */
export const registerUser = (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return apiClient.post('/Users', userData);
};

/**
 * Mencoba login (dipanggil dari SignInScreen)
 */
export const loginUser = async (email: string, password: string) => {
  // Ini akan memanggil: GET [baseURL]/users?email=...
  const response = await apiClient.get('/Users', {
    params: {
      email: email,
    },
  });

  // 1. Cek apakah pengguna ditemukan
  if (response.data.length === 0) {
    // Pengguna tidak ditemukan
    throw new Error('User not found. Please check your email.');
  }

  const user = response.data[0];

  // 2. Cek apakah password cocok
  if (user.password !== password) {
    // Password salah
    throw new Error('Invalid password. Please try again.');
  }

  // 3. Jika berhasil, kembalikan data pengguna
  // (Kita akan simpan 'id' dan 'name' ke AsyncStorage di SignInScreen)
  return user;
};