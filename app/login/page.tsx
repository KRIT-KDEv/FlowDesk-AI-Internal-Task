import { demoRoleLabels, demoRoles, type DemoRole } from "@/lib/demo-auth";

import { loginDemoAction } from "./actions";

type LoginPageSearchParams = {
  error?: string | string[];
};

type LoginPageProps = {
  searchParams?: LoginPageSearchParams;
};

const roleDescriptions: Record<DemoRole, string> = {
  admin: "Full demo access for the portfolio walkthrough.",
  manager: "Workflow-focused demo role for team leads.",
  viewer: "Read-focused demo role for stakeholder review."
};

function getSingleSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function LoginPage({ searchParams = {} }: LoginPageProps) {
  const errorCode = getSingleSearchParam(searchParams.error);
  const hasInvalidRoleError = errorCode === "invalid-role";

  return (
    <main className="space-y-6">
      <section className="rounded-lg border border-border bg-panel p-6">
        <p className="text-sm font-medium uppercase text-accent">
          Demo auth
        </p>
        <h1 className="mt-2 text-3xl font-semibold">
          Sign in to FlowDesk AI
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
          Choose a demo role for a controlled portfolio walkthrough. This is
          demo-only auth and is not production security.
        </p>
      </section>

      {hasInvalidRoleError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          Choose a valid demo role before signing in.
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        {demoRoles.map((role) => (
          <form
            action={loginDemoAction}
            className="rounded-lg border border-border bg-panel p-5 shadow-sm"
            key={role}
          >
            <input name="role" type="hidden" value={role} />
            <p className="text-sm font-medium text-accent">
              {demoRoleLabels[role]}
            </p>
            <p className="mt-2 min-h-12 text-sm leading-6 text-muted">
              {roleDescriptions[role]}
            </p>
            <button
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-accent px-4 text-sm font-medium text-white"
              type="submit"
            >
              Continue as {demoRoleLabels[role]}
            </button>
          </form>
        ))}
      </section>
    </main>
  );
}
