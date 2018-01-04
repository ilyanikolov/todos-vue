<template>
	<div class="todo">
		<div class="toolbar">
			<div class="container">
				<div class="form-group">
					<input type="text" placeholder="Todo title" v-model="todo_title" @keyup.enter="createTodo">
				</div>
			</div>
		</div>
		<div class="content">
			<div class="container">
				<div class="todo-wrap">
					<ul class="list">
						<li class="list-item" v-for="item in todos">
							<div :class="{btn, completed : item.completed}" @click="item.completed = !item.completed">
								<i class="material-icons">{{item.completed ? 'check_box' : 'check_box_outline_blank'}}</i>
							</div>
							<div>{{item.title}}</div>
							<div class="btn delete"><i class="material-icons">delete</i></div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'todos',
		data() {
			return {
				todos: [
					{title: 'Lorem ipsum 1', completed: true},
					{title: 'Lorem ipsum 2', completed: false},
					{title: 'Lorem ipsum 3', completed: false},
					{title: 'Lorem ipsum 4', completed: false},
					{title: 'Lorem ipsum 5', completed: false}
				],
				todo_title: '',
				comletedClass: 'lnr lnr-checkmark-circle',
				incompletedClass: 'lnr lnr-circle-minus'
			}
		},
		computed: {

		},
		methods: {
			createTodo() {
				if(!this.todo_title) return;
				else {
					this.todos.unshift({title: this.todo_title, completed: false});
					this.todo_title = "";
				}
			},
			isCompleted(item) {
				return item.completed === true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		max-width: 680px;
		height: auto;
		margin: 0 auto;

		@media (max-width: 700px ) {
			padding: 0 15px;
		}
	}

	.toolbar {
		height: 56px;
		background-color: #2F323A;
		padding: 8px 0;
	}

	.content {
		padding: 25px 0;
	}

	.list {
		max-height: calc(100vh - 106px);
		overflow-y: scroll;


		&-item {
			cursor: pointer;
			text-align: left;
			display: grid;
			grid-template-columns: 40px auto 40px;
			grid-template-rows: 1fr;
			padding: 0 10px;
			line-height: 40px;
			background-color: #fff;

			&:not(:first-child) {
				margin-top: 1px;
			}
			&:first-child {
				border-top-left-radius: 2px;
				border-top-right-radius: 2px;
			}
			&:last-child {
				border-bottom-left-radius: 2px;
				border-bottom-right-radius: 2px;
			}

			&:hover .btn.delete {
				opacity: 1;

			}
		}
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;

		&.delete {
			opacity: 0;
			/*transition: visibility .3s ease-in-out;*/
		}

		&.completed {
			color: #50C14E;
		}
	}



	.form-group {
		color: #f0f0f0;
		input {
			font-family: inherit;
			border-radius: 2px;
			padding: 0 20px;
			line-height: 40px;
			border: none;
			width: 100%;
			background-color: lighten(#2F323A, 5%);
			color: inherit;
		}
	}
</style>
