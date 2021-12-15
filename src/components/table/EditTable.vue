<template>
    <v-card>
        <v-card-title class="grey lighten-2"> Chỉnh sửa table
        </v-card-title>
        <v-card-text>
            <v-text-field label="ID table" v-model="item.id"></v-text-field>
            <div v-for="col in item.column" :key="col.index" class="d-flex">
                <v-text-field label="Id cột" v-model="col.id" class="pr-5"></v-text-field>
                <v-text-field label="Tên cột" v-model="col.name" class="pr-5"></v-text-field>
                <v-text-field label="Độ rộng" v-model="col.width"></v-text-field>
                <v-btn fab small color="deep-orange" class="my-3 ml-3" @click="deleteColumn(col.index)"><v-icon>mdi-minus</v-icon></v-btn>
            </div>
            <div class="d-flex">
                <v-text-field label="Id cột" v-model="columnId" class="pr-5"></v-text-field>
                <v-text-field label="Tên cột" v-model="columnName" class="pr-5"></v-text-field>
                <v-text-field label="Độ rộng" v-model="width"></v-text-field>
                <v-btn fab small color="light-blue" class="my-3 ml-3" @click="addColumn()"><v-icon>mdi-plus</v-icon></v-btn>
            </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-5">
            <v-btn class="mx-3 success" @click="update()">Cập nhật</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ['item'],
    data: () => ({
        columnIndex: 100,
        columnId: '',
        columnName: '',
        width: ''
    }),
    addColumn() {
        let vm = this
        vm.item.column.push({
            index: vm.columnIndex,
            id: vm.columnId,
            name: vm.columnName,
            width: vm.width
        })
        vm.columnIndex++
        vm.columnId = ''
        vm.columnName = ''
        vm.width = ''
    },
    deleteColumn(index) {
        let vm = this
        vm.item.column = vm.item.column.filter(column => column.index != index)
    },
    update() {
        let vm = this
        vm.$emit("add", vm.item)
    }
};
</script>