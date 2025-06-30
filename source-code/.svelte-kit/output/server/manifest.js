export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["certificate-generator/certificates/b/star.png","certificate-generator/certificates/b/tick.png","certificate-generator/certificates/certificate-sample.html","certificate-generator/certificates/fonts/fredoka.ttf","certificate-generator/certificates/fonts/poppins-regular.ttf","certificate-generator/certificates/gclc.html","certificate-generator/certificates/logos/bonzo.png","certificate-generator/certificates/logos/gclc.png","certificate-generator/certificates/logos/gg.png","certificate-generator/certificates/logos/index.html","certificate-generator/certificates/logos/kp.png","certificate-generator/certificates/logos/kp2.png","certificate-generator/certificates/logos/shupavu.png","certificate-generator/certificates/logos/sitaray.png","certificate-generator/certificates/s/index.html","certificate-generator/certificates/s/umair.png","certificate-generator/certificates/s/yvonne.png","certificate-generator/certificates/sitaray_1.html","certificate-generator/certificates/sitaray_2.html","certificate-generator/scripts/certificate.common.css","certificate-generator/scripts/certificate.framework.js","fonts/fredoka-bold.woff2","fonts/fredoka-light.woff2","fonts/fredoka-medium.woff2","fonts/fredoka-regular.woff2","fonts/fredoka-semibold.woff2","fonts/icomoon.svg","fonts/icomoon.woff2","fonts/poppins-bold.woff2","fonts/poppins-light.woff2","fonts/poppins-medium.woff2","fonts/poppins-regular.woff2","fonts/poppins-semibold.woff2","images/bg-stars.png","images/bonzo/favicon-16x16.png","images/bonzo/favicon-32x32.png","images/bonzo/fb-img.jpg","images/bonzo/pb-web-logo.png","images/bonzo/twitter-img.jpg","images/bonzo-jumbotron.png","images/bonzo-logo-only.png","images/bonzo-logo.png","images/change-grade-icon.svg","images/coach-icon.png","images/coin.svg","images/favicon-16x16.png","images/favicon-32x32.png","images/favicon-512x512.png","images/game-types/game-bundle.png","images/gclc/favicon-16x16.png","images/gclc/favicon-32x32.png","images/gclc/fb-img.png","images/gclc/gg-web-logo.png","images/gclc/twitter-img.png","images/google-icon.png","images/healthx/favicon-16x16.png","images/healthx/favicon-32x32.png","images/healthx/fb-img.jpg","images/healthx/pb-web-logo.png","images/healthx/twitter-img.jpg","images/icons/invite.png","images/institute-icon.svg","images/learner-icon.svg","images/pocket-games/favicon-16x16.svg","images/pocket-games/favicon-32x32.svg","images/pocket-games/fb-img.png","images/pocket-games/pocket-games-logo.png","images/pocket-games/twitter-img.png","images/pwa-icon-192x192.png","images/quotient-games/favicon-16x16.svg","images/quotient-games/favicon-32x32.svg","images/quotient-games/fb-img.jpg","images/quotient-games/quotient-logo.svg","images/quotient-games/twitter-img.jpg","images/share.svg","images/shupavu/favicon-16x16.png","images/shupavu/favicon-32x32.png","images/shupavu/fb-img.jpg","images/shupavu/shupavu-logo.png","images/shupavu/twitter-img.jpg","images/subjects/science-icon-1.png","languages/en.json","languages/es.json","manifest.json"]),
	mimeTypes: {".png":"image/png",".html":"text/html",".ttf":"font/ttf",".css":"text/css",".js":"text/javascript",".woff2":"font/woff2",".svg":"image/svg+xml",".jpg":"image/jpeg",".json":"application/json"},
	_: {
		client: {"start":"_app/immutable/entry/start.BUMqcuYx.js","app":"_app/immutable/entry/app.DvbN5-2O.js","imports":["_app/immutable/entry/start.BUMqcuYx.js","_app/immutable/chunks/Bhxzz1gg.js","_app/immutable/chunks/D_1OQ_gr.js","_app/immutable/chunks/UMRfY9Ko.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/CS3uJLGD.js","_app/immutable/entry/app.DvbN5-2O.js","_app/immutable/chunks/CmsKOCeN.js","_app/immutable/chunks/UMRfY9Ko.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/Bq4tIOc4.js","_app/immutable/chunks/D7M_RLsn.js","_app/immutable/chunks/D7kVQxiR.js","_app/immutable/chunks/BDr9Qe-U.js","_app/immutable/chunks/C8EeH_y7.js","_app/immutable/chunks/CS3uJLGD.js","_app/immutable/chunks/btzWWUBN.js","_app/immutable/chunks/CSfE_DI5.js","_app/immutable/chunks/BqU0DZvs.js","_app/immutable/chunks/D_1OQ_gr.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/32.js')),
			__memo(() => import('./nodes/33.js')),
			__memo(() => import('./nodes/34.js')),
			__memo(() => import('./nodes/35.js')),
			__memo(() => import('./nodes/36.js')),
			__memo(() => import('./nodes/37.js')),
			__memo(() => import('./nodes/38.js')),
			__memo(() => import('./nodes/39.js')),
			__memo(() => import('./nodes/40.js')),
			__memo(() => import('./nodes/41.js')),
			__memo(() => import('./nodes/42.js')),
			__memo(() => import('./nodes/43.js')),
			__memo(() => import('./nodes/44.js')),
			__memo(() => import('./nodes/45.js')),
			__memo(() => import('./nodes/46.js'))
		],
		routes: [
			{
				id: "/admin/competitions/[competition_name]/overview",
				pattern: /^\/admin\/competitions\/([^/]+?)\/overview\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/competitions/[competition_name]/players",
				pattern: /^\/admin\/competitions\/([^/]+?)\/players\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3,], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]",
				pattern: /^\/competitions\/([^/]+?)\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/change-grade",
				pattern: /^\/competitions\/([^/]+?)\/change-grade\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/friends",
				pattern: /^\/competitions\/([^/]+?)\/friends\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/home",
				pattern: /^\/competitions\/([^/]+?)\/home\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/leaderboard",
				pattern: /^\/competitions\/([^/]+?)\/leaderboard\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/lessons",
				pattern: /^\/competitions\/([^/]+?)\/lessons\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/lessons/listing",
				pattern: /^\/competitions\/([^/]+?)\/lessons\/listing\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/my-games",
				pattern: /^\/competitions\/([^/]+?)\/my-games\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/my-subscription",
				pattern: /^\/competitions\/([^/]+?)\/my-subscription\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/profile",
				pattern: /^\/competitions\/([^/]+?)\/profile\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/profile/edit",
				pattern: /^\/competitions\/([^/]+?)\/profile\/edit\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/results",
				pattern: /^\/competitions\/([^/]+?)\/results\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/rewards",
				pattern: /^\/competitions\/([^/]+?)\/rewards\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/rules",
				pattern: /^\/competitions\/([^/]+?)\/rules\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/competitions/[competition_name]/stats",
				pattern: /^\/competitions\/([^/]+?)\/stats\/?$/,
				params: [{"name":"competition_name","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,4,5,], errors: [1,,,], leaf: 22 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
