import apiClient from './apiClient';

/*
 * Memperbarui profil (dipanggil dari CompleteProfile)
 * Kita perlu tahu 'userId' (yang kita dapat dari SignUp)
 * dan data barunya (gender, weight, height, dll)
 */
export const updateUserProfile = (
  userId: string,
  profileData: {
    gender: 'male' | 'female' | null;
    dateOfBirth: string;
    weight: string;
    height: string;
  },
) => {
  return apiClient.put(`/Users/${userId}`, profileData);
};

export const getUserProfile = (userId: string) => {
  // Ini akan memanggil: GET 
  return apiClient.get(`/users/${userId}`);
};