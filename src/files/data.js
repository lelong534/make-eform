export const data = {
    methods:{
        createData(items) {
            let data = []
            items.forEach(item => {
                if (item.type == 'input') {
                    item.inputs.forEach(input => {
                        if (input.inputWidth - input.labelWidth > 0)
                        data.push(createInput(input))
                    })
                }
            });
            return `{` + data.join(',') + `}`
        }
    }
}

function createInput(item) {
    let placeholder = item.placeholder == undefined ? "" : item.placeholder
    return `"`+ item.id +`": "`+ placeholder + `"`
}