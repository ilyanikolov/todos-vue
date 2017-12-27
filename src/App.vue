<template>
	<div id="app" :class="{container: true, wide: toggled}">
		<div class="top toolbar"></div>
		<div class="left navbar">
			<ul class="navbar-list">
				<li class="navbar-list-item toggle" @click="toggled = !toggled">
					<i :class="menuToggle"></i>
				</li>
				<li class="navbar-list-item"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				msg: 'Welcome to Your Vue.js App',
				toggled: false,
				menuToggle: {
					lnr: true,
					'lnr-chevron-right': !this.toggled,
					'lnr-cross': this.toggled
				}
			}
		},
		methods: {
			toggleNavbar() {

			}
		}
	}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		display: grid;
		grid-template-columns: 50px auto;
		grid-template-rows: 50px auto;

		&.wide {
			grid-template-columns: 150px auto;
		}
	}

	.left {
		grid-column: 1;
		grid-row-start: 1;
		grid-row-end: 3;
	}

	.top {
		grid-column: 2;
		grid-row: 1;
	}

	.toolbar {
		background-color: #f4f6fa;
	}

	.navbar {
		background-color: #272835;
	}

	.navbar-list {
		color: #fafafa;
		&-item {
			text-align: center;
			line-height: 50px;
			font-size: 16px;
		}
	}
</style>
