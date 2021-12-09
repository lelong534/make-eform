<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Thêm table
        </v-card-title>
        <v-card-text>
            <v-text-field label="ID table" v-model="newItem.id"></v-text-field>
            <div v-for="item in newItem.column" :key="item.index" class="d-flex">
                <v-text-field label="Id cột" v-model="item.id" class="pr-5"></v-text-field>
                <v-text-field label="Tên cột" v-model="item.name"></v-text-field>
                <v-btn fab small color="deep-orange" class="my-3 ml-3" @click="deleteColumn(item.index)"><v-icon>mdi-minus</v-icon></v-btn>
            </div>
            <div class="d-flex">
                <v-text-field label="Id cột" v-model="columnId" class="pr-5"></v-text-field>
                <v-text-field label="Tên cột" v-model="columnName"></v-text-field>
                <v-btn fab small color="light-blue" class="my-3 ml-3" @click="addColumn"><v-icon>mdi-plus</v-icon></v-btn>
            </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5">
            <v-btn class="mx-3 success" @click="add()">Tạo mới</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data: () => ({
        newItem: {
            id: '',
            column: []
        },
        columnIndex: 0,
        columnId: '',
        columnName: ''
    }),
    methods: {
        add() {
            let vm = this
            vm.newItem.type = 'table'
            vm.$emit("add", this.newItem)
            console.log(vm.newItem)
            vm.newItem = {
                id: '',
                column: []
            }
            vm.columnIndex = 0
            vm.columnId = ''
            vm.columnName = ''
        },
        addColumn() {
            let vm = this
            vm.newItem.column.push({
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
            vm.newItem.column = vm.newItem.column.filter(column => column.index != index)
        }
    },
};
</script>