import { css } from "@linaria/core";

import useReqMutation from "@/hooks/request/mutation";

interface CreateTodoPayload {
  id: Date;
  title: string;
}

interface CreateTodoResponseData {
  id: Date;
  title: string;
}

interface CreateTodoResponse {
  code: number;
  message: string;
  data: CreateTodoResponseData;
}

function DemoPage() {
  const createTodoMutation = useReqMutation<
    CreateTodoPayload,
    CreateTodoResponse
  >({
    url: "/ca/login",
    method: "post",
  });

  return (
    <div
      className={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #eeeeee;
      `}
    >
      {createTodoMutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {createTodoMutation.isError ? (
            <div>An error occurred: {createTodoMutation.error}</div>
          ) : null}

          {createTodoMutation.isSuccess ? <div>Todo added!</div> : null}
          <button
            onClick={() => {
              createTodoMutation.mutate({
                id: new Date(),
                title: "Do Laundry",
              });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}

export default DemoPage;
