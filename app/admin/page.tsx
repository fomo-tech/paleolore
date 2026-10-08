import Link from "next/link";
import { AdminWorkbench } from "@/components/admin-workbench";
export const metadata = { title: "CMS biên tập" };
export default function AdminPage() { return <main className="admin-page"><div className="shell"><div className="admin-top"><div><Link className="text-link" href="/">← Về trang chủ</Link><h1>Bàn biên tập</h1><p>Viết, lưu nháp và xuất bản các ghi chép mới.</p></div><span className="eyebrow">THE ARCHAEOLOGIST CMS</span></div><AdminWorkbench /></div></main>; }