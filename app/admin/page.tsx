import Link from "next/link";
import { AdminWorkbench } from "@/components/admin-workbench";

export const metadata = { title: "Editorial CMS" };

export default function AdminPage() { return <main className="admin-page"><div className="shell"><div className="admin-top"><div><Link className="text-link" href="/">← Back to home</Link><h1>Editorial desk</h1><p>Write, save drafts and publish new field notes.</p></div><span className="eyebrow">THE ARCHAEOLOGIST CMS</span></div><AdminWorkbench /></div></main>; }