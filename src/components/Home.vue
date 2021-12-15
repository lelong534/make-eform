<template>
  <div>
    <div class="d-flex">
      <v-row>
        <v-col md="6">
          <v-container>
            <v-card class="pa-5">
              <div v-for="item in items" :key="item.index">
                <!-- show input -->
                <v-toolbar elevation="3" class="mb-2 pt-3 js-hover-show-actions" v-if="item.type=='input'">
                  <v-row>
                    <div v-for="input in item.inputs" :key="input.id" class="d-flex px-1" :style="{'width': input.inputWidth * 8.33 + '%'}">
                      <div :style="{'width': input.labelWidth / input.inputWidth * 100 + '%'}" v-if="input.inputWidth - input.labelWidth > 0">
                        <p>{{input.title == undefined ? "" : input.title}}</p>
                      </div>
                      <div :style="{'width': (input.inputWidth - input.labelWidth) / input.inputWidth * 90 + '%'}" v-if="input.inputWidth - input.labelWidth > 0">
                        <v-text-field outlined dense></v-text-field>
                      </div>
                      <div :style="{'width': (input.inputWidth - input.labelWidth) / input.inputWidth * 10 + '%'}" v-if="input.inputWidth - input.labelWidth > 0">
                        <p>{{input.appendText == undefined ? "" : input.appendText}}</p>
                      </div>
                      <div v-if="input.inputWidth - input.labelWidth <= 0">
                        <p>{{input.title}}</p>
                      </div>
                    </div>
                    <v-spacer></v-spacer>
                  </v-row>
                  <div class="action-bars">
                    <v-btn fab class="ma-2" small @click="dupl(item)"><v-icon small>mdi-content-copy</v-icon></v-btn>
                    <v-btn fab class="ma-2" small @click="edit(item)"><v-icon small>mdi-pencil</v-icon></v-btn>
                    <v-btn fab class="ma-2" small @click="del(item)"><v-icon small>mdi-minus</v-icon></v-btn>
                    <v-btn class="ma-2" small @click="addInputToInput(item)">+ Input</v-btn>
                  </div>
                </v-toolbar>
                <!-- show text -->
                <div v-if="item.type=='text'">
                  <v-toolbar elevation="3" class="mb-2 pt-3 js-hover-show-actions">
                    <v-row style="width: 100%">
                      <div :style="{'width': item.width[0] * 8.33 + '%'}"></div>
                      <div :style="{'width': (item.width[1] - item.width[0]) * 8.33 + '%'}">
                        <p :style='"font-weight:" + item.weight  + ";font-style:" + item.style+";text-align:start"' v-if="item.align == 'left'"> {{item.title}} </p>
                        <p :style='"font-weight:" + item.weight  + ";font-style:" + item.style+";text-align:center"' v-if="item.align == 'center'"> {{item.title}} </p>
                        <p :style='"font-weight:" + item.weight  + ";font-style:" + item.style+";text-align:end"' v-if="item.align == 'end'"> {{item.title}} </p>
                      </div>
                    </v-row>
                    <div class="action-bars">
                      <v-btn fab class="ma-2" small @click="dupl(item)"><v-icon small>mdi-content-copy</v-icon></v-btn>
                      <v-btn fab class="ma-2" small @click="edit(item)"><v-icon small>mdi-pencil</v-icon></v-btn>
                      <v-btn fab class="ma-2" small @click="del(item)"><v-icon small>mdi-minus</v-icon></v-btn>
                    </div>
                  </v-toolbar>
                </div>
                <!-- show table -->
                <div v-if="item.type == 'table'">
                  <v-toolbar elevation="3" class="mb-2 pt-3 js-hover-show-actions">
                    <v-row class="d-flex justify-space-between mb-3">
                      <v-col v-for="item in item.column" :key="item.index">
                        <v-card outlined tile class="text-center"> {{item.name}} </v-card>
                      </v-col>
                    </v-row>
                    <div class="action-bars">
                      <v-btn fab class="ma-2" small @click="dupl(item)"><v-icon small>mdi-content-copy</v-icon></v-btn>
                      <v-btn fab class="ma-2" small @click="edit(item)"><v-icon small>mdi-pencil</v-icon></v-btn>
                      <v-btn fab class="ma-2" small @click="del(item)"><v-icon small>mdi-minus</v-icon></v-btn>
                    </div>
                  </v-toolbar>
                </div>
                <!-- end show -->
              </div>
              <v-toolbar elevation="3">
                <v-spacer></v-spacer>
                <v-btn class="ma-2" color="pink lighten-5" @click="showTextDialog">Text</v-btn>
                <v-btn class="ma-2" color="pink lighten-5" @click="showInputDialog">Input</v-btn>
                <v-btn class="ma-2" color="pink lighten-5" @click="showTableDialog">Table</v-btn>
                <v-spacer></v-spacer>
              </v-toolbar>
            </v-card>
            <h5>Chú ý</h5>
            <ul>
              <li><h5>Mỗi bảng có kích thước 430, do 40 dùng để chứa cột số thứ tự</h5></li>
              <li><h5>Mỗi dòng chỉ chứa 1 loại input (có độ dài 250 hoặc không)</h5></li>
              <li><h5>Trong 1 input nếu độ dài input và độ dài label bằng nhau thì coi như input đấy chỉ chứa text</h5></li>
              <li><h5>Tạo khoảng trống bằng cách tạo text không có nội dung</h5></li>
            </ul>
          </v-container>
        </v-col>

        <!-- show script, pdf -->
        <v-col md="6">
          <v-container>
            <v-row>
              <v-col>
                <v-container class="pa-3 content" :style='content == "script" ? "display: block" : "display: none"'>
                  <v-row class="pa-3">
                    <v-btn small fab @click="copyScript" style="position: fixed; right: 12rem"><v-icon small>mdi-content-copy</v-icon></v-btn>
                    <v-btn small fab @click="showEform" style="position: fixed; right: 9rem"> Eform </v-btn>
                    <v-btn small fab @click="showPDF" style="position: fixed; right: 6rem"> PDF </v-btn>
                    <v-btn small fab @click="showData" style="position: fixed; right: 3rem"> Data </v-btn>
                  </v-row>
                  <div id="script"></div>
                </v-container>

                <v-container class="pa-3 content"  :style='content == "jrxml" ? "display: block" : "display: none"'>
                  <v-row class="pa-3">
                    <v-btn small fab @click="copyJrxml" style="position: fixed; right: 12rem"><v-icon small>mdi-content-copy</v-icon></v-btn>
                    <v-btn small fab @click="showEform" style="position: fixed; right: 9rem"> Eform </v-btn>
                    <v-btn small fab  @click="showPDF" style="position: fixed; right: 6rem"> PDF </v-btn>
                    <v-btn small fab @click="showData" style="position: fixed; right: 3rem"> Data </v-btn>
                  </v-row>
                  <div id="jrxml"></div>
                </v-container>

                <v-container class="pa-3 content"  :style='content == "data" ? "display: block" : "display: none"'>
                  <v-row class="pa-3">
                    <v-btn small fab @click="copyData" style="position: fixed; right: 12rem"><v-icon small>mdi-content-copy</v-icon></v-btn>
                    <v-btn small fab @click="showEform" style="position: fixed; right: 9rem"> Eform </v-btn>
                    <v-btn small fab  @click="showPDF" style="position: fixed; right: 6rem"> PDF </v-btn>
                    <v-btn small fab @click="showData" style="position: fixed; right: 3rem"> Data </v-btn>
                  </v-row>
                  <div id="data"></div>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <v-container class="px-3 py-0">
                <v-btn color="info" @click="importState" class="mb-3">Đặt lại cấu hình</v-btn>
                <v-textarea rows="9" id="state-textarea" outlined :value="JSON.stringify(items, null, '\t')">
                </v-textarea>
              </v-container>
            </v-row>
          </v-container>
        </v-col>
        <!-- end show script, pdf -->
      </v-row>
    </div>

    <v-dialog v-model="textDialog" width="800"> <text-dialog @add="add" :item="selectedItem" :index="itemIndexToAdd"></text-dialog>
    </v-dialog>
    
    <v-dialog v-model="addInputDialog" width="800"> <add-input @add="addInput" :item="selectedItem" :index="itemIndexToAdd"></add-input>
    </v-dialog>

    <v-dialog v-model="addInputDialogNewRow" width="800"> <input-dialog @add="addInput"></input-dialog>
    </v-dialog>

    <v-dialog v-model="editInputDialog" width="800"> <edit-input @add="add" :item="selectedItem" :index="itemIndexToAdd"></edit-input>
    </v-dialog>

    <v-dialog v-model="editTextDialog" width="800"> <edit-text @add="add" :item="selectedItem"></edit-text>
    </v-dialog>

    <v-dialog v-model="editTableDialog" width="800"> <edit-table @add="add" :item="selectedItem"></edit-table>
    </v-dialog>

    <v-dialog v-model="tableDialog" width="800"> <table-dialog @add="add" :item="selectedItem" :index="itemIndexToAdd"></table-dialog>
    </v-dialog>
  </div>
