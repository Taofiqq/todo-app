import { useState, useEffect } from "react";
import { getStoredTodos } from "../utils/localStorage";

export const useTodo = (id) => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const allTodos = getStoredTodos();
        const foundTodo = allTodos.find((t) => t.id === parseInt(id));

        if (foundTodo) {
          setTodo(foundTodo);
          setError(null);
        } else {
          setError("Todo not found");
        }
      } catch (err) {
        setError("Failed to fetch todo details");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  return { todo, loading, error };
};
