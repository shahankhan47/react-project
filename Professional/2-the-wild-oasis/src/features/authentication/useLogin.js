import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (user) => {
            // This will set the cache before the useUser is called so that user is loaded beforehand.
            queryClient.setQueryData(["user"], user?.user);
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("provided email or password is incorrect");
        },
    });

    return { login, isLoading };
}
