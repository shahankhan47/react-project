import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignUp() {
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            toast?.success(
                "Account successfully created. Please verify your new account's email address."
            );
        },
    });

    return { signup, isLoading };
}
