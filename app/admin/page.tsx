import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminIndexPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  redirect("/admin/site-config");
}
