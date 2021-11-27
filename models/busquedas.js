const https = require('https');
const fs = require('fs');

const axios = require('axios');

class Busqueda {
	// las clases empiezan con mayuscula
	
	historial = [];
	dbPath = './db/database.json';

	constructor() {}
	get historialCapitalzado(){
		return this.historial.map(lugar=>{
			let palabras = lugar.split(' ');
			palabras = palabras.map(p=>p[0].toUpperCase()+p.substring(1));
			return palabras.join(' ')
		})
	}
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
				baseURL: `http://api.openweathermap.org/data/2.5/weather`,
				httpsAgent: new https.Agent({ rejectUnauthorized: false }),
				params: { ...this.parametrosClima, lat, lon }
			});
			const resp = await instance.get();
			const { weather, main } = resp.data;
			return {
				desc: weather[0].description,
				min: main.temp_min,
				max: main.temp_max,
				temp: main.temp
			};
		} catch (error) {
			console.log(error);
		}
	}

	agregarHistorial(lugar = '') {
		if (this.historial.includes(lugar.toLocaleLowerCase())) {
			return;
		}
		this.historial = this.historial.splice(0,5); //solo tendre 6 en mi historial
		this.historial.unshift(lugar.toLocaleLowerCase());
		this.guardarDB();
	}
	guardarDB() {
		const payLoad = {
			historial: this.historial
		};
		fs.writeFileSync(this.dbPath, JSON.stringify(payLoad));
	}

	leerDB() {
		if (!fs.existsSync(this.dbPath)) return;

		const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
		const data = JSON.parse(info);
		this.historial = data.historial;
	}
}
module.exports = Busqueda;
