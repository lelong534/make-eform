export const html = {
    methods: {
        createHtml(items) {
            let html = htmlstyle;
            items.forEach(item => {
                if (item.type == 'text') {
                    html += createText(item)
                } else if (item.type == 'input') {
                    html += createInput(item)
                } else if (item.type == 'table') {
                    html += createTable(item.id)
                }
            });
            return html + ` </div>`
        }
    }
}

function createText(item) {
    let align = ''
    if (item.align == 'center') {
        align = "flex-center"
    } else if (item.align == 'end') {
        align = "flex-end"
    }

    let style = ''
    if (item.weight == 'bold') style += ` font-weight-bold ` 
    if (item.style  == 'italic') style += ` font-style-italic `
    if (item.size  == 'h3') style += ` font-format-h3 `

    // space
    let leftSpace = item.width[0]
    let rightSpace = 12 - item.width[1]
    let contentSpace = item.width[1] - item.width[0]

    let title = item.title == undefined ? "" : item.title

    return `
    <div class='row'>
        `+ (leftSpace > 0 ? `<div class='span`+ leftSpace +` row-flex'></div>` : '') 
        + `<div class='span`+ contentSpace +` row-flex ` + align + ` ` + style + ` ` + `'>
            <label>` + title + `</label>
        </div>
        `+ (rightSpace > 0 ? `<div class='span`+ rightSpace +` row-flex'></div>` : '')
    +`</div>`;
}

function createInput(item) {
    let html = ''
    item.inputs.forEach(input => {
        if (input.type == 'input') {
            if (input.fixWidth) {
                html += `<label class='span`+ input.labelWidth +`'>` + (input.title == undefined ? "" : input.title) + `</label>&nbsp;
                <div class='form-control w250' id='column-`+ input.id + `'></div>&nbsp`
            } else if (input.labelWidth == input.inputWidth) {
                html += `<label class='span`+ input.labelWidth +` text-`+ input.align +`'>` + (input.title == undefined ? "" : input.title) + `</label>&nbsp;`
            }
            else {
                html += `<label class='span`+ input.labelWidth +` text-`+ input.align +`'>` + (input.title == undefined ? "" : input.title) + `</label>&nbsp;
                <div class='form-control span`+ (input.inputWidth - input.labelWidth) +`' id='column-`+ input.id + `'></div>&nbsp`
            }
        } else {
            html += `<label>`+ input.title +`</label>&nbsp`
        }
    })
    return `
    <div class='row'>
        <div class='span12 row-flex'>`+ html +`
        </div>
    </div>`;
}

function createTable(id) {
    return `
    <div class='row'>`
        + ("<div class='span12 row-flex'>") +
            `<div class='form-control' id='column-`+ id +`'></div>
        </div>
    </div>`
}

