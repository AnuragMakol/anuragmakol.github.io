import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userStore = atom({
    key: "userStore",
    default: {},
    effects_UNSTABLE: [persistAtom]
});

export const statisticsStore = atom({
    key: "statisticsStore",
    default: {},
    effects_UNSTABLE: [persistAtom]
});

export const campaignStore = atom({
    key: "campaignStore",
    default: {},
    effects_UNSTABLE: [persistAtom]
});