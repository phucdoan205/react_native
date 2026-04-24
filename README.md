# các bước khởi tạo project trên github
b1: git init
b2: git add .
b3: git commit -m "Initial commit - Up du an HPT Store"
b4: git remote add origin <URL_CUA_BAN>
b5: git branch -M main
    git push -u origin main

# cài đặt môi trường react native
npm install -g expo-cli

# tạo project mới
expo init <tên-project>

# cấp quyền khi chạy npm start không được
Set-ExecutionPolicy RemoteSigned

# các thư viện cần cài đặt cơ bản của react native
npm install react-native-paper @react-navigation/native @react-navigation/bottom-tabs react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view react-native-vector-icons

# Ép project sử dụng SDK 52
npx expo install expo@54

# Tự động sửa lỗi các thư viện đi kèm (react, react-native,...) cho khớp
npx expo install --fix

# mongoDB, framework express cho nodejs
npm install express mongoose bcryptjs cors body-parser dotenv @react-navigation/native @react-navigation/stack @react-native-async-storage/async-storage react-native-paper jsonwebtoken react-native-vector-icons

# khai báo thư viện quản lí trạng thái redux
npm install redux redux-thunk react-redux @reduxjs/toolkit

npm install @react-navigation/native-stack`

# Cài đặt Express, Socket.io và Axios (dành cho Backend & Real-time)
npm install express socket.io axios socket.io-client

# khai báo thư viện quản lí kết nối mạng, nhận thông báo trên di động
npm install @react-native-community/netinfo expo-notifications axios

# khai báo thư viện bài 10
npm install react-native-calendars react-native-vector-icons react-native-popup-menu @react-navigation/native @react-navigation/bottom-tabs react-native-gesture-handler react-native-reanimated@3.16.7 react-native-screens