const htmlstyle = `<div class='alpacaa' style='font-family: ‘Times New Roman’, Times, serif; font-size: 14px; width: 100%; margin: 0 auto;'>
    <style>
        .alpacaa h3 {
            margin-top: 30px;
            margin-bottom: 15px;
        }

        .alpacaa .row {
            margin: 0 -15px;
            display: -webkit-box;
            display: flex;
        }

        .alpacaa .span1 {
            width: 8.333333%;
            padding: 0 15px;
        }

        .alpacaa .span2 {
            width: 16.666666%;
            padding: 0 15px;
        }

        .alpacaa .span3 {
            width: 25%;
            padding: 0 15px;
        }

        .alpacaa .span4 {
            width: 33.333333%;
            padding: 0 15px;
        }

        .alpacaa .span5 {
            width: 41.666666%;
            padding: 0 15px;
        }

        .alpacaa .span6 {
            width: 50%;
            padding: 0 15px;
        }

        .alpacaa .span7 {
            width: 58.333333%;
            padding: 0 15px;
        }

        .alpacaa .span8 {
            width: 66.666666%;
            padding: 0 15px;
        }

        .alpacaa .span9 {
            width: 75%;
            padding: 0 15px;
        }

        .alpacaa .span10 {
            width: 83.333333%;
            padding: 0 15px;
        }

        .alpacaa .span11 {
            width: 91.666666%;
            padding: 0 15px;
        }

        .alpacaa .span12 {
            width: 100%;
            padding: 0 15px;
        }
        .alpacaa .form-control {
            margin-bottom: 10px;
            background-color: transparent;
            padding: 0;
            border: 0;
            min-height: inherit;
            width: auto;
            display: inline-block;
        }

        .alpacaa .form-control input,
        .alpacaa .form-control select,
        .alpacaa .form-control textarea {
            border: 1px solid #d3d3d3 !important;
            font-size: 14px;
            height: auto !important;
        }

        .alpacaa .form-control .alpaca-field:after,
        .alpacaa .form-control .alpaca-field:before {
            display: none;
        }

        .alpacaa .full-width,
        .alpacaa .full-width input[type='text'],
        .alpacaa .full-width textarea,
        .alpacaa .row-flex input[type='text'],
        .alpacaa .row-flex textarea {
            width: 100%;
        }

        .alpacaa .d-flex {
            display: -webkit-box;
            display: flex;
        }

        .alpacaa .d-flex>div {
            -webkit-flex: 0 0 auto !important;
            flex: 0 0 auto !important;
        }

        .alpacaa .row-flex {
            display: -webkit-box;
            display: flex;
        }

        .alpacaa .row-flex>label,
        .alpacaa .row-flex>span {
            -webkit-flex-shrink: 0;
            flex-shrink: 0;
        }

        .alpacaa .row-flex>div {
            margin-left: 15px;
            width: 100%;
        }

        .alpacaa .row-flex>div:first-child {
            margin-left: 0;
        }

        .alpacaa .row label {
            font-weight: normal;
            margin-bottom: 5px;
            display: block;
        }

        .alpacaa .flex-center {
            -webkit-justify-content: center;
            justify-content: center;
        }

        .alpacaa .flex-end {
            -webkit-justify-content: end;
            justify-content: end;
        }

        .alpacaa .flex-wrap {
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
        }

        .alpacaa .flex-wrap>div {
            width: auto;
        }

        .alpacaa .flex-wrap>.full-width {
            width: 100%;
            margin: 0;
        }

        .alpacaa h4 {
            margin-bottom: 10px;
        }

        .alpacaa table td {
            border: 1px solid #ccc;
        }

        .alpacaa table .form-control {
            margin-bottom: 0;
        }

        .alpacaa .form-group,
        .alpacaa input.form-control,
        .alpacaa textarea.form-control,
        .alpacaa select.form-control {
            margin-bottom: 0;
        }

        .alpacaa .table-wrapper {
            margin: 10px 0;
            width: 100%;
        }

        .alpacaa .table-wrapper table {
            border-collapse: collapse;
            width: 100%;
            max-width: 100%;
        }

        .alpacaa .table-wrapper table,
        .alpacaa .table-wrapper table th,
        .alpacaa .table-wrapper table td {
            border: 1px solid #ccc;
            padding: 5px;
        }

        .alpacaa .th-center th {
            text-align: center;
        }

        .alpacaa .table-wrapper td {
            height: auto;
            vertical-align: middle;
        }

        .alpacaa table .actionbar {
            width: 1%;
        }

        .alpacaa table .actionbar>div {
            display: -webkit-box;
            display: flex;
        }

        .alpacaa table .actionbar button {
            min-width: inherit;
            width: 30px;
            border: 0;
        }

        .alpacaa table .actionbar button i {
            top: 0;
        }

        .alpacaa .radio {
            margin: 0;
        }

        .alpacaa .radio label {
            font-size: 14px;
            display: -webkit-box;
            display: flex;
            -webkit-align-items: center;
            align-items: center;
            font-weight: normal;
        }

        .alpacaa .radio-inline .radio {
            display: inline-block !important;
        }

        .alpacaa .radio-inline .radio+.radio {
            margin-left: 15px;
        }

        .alpacaa .checkbox {
            margin: 0;
        }

        .alpacaa .checkbox label {
            margin-top: 4px;
        }

        .alpacaa .checkboxs-inline {
            display: -webkit-box;
            display: flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }

        .alpacaa .checkboxs-inline>div:not(:last-child) {
            margin-right: 30px;
        }

        .alpacaa .simple-text {
            margin-bottom: 10px;
        }

        .alpacaa .cb {
            width: 50px !important;
        }

        .alpacaa .cbheight {
            height: 25px !important;
        }

        .alpacaa table th {
            text-align: center;
        }

        .alpacaa .font-weight-bold label {
            font-weight: bold;
        }

        .alpacaa .font-style-italic label {
            font-style: italic;
        }

        .alpacaa .font-format-h3 label {
            font-size: 16px;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 15px;
        }

        #nguoiky {
            text-align: center;
        }
        label.span1 {
            padding: 0 !important;
        }
        label.span2 {
            padding: 0 !important;
        }
        .checkbox label {
            margin: 0 !important;
        }
        input {
            padding: 0 5px !important;
        }
        #email {
            width: 100% !important;
        }
        .text-center {
            text-align: center;
        }
        .text-left {
            text-align: left;
        }
        .text-end {
            text-align: right;
        }
        .row-center {
            justify-content: center;
        }
        .date {
            width: 250px !important;
        }
        .w250 {
            width: 250px !important;
        }
        .w250 input {
            width: 250px !important;
        }
    </style>`

