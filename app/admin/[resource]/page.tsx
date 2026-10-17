import { notFound, redirect } from "next/navigation";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  isAdminResource,
  loadAdminResource,
  type AdminResource,
} from "@/lib/admin-content";

export const dynamic = "force-dynamic";

interface AdminResourcePageProps {
  params: Promise<{ resource: string }>;
}

export default async function AdminResourcePage({
  params,
}: AdminResourcePageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const { resource } = await params;
  if (!isAdminResource(resource)) notFound();

  const data = await loadAdminResource(resource as AdminResource);

  return <AdminEditor resource={resource} initialData={data} />;
}
