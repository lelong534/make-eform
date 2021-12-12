export const data = {
    methods:{
        createData(items) {
            let data = []
            items.forEach(item => {
                if (item.type == 'input') {
                    item.inputs.forEach(input => {
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