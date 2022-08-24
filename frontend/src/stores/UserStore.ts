import create from "zustand";
import _create from "zustand/vanilla";

interface UserState {
  lang: string | null;
}

export const _userStore = _create<UserState>()((set) => ({
  lang: "es",
  setLang: (lang: string) => set({ lang }),
}));

export const userStore = create(_userStore);
export default userStore;
