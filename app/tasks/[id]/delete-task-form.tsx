"use client";

import type { FormEvent } from "react";

import { deleteTaskAction } from "./actions";

type DeleteTaskFormProps = {
  taskId: string;
};

const confirmationMessage =
  "Delete this task? This permanently removes the task and cannot be undone.";

export function DeleteTaskForm({ taskId }: DeleteTaskFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!window.confirm(confirmationMessage)) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteTaskAction} onSubmit={handleSubmit}>
      <input name="taskId" type="hidden" value={taskId} />
      <button
        className="inline-flex h-10 items-center justify-center rounded-md border border-red-200 px-4 text-sm font-medium text-red-700 transition hover:border-red-300 hover:bg-red-50"
        type="submit"
      >
        Delete task
      </button>
    </form>
  );
}
