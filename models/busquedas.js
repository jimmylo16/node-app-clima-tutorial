const axios = require('axios');
const https = require('https');

class Busqueda {
	// las clases empiezan con mayuscula

	historial = [ 'cdmx', 'bogota', 'la plata' ];

	constructor() {}
	get parametrosCiudad() {
		return {
			access_token: process.env.MAPBOX_KEY,
			limit: 6,
			language: 'es'
		};
	}
	get parametrosClima() {
		return {
			appid: process.env.OPENWEATHER_KEY,
			units: 'metric',
			lang: 'es'
		};
	}
	

	async ciudad(lugar = '') {
		const instance = axios.create({
			baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
			httpsAgent: new https.Agent({ rejectUnauthorized: false }),
			params: this.parametrosCiudad
		});
		const resp = await instance.get();
		return resp.data.features.map((lugar) => ({
			id: lugar.id,
			nombre: lugar.place_name,
			lng: lugar.center[0],
			lat: lugar.center[1]
		}));
	}
	async climaLugar(lat, lon) {
		try {
			const instance = axios.create({
				baseURL: `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
				httpsAgent: new https.Agent({ rejectUnauthorized: false }),
				params: this.parametrosClima
			});
			const resp = await instance.get();
			console.log(resp.data)
			
		} catch (error) {
			console.log(error);
		}

		const resp = await instance.get();
	}
}
module.exports = Busqueda;
