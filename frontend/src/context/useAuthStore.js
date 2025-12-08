import {create} from "zustand";
import {persist} from "zustand/middleware";


export const useAuthStore = create(
    persist()
)