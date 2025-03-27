const BookingPage = () => {
    const getUser = async (token) => {
        try {
          const response = await fetch("http://localhost:5000/api/auth/me", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
          });
      
          // Kiểm tra nếu response không thành công
          if (!response.ok) {
            console.error(`Lỗi API: ${response.status}`);
            return null;
          }
          const data = await response.json();
          console.log("Dữ liệu từ API:", data);
          return data;
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
          return null;
        }
    };      
    return (
        <div>

        </div>
    )
}

export default BookingPage
