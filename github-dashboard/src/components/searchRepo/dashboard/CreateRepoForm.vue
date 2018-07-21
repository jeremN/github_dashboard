<template>
<div class="modal">
	<form class="form" @submit.prevent="onSubmit">
		<button 
			class="btn-close" 
			type="button"
			@click="closeModal">
			<i class="fas fa-times"></i>
		</button>
		<h1 class="navbar-brand">Create a new repo <i class="fas fa-grin-alt"></i></h1>
		<div class="form-group form-group-file">
			<input 
				id="selectFiles" 
				class="form-field" 
				type="file" 
				name="newrepoFiles"
				multiple
				accept=".txt, .html, .css, .scss, .sass, .js, .json, .php, .vue, .md" 
				@change="files">		
			<label for="selectFiles">Drag'n'Drop your files or <span>Select a file</span></label>
		</div>
		<div class="form-group">
			<label for="title">Nom<span>(required)</span></label>
			<input 
				id="title" 
				class="form-field" 
				type="text" 
				name="newrepoTitle" 
				required
				v-model="title">
		</div>
		<div class="form-group">
			<label for="message">Description<span>(required)</span></label>
			<textarea 
				id="message" 
				class="form-field" 
				name="newrepoMessage"
				v-model="description">
			</textarea>
		</div>
		<div class="form-group">
			<button 
				id="sendIssue" 
				class="form-btn btn-submit">
				Submit issue
			</button>
		</div>
	</form>
</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'

	export default {
		data() {
			return {
				folder: [],
				title: '',
				description: '',
			}
		},
		created() {
			if(!this.datas) {
				this.closeModal()
			}
		},
		methods: {
			...mapActions({
				createRepo: 'createRepo'
			}),
			files(e) {
				const loadedFiles = e.target.files || e.dataTransfer.files
				if(!loadedFiles.length) return
				for(let i = 0; i < loadedFiles.length; i++) {
					this.folder.push(loadedFiles[i])
				}
			},
			onSubmit() {
				const repoData = {
					files: this.folder,
					name: this.title,
					description: this.description
				}

				this.createRepo(repoData)
				this.folder = []
				this.title = ''
				this.description = ''
				this.closeModal()
			},
			closeModal(event) {
				this.$emit('close-modal-repo', false)
			},
			getObj(obj) {
				console.log(obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
 	form {
		max-width: 420px;
		position: relative;

		P {
			font-size: 12px;
			color: #c9d4d7;

			strong {
				font-size: 14px;
				font-weight: bold;
			}
		}
 	}
	.btn-close {
	    position: absolute;
	    width: 30px;
	    height: 30px;
	    top: 10px;
	    right: 10px;
	    border-radius: 50%;
	    border: 2px solid #c9d4d7;
	    background: none;
	    cursor: pointer;
	}
	.form-group-file {
		position: relative;
		display: flex;
		justify-content: center;
		padding: 5px;
		border: 1px dashed #c9d4d7;
		height: 80px;

		& > .form-field {
			border: none;
			width: 100%;
			height: 100%;
			opacity: 0;
			overflow: hidden;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			cursor: pointer;

		}
		& > label {
			margin: 0.5em 0;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			span {
				cursor: pointer;
				display: flex;
				width: 120px;
				height: 36px;
				padding: 0.5em;
				margin: 1em auto 0;
				font-size: 14px;
				color: #fff;
				background-color: #c9d4d7;
				border-radius: 8px;
				justify-content: center;
			}
		}
	}

</style>