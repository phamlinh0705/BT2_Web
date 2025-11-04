document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const keyword = document.getElementById('keyword').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "<p>⏳ Đang tìm kiếm...</p>";

    try {
        const response = await fetch(`http://localhost:1880/timkiem?q=${encodeURIComponent(keyword)}`);
        const data = await response.json();

        if (!data || data.length === 0) {
            resultDiv.innerHTML = "<p>❌ Không tìm thấy sinh viên nào!</p>";
            return;
        }

        // Tạo bảng kết quả
        let html = `
            <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse;">
                <tr style="background-color:#f2f2f2;">
                    <th>Mã SV</th>
                    <th>Họ tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Lớp</th>
                    <th>Điểm TB</th>
                </tr>
        `;

        data.forEach(sv => {
            html += `
                <tr>
                    <td>${sv.MaSV}</td>
                    <td>${sv.HoTen}</td>
                    <td>${new Date(sv.NgaySinh).toLocaleDateString('vi-VN')}</td>
                    <td>${sv.GioiTinh}</td>
                    <td>${sv.Lop}</td>
                    <td>${sv.DiemTB}</td>
                </tr>
            `;
        });

        html += `</table>`;
        resultDiv.innerHTML = html;

    } catch (err) {
        console.error(err);
        resultDiv.innerHTML = "<p>⚠️ Lỗi khi kết nối API!</p>";
    }
});
