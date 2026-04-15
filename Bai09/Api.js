import axios from 'axios'; // Nhập thư viện Axios để thực hiện yêu cầu HTTP

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // URL API

// Xuất hàm fetchPosts để sử dụng ở file khác
export const fetchPosts = async () => {
  console.log('Fetching posts...'); // Ghi log để theo dõi quá trình gọi API
  try {
    const response = await axios.get(API_URL); // Gửi yêu cầu GET đến API
    console.log('Posts fetched successfully:', response.data); // Ghi log dữ liệu nhận được
    return response.data; // Trả về dữ liệu bài viết
  } catch (error) {
    console.error('Error fetching posts:', error); // Ghi log lỗi nếu có
    throw new Error('Không thể lấy danh sách bài viết'); // Ném ra lỗi với thông báo
  }
};