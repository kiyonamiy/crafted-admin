import useReqMutation from "@/hooks/request/mutation";
import useReqQuery from "@/hooks/request/query";

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
    url: "https://www.baidu.com/",
    method: "get",
  });

  const todoQuery = useReqQuery({
    queryKey: ["todoQuery"],
    url: "https://www.baidu.com/",
    method: "get",
  });

  console.log(todoQuery);

  return (
    <div>
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
