<style lang="less">
    @import "./index.less";
</style>

<template>
    <div class='tree-model'>
        <Col :md="6" :sm="7">
            <!-- <Tree  :data="treeStructure"  @on-select-change='selectChange' ></Tree> -->
            <Tree :data="treeStructure"  :render="renderContent" @on-toggle-expand="saveToggleNode"></Tree>
        </Col>
    </div>
</template>

<script src='./index.js'>
    
</script>
