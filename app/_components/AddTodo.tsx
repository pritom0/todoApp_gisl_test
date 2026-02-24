interface addTodoProp {
  
}

export default function AddTodo() {
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className="bg-green-900"
          type="text"
          value={addTodo}
          onChange={addTodoHandler}
          placeholder="type new task"
        />
        <button type="submit" disabled={pending === "true"}>
          submit
        </button>
        {success === "true" ? (
          <p className="text-green-600">{message}</p>
        ) : success === "false" ? (
          <p className="text-red-600">{message}</p>
        ) : null}
        <p></p>
      </form>
    </>
  );
}
