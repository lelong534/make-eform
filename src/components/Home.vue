<template>
  <div>
    <div class="d-flex">
      <v-row>
        <v-col md="6">
          <v-container>
            <v-card class="pa-5">
              <div v-for="item in items" :key="item.index">
                <!-- show input -->
                <v-toolbar elevation="3" class="mb-2 pt-3 input-bar" v-if="item.type=='input'">
                  <v-row>
                    <div v-for="input in item.inputs" :key="input.id" class="d-flex px-1" :style="{'width': (input.labelWidth + input.inputWidth) * 8.33 + '%'}">
                      <div :style="{'width': input.labelWidth / (input.labelWidth + input.inputWidth) * 100 + '%'}" v-if="input.type == 'input'">
                        <p>{{input.title}}</p>
                      </div>
                      <div :style="{'width': input.inputWidth / (input.labelWidth + input.inputWidth) * 100 + '%'}" v-if="input.type == 'input'">
                        <v-text-field outlined dense></v-text-field>
                      </div>
                      <div :style="{'width': input.labelWidth / (input.labelWidth + input.inputWidth) * 100 + '%'}" v-if="input.type == 'text'">
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
                  <v-toolbar elevation="3" class="mb-2 pt-3">
                    <v-row>
                      <v-col :md="item.width[0]" v-if="item.width[0] != 0">
                      </v-col>
                      <v-col :md="item.width[1]-item.width[0]">
                        <p :style='"font-weight:" + item.weight  + ";font-style:" + item.style+";text-align:start"' v-if="item.align == 'left'"> {{item.title}} </p>
                        <p :style='"font-weight:" + item.weight  + ";font-style:" + item.style+";text-align:center"' v-if="item.align == 'center'"> {{item.title}} </p>
                        <p :style='"font-weight:" + item.weight  + ";font-style:" + item.style+";text-align:end"' v-if="item.align == 'end'"> {{item.title}} </p>
                      </v-col>
                    </v-row>
                  </v-toolbar>
                </div>
                <!-- show table -->
                <div v-if="item.type == 'table'">
                  <v-toolbar elevation="3" class="mb-2 pt-3">
                    <v-row class="d-flex justify-space-between mb-3">
                      <v-col v-for="item in item.column" :key="item.index">
                        <v-card outlined tile class="text-center"> {{item.name}} </v-card>
                      </v-col>
                    </v-row>
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
          </v-container>
        </v-col>

        <!-- show script, pdf -->
        <v-col md="6">
          <v-container>
            <v-row>
              <v-col>
                <v-container class="pa-3 content" :style='content == "script" ? "display: block" : "display: none"'>
                  <v-row class="pa-3">
                    <v-btn small fab @click="copyScript" style="position: fixed; right: 9rem"><v-icon small>mdi-content-copy</v-icon></v-btn>
                    <v-btn small fab @click="showEform" style="position: fixed; right: 6rem"> Eform </v-btn>
                    <v-btn small fab @click="showPDF" style="position: fixed; right: 3rem"> PDF </v-btn>
                  </v-row>
                  <div id="script"></div>
                </v-container>

                <v-container class="pa-3 content"  :style='content == "jrxml" ? "display: block" : "display: none"'>
                  <v-row class="pa-3">
                    <v-btn small fab @click="copyJrxml" style="position: fixed; right: 9rem"><v-icon small>mdi-content-copy</v-icon></v-btn>
                    <v-btn small fab @click="showEform" style="position: fixed; right: 6rem"> Eform </v-btn>
                    <v-btn small fab  @click="showPDF" style="position: fixed; right: 3rem"> PDF </v-btn>
                  </v-row>
                  <div id="jrxml"></div>
                </v-container>
              </v-col>
            </v-row>
            <v-row>
              <v-container class="px-3 py-0">
                <v-btn color="info" @click="importState" class="mb-3">Đặt lại cấu hình</v-btn>
                <v-textarea rows="13" id="state-textarea" outlined :value="JSON.stringify(items, null, '\t')">
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

    <v-dialog v-model="editInputDialog" width="800"> <edit-input @add="addInput" :item="selectedItem" :index="itemIndexToAdd"></edit-input>
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
import TextDialog from './TextDialog.vue'
import TableDialog from './TableDialog.vue'
import AddInput from './input/AddInput.vue'
import EditInput from './input/EditInput.vue'
import InputDialog from './InputDialog.vue'

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
    textDialog: false,
    tableDialog: false,
    addInputDialogNewRow: false,
    newItemIndex: 0,
    newInputIndex: 0
  }),
  components: {TextDialog, TableDialog, AddInput, InputDialog, EditInput},
  mixins: [html, script, jrxml],
  methods: {
    add(item) {
      let vm = this
      console.log(item)
      if (item.index == undefined) {
        item.index = vm.newItemIndex
        vm.items.push(item)
        vm.newItemIndex++
      } else {
        let findIndex = vm.items.findIndex(i => i.index == item.index)
        vm.items[findIndex] = item
      }
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
      jrxml.innerText = vm.createJrxml(vm.items) 
      script.innerText = vm.createScript(vm.items, html)
    },

    edit(item) {
      this.selectedItem = item
      this.editInputDialog = true
    },

    del(item) {
      let vm = this
      vm.items = vm.items.filter(i => i.index != item.index)
    },

    dupl(item) {
      let vm = this
      let duplItem = {
        index: vm.newItemIndex + 1,
        id: item.id,
        title: item.title,
        placeholder: item.placeholder,
        labelWidth: item.labelWidth,
        inputWidth: item.inputWidth,
        type: 'input'
      }
      let findIndex = vm.items.findIndex(i => i.index == item.index)
      vm.items.splice(vm.items[findIndex], 0, duplItem)
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

    showPDF() {
      let vm = this
      vm.content = 'jrxml'
    },

    showEform() {
      let vm = this
      vm.content = 'script'   
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