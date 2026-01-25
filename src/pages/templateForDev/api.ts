import { httpExternal } from "@/services/httpClient/http";
import { useQuery } from "@tanstack/react-query";
import type { ProductsResponse } from "./type";

// export const userKeys = {
//     all: ["users"] as const,
//     list: (params?: any) => [...userKeys.all, "list", params] as const,
//     detail: (id: number) => [...userKeys.all, "detail", id] as const,
// };

// export const userApi = {
//     list: (params?: { page?: number; limit?: number }) =>
//         http.get("/users", { params }),

//     detail: (id: number) =>
//         http.get(`/users/${id}`),

//     create: (payload: any) =>
//         http.post("/users", payload),

//     update: (id: number, payload: any) =>
//         http.put(`/users/${id}`, payload),

//     deactivate: (id: number) =>
//         http.post(`/users/${id}/deactivate`),
// };

// export const useUsers = (params?: { page?: number; limit?: number }) =>
//     useQuery({
//         queryKey: userKeys.list(params),
//         queryFn: () => userApi.list(params).then(r => r.data),
//     });

// export const useCreateUser = () => {
//     const qc = useQueryClient();

//     return useMutation({
//         mutationFn: userApi.create,
//         onSuccess: () => {
//             qc.invalidateQueries({ queryKey: userKeys.all });
//         },
//     });
// };

// DummyJSON Products API
export const productKeys = {
    all: ["products"],
    list: (params?: any) => [...productKeys.all, "list", params],
    detail: (id: number) => [...productKeys.all, "detail", id],
};

export const productApi = {
    list: (params?: { skip?: number; limit?: number }) =>
        httpExternal.get<ProductsResponse>("https://dummyjson.com/products", { params }),

    detail: (id: number) =>
        httpExternal.get(`https://dummyjson.com/products/${id}`),

    search: (query: string) =>
        httpExternal.get<ProductsResponse>(`https://dummyjson.com/products/search?q=${query}`),
};

export const useProducts = (params?: { skip?: number; limit?: number }) =>
    useQuery({
        queryKey: productKeys.list(params),
        queryFn: () => productApi.list(params).then(r => r.data),
    });

export const useProduct = (id: number)   =>
    useQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => productApi.detail(id).then(r => r.data),
        enabled: !!id,
    });