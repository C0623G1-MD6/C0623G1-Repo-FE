

export function formatLocalDateTime(dateTimeString, timeZone) {
    const localDateTime = new Date(dateTimeString);

    // Xử lý định dạng ngày giờ
    const dayOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][localDateTime.getDay()];
    const day = localDateTime.getDate();
    const month = localDateTime.getMonth() + 1;
    const year = localDateTime.getFullYear();
    const hours = localDateTime.getHours();
    const minutes = localDateTime.getMinutes();

    // Xử lý định dạng múi giờ
    const timeZoneOffset = localDateTime.getTimezoneOffset();
    const timeZoneOffsetHours = Math.floor(Math.abs(timeZoneOffset) / 60);
    const timeZoneOffsetMinutes = Math.abs(timeZoneOffset) % 60;
    const timeZoneSign = timeZoneOffset >= 0 ? '-' : '+';
    const timeZoneString = `GMT${timeZoneSign}${timeZoneOffsetHours}:${timeZoneOffsetMinutes}`;

    // In ra console
    return (`${dayOfWeek}, ngày ${day}/${month}/${year}  ${hours}:${minutes} ${hours >= 12 ? 'PM' : 'AM'} `);
}
export const TextWithNewLines = ({ text }) => {
    // Kiểm tra xem text có tồn tại không
    if (!text) {
        return null; // hoặc xử lý khác nếu cần thiết
    }

    // Phân tách đoạn văn bản thành các đoạn con theo dấu chấm và thêm dấu chấm cuối cùng
    const paragraphs = text.split('. ').map((paragraph, index, array) => {
        // Thêm dấu chấm cuối cùng nếu không phải là đoạn cuối cùng
        const isLastParagraph = index === array.length - 1;
        return isLastParagraph ? paragraph : `${paragraph}.`;
    });

    // Render các đoạn con với thẻ <p>
    const renderedParagraphs = paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
    ));

    return <div>{renderedParagraphs}</div>;
};

