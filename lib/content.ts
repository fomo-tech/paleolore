export type Article = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  era: string;
  date: string;
  readingTime: string;
  author: string;
  featured?: boolean;
  status?: "draft" | "published";
  seoTitle?: string;
  seoDescription?: string;
};

export const categories = [
  { name: "Phát hiện mới", slug: "phat-hien-moi", eyebrow: "DISCOVERIES" },
  { name: "Tiền sử nhân loại", slug: "tien-su", eyebrow: "PREHISTORY" },
  { name: "Nền văn minh", slug: "nen-van-minh", eyebrow: "CIVILIZATIONS" },
  { name: "Paleontology", slug: "paleontology", eyebrow: "DEEP TIME" },
  { name: "Di vật & kỹ thuật", slug: "di-vat", eyebrow: "ARTIFACTS" },
];

export const sampleArticles: Article[] = [
  {
    slug: "dau-tich-lua-co-xua-trong-hang-da",
    title: "Dấu tích lửa cổ xưa kể lại cách con người đầu tiên sống qua mùa đông",
    excerpt: "Một lớp tro mỏng, vài mảnh xương cháy và những viên đá nứt nhiệt đang mở lại câu chuyện về bếp lửa tiền sử.",
    content: "Trong lòng một hang đá nhìn xuống thung lũng khô cằn, nhóm khảo cổ đã tìm thấy một dải trầm tích chỉ rộng bằng bàn tay. Nó không gây ấn tượng ngay lập tức: tro vụn, xương động vật đã đổi màu và những mảnh đá nhỏ bị nứt vì nhiệt. Nhưng chính sự sắp xếp của chúng cho thấy đây không phải một đám cháy tự nhiên.\n\nBếp lửa được lặp lại ở cùng một vị trí qua nhiều lớp đất. Điều đó gợi ý một nhóm người đã quay trở lại nơi trú ẩn này trong nhiều mùa, mang theo thức ăn, công cụ và một ký ức về địa điểm an toàn.\n\nKhi đọc một di chỉ như vậy, nhà khảo cổ không chỉ hỏi “đã tìm thấy gì?”. Họ còn hỏi ai đã nhóm lửa, họ ngồi ở đâu, và những thay đổi nhỏ của vật liệu có thể nói gì về khí hậu quanh họ. Một mẩu than bé xíu đôi khi là mốc thời gian đáng tin hơn cả một câu chuyện truyền miệng.",
    category: "Tiền sử nhân loại", categorySlug: "tien-su", era: "Kỷ Pleistocene", date: "08.10.2026", readingTime: "6 phút đọc", author: "Ban biên tập The Archaeologist", featured: true, status: "published",
  },
  {
    slug: "thanh-pho-chim-duoi-long-dat",
    title: "Thành phố chìm dưới lòng đất và bài toán về một xã hội biết thích nghi",
    excerpt: "Các đường hầm nối tiếp nhau cho thấy cư dân cổ đại đã biến địa chất khắc nghiệt thành một hệ thống phòng thủ sống động.",
    content: "Một đô thị dưới lòng đất không được tạo ra chỉ để gây kinh ngạc. Nó là câu trả lời của con người trước khí hậu, chiến tranh và nhu cầu tổ chức cuộc sống trong một không gian có giới hạn.\n\nNhững khoang chứa lương thực nằm gần trục thông gió, còn các lối đi hẹp có thể kiểm soát số người ra vào. Dấu vết này cho thấy kiến trúc không tách rời khỏi chính trị và sinh tồn.",
    category: "Nền văn minh", categorySlug: "nen-van-minh", era: "Thời đại đồ đồng", date: "06.10.2026", readingTime: "5 phút đọc", author: "Minh Anh", status: "published",
  },
  {
    slug: "bo-xuong-thu-san-co-dai",
    title: "Bộ xương thú săn cổ đại hé lộ một hệ sinh thái đã biến mất",
    excerpt: "Từ những chiếc răng mòn đến dấu cắn trên xương, paleontology đang dựng lại mạng lưới săn mồi của một vùng đất xa xưa.",
    content: "Hóa thạch không phải là bức ảnh tĩnh của quá khứ. Mỗi bề mặt bị mài mòn, mỗi vết cắn và lớp khoáng hóa đều ghi lại một tương tác. Khi đặt chúng cạnh nhau, các nhà nghiên cứu có thể hình dung một hệ sinh thái từng vận hành như thế nào.",
    category: "Paleontology", categorySlug: "paleontology", era: "Kỷ Miocene", date: "02.10.2026", readingTime: "4 phút đọc", author: "The Archaeologist Lab", status: "published",
  },
  {
    slug: "ngon-ngu-cua-nhung-manh-gom",
    title: "Ngôn ngữ của những mảnh gốm vỡ",
    excerpt: "Một chiếc bình không cần còn nguyên vẹn để nói về thương mại, nghi lễ và bàn tay đã tạo ra nó.",
    content: "Mảnh gốm là loại bằng chứng khiêm nhường nhưng bền bỉ. Hoa văn, đất sét, dấu vân tay và lớp cháy trên thành bình tạo thành một hồ sơ vật chất về đời sống thường nhật.",
    category: "Di vật & kỹ thuật", categorySlug: "di-vat", era: "Thời kỳ Đồ sắt", date: "28.09.2026", readingTime: "4 phút đọc", author: "Linh Chi", status: "published",
  },
];

export function getCategory(slug: string) { return categories.find((category) => category.slug === slug); }