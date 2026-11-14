import { login } from "@/app/admin/actions";
import { AdminDesk } from "@/components/admin-desk";
import { buttonClasses } from "@/components/button";
import { Wrap } from "@/components/section";
import { isAdmin } from "@/lib/admin-auth";
import { getDesk } from "@/lib/desk";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Desk",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const params = await searchParams;
  const unlocked = await isAdmin();

  if (!unlocked) {
    return (
      <main id="content" className="py-16">
        <Wrap>
          <div className="max-w-md">
          <h1 className="text-5xl">Desk</h1>
          <p className="mt-4 text-soft">The booking list is behind the school password.</p>
          {params.error ? (
            <p role="alert" className="mt-6 border border-danger px-3 py-3 text-danger">
              {params.error}
            </p>
          ) : null}
          <form action={login} className="mt-8 grid gap-4">
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>
            <button type="submit" className={buttonClasses("primary")}>
              Unlock the desk
            </button>
          </form>
          </div>
        </Wrap>
      </main>
    );
  }

  const data = await getDesk();
  return (
    <main id="content">
      <AdminDesk data={data} notice={params.notice} error={params.error} />
    </main>
  );
}
