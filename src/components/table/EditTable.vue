<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Chỉnh sửa table
        </v-card-title>
        <v-card-text>
            <v-text-field label="ID table" v-model="item.id"></v-text-field>
            <div v-for="col in item.column" :key="col.index" class="d-flex">
                <v-text-field label="Id cột" v-model="col.id" class="pr-5"></v-text-field>
                <v-text-field label="Tên cột" v-model="col.name"></v-text-field>
                <v-btn fab small color="deep-orange" class="my-3 ml-3" @click="deleteColumn(col.index)"><v-icon>mdi-minus</v-icon></v-btn>
            </div>
            <div class="d-flex">
                <v-text-field label="Id cột" v-model="columnId" class="pr-5"></v-text-field>
                <v-text-field label="Tên cột" v-model="columnName"></v-text-field>
                <v-btn fab small color="light-blue" class="my-3 ml-3" @click="addColumn"><v-icon>mdi-plus</v-icon></v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['item'],
    data: () => ({
        columnIndex: 100,
        columnId: '',
        columnName: ''
    }),
    addColumn() {
        let vm = this
        vm.item.column.push({
            index: vm.columnIndex,
            id: vm.columnId,
            name: vm.columnName
        })
        vm.columnIndex++
        vm.columnId = ''
        vm.columnName = ''
    },
    deleteColumn(index) {
        let vm = this
        vm.item.column = vm.item.column.filter(column => column.index != index)
    }
};
</script>