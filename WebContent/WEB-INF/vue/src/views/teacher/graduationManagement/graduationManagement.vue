<template>
	<div class="steps">
		<el-steps :active="3" align-center>
			<el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
			<el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
			<el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
			<el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
		</el-steps>
	</div>
</template>

<script>
</script>

<style>
	.bgWhite {
		overflow-y: hidden !important;
		position: relative;
		
	}
	.steps{
		position: absolute;
		top: 40%;
		width: 100%;
		overflow: hidden;
	}
</style>