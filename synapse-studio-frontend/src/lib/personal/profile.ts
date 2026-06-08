import { z } from "zod";

export const userProfileSchema = z.object({
  displayName: z.string().min(1).max(80),
  bio: z.string().max(500).optional(),
  locale: z.enum(["zh-CN", "en"]).default("zh-CN"),
  accentColor: z
    .enum(["neural", "data", "space"])
    .optional()
    .describe("界面强调色偏好（语义键，非字面颜色）"),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

export const defaultUserProfile: UserProfile = {
  displayName: "创作者",
  bio: "",
  locale: "zh-CN",
  accentColor: "neural",
};

export const USER_PROFILE_STORAGE_KEY = "synapse-studio:user-profile-v1";
const STORAGE_KEY = USER_PROFILE_STORAGE_KEY;

export function loadUserProfile(): UserProfile {
  if (typeof window === "undefined") return defaultUserProfile;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultUserProfile;
    const parsed = userProfileSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : defaultUserProfile;
  } catch {
    return defaultUserProfile;
  }
}

let profileListenVersion = 0;
const profileListeners = new Set<() => void>();

/** 供 `useSyncExternalStore`：同一标签页写入后通知订阅者 */
export function bumpUserProfileListeners() {
  profileListenVersion += 1;
  profileListeners.forEach((l) => l());
}

export function subscribeUserProfile(listener: () => void) {
  profileListeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) bumpUserProfileListeners();
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    profileListeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

let profileSnapshotCache: UserProfile = defaultUserProfile;
let profileSnapshotJson = JSON.stringify(defaultUserProfile);

export function getUserProfileSnapshot(): UserProfile {
  void profileListenVersion;
  const fresh = loadUserProfile();
  const nextJson = JSON.stringify(fresh);
  if (nextJson !== profileSnapshotJson) {
    profileSnapshotJson = nextJson;
    profileSnapshotCache = fresh;
  }
  return profileSnapshotCache;
}

export function getUserProfileServerSnapshot(): UserProfile {
  return defaultUserProfile;
}

export function saveUserProfile(profile: UserProfile) {
  const parsed = userProfileSchema.safeParse(profile);
  if (!parsed.success) throw new Error(String(parsed.error));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.data));
  bumpUserProfileListeners();
}

export function exportProfileJson(profile: UserProfile): string {
  return JSON.stringify(profile, null, 2);
}

export function importProfileJson(text: string): UserProfile {
  const data = JSON.parse(text) as unknown;
  const parsed = userProfileSchema.safeParse(data);
  if (!parsed.success) throw new Error(String(parsed.error));
  return parsed.data;
}
