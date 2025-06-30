import type * as Kit from '@sveltejs/kit';

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
// @ts-ignore
type MatcherParam<M> = M extends (param : string) => param is infer U ? U extends string ? U : string : string;
type RouteParams = {  };
type RouteId = '/';
type MaybeWithVoid<T> = {} extends T ? T | void : T;
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K; }[keyof T];
type OutputDataShape<T> = MaybeWithVoid<Omit<App.PageData, RequiredKeys<T>> & Partial<Pick<App.PageData, keyof T & keyof App.PageData>> & Record<string, any>>
type EnsureDefined<T> = T extends null | undefined ? {} : T;
type OptionalUnion<U extends Record<string, any>, A extends keyof U = U extends U ? keyof U : never> = U extends unknown ? { [P in Exclude<A, keyof U>]?: never } & U : never;
export type Snapshot<T = any> = Kit.Snapshot<T>;
type PageParentData = EnsureDefined<LayoutData>;
type LayoutRouteId = RouteId | "/" | "/404" | "/account/forgot-password" | "/account/institution/details" | "/account/institution/login" | "/account/institution/signup" | "/account/signup" | "/account/user/login" | "/account/user/signup" | "/account/verify" | "/account/verify-code" | "/admin/competitions" | "/admin/competitions/[competition_name]/overview" | "/admin/competitions/[competition_name]/players" | "/auth/google" | "/challenge" | "/challenge/player" | "/challenge/result" | "/challenge/selection" | "/challenge/vsscreen" | "/competitions" | "/competitions/[competition_name]" | "/competitions/[competition_name]/change-grade" | "/competitions/[competition_name]/friends" | "/competitions/[competition_name]/home" | "/competitions/[competition_name]/leaderboard" | "/competitions/[competition_name]/lessons" | "/competitions/[competition_name]/lessons/listing" | "/competitions/[competition_name]/my-games" | "/competitions/[competition_name]/my-subscription" | "/competitions/[competition_name]/profile" | "/competitions/[competition_name]/profile/edit" | "/competitions/[competition_name]/results" | "/competitions/[competition_name]/rewards" | "/competitions/[competition_name]/rules" | "/competitions/[competition_name]/stats" | "/contactus" | "/gclc-result" | "/green-star-school" | "/home" | "/payment" | "/payment/bank" | "/payment/status" | "/privacy-policy" | "/profile" | "/profile/edit" | "/program/glc" | "/program/sitarey" | "/settings/change-grade" | null
type LayoutParams = RouteParams & { competition_name?: string }
type LayoutParentData = EnsureDefined<{}>;

export type PageServerData = null;
export type PageLoad<OutputData extends OutputDataShape<PageParentData> = OutputDataShape<PageParentData>> = Kit.Load<RouteParams, PageServerData, PageParentData, OutputData, RouteId>;
export type PageLoadEvent = Parameters<PageLoad>[0];
export type PageData = Expand<Omit<PageParentData, keyof Kit.LoadProperties<Awaited<ReturnType<typeof import('../../../../src/routes/+page.js').load>>>> & OptionalUnion<EnsureDefined<Kit.LoadProperties<Awaited<ReturnType<typeof import('../../../../src/routes/+page.js').load>>>>>>;
export type PageProps = { data: PageData }
export type LayoutServerData = null;
export type LayoutLoad<OutputData extends OutputDataShape<LayoutParentData> = OutputDataShape<LayoutParentData>> = Kit.Load<LayoutParams, LayoutServerData, LayoutParentData, OutputData, LayoutRouteId>;
export type LayoutLoadEvent = Parameters<LayoutLoad>[0];
export type LayoutData = Expand<Omit<LayoutParentData, keyof Kit.LoadProperties<Awaited<ReturnType<typeof import('../../../../src/routes/+layout.js').load>>>> & OptionalUnion<EnsureDefined<Kit.LoadProperties<Awaited<ReturnType<typeof import('../../../../src/routes/+layout.js').load>>>>>>;
export type LayoutProps = { data: LayoutData; children: import("svelte").Snippet }