</template>

<script>
// import { htmlstyle } from '@/files/html/style.js'
import { html } from '@/files/html.js'
import { script } from '@/files/script.js'
import { jrxml } from '@/files/jrxml.js'
import { data } from '@/files/data.js'
import TextDialog from './TextDialog.vue'
import TableDialog from './TableDialog.vue'
import AddInput from './input/AddInput.vue'
import EditInput from './input/EditInput.vue'
import InputDialog from './InputDialog.vue'
import EditText from './text/EditText.vue'
import EditTable from './table/EditTable.vue'

export default {
  data: () => ({
    items: [],
    newItem: {},
    selectedItem: {
      labelWidth: 1,
      inputWidth: 11
    },
    itemIndexToAdd: null,
    type: 'input',
    content: 'script',
    addInputDialog: false,
    editInputDialog: false,
    editTextDialog: false,
    editTableDialog: false,
    textDialog: false,
    tableDialog: false,
    addInputDialogNewRow: false,
    newItemIndex: 0,
    newInputIndex: 0
  }),
  components: {TextDialog, TableDialog, AddInput, InputDialog, EditInput, EditText, EditTable},
  mixins: [html, script, jrxml, data],
  methods: {
    add(item) {
      let vm = this
      if (item.index == undefined) {
        item.index = vm.newItemIndex
        vm.items.push(item)
        vm.newItemIndex++
      } else {
        let findIndex = vm.items.findIndex(i => i.index == item.index)
        vm.items[findIndex] = item
      }
      vm.addInputDialog = false
      vm.editInputDialog = false
      vm.editTextDialog = false
      vm.editTableDialog = false
      vm.generateScriptPdf()
    },

    addInput(itemInput) {
      let vm = this
      if (itemInput.parentIndex == undefined) {
        itemInput.index = vm.newInputIndex
        itemInput.parentIndex = vm.newItemIndex
        vm.newInputIndex++
        
        let item = {
          index: vm.newItemIndex,
          inputs: [itemInput],
          type: 'input'
        }
        
        vm.items.push(item)
        vm.newItemIndex++
      } else {
        let findIndex = vm.items.findIndex(i => i.index == itemInput.parentIndex)
        vm.items[findIndex].inputs.push(itemInput)
      }
      vm.itemIndexToAdd = ''
      vm.addInputDialogNewRow = false
      vm.addInputDialog = false
      
      vm.generateScriptPdf()
    },

    generateScriptPdf() {
      let vm = this
      vm.selectedItem = {
        labelWidth: 1,
        inputWidth: 11
      }
      let jrxml = document.getElementById('jrxml')
      let script = document.getElementById('script')
      let html = vm.createHtml(vm.items).replace(/\s\s+/g, " ")
      let data = document.getElementById('data')
      jrxml.innerText = vm.createJrxml(vm.items) 
      data.innerText = vm.createData(vm.items) 
      script.innerText = vm.createScript(vm.items, html)
    },

    edit(item) {
      this.selectedItem = item
      if (item.type == 'input') {
        this.editInputDialog = true
      } else if (item.type == 'text') {
        this.editTextDialog = true
      } else if (item.type == 'table') {
        this.editTableDialog = true
      }
    },

    del(item) {
      let vm = this
      vm.items = vm.items.filter(i => i.index != item.index)
    },

    dupl(item) {
      let vm = this
      let duplItem = {}
      if (item.type == 'input') {
        duplItem = {
          index: vm.newItemIndex + 1,
          id: item.id,
          type: 'input'
        }
        let dulpInputs = []
        item.inputs.forEach(input => {
          let dulpInputlItem = {
            id: input.id,
            title: input.title,
            placeholder: input.placeholder,
            labelWidth: input.labelWidth,
            parentIndex: duplItem.index,
            align: input.align,
            fixWidth: input.fixWidth,
            index: input.index,
            inputWidth: input.inputWidth,
            appendText: input.appendText,
            rows: input.rows
          } 
          dulpInputs.push(dulpInputlItem)
        })
        duplItem.inputs = dulpInputs
      } else if (item.type == 'text') {
        duplItem = {
          index: vm.newItemIndex + 1, 
          id: item.id,
          title: item.title,
          weight: item.weight,
          style: item.style,
          width: item.width,
          size: item.size,
          align: item.align,
          type: 'text'
        }
      } else if (item.type == 'table') {
        duplItem = {
          index: vm.newItemIndex + 1,
          id: item.id, 
          column: item.column,
          type: 'table'
        }
      }
      let findIndex = vm.items.findIndex(i => i.index == item.index)
      vm.items.splice(findIndex, 0, duplItem)
      vm.items.join()
      vm.newItemIndex++
    },

    addTextToInput(item) {
      let vm = this
      vm.itemIndexToAdd = item.index
      vm.textDialog = true
    },

    addInputToInput(item) {
      let vm = this
      vm.itemIndexToAdd = item.index
      vm.addInputDialog = true
    },

    importState() {
      let vm = this
      let state = document.getElementById("state-textarea").value
      vm.items = JSON.parse(state);
      vm.generateScriptPdf()
    },

    copyScript() {
      let copyText = document.getElementById('script');
      navigator.clipboard.writeText(copyText.innerText)
    },

    copyJrxml() {
      let copyText = document.getElementById('jrxml');
      navigator.clipboard.writeText(copyText.innerText)
    },

    copyData() {
      let copyText = document.getElementById('data');
      navigator.clipboard.writeText(copyText.innerText)
    },

    showPDF() {
      let vm = this
      vm.content = 'jrxml'
    },

    showEform() {
      let vm = this
      vm.content = 'script'   
    },

    showData() {
      let vm = this
      vm.content = 'data'   
    },

    showInputDialog() {
      let vm = this
      vm.addInputDialogNewRow = true
      vm.textDialog = false
      vm.tableDialog = false
      vm.type = 'input'
      console.log(vm.selectedItem)
    },

    showTextDialog() {
      let vm = this
      vm.inputDialog = false
      vm.textDialog = true
      vm.tableDialog = false
      vm.type = 'text'
    },

    showTableDialog() {
      let vm = this
      vm.addInputDialog = false
      vm.textDialog = false
      vm.tableDialog = true
      vm.type = 'table'
    }
  }
};
</script>