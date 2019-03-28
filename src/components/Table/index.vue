<template>
    <div class='table_com'>
    <Table :data="tableData" :columns="tableColumns"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :current="currentPage" :page-size='20' @on-change="changePage" @on-select='selectRow'></Page>
        </div>
    </div>
    </div>
</template>
<script src='./index.js'></script>
