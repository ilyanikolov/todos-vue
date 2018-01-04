<template>
	<div class="wrapper">

		<div class="weather">
			<div class="weather-search">
				<div class="search-item">Right now in</div>
				<div class="search-item">
					<input type="text" id="location"
						v-model="location"
						v-autowidth="{maxWidth: '960px', minWidth: '20px', comfortZone: 0}"
					>
					<label for="location"><i data-feather="search"></i></label>
				</div>
				<div class="search-item">, it's {{weather(today).main | toLower}}</div>
			</div>
			<div class="weather-main">
				<div class="icon">
					<i :class="weather(today).icon"></i>
				</div>
				<div class="temp">
					<div class="temp-current">
						{{main(today).temp}}
						<div class="temp-min-max">{{main(today).temp_min}}° / {{main(today).temp_max}}°</div>
					</div>

				</div>
				<div class="additional">
					<div><i class="fi flaticon-wind"></i>{{wind(today).speed}}<small>kmh</small></div>
					<div><i class="fi flaticon-drop"></i>{{main(today).humidity}}<small>%</small></div>
					<div><i class="fi flaticon-gauge"></i>{{main(today).pressure}}<small>mmHg</small></div>
				</div>
			</div>
			<div class="weather-forecast">
				<div class="item" v-for="item in forecast">
					<div class="icon"><i :class="weather(item).icon"></i></div>
					<div class="temp">{{main(item).temp_min}}° / {{main(item).temp_max}}°</div>
					<div class="date">{{forecastWeekday(item) | dateDay}}</div>
				</div>
			</div>
			<div class="weather-unit">
				<!--{{today}}-->
				<!--{{forecast}}-->
			</div>
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	import _ from 'lodash'

    export default {
        name: "weather",
		data() {
        	return {
        		location: 'London',
        		today: {
        			main: {},
					wind: {},
        			weather: [{main:'',description:'',icon:''}]
				},
				forecast: []
			}
		},
		created() {
			this.getWeather();
			this.getForecast();
		},
		filters: {
        	date(val) {
        		return val ? new Date(val).toLocaleString() : '';
			},
			dateDay(val) {
        		return val ? new Date(val).toGMTString().slice(0,3) : '';
			},
			toLower(val) {
        		if(!val) val = '';
        		return val.toLowerCase();
			}
		},
		watch: {
        	location() {
				this.getWeather();
			}
		},
		methods: {
        	getWeather: _.debounce(function() {
				axios
					.get(`/weather?q=${this.location}`)
					.then(res => {
						this.today = res.data;
					})
					.catch(err => {
						if(err) console.log(err);
					});
			},1000),
			getForecast: _.debounce(function() {
				axios
					.get(`/forecast?q=${this.location}`)
					.then(res => {
						this.forecast = res.data.list.filter(item => {
							let hours = new Date().getHours();
							let itemHours = new Date(item.dt_txt).getHours();

							switch(hours % 3) {
								case 1:
									hours -= 1;
									break;
								case 2:
									hours += 1;
									break;
							}

							return hours === itemHours;
						});
					})
					.catch(err => {
						if(err) console.log(err);
					});
			},1000),
			weather(item) {
				let weather = item.weather[0];
				return {
					main: weather.main,
					desc: weather.description,
					icon: 'owi owi-' + weather.icon
				}
			},
			main(item) {
				let main = item.main || {};
				return {
					temp: Math.round(main.temp),
					temp_min: Math.round(main.temp_min),
					temp_max: Math.round(main.temp_max),
					pressure: Math.round(main.pressure),
					humidity: Math.round(main.humidity)
				};
			},
			wind(item) {
				let wind = item.wind || {};
				return {
					speed: wind.speed,
					deg: wind.deg
				}
			},
			clouds(item) {
        		let clouds = item.clouds || {};
        		return clouds.all;
			},
			forecastWeekday(item) {
        		let date = item.dt_txt || {};
        		return date;
			}
		},
		computed: {

		}
    }
</script>

<style lang="scss" scoped>

	.fi {
		font-size: 2rem;
	}
	div {
		font-size: inherit;
	}
	small {
		font-size: 1.2rem;
		margin-left: 10px;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
	}

	.weather {
		display: grid;
		grid-template-columns: 600px;
		grid-template-rows: 50px 300px 250px 50px;

		&-main {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 1fr;

			.icon, .temp {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.additional {
				display: grid;
				grid-template-columns: 1fr auto 1fr;
				grid-template-rows: auto 50px 50px 50px auto;

				& * {
					grid-column: 2;
					display: flex;
					align-items: center;

					i {
						margin-right: 15px;
					}
				}

				& div:nth-child(1) {
					grid-row: 2;
				}
				& div:nth-child(2) {
					grid-row: 3;
				}
				& div:nth-child(3) {
					grid-row: 4;
				}
			}
		}

		&-forecast {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.item {
				display: grid;
				grid-template-columns: 100px;
				grid-template-rows: repeat(3, 40px);
			}
		}
	}

	.search-item {
		display: inline-block;
		position: relative;
		label {
			position: absolute;
			right: 5px;
			top: 7px;
			opacity: 0;

			transition: opacity .3s ease;

			svg {
				width: 20px;
			}
		}
		input[type="text"] {
			border: none;
			color: #2c3e50;
			border-bottom: 1px solid #d5d4d0;
			background-color: transparent;

			padding: 5px 15px;
			transition: padding .3s ease;

			&:hover {
				padding: 5px 35px 5px 15px;

				& + label {
					opacity: 1;
				}
			}
		}
	}

	.weather {
		&-main {
			.icon, .temp {
				font-size: 11rem;
			}

			.temp {
				&-current {
					position: relative;
					color: #2c3e50;
					.temp-min-max {
						font-size: 1.6rem;
						color: #d5d4d0;
						position: absolute;
						left: 50%;
						transform: translate(-50%,-50%);
					}
				}
			}
		}
		&-forecast {
			.item {
				line-height: 40px;

				.icon {
					font-size: 2rem;
				}
			}
			.date {
				font-size: 1.6rem;
			}
		}
	}
</style>
