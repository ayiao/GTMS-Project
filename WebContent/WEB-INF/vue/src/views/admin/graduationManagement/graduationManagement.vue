<template>
	<div class="steps">
		<el-steps :active="5" align-center>
			<el-step title="选题" description="选题"></el-step>
			<el-step title="写开题报告" description="写开题报告"></el-step>
			<el-step title="开始毕业设计" description="开始毕业设计"></el-step>
			<el-step title="写毕业论文" description="写毕业论文"></el-step>
			<el-step title="答辩" description="答辩"></el-step>
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