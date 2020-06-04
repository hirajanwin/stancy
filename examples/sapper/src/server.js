import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
// import stancy from 'stancy';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

// if (dev) {
// 	stancy('content/').serve('4000', '/api/');
// }

polka() // You can also use Express
	.use(compression({ threshold: 0 }), sirv('static', { dev }), sapper.middleware())
	.listen(PORT, (err) => {
		if (err) console.log('error', err);
	});
