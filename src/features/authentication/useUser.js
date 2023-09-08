import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

// So let's create ourselves a use user hook and then export function, use user. So it will basically get the current user and store it into cache. And so then, it will not have to be redownloaded each time that it's necessary.
export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
}
