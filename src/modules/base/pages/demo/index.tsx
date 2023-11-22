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
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eeeeee",
      }}
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
