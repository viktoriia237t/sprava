export const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };
export const safeUrl = (u?: string) => /^https?:\/\//i.test(u || "") ? u! : "#